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
        <DialogHeader className="border-b border-border pb-4">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            {stage.pillarIcon && (
              <span className="flex items-center gap-1.5 rounded-md bg-primary/10 px-2.5 py-1 text-sm font-semibold text-primary">
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
          <DialogDescription className="mt-1 text-base text-muted-foreground sm:text-lg">
            {stage.summary}
          </DialogDescription>
        </DialogHeader>

        {/* Scores & Dimensions Grid */}
        <div className="grid grid-cols-1 gap-3 py-2 md:grid-cols-5">
          <div className="flex flex-col justify-between rounded-xl border border-border bg-card/60 p-3.5">
            <span className="flex items-center justify-between text-xs font-semibold text-muted-foreground sm:text-sm">
              D. Externa (D_ext)
              <span className="font-mono text-base font-bold text-foreground">
                {stage.scores.extDependence.toFixed(0)}
              </span>
            </span>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-2 rounded-full bg-red-500"
                style={{ width: `${stage.scores.extDependence}%` }}
              />
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-xl border border-border bg-card/60 p-3.5">
            <span className="flex items-center justify-between text-xs font-semibold text-muted-foreground sm:text-sm">
              C. Geopolítica (C_geo)
              <span className="font-mono text-base font-bold text-foreground">
                {stage.scores.geoConcentration.toFixed(0)}
              </span>
            </span>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-2 rounded-full bg-amber-500"
                style={{ width: `${stage.scores.geoConcentration}%` }}
              />
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-xl border border-border bg-card/60 p-3.5">
            <span className="flex items-center justify-between text-xs font-semibold text-muted-foreground sm:text-sm">
              T. Substituição (T_sub)
              <span className="font-mono text-base font-bold text-foreground">
                {stage.scores.substitutabilityTime.toFixed(0)}
              </span>
            </span>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-2 rounded-full bg-orange-500"
                style={{ width: `${stage.scores.substitutabilityTime}%` }}
              />
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-xl border border-border bg-card/60 p-3.5">
            <span className="flex items-center justify-between text-xs font-semibold text-muted-foreground sm:text-sm">
              Imp. Sistêmico (I_sis)
              <span className="font-mono text-base font-bold text-foreground">
                {stage.scores.systemicImpact.toFixed(0)}
              </span>
            </span>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-2 rounded-full bg-rose-500"
                style={{ width: `${stage.scores.systemicImpact}%` }}
              />
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-xl border border-border bg-card/60 p-3.5">
            <span className="flex items-center justify-between text-xs font-semibold text-muted-foreground sm:text-sm">
              Vulg. Logística (V_log)
              <span className="font-mono text-base font-bold text-foreground">
                {stage.scores.logisticsVulnerability.toFixed(0)}
              </span>
            </span>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-2 rounded-full bg-amber-600"
                style={{ width: `${stage.scores.logisticsVulnerability}%` }}
              />
            </div>
          </div>
        </div>

        {/* Domestic vs Imported Balance Bar */}
        <div className="rounded-xl border border-border bg-muted/40 p-4">
          <div className="mb-2 flex items-center justify-between text-sm font-semibold">
            <span className="text-emerald-600 dark:text-emerald-400">
              Produção Nacional: {stage.domesticProductionShare.toFixed(1)}%
            </span>
            <span className="text-red-600 dark:text-red-400">
              Importação Direta: {stage.importShare.toFixed(1)}%
            </span>
          </div>
          <div className="flex h-3.5 w-full overflow-hidden rounded-full border border-border/50 bg-muted">
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
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="mb-3 flex items-center gap-2">
              <ArrowDownLeft className="size-4 text-red-500" />
              <h4 className="text-base font-bold text-foreground">
                Maiores Parceiros de Importação
              </h4>
            </div>
            {stage.importPartners.length > 0 ? (
              <div className="space-y-2.5">
                {stage.importPartners.map((partner, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between rounded-lg border border-border/50 bg-muted/40 p-2.5 text-sm"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl">{partner.flag}</span>
                      <div>
                        <span className="text-sm font-semibold text-foreground sm:text-base">
                          {partner.country}
                        </span>
                        {partner.description && (
                          <p className="text-xs leading-snug text-muted-foreground sm:text-sm">
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
              <p className="text-sm italic text-muted-foreground">
                Sem importações primárias relevantes registradas nesta etapa.
              </p>
            )}
          </div>

          {/* Export Partners */}
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="mb-3 flex items-center gap-2">
              <ArrowUpRight className="size-4 text-emerald-500" />
              <h4 className="text-base font-bold text-foreground">
                Destinos Estratégicos de Exportação
              </h4>
            </div>
            {stage.exportPartners.length > 0 ? (
              <div className="space-y-2.5">
                {stage.exportPartners.map((partner, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between rounded-lg border border-border/50 bg-muted/40 p-2.5 text-sm"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl">{partner.flag}</span>
                      <div>
                        <span className="text-sm font-semibold text-foreground sm:text-base">
                          {partner.country}
                        </span>
                        {partner.description && (
                          <p className="text-xs leading-snug text-muted-foreground sm:text-sm">
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
              <p className="text-sm italic text-muted-foreground">
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
            <h4 className="text-base font-bold text-foreground">
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
            <div className="rounded-lg border border-border bg-card/80 p-2.5">
              <div className="flex items-center justify-center gap-1 text-xs font-medium text-muted-foreground sm:text-sm">
                <Truck className="size-4 text-amber-500" /> Rodoviário
              </div>
              <div className="mt-1 font-mono text-lg font-bold text-foreground sm:text-xl">
                {stage.logistics.roadShare}%
              </div>
            </div>
            <div className="rounded-lg border border-border bg-card/80 p-2.5">
              <div className="flex items-center justify-center gap-1 text-xs font-medium text-muted-foreground sm:text-sm">
                <Train className="size-4 text-blue-500" /> Ferroviário
              </div>
              <div className="mt-1 font-mono text-lg font-bold text-foreground sm:text-xl">
                {stage.logistics.railShare}%
              </div>
            </div>
            <div className="rounded-lg border border-border bg-card/80 p-2.5">
              <div className="flex items-center justify-center gap-1 text-xs font-medium text-muted-foreground sm:text-sm">
                <Ship className="size-4 text-cyan-500" /> Hidro/Duto
              </div>
              <div className="mt-1 font-mono text-lg font-bold text-foreground sm:text-xl">
                {stage.logistics.waterwayShare}%
              </div>
            </div>
          </div>

          <p className="mt-2 text-sm leading-relaxed text-foreground/90">
            {stage.logistics.dieselExposureDescription}
          </p>
        </div>

        {/* Detailed Analysis */}
        <div className="space-y-2">
          <h4 className="flex items-center gap-1.5 text-base font-bold text-foreground">
            <Info className="size-4 text-primary" />
            Análise Crítica e Contexto Histórico
          </h4>
          <p className="rounded-xl border border-border bg-muted/20 p-4 text-base leading-relaxed text-foreground/90">
            {stage.detailedAnalysis}
          </p>
        </div>

        {/* Bottlenecks and Recommendations */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-4">
            <h4 className="mb-2.5 flex items-center gap-1.5 text-base font-bold text-red-600 dark:text-red-400">
              <AlertOctagon className="size-4" />
              Gargalos Estruturais
            </h4>
            <ul className="space-y-2 text-sm text-foreground/90">
              {stage.bottlenecks.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="font-bold text-red-500">•</span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-border bg-card p-4">
            <h4 className="mb-2.5 flex items-center gap-1.5 text-base font-bold text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="size-4" />
              Recomendações para Soberania
            </h4>
            <ul className="space-y-2 text-sm text-foreground/90">
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
          <div className="border-t border-border pt-3">
            <h5 className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-muted-foreground sm:text-sm">
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
                  className="inline-flex items-center gap-1.5 rounded-md border border-border bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground sm:text-sm"
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
