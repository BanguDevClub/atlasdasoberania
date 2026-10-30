import { useState, useMemo } from 'react';
import { getAllStages, type FlatChainStage } from '@/lib/data';
import { atlasData } from '@/lib/data';
import { Input } from '@/components/ui/input';
import { SelectCustom } from '@/components/ui/select-custom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { DynamicIcon } from '@/components/DynamicIcon';
import { StageDetailModal } from '@/components/StageDetailModal';
import { getCriticalityBadge } from '@/lib/utils';
import {
  Search,
  ArrowUpDown,
  LayoutGrid,
  Table as TableIcon,
  Flame,
  Truck,
  ChevronRight,
  X,
} from 'lucide-react';

export function InteractiveExplorer() {
  const allStages = useMemo(() => getAllStages(), []);

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPillar, setSelectedPillar] = useState('all');
  const [selectedCriticality, setSelectedCriticality] = useState('all');
  const [selectedPartner, setSelectedPartner] = useState('all');
  const [selectedLogisticsRisk, setSelectedLogisticsRisk] = useState('all');
  const [sortBy, setSortBy] = useState<
    | 'icvs-desc'
    | 'icvs-asc'
    | 'ext-desc'
    | 'impact-desc'
    | 'log-desc'
    | 'name-asc'
  >('icvs-desc');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  // Modal State
  const [selectedStage, setSelectedStage] = useState<FlatChainStage | null>(
    null
  );

  // Extract unique partner countries across all stages
  const allPartners = useMemo(() => {
    const set = new Set<string>();
    for (const stage of allStages) {
      for (const p of stage.importPartners) {
        set.add(p.country);
      }
      for (const p of stage.exportPartners) {
        set.add(p.country);
      }
    }
    return Array.from(set).sort();
  }, [allStages]);

  // Filtered & Sorted Stages
  const filteredStages = useMemo(() => {
    return allStages
      .filter((stage) => {
        // Search text matching
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = stage.name.toLowerCase().includes(q);
          const matchSummary = stage.summary.toLowerCase().includes(q);
          const matchAnalysis = stage.detailedAnalysis
            .toLowerCase()
            .includes(q);
          const matchPillar = stage.pillarName.toLowerCase().includes(q);
          const matchBottlenecks = stage.bottlenecks.some((b) =>
            b.toLowerCase().includes(q)
          );
          const matchPartners = [
            ...stage.importPartners,
            ...stage.exportPartners,
          ].some((p) => p.country.toLowerCase().includes(q));

          if (
            !matchName &&
            !matchSummary &&
            !matchAnalysis &&
            !matchPillar &&
            !matchBottlenecks &&
            !matchPartners
          ) {
            return false;
          }
        }

        // Pillar filter
        if (selectedPillar !== 'all' && stage.pillarId !== selectedPillar) {
          return false;
        }

        // Criticality filter
        if (selectedCriticality !== 'all') {
          if (
            selectedCriticality === 'critical' &&
            stage.scores.finalScore < 80
          )
            return false;
          if (
            selectedCriticality === 'high' &&
            (stage.scores.finalScore < 60 || stage.scores.finalScore >= 80)
          )
            return false;
          if (
            selectedCriticality === 'moderate' &&
            (stage.scores.finalScore < 40 || stage.scores.finalScore >= 60)
          )
            return false;
          if (selectedCriticality === 'low' && stage.scores.finalScore >= 40)
            return false;
        }

        // Partner filter
        if (selectedPartner !== 'all') {
          const hasPartner = [
            ...stage.importPartners,
            ...stage.exportPartners,
          ].some((p) => p.country === selectedPartner);
          if (!hasPartner) return false;
        }

        // Logistics risk filter
        if (selectedLogisticsRisk !== 'all') {
          if (stage.logistics.dieselExposureLevel !== selectedLogisticsRisk)
            return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'icvs-desc')
          return b.scores.finalScore - a.scores.finalScore;
        if (sortBy === 'icvs-asc')
          return a.scores.finalScore - b.scores.finalScore;
        if (sortBy === 'ext-desc')
          return b.scores.extDependence - a.scores.extDependence;
        if (sortBy === 'impact-desc')
          return b.scores.systemicImpact - a.scores.systemicImpact;
        if (sortBy === 'log-desc')
          return (
            b.scores.logisticsVulnerability - a.scores.logisticsVulnerability
          );
        if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
        return 0;
      });
  }, [
    allStages,
    searchQuery,
    selectedPillar,
    selectedCriticality,
    selectedPartner,
    selectedLogisticsRisk,
    sortBy,
  ]);

  // Aggregate stats of filtered results
  const stats = useMemo(() => {
    const total = filteredStages.length;
    if (total === 0)
      return { total: 0, avgIcvs: 0, criticalCount: 0, avgRoadShare: 0 };
    const avgIcvs =
      filteredStages.reduce((acc, s) => acc + s.scores.finalScore, 0) / total;
    const criticalCount = filteredStages.filter(
      (s) => s.scores.finalScore >= 80
    ).length;
    const avgRoadShare =
      filteredStages.reduce((acc, s) => acc + s.logistics.roadShare, 0) / total;
    return { total, avgIcvs, criticalCount, avgRoadShare };
  }, [filteredStages]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedPillar('all');
    setSelectedCriticality('all');
    setSelectedPartner('all');
    setSelectedLogisticsRisk('all');
    setSortBy('icvs-desc');
  };

  const hasActiveFilters =
    Boolean(searchQuery) ||
    selectedPillar !== 'all' ||
    selectedCriticality !== 'all' ||
    selectedPartner !== 'all' ||
    selectedLogisticsRisk !== 'all';

  return (
    <div className="space-y-6">
      {/* Search and Filters Header */}
      <div className="space-y-4 rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-6">
        {/* Top Search bar & View mode switch */}
        <div className="flex flex-col items-stretch justify-between gap-3 sm:flex-row sm:items-center">
          <div className="max-w-2xl flex-1">
            <Input
              type="text"
              placeholder="Buscar por etapa, insumo, gargalo, parceiro comercial (ex: Potássio, Diesel, China, Turbinas)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search className="size-4" />}
              className="bg-background text-foreground"
            />
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={resetFilters}
                className="gap-1 text-xs text-muted-foreground hover:text-foreground"
              >
                <X className="size-3.5" />
                Limpar Filtros
              </Button>
            )}

            <div className="flex items-center rounded-lg border border-border bg-muted/40 p-0.5">
              <button
                type="button"
                onClick={() => setViewMode('cards')}
                className={`rounded-md p-1.5 text-xs font-medium transition-colors ${
                  viewMode === 'cards'
                    ? 'shadow-xs bg-card text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                title="Visualização em Grade de Cards"
              >
                <LayoutGrid className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('table')}
                className={`rounded-md p-1.5 text-xs font-medium transition-colors ${
                  viewMode === 'table'
                    ? 'shadow-xs bg-card text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                title="Visualização em Tabela Comparativa"
              >
                <TableIcon className="size-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Filter dropdowns row */}
        <div className="grid grid-cols-1 gap-3 border-t border-border/60 pt-2 sm:grid-cols-2 md:grid-cols-5">
          {/* Pillar Filter */}
          <SelectCustom
            label="Pilar da Soberania"
            value={selectedPillar}
            onChange={(e) => setSelectedPillar(e.target.value)}
          >
            <option value="all">Todos os 8 Pilares</option>
            {atlasData.pillars.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </SelectCustom>

          {/* Criticality Filter */}
          <SelectCustom
            label="Faixa de Criticidade"
            value={selectedCriticality}
            onChange={(e) => setSelectedCriticality(e.target.value)}
          >
            <option value="all">Todas as Faixas</option>
            <option value="critical">🔴 Crítica / Extrema (80-100)</option>
            <option value="high">🟠 Alta Criticidade (60-79)</option>
            <option value="moderate">🟡 Média / Moderada (40-59)</option>
            <option value="low">🟢 Baixa / Resiliente (0-39)</option>
          </SelectCustom>

          {/* Partner Filter */}
          <SelectCustom
            label="Parceiro Comercial"
            value={selectedPartner}
            onChange={(e) => setSelectedPartner(e.target.value)}
          >
            <option value="all">Todos os Países</option>
            {allPartners.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </SelectCustom>

          {/* Logistics Diesel Risk Filter */}
          <SelectCustom
            label="Risco Logístico (Diesel)"
            value={selectedLogisticsRisk}
            onChange={(e) => setSelectedLogisticsRisk(e.target.value)}
          >
            <option value="all">Todos os Riscos</option>
            <option value="Crítica">🚨 Exposição Crítica</option>
            <option value="Alta">⚠️ Alta Exposição</option>
            <option value="Moderada">⚡ Moderada</option>
            <option value="Baixa">🛡️ Baixa</option>
          </SelectCustom>

          {/* Sort By */}
          <SelectCustom
            label="Ordenar Por"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            icon={<ArrowUpDown className="size-3.5" />}
          >
            <option value="icvs-desc">ICVS: Maior para Menor</option>
            <option value="icvs-asc">ICVS: Menor para Maior</option>
            <option value="ext-desc">Dependência Externa (D_ext)</option>
            <option value="impact-desc">Impacto Sistêmico (I_sis)</option>
            <option value="log-desc">Vulnerabilidade Rodoviária (V_log)</option>
            <option value="name-asc">Nome da Etapa (A-Z)</option>
          </SelectCustom>
        </div>
      </div>

      {/* Aggregate Stats Summary Bar */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="flex flex-col rounded-xl border border-border bg-card/70 p-3.5">
          <span className="text-xs font-medium text-muted-foreground">
            Etapas Analisadas
          </span>
          <span className="mt-0.5 font-mono text-2xl font-bold text-foreground">
            {stats.total}
          </span>
        </div>
        <div className="flex flex-col rounded-xl border border-border bg-card/70 p-3.5">
          <span className="text-xs font-medium text-muted-foreground">
            ICVS Médio
          </span>
          <span className="mt-0.5 font-mono text-2xl font-bold text-foreground">
            {stats.avgIcvs.toFixed(1)}{' '}
            <span className="text-xs font-normal text-muted-foreground">
              / 100
            </span>
          </span>
        </div>
        <div className="flex flex-col rounded-xl border border-border bg-card/70 p-3.5">
          <span className="text-xs font-medium text-muted-foreground">
            Em Alerta Vermelho
          </span>
          <span className="mt-0.5 font-mono text-2xl font-bold text-red-500">
            {stats.criticalCount}{' '}
            <span className="text-xs font-normal text-muted-foreground">
              etapas
            </span>
          </span>
        </div>
        <div className="flex flex-col rounded-xl border border-border bg-card/70 p-3.5">
          <span className="text-xs font-medium text-muted-foreground">
            Média Modal Rodoviário
          </span>
          <span className="mt-0.5 font-mono text-2xl font-bold text-amber-500">
            {stats.avgRoadShare.toFixed(1)}%
          </span>
        </div>
      </div>

      {/* Results Rendering: Cards View */}
      {viewMode === 'cards' && (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredStages.map((stage) => {
            const badge = getCriticalityBadge(stage.scores.finalScore);
            return (
              <Card
                key={stage.id}
                className="group flex flex-col justify-between border-border transition-all hover:border-primary/50 hover:shadow-md"
              >
                <CardHeader className="p-5 pb-3">
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <span className="flex items-center gap-1.5 rounded-md bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                      <DynamicIcon
                        name={stage.pillarIcon}
                        className="size-3.5"
                      />
                      {stage.pillarName}
                    </span>
                    <Badge variant={badge.variant} className="text-xs">
                      ICVS: {stage.scores.finalScore.toFixed(1)}
                    </Badge>
                  </div>
                  <CardTitle className="line-clamp-1 text-base font-bold transition-colors group-hover:text-primary">
                    {stage.name}
                  </CardTitle>
                  <CardDescription className="mt-1 line-clamp-2 text-xs">
                    {stage.summary}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-3.5 p-5 pt-0">
                  {/* Scores miniature */}
                  <div className="grid grid-cols-3 gap-2 rounded-lg border border-border/50 bg-muted/40 p-2.5 text-center text-xs">
                    <div>
                      <div className="text-[10px] text-muted-foreground">
                        Dep. Externa
                      </div>
                      <div className="font-mono font-bold text-red-500">
                        {stage.scores.extDependence.toFixed(0)}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-muted-foreground">
                        Imp. Sistêmico
                      </div>
                      <div className="font-mono font-bold text-amber-500">
                        {stage.scores.systemicImpact.toFixed(0)}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-muted-foreground">
                        Vuln. Logística
                      </div>
                      <div className="font-mono font-bold text-orange-500">
                        {stage.scores.logisticsVulnerability.toFixed(0)}
                      </div>
                    </div>
                  </div>

                  {/* Top Partners */}
                  <div>
                    <span className="mb-1 block text-[11px] font-semibold text-muted-foreground">
                      Principais Origens de Importação:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {stage.importPartners.slice(0, 3).map((partner, pIdx) => (
                        <span
                          key={pIdx}
                          className="inline-flex items-center gap-1 rounded-md border border-border bg-card px-2 py-0.5 text-xs font-medium"
                          title={`${partner.country}: ${partner.sharePercentage}%`}
                        >
                          <span>{partner.flag}</span>
                          <span>{partner.country}</span>
                          <span className="font-mono text-[10px] text-muted-foreground">
                            {partner.sharePercentage.toFixed(0)}%
                          </span>
                        </span>
                      ))}
                      {stage.importPartners.length === 0 && (
                        <span className="text-xs italic text-muted-foreground">
                          Abastecimento majoritário local
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Logistics indicator */}
                  <div className="flex items-center justify-between border-t border-border/50 pt-1 text-xs">
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Truck className="size-3.5 text-amber-500" />
                      Rodovia:{' '}
                      <b className="text-foreground">
                        {stage.logistics.roadShare}%
                      </b>
                    </span>
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Flame className="size-3.5 text-rose-500" />
                      Diesel:{' '}
                      <b className="text-foreground">
                        {stage.logistics.dieselExposureLevel}
                      </b>
                    </span>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedStage(stage)}
                    className="w-full gap-1.5 text-xs font-semibold transition-all group-hover:bg-primary group-hover:text-primary-foreground"
                  >
                    <span>Relatório Detalhado</span>
                    <ChevronRight className="size-3.5" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Results Rendering: Table View */}
      {viewMode === 'table' && (
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
          <div className="custom-scrollbar overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/60 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  <th className="px-4 py-3">Pilar & Etapa</th>
                  <th className="px-3 py-3">Categoria</th>
                  <th className="px-3 py-3 text-center">ICVS</th>
                  <th className="px-3 py-3 text-center">D. Ext</th>
                  <th className="px-3 py-3 text-center">C. Geo</th>
                  <th className="px-3 py-3 text-center">Imp. Sist</th>
                  <th className="px-3 py-3">Parceiros Chave</th>
                  <th className="px-3 py-3">Modal Rodoviário</th>
                  <th className="px-4 py-3 text-right">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredStages.map((stage) => {
                  const badge = getCriticalityBadge(stage.scores.finalScore);
                  return (
                    <tr
                      key={stage.id}
                      className="cursor-pointer transition-colors hover:bg-muted/40"
                      onClick={() => setSelectedStage(stage)}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5 font-semibold text-foreground">
                          <DynamicIcon
                            name={stage.pillarIcon}
                            className="size-4 shrink-0 text-primary"
                          />
                          <span>{stage.name}</span>
                        </div>
                        <div className="mt-0.5 max-w-xs truncate text-xs text-muted-foreground">
                          {stage.pillarName} • {stage.summary}
                        </div>
                      </td>
                      <td className="px-3 py-3 text-xs text-muted-foreground">
                        {stage.category}
                      </td>
                      <td className="px-3 py-3 text-center">
                        <Badge
                          variant={badge.variant}
                          className="font-mono text-xs font-bold"
                        >
                          {stage.scores.finalScore.toFixed(1)}
                        </Badge>
                      </td>
                      <td className="px-3 py-3 text-center font-mono text-xs font-semibold text-red-500">
                        {stage.scores.extDependence.toFixed(0)}
                      </td>
                      <td className="px-3 py-3 text-center font-mono text-xs font-semibold text-amber-500">
                        {stage.scores.geoConcentration.toFixed(0)}
                      </td>
                      <td className="px-3 py-3 text-center font-mono text-xs font-semibold text-rose-500">
                        {stage.scores.systemicImpact.toFixed(0)}
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex gap-1">
                          {stage.importPartners.slice(0, 3).map((p, idx) => (
                            <span
                              key={idx}
                              className="text-base"
                              title={`${p.country} (${p.sharePercentage}%)`}
                            >
                              {p.flag}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-1 text-xs">
                          <Truck className="size-3 text-amber-500" />
                          <span className="font-mono font-semibold">
                            {stage.logistics.roadShare}%
                          </span>
                          <span className="text-[10px] text-muted-foreground">
                            ({stage.logistics.dieselExposureLevel})
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedStage(stage);
                          }}
                          className="h-8 px-2 text-xs"
                        >
                          Ver Detalhes
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredStages.length === 0 && (
        <div className="rounded-2xl border border-dashed border-border bg-card px-4 py-16 text-center">
          <Search className="mx-auto mb-3 size-10 text-muted-foreground opacity-60" />
          <h3 className="text-lg font-bold text-foreground">
            Nenhuma etapa encontrada
          </h3>
          <p className="mx-auto mb-4 mt-1 max-w-md text-sm text-muted-foreground">
            Não encontramos etapas industriais correspondentes aos filtros
            selecionados.
          </p>
          <Button variant="outline" size="sm" onClick={resetFilters}>
            Limpar Todos os Filtros
          </Button>
        </div>
      )}

      {/* Interactive Detail Modal */}
      <StageDetailModal
        stage={selectedStage}
        isOpen={Boolean(selectedStage)}
        onClose={() => setSelectedStage(null)}
      />
    </div>
  );
}
