import { useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getCriticalityBadge } from '@/lib/utils';
import { Calculator, RefreshCw } from 'lucide-react';

export function MethodologyCalculator() {
  const [extDependence, setExtDependence] = useState<number>(85);
  const [geoConcentration, setGeoConcentration] = useState<number>(80);
  const [substitutabilityTime, setSubstitutabilityTime] = useState<number>(75);
  const [systemicImpact, setSystemicImpact] = useState<number>(90);
  const [logisticsVulnerability, setLogisticsVulnerability] =
    useState<number>(85);

  const [w1, setW1] = useState<number>(0.25);
  const [w2, setW2] = useState<number>(0.2);
  const [w3, setW3] = useState<number>(0.2);
  const [w4, setW4] = useState<number>(0.2);
  const [w5, setW5] = useState<number>(0.15);

  const calculatedScore =
    w1 * extDependence +
    w2 * geoConcentration +
    w3 * substitutabilityTime +
    w4 * systemicImpact +
    w5 * logisticsVulnerability;

  const badgeInfo = getCriticalityBadge(calculatedScore);

  const resetDefaults = () => {
    setExtDependence(85);
    setGeoConcentration(80);
    setSubstitutabilityTime(75);
    setSystemicImpact(90);
    setLogisticsVulnerability(85);
    setW1(0.25);
    setW2(0.2);
    setW3(0.2);
    setW4(0.2);
    setW5(0.15);
  };

  return (
    <Card className="border-border shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calculator className="size-5 text-primary" />
            <CardTitle>Simulador Interativo do ICVS</CardTitle>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={resetDefaults}
            className="gap-1.5 text-xs"
          >
            <RefreshCw className="size-3.5" />
            Redefinir Padrões
          </Button>
        </div>
        <CardDescription>
          Ajuste as 5 dimensões e pondere os coeficientes para avaliar a
          criticidade de qualquer cadeia industrial ou insumo
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Result banner */}
        <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-border bg-muted/40 p-6 sm:flex-row">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Índice de Criticidade e Vulnerabilidade da Soberania (ICVS)
            </span>
            <div className="mt-1 flex items-baseline gap-3">
              <span className="font-mono text-4xl font-black tracking-tight text-foreground sm:text-5xl">
                {calculatedScore.toFixed(1)}
              </span>
              <span className="text-sm font-semibold text-muted-foreground">
                / 100
              </span>
              <Badge variant={badgeInfo.variant} className="px-3 py-1 text-sm">
                {badgeInfo.label}
              </Badge>
            </div>
          </div>
          <div className="max-w-xs text-right text-xs text-muted-foreground">
            Fórmula: ICVS = {w1}·D + {w2}·C + {w3}·T + {w4}·I + {w5}·V
          </div>
        </div>

        {/* Dimension sliders */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-foreground">
            1. Pontuação das Dimensões (0 a 100)
          </h4>

          {/* D_ext */}
          <div className="space-y-1.5 rounded-xl border border-border bg-card p-3">
            <div className="flex items-center justify-between text-xs">
              <label className="font-semibold text-foreground">
                D_ext: Dependência Externa e Coeficiente de Importação (Peso{' '}
                {w1 * 100}%)
              </label>
              <span className="font-mono font-bold text-primary">
                {extDependence}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={extDependence}
              onChange={(e) => setExtDependence(Number(e.target.value))}
              className="w-full cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-[10px] text-muted-foreground">
              <span>0 (Autossuficiência soberana)</span>
              <span>100 (100% importado sem produção local)</span>
            </div>
          </div>

          {/* C_geo */}
          <div className="space-y-1.5 rounded-xl border border-border bg-card p-3">
            <div className="flex items-center justify-between text-xs">
              <label className="font-semibold text-foreground">
                C_geo: Concentração Geopolítica e Risco de Fornecedor (Peso{' '}
                {w2 * 100}%)
              </label>
              <span className="font-mono font-bold text-amber-500">
                {geoConcentration}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={geoConcentration}
              onChange={(e) => setGeoConcentration(Number(e.target.value))}
              className="w-full cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between text-[10px] text-muted-foreground">
              <span>0 (Mercado global pulverizado)</span>
              <span>100 (Monopólio/Oligopólio em zona de guerra)</span>
            </div>
          </div>

          {/* T_sub */}
          <div className="space-y-1.5 rounded-xl border border-border bg-card p-3">
            <div className="flex items-center justify-between text-xs">
              <label className="font-semibold text-foreground">
                T_sub: Barreira Tecnológica e Tempo de Substituição (Peso{' '}
                {w3 * 100}%)
              </label>
              <span className="font-mono font-bold text-orange-500">
                {substitutabilityTime}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={substitutabilityTime}
              onChange={(e) => setSubstitutabilityTime(Number(e.target.value))}
              className="w-full cursor-pointer accent-orange-500"
            />
            <div className="flex justify-between text-[10px] text-muted-foreground">
              <span>0 (Substituível em menos de 6 meses)</span>
              <span>100 (&gt; 10 anos e bilhões de dólares)</span>
            </div>
          </div>

          {/* I_sis */}
          <div className="space-y-1.5 rounded-xl border border-border bg-card p-3">
            <div className="flex items-center justify-between text-xs">
              <label className="font-semibold text-foreground">
                I_sis: Impacto Sistêmico e Efeito Cascata (Peso {w4 * 100}%)
              </label>
              <span className="font-mono font-bold text-rose-500">
                {systemicImpact}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={systemicImpact}
              onChange={(e) => setSystemicImpact(Number(e.target.value))}
              className="w-full cursor-pointer accent-rose-500"
            />
            <div className="flex justify-between text-[10px] text-muted-foreground">
              <span>0 (Impacto isolado e secundário)</span>
              <span>100 (Paralisia imediata de água, alimentos ou defesa)</span>
            </div>
          </div>

          {/* V_log */}
          <div className="space-y-1.5 rounded-xl border border-border bg-card p-3">
            <div className="flex items-center justify-between text-xs">
              <label className="font-semibold text-foreground">
                V_log: Vulnerabilidade Logística e ao Diesel S10 (Peso{' '}
                {w5 * 100}%)
              </label>
              <span className="font-mono font-bold text-red-500">
                {logisticsVulnerability}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={logisticsVulnerability}
              onChange={(e) =>
                setLogisticsVulnerability(Number(e.target.value))
              }
              className="w-full cursor-pointer accent-red-500"
            />
            <div className="flex justify-between text-[10px] text-muted-foreground">
              <span>0 (Dutos e ferrovias eletrificadas)</span>
              <span>100 (100% carretas rodoviárias a diesel importado)</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
