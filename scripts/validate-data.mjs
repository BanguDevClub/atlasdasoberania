import fs from 'node:fs';
import path from 'node:path';

const dataPath = path.resolve('src/data/soberania-data.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const errors = [];

const round1 = (value) => Math.round((value + 1e-9) * 10) / 10;

function fail(message) {
  errors.push(message);
}

function tierFor(score) {
  if (score >= 80) return 'Crítica';
  if (score >= 60) return 'Alta';
  if (score >= 40) return 'Moderada';
  return 'Baixa';
}

const weights = Object.fromEntries(
  data.methodology.dimensions.map((dimension) => [
    dimension.code,
    dimension.weight,
  ])
);

const weightSum = Object.values(weights).reduce(
  (sum, weight) => sum + weight,
  0
);
if (Math.abs(weightSum - 1) > 1e-9) {
  fail(`Pesos do ICVS somam ${weightSum}, esperado 1.0`);
}

const sourceIds = new Set();
for (const source of data.sources) {
  if (sourceIds.has(source.id)) fail(`Fonte duplicada: ${source.id}`);
  sourceIds.add(source.id);
  if (!source.url || !/^https?:\/\//.test(source.url)) {
    fail(`Fonte ${source.id} sem URL HTTP(S) válida`);
  }
  if (!source.description?.trim()) {
    fail(`Fonte ${source.id} sem descrição`);
  }
}

const stageIds = new Set();
const chainIds = new Set();
const pillarIds = new Set();
const stats = data.logisticsProblemReport.stats;

const modalSum =
  stats.roadShareTonKm +
  stats.railShareTonKm +
  stats.waterwayShareTonKm +
  stats.pipelineShareTonKm;
if (Math.abs(modalSum - 100) > 0.01) {
  fail(`Matriz modal soma ${modalSum}%, esperado 100%`);
}
if (
  stats.dieselS10ImportDependencePercent < 0 ||
  stats.dieselS10ImportDependencePercent > 100
) {
  fail('Participação importada de diesel fora do intervalo 0-100%');
}

for (const pillar of data.pillars) {
  if (pillarIds.has(pillar.id)) fail(`Pilar duplicado: ${pillar.id}`);
  pillarIds.add(pillar.id);

  const stageScores = [];

  for (const chain of pillar.chains) {
    if (chainIds.has(chain.id)) fail(`Cadeia duplicada: ${chain.id}`);
    chainIds.add(chain.id);
    if (chain.pillarId !== pillar.id) {
      fail(`Cadeia ${chain.id} aponta para pilar ${chain.pillarId}`);
    }

    for (const stage of chain.stages) {
      if (stageIds.has(stage.id)) fail(`Etapa duplicada: ${stage.id}`);
      stageIds.add(stage.id);
      stageScores.push(stage.scores.finalScore);

      if (stage.pillarId !== pillar.id || stage.chainId !== chain.id) {
        fail(`Etapa ${stage.id} com pillarId/chainId inconsistente`);
      }

      const calculated = Object.entries(weights).reduce(
        (sum, [code, weight]) => sum + stage.scores[code] * weight,
        0
      );
      if (Math.abs(calculated - stage.scores.finalScore) > 0.051) {
        fail(
          `Etapa ${stage.id}: ICVS ${stage.scores.finalScore} != cálculo ${round1(
            calculated
          )}`
        );
      }

      const expectedTier = tierFor(stage.scores.finalScore);
      if (stage.criticalityLevel !== expectedTier) {
        fail(
          `Etapa ${stage.id}: criticidade ${stage.criticalityLevel} != faixa ${expectedTier}`
        );
      }

      if (
        Math.abs(stage.domesticProductionShare + stage.importShare - 100) > 0.01
      ) {
        fail(`Etapa ${stage.id}: produção doméstica + importação != 100%`);
      }

      const logisticsSum =
        stage.logistics.roadShare +
        stage.logistics.railShare +
        stage.logistics.waterwayShare;
      if (Math.abs(logisticsSum - 100) > 0.01) {
        fail(`Etapa ${stage.id}: matriz logística soma ${logisticsSum}%`);
      }

      for (const [role, partners] of [
        ['import', stage.importPartners],
        ['export', stage.exportPartners],
      ]) {
        const total = partners.reduce(
          (sum, partner) => sum + partner.sharePercentage,
          0
        );
        if (total > 100.01) {
          fail(`Etapa ${stage.id}: parceiros de ${role} somam ${total}%`);
        }
        for (const partner of partners) {
          if (partner.role !== role) {
            fail(
              `Etapa ${stage.id}: parceiro ${partner.country} com role ${partner.role} em lista de ${role}`
            );
          }
        }
      }

      if (!stage.sources?.length) {
        fail(`Etapa ${stage.id} sem fontes`);
      }
      for (const sourceId of stage.sources ?? []) {
        if (!sourceIds.has(sourceId)) {
          fail(`Etapa ${stage.id} referencia fonte inexistente: ${sourceId}`);
        }
      }
    }
  }

  const expectedOverall = round1(
    stageScores.reduce((sum, score) => sum + score, 0) / stageScores.length
  );
  if (Math.abs(expectedOverall - pillar.overallScore) > 0.051) {
    fail(
      `Pilar ${pillar.id}: overall ${pillar.overallScore} != média ${expectedOverall}`
    );
  }
}

if (Number.isNaN(Date.parse(data.lastUpdated))) {
  fail(`lastUpdated inválido: ${data.lastUpdated}`);
}

if (errors.length > 0) {
  console.error(`\n✗ ${errors.length} inconsistência(s) no dataset:\n`);
  for (const error of errors) console.error(`  - ${error}`);
  process.exit(1);
}

console.log(
  `✓ Dataset válido: ${data.pillars.length} pilares, ${stageIds.size} etapas, ${sourceIds.size} fontes.`
);
