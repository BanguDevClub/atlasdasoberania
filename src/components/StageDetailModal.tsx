import type { ChainStage, SourceReference } from '@/types/soberania';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { DynamicIcon } from '@/components/DynamicIcon';
import { getCriticalityBadge, formatPercent } from '@/lib/utils';
import {
  Truck,
  Train,
  Ship,
  AlertOctagon,
  ArrowDownLeft,
  ArrowUpRight,
  ShieldCheck,
  Building2,
  ExternalLink,
  Flame,
  Info,
} from 'lucide-react';
import { atlasData } from '@/lib/data';

interface StageDetailModalProps {
  stage:
    | (ChainStage & {
        pillarName?: string;
        pillarIcon?: string;
        chainName?: string;
      })
    | null;
  isOpen: boolean;
  onClose: () => void;
}

export function StageDetailModal({
  stage,
  isOpen,
  onClose,
}: StageDetailModalProps) {
  if (!stage) return null;

  const badgeInfo = getCriticalityBadge(stage.scores.finalScore);
  const stageSources = (stage.sources || [])
    .map((srcId) => atlasData.sources.find((s) => s.id === srcId))
    .filter(Boolean) as SourceReference[];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl p-6 sm:p-8">
        <DialogHeader className="border-border border-b pb-4">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            {stage.pillarIcon && (
              <span className="bg-primary/10 text-primary flex items-center gap-1.5 rounded-md px-2.5 py-1 text-sm font-semibold">
                <DynamicIcon name={stage.pillarIcon} className="size-4" />
                {stage.pillarName}
              </span>
            )}
            <Badge variant="outline" className="text-sm">
              {stage.category}
            </Badge>
            <Badge variant={badgeInfo.variant} className="text-sm">
              {stage.criticalityLevel} ({stage.scores.finalScore.toFixed(1)} /
              100)
            </Badge>
          </div>
          <DialogTitle className="text-2xl font-black tracking-tight sm:text-3xl">
            {stage.name}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground mt-1 text-base sm:text-lg">
            {stage.summary}
          </DialogDescription>
        </DialogHeader>

        {/* Scores & Dimensions Grid */}
        <div className="grid grid-cols-1 gap-3 py-2 md:grid-cols-5">
          <div className="border-border bg-card/60 flex flex-col justify-between rounded-xl border p-3.5">
            <span className="text-muted-foreground flex items-center justify-between text-xs font-semibold sm:text-sm">
              D. Externa (D_ext)
              <span className="text-foreground font-mono text-base font-bold">
                {stage.scores.extDependence.toFixed(0)}
              </span>
            </span>
            <div className="bg-muted mt-2 h-2 w-full overflow-hidden rounded-full">
              <div
                className="h-2 rounded-full bg-red-500"
                style={{ width: `${stage.scores.extDependence}%` }}
              />
            </div>
          </div>

          <div className="border-border bg-card/60 flex flex-col justify-between rounded-xl border p-3.5">
            <span className="text-muted-foreground flex items-center justify-between text-xs font-semibold sm:text-sm">
              C. Geopolítica (C_geo)
              <span className="text-foreground font-mono text-base font-bold">
                {stage.scores.geoConcentration.toFixed(0)}
              </span>
            </span>
            <div className="bg-muted mt-2 h-2 w-full overflow-hidden rounded-full">
              <div
                className="h-2 rounded-full bg-amber-500"
                style={{ width: `${stage.scores.geoConcentration}%` }}
              />
            </div>
          </div>

          <div className="border-border bg-card/60 flex flex-col justify-between rounded-xl border p-3.5">
            <span className="text-muted-foreground flex items-center justify-between text-xs font-semibold sm:text-sm">
              T. Substituição (T_sub)
              <span className="text-foreground font-mono text-base font-bold">
                {stage.scores.substitutabilityTime.toFixed(0)}
              </span>
            </span>
            <div className="bg-muted mt-2 h-2 w-full overflow-hidden rounded-full">
              <div
                className="h-2 rounded-full bg-orange-500"
                style={{ width: `${stage.scores.substitutabilityTime}%` }}
              />
            </div>
          </div>

          <div className="border-border bg-card/60 flex flex-col justify-between rounded-xl border p-3.5">
            <span className="text-muted-foreground flex items-center justify-between text-xs font-semibold sm:text-sm">
              Imp. Sistêmico (I_sis)
              <span className="text-foreground font-mono text-base font-bold">
                {stage.scores.systemicImpact.toFixed(0)}
              </span>
            </span>
            <div className="bg-muted mt-2 h-2 w-full overflow-hidden rounded-full">
              <div
                className="h-2 rounded-full bg-rose-500"
                style={{ width: `${stage.scores.systemicImpact}%` }}
              />
            </div>
          </div>

          <div className="border-border bg-card/60 flex flex-col justify-between rounded-xl border p-3.5">
            <span className="text-muted-foreground flex items-center justify-between text-xs font-semibold sm:text-sm">
              Vulg. Logística (V_log)
              <span className="text-foreground font-mono text-base font-bold">
                {stage.scores.logisticsVulnerability.toFixed(0)}
              </span>
            </span>
            <div className="bg-muted mt-2 h-2 w-full overflow-hidden rounded-full">
              <div
                className="h-2 rounded-full bg-amber-600"
                style={{ width: `${stage.scores.logisticsVulnerability}%` }}
              />
            </div>
          </div>
        </div>

        {/* Domestic vs Imported Balance Bar */}
        <div className="border-border bg-muted/40 rounded-xl border p-4">
          <div className="mb-2 flex items-center justify-between text-sm font-semibold">
            <span className="text-emerald-600 dark:text-emerald-400">
              Produção Nacional: {stage.domesticProductionShare.toFixed(1)}%
            </span>
            <span className="text-red-600 dark:text-red-400">
              Importação Direta: {stage.importShare.toFixed(1)}%
            </span>
          </div>
          <div className="border-border/50 bg-muted flex h-3.5 w-full overflow-hidden rounded-full border">
            <div
              className="h-full bg-emerald-500 transition-all"
              style={{ width: `${stage.domesticProductionShare}%` }}
            />
            <div
              className="h-full bg-red-500 transition-all"
              style={{ width: `${stage.importShare}%` }}
            />
          </div>
        </div>

        {/* Commercial Partners Section */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Import Partners */}
          <div className="border-border bg-card rounded-xl border p-4">
            <div className="mb-3 flex items-center gap-2">
              <ArrowDownLeft className="size-4 text-red-500" />
              <h4 className="text-foreground text-base font-bold">
                Maiores Parceiros de Importação
              </h4>
            </div>
            {stage.importPartners.length > 0 ? (
              <div className="space-y-2.5">
                {stage.importPartners.map((partner, idx) => (
                  <div
                    key={idx}
                    className="border-border/50 bg-muted/40 flex items-center justify-between rounded-lg border p-2.5 text-sm"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl">{partner.flag}</span>
                      <div>
                        <span className="text-foreground text-sm font-semibold sm:text-base">
                          {partner.country}
                        </span>
                        {partner.description && (
                          <p className="text-muted-foreground text-xs leading-snug sm:text-sm">
                            {partner.description}
                          </p>
                        )}
                      </div>
                    </div>
                    <span className="font-mono text-base font-bold text-red-600 dark:text-red-400">
                      {formatPercent(partner.sharePercentage)}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm italic">
                Sem importações primárias relevantes registradas nesta etapa.
              </p>
            )}
          </div>

          {/* Export Partners */}
          <div className="border-border bg-card rounded-xl border p-4">
            <div className="mb-3 flex items-center gap-2">
              <ArrowUpRight className="size-4 text-emerald-500" />
              <h4 className="text-foreground text-base font-bold">
                Destinos Estratégicos de Exportação
              </h4>
            </div>
            {stage.exportPartners.length > 0 ? (
              <div className="space-y-2.5">
                {stage.exportPartners.map((partner, idx) => (
                  <div
                    key={idx}
                    className="border-border/50 bg-muted/40 flex items-center justify-between rounded-lg border p-2.5 text-sm"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl">{partner.flag}</span>
                      <div>
                        <span className="text-foreground text-sm font-semibold sm:text-base">
                          {partner.country}
                        </span>
                        {partner.description && (
                          <p className="text-muted-foreground text-xs leading-snug sm:text-sm">
                            {partner.description}
                          </p>
                        )}
                      </div>
                    </div>
                    <span className="font-mono text-base font-bold text-emerald-600 dark:text-emerald-400">
                      {formatPercent(partner.sharePercentage)}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm italic">
                Produção prioritariamente voltada ao consumo interno ou sem
                excedente soberano.
              </p>
            )}
          </div>
        </div>

        {/* Detailed Logistics & Diesel Vulnerability Diagnosis */}
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 dark:bg-amber-950/20">
          <div className="mb-2 flex items-center gap-2">
            <Flame className="size-4 text-amber-600 dark:text-amber-400" />
            <h4 className="text-foreground text-base font-bold">
              Diagnóstico Logístico e Exposição ao Diesel S10
            </h4>
            <Badge
              variant="outline"
              className="ml-auto border-amber-500/40 text-xs font-semibold text-amber-700 dark:text-amber-300"
            >
              Risco: {stage.logistics.dieselExposureLevel}
            </Badge>
          </div>

          <div className="my-3 grid grid-cols-3 gap-2 text-center">
            <div className="border-border bg-card/80 rounded-lg border p-2.5">
              <div className="text-muted-foreground flex items-center justify-center gap-1 text-xs font-medium sm:text-sm">
                <Truck className="size-4 text-amber-500" /> Rodoviário
              </div>
              <div className="text-foreground mt-1 font-mono text-lg font-bold sm:text-xl">
                {stage.logistics.roadShare}%
              </div>
            </div>
            <div className="border-border bg-card/80 rounded-lg border p-2.5">
              <div className="text-muted-foreground flex items-center justify-center gap-1 text-xs font-medium sm:text-sm">
                <Train className="size-4 text-blue-500" /> Ferroviário
              </div>
              <div className="text-foreground mt-1 font-mono text-lg font-bold sm:text-xl">
                {stage.logistics.railShare}%
              </div>
            </div>
            <div className="border-border bg-card/80 rounded-lg border p-2.5">
              <div className="text-muted-foreground flex items-center justify-center gap-1 text-xs font-medium sm:text-sm">
                <Ship className="size-4 text-cyan-500" /> Hidro/Duto
              </div>
              <div className="text-foreground mt-1 font-mono text-lg font-bold sm:text-xl">
                {stage.logistics.waterwayShare}%
              </div>
            </div>
          </div>

          <p className="text-foreground/90 mt-2 text-sm leading-relaxed">
            {stage.logistics.dieselExposureDescription}
          </p>
        </div>

        {/* Detailed Analysis */}
        <div className="space-y-2">
          <h4 className="text-foreground flex items-center gap-1.5 text-base font-bold">
            <Info className="text-primary size-4" />
            Análise Crítica e Contexto Histórico
          </h4>
          <p className="border-border bg-muted/20 text-foreground/90 rounded-xl border p-4 text-base leading-relaxed">
            {stage.detailedAnalysis}
          </p>
        </div>

        {/* Bottlenecks and Recommendations */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="border-border bg-card rounded-xl border p-4">
            <h4 className="mb-2.5 flex items-center gap-1.5 text-base font-bold text-red-600 dark:text-red-400">
              <AlertOctagon className="size-4" />
              Gargalos Estruturais
            </h4>
            <ul className="text-foreground/90 space-y-2 text-sm">
              {stage.bottlenecks.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="font-bold text-red-500">•</span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-border bg-card rounded-xl border p-4">
            <h4 className="mb-2.5 flex items-center gap-1.5 text-base font-bold text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="size-4" />
              Recomendações para Soberania
            </h4>
            <ul className="text-foreground/90 space-y-2 text-sm">
              {stage.strategicRecommendations.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="font-bold text-emerald-500">•</span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sources Cited */}
        {stageSources.length > 0 && (
          <div className="border-border border-t pt-3">
            <h5 className="text-muted-foreground mb-2 flex items-center gap-1.5 text-xs font-semibold sm:text-sm">
              <Building2 className="size-3.5" />
              Fontes Primárias Oficiais Referenciadas:
            </h5>
            <div className="flex flex-wrap gap-2">
              {stageSources.map((src) => (
                <a
                  key={src.id}
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-border bg-muted text-muted-foreground hover:bg-accent hover:text-foreground inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium transition-colors sm:text-sm"
                  title={src.description}
                >
                  <span>
                    {src.organization} ({src.year})
                  </span>
                  <ExternalLink className="size-3.5" />
                </a>
              ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
