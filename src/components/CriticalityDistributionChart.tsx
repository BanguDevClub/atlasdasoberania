import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { getAllStages } from '@/lib/data';

export function CriticalityDistributionChart() {
  const allStages = getAllStages();

  const countCritical = allStages.filter(
    (s) => s.scores.finalScore >= 80
  ).length;
  const countHigh = allStages.filter(
    (s) => s.scores.finalScore >= 60 && s.scores.finalScore < 80
  ).length;
  const countModerate = allStages.filter(
    (s) => s.scores.finalScore >= 40 && s.scores.finalScore < 60
  ).length;
  const countLow = allStages.filter((s) => s.scores.finalScore < 40).length;

  const data = [
    {
      name: 'Crítica / Extrema (80-100)',
      count: countCritical,
      color: '#ef4444',
      description: 'Vulnerabilidade existencial imediata',
    },
    {
      name: 'Alta Criticidade (60-79)',
      count: countHigh,
      color: '#f59e0b',
      description: 'Alto risco estratégico',
    },
    {
      name: 'Média / Moderada (40-59)',
      count: countModerate,
      color: '#eab308',
      description: 'Gargalos administráveis',
    },
    {
      name: 'Baixa / Resiliente (0-39)',
      count: countLow,
      color: '#10b981',
      description: 'Autonomia ou risco mitigado',
    },
  ];

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 10, right: 30, left: 40, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="hsl(var(--border))"
            horizontal={false}
          />
          <XAxis
            type="number"
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            domain={[0, 'dataMax + 2']}
          />
          <YAxis
            type="category"
            dataKey="name"
            tick={{
              fill: 'hsl(var(--foreground))',
              fontSize: 11,
              fontWeight: 500,
            }}
            width={160}
          />
          <Tooltip
            cursor={{ fill: 'hsl(var(--muted)/0.3)' }}
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              borderColor: 'hsl(var(--border))',
              borderRadius: '0.75rem',
              color: 'hsl(var(--card-foreground))',
              fontSize: '12px',
            }}
            formatter={(value: any) => [`${value} etapas avaliadas`, 'Total']}
          />
          <Bar dataKey="count" radius={[0, 6, 6, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
