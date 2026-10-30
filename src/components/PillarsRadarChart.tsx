import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { atlasData } from '@/lib/data';

export function PillarsRadarChart() {
  const chartData = atlasData.pillars.map((pillar) => {
    // calculate average dimension scores across stages in this pillar
    const stages = pillar.chains.flatMap((c) => c.stages);
    const avgScore =
      stages.reduce((acc, s) => acc + s.scores.finalScore, 0) /
      (stages.length || 1);
    const avgExtDep =
      stages.reduce((acc, s) => acc + s.scores.extDependence, 0) /
      (stages.length || 1);
    const avgImpact =
      stages.reduce((acc, s) => acc + s.scores.systemicImpact, 0) /
      (stages.length || 1);
    const avgLogistics =
      stages.reduce((acc, s) => acc + s.scores.logisticsVulnerability, 0) /
      (stages.length || 1);

    return {
      pillar: pillar.name.split(' ')[0],
      fullName: pillar.name,
      icvs: Math.round(avgScore),
      extDep: Math.round(avgExtDep),
      impact: Math.round(avgImpact),
      logistics: Math.round(avgLogistics),
    };
  });

  return (
    <div className="flex h-[340px] w-full items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={chartData}>
          <PolarGrid stroke="hsl(var(--border))" strokeDasharray="3 3" />
          <PolarAngleAxis
            dataKey="pillar"
            tick={{
              fill: 'hsl(var(--foreground))',
              fontSize: 13,
              fontWeight: 600,
            }}
          />
          <PolarRadiusAxis
            angle={30}
            domain={[0, 100]}
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
          />
          <Radar
            name="ICVS Médio (0-100)"
            dataKey="icvs"
            stroke="#ef4444"
            fill="#ef4444"
            fillOpacity={0.4}
          />
          <Radar
            name="Vulnerabilidade Logística"
            dataKey="logistics"
            stroke="#f59e0b"
            fill="#f59e0b"
            fillOpacity={0.2}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              borderColor: 'hsl(var(--border))',
              borderRadius: '0.75rem',
              color: 'hsl(var(--card-foreground))',
              fontSize: '13px',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.2)',
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
