import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

export function ModalSplitPieChart() {
  const data = [
    { name: 'Rodoviário (Caminhões)', value: 65.4, color: '#f59e0b' },
    { name: 'Ferroviário (Trens)', value: 18.2, color: '#3b82f6' },
    { name: 'Hidroviário & Cabotagem', value: 12.8, color: '#06b6d4' },
    { name: 'Dutoviário', value: 3.6, color: '#8b5cf6' },
  ];

  return (
    <div className="h-[280px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={95}
            paddingAngle={4}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              borderColor: 'hsl(var(--border))',
              borderRadius: '0.75rem',
              color: 'hsl(var(--card-foreground))',
              fontSize: '12px',
            }}
            formatter={(value: any) => [
              `${value}% da matriz de carga (TKU)`,
              'Participação',
            ]}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            formatter={(value) => (
              <span className="text-xs font-medium text-foreground">
                {value}
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export function DieselImportBalanceChart() {
  const data = [
    {
      category: 'Diesel S10',
      producaoNacional: 47.9,
      importacaoRefinada: 17.3,
    },
  ];

  return (
    <div className="h-[180px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="hsl(var(--border))"
            horizontal={false}
          />
          <XAxis
            type="number"
            unit=" bi L"
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
          />
          <YAxis type="category" dataKey="category" hide />
          <Tooltip
            cursor={{ fill: 'hsl(var(--muted)/0.3)' }}
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              borderColor: 'hsl(var(--border))',
              borderRadius: '0.75rem',
              color: 'hsl(var(--card-foreground))',
              fontSize: '12px',
            }}
          />
          <Bar
            dataKey="producaoNacional"
            name="Refino Nacional (Petrobras/Privadas)"
            stackId="a"
            fill="#10b981"
            radius={[6, 0, 0, 6]}
          />
          <Bar
            dataKey="importacaoRefinada"
            name="Déficit Importado (Rússia/EUA/Golfo)"
            stackId="a"
            fill="#ef4444"
            radius={[0, 6, 6, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function FreightEfficiencyComparisonChart() {
  const data = [
    { modal: 'Ferrovia (1.000 ton/km)', custoRelativo: 1.0, emissaoCO2: 1.0 },
    { modal: 'Hidrovia (1.000 ton/km)', custoRelativo: 0.6, emissaoCO2: 0.7 },
    { modal: 'Rodovia (1.000 ton/km)', custoRelativo: 3.4, emissaoCO2: 4.2 },
  ];

  return (
    <div className="h-[260px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="hsl(var(--border))"
            vertical={false}
          />
          <XAxis
            dataKey="modal"
            tick={{
              fill: 'hsl(var(--foreground))',
              fontSize: 11,
              fontWeight: 500,
            }}
          />
          <YAxis
            unit="x"
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              borderColor: 'hsl(var(--border))',
              borderRadius: '0.75rem',
              color: 'hsl(var(--card-foreground))',
              fontSize: '12px',
            }}
          />
          <Bar
            dataKey="custoRelativo"
            name="Multiplicador de Custo Financeiro"
            fill="#f59e0b"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="emissaoCO2"
            name="Emissão Comparativa de CO2"
            fill="#ef4444"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
