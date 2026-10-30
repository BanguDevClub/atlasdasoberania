import atlasDataJson from '../data/soberania-data.json';
import type {
  AtlasDataset,
  ChainStage,
  Pillar,
  ProductionChain,
  SourceReference,
} from '../types/soberania';

export const atlasData: AtlasDataset = atlasDataJson as AtlasDataset;

export interface FlatChainStage extends ChainStage {
  pillarName: string;
  pillarIcon: string;
  pillarColor: string;
  chainName: string;
}

export function getAllStages(): FlatChainStage[] {
  const stages: FlatChainStage[] = [];

  for (const pillar of atlasData.pillars) {
    for (const chain of pillar.chains) {
      for (const stage of chain.stages) {
        stages.push({
          ...stage,
          pillarName: pillar.name,
          pillarIcon: pillar.icon,
          pillarColor: pillar.color,
          chainName: chain.name,
        });
      }
    }
  }

  return stages;
}

export function getPillarById(id: string): Pillar | undefined {
  return atlasData.pillars.find((p) => p.id === id);
}

export function getStageById(stageId: string):
  | {
      stage: ChainStage;
      pillar: Pillar;
      chain: ProductionChain;
    }
  | undefined {
  for (const pillar of atlasData.pillars) {
    for (const chain of pillar.chains) {
      for (const stage of chain.stages) {
        if (stage.id === stageId) {
          return { stage, pillar, chain };
        }
      }
    }
  }
  return undefined;
}

export function getSourceById(sourceId: string): SourceReference | undefined {
  return atlasData.sources.find((s) => s.id === sourceId);
}

