export interface CommercialPartner {
  country: string;
  flag: string;
  /** Participação no total importado/exportado da etapa (não no consumo nacional). */
  sharePercentage: number;
  description?: string;
  role: 'import' | 'export';
}

export interface MethodologyScores {
  extDependence: number; // D_ext: 0-100 (Dependência Externa / Coeficiente de Importação)
  geoConcentration: number; // C_geo: 0-100 (Concentração Geopolítica e Risco de Fornecedor)
  substitutabilityTime: number; // T_sub: 0-100 (Tempo / Dificuldade de Substituição Nacional)
  systemicImpact: number; // I_sis: 0-100 (Impacto Sistêmico / Efeito Cascata)
  logisticsVulnerability: number; // V_log: 0-100 (Vulnerabilidade Rodoviária e ao Diesel S10)
  finalScore: number; // ICVS: 0-100 (Índice Composto de Criticidade e Vulnerabilidade)
}

export interface LogisticsDiagnosis {
  roadShare: number; // % dependência de rodovias
  railShare: number; // % ferrovias
  waterwayShare: number; // % hidrovias/cabotagem/dutovias
  dieselExposureLevel: 'Crítica' | 'Alta' | 'Moderada' | 'Baixa';
  dieselExposureDescription: string;
}

export interface SourceReference {
  id: string;
  name: string;
  organization: string;
  year: number | string;
  url?: string;
  description: string;
}

export interface ChainStage {
  id: string;
  pillarId: string;
  chainId: string;
  name: string;
  stageOrder: number;
  category:
    | 'Insumos Primários'
    | 'Processamento Industrial'
    | 'Logística e Infraestrutura'
    | 'Distribuição e Mercado';
  summary: string;
  criticalityLevel: 'Crítica' | 'Alta' | 'Moderada' | 'Baixa';
  scores: MethodologyScores;
  importPartners: CommercialPartner[];
  exportPartners: CommercialPartner[];
  domesticProductionShare: number; // % atendido por produção nacional
  importShare: number; // % importado
  logistics: LogisticsDiagnosis;
  detailedAnalysis: string;
  bottlenecks: string[];
  strategicRecommendations: string[];
  sources: string[]; // IDs de referências bibliográficas
}

export interface ProductionChain {
  id: string;
  pillarId: string;
  name: string;
  description: string;
  stages: ChainStage[];
}

export interface Pillar {
  id: string;
  order: number;
  name: string;
  icon: string;
  color: string;
  tagline: string;
  description: string;
  chains: ProductionChain[];
  overallScore: number;
  highlights: string[];
  logisticsHighlight: string;
}

export interface MethodologyDimension {
  code: string;
  name: string;
  symbol: string;
  weight: number;
  description: string;
  guidelines: string;
}

export interface MethodologyTier {
  range: [number, number];
  name: string;
  badge: 'critical' | 'high' | 'moderate' | 'low';
  color: string;
  description: string;
  implication: string;
}

export interface AtlasDataset {
  version: string;
  lastUpdated: string;
  project: {
    name: string;
    description: string;
    repository: string;
    license: string;
  };
  methodology: {
    title: string;
    latexFormula: string;
    normalizedFormula: string;
    description: string;
    dimensions: MethodologyDimension[];
    tiers: MethodologyTier[];
  };
  logisticsProblemReport: {
    title: string;
    summary: string;
    stats: {
      roadShareTonKm: number;
      railShareTonKm: number;
      waterwayShareTonKm: number;
      pipelineShareTonKm: number;
      dieselS10ImportDependencePercent: number;
      annualDieselConsumptionBillionLiters: number;
      freightCostMultiplierRoadVsRail: number;
      co2MultiplierRoadVsRail: number;
    };
    diagnosticStages: string[];
    analysisPillarsImpact: {
      pillarId: string;
      pillarName: string;
      riskDiagnosis: string;
    }[];
  };
  pillars: Pillar[];
  sources: SourceReference[];
}
