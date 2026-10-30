# 🛡️ Atlas da Soberania Industrial Brasileira

> **Painel analítico e didático sobre a criticidade, vulnerabilidade externa e nós logísticos das cadeias produtivas essenciais do Brasil.**

[![Licença MIT](https://img.shields.io/badge/licen%C3%A7a-MIT-blue.svg)](LICENSE)
[![Astro](https://img.shields.io/badge/Astro-7.x-orange.svg)](https://astro.build)
[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4.x-38bdf8.svg)](https://tailwindcss.com)
[![Vite](https://img.shields.io/badge/Vite-8.x-646cff.svg)](https://vite.dev)
[![Recharts](https://img.shields.io/badge/Recharts-3.x-22c55e.svg)](https://recharts.org)
[![ESLint](https://img.shields.io/badge/ESLint-10.x-4b32c3.svg)](https://eslint.org)
[![Repositório](https://img.shields.io/badge/GitHub-BanguDevClub%2Fatlasdasoberania-181717.svg?logo=github)](https://github.com/BanguDevClub/atlasdasoberania)

---

## 📌 Sumário Executivo

O **Atlas da Soberania** expõe um paradoxo central do desenvolvimento nacional: o Brasil é uma das maiores potências agroalimentares e minerais do planeta e ostenta matriz elétrica majoritariamente limpa, mas possui **vulnerabilidades estruturais críticas** em insumos básicos, refino de combustíveis nobres e bens de alta tecnologia.

O projeto diagnostica os **8 pilares vitais** da economia e da segurança nacional:

1. **🌾 Agricultura:** Nutrição vegetal (NPK com 95% de importação de Potássio e 85% de Nitrogenados), defensivos agrícolas (IFAs importados da China/Índia), déficit crônico de silos e escoamento rodoviário.
2. **🥩 Pecuária:** Dependência de aminoácidos sintéticos industriais (lisina, metionina da China e Europa), insumos farmacêuticos veterinários (IFAs) e cadeia de frio 100% sobre carretas a diesel.
3. **⚡ Energia:** Inversores solares (99% China) e células fotovoltaicas, automação SCADA e linhas de transmissão UHVDC 800kV operadas por tecnologia estrangeira (State Grid).
4. **💧 Água e Saneamento:** Produtos químicos essenciais para ETAs (cloro gasoso, hipoclorito e coagulantes PAC) com estoques médios para apenas 3 a 7 dias, além de membranas de filtração importadas e perdas de ~40% na rede física.
5. **🔥 Combustível e Petróleo:** O paradoxo do Pré-sal — autossuficiência volumétrica em óleo cru aliada a um déficit crônico no refino de **Diesel S10** (20% a 30% importado de Rússia e EUA) e GLP.
6. **🏭 Indústria Civil & Bens de Capital:** Encolhimento fabril com importação massiva de centros de usinagem CNC de múltiplos eixos, robôs industriais de 6 eixos (zero fabricantes locais), CLPs e ferramentas de corte.
7. **🎖️ Indústria Militar & Defesa:** Domínio de armas leves (Taurus/CBC) e montagem de caças Gripen F-39 e cargueiros KC-390, porém com motores/turbinas (GE/Pratt & Whitney) e aviônica sob veto externo (ITAR), além de grave lacuna em mísseis antiaéreos de média/grande altitude.
8. **💻 Tecnologia & Semicondutores:** Ausência de fundições comerciais de silício sub-micron (dependência de Taiwan/TSMC), processadores x86/ARM e memórias 100% importados, além de mais de 92% dos dados públicos hospedados em hiperscalers norte-americanos (AWS, Azure, GCP).

---

## 🚨 O Nó do Diesel e o Círculo Vicioso do Rodoviarismo

Um dos pontos mais críticos evidenciados pelo Atlas é o **efeito cascata do frete rodoviário**:

- **65,4%** das cargas nacionais trafegam em rodovias (contra 18,2% em ferrovias e 12,8% em hidrovias/cabotagem).
- Para manter a frota rodoviária circulando, o país consome cerca de **65 bilhões de litros de Diesel por ano**, dos quais até **17 bilhões de litros** precisam ser importados refinados.
- Um choque externo ou embargo no fornecimento marítimo de diesel paralisa, em questão de 72 horas, o envio de fertilizantes às lavouras, a circulação de carretas frigoríficas de carnes, o abastecimento de cloro nas estações de tratamento de água e a alimentação de usinas termelétricas.

---

## 📐 Metodologia do ICVS (0 a 100)

O **Índice Composto de Criticidade e Vulnerabilidade da Soberania (ICVS)** é calculado para cada etapa através de uma média ponderada linear de 5 dimensões normalizadas:

$$\mathrm{ICVS} = \sum_{i=1}^5 w_i \cdot D_i = 0.25 \cdot D_{ext} + 0.20 \cdot C_{geo} + 0.20 \cdot T_{sub} + 0.20 \cdot I_{sis} + 0.15 \cdot V_{log}$$

### Dimensões Avaliadas:

- **$D\_{ext}$ (25%) - Dependência Externa e Coeficiente de Importação:** Percentual do consumo abastecido pelo exterior e inexistência de síntese fabril nacional.
- **$C\_{geo}$ (20%) - Concentração Geopolítica e Risco de Embargo:** Índice HHI de concentração de países fornecedores e exposição a guerras ou sanções.
- **$T\_{sub}$ (20%) - Barreira Tecnológica e Tempo de Substituição:** Complexidade de capital e anos necessários para desenvolvimento local.
- **$I\_{sis}$ (20%) - Impacto Sistêmico e Efeito Cascata:** Efeito dominó sobre outros pilares (água, comida, defesa, energia).
- **$V\_{log}$ (15%) - Vulnerabilidade Logística e ao Diesel S10:** Dependência da malha rodoviária e de diesel refinado importado.

### Faixas de Criticidade:

- 🔴 **80.0 a 100.0 — Criticidade Extrema (Alerta Vermelho):** Vulnerabilidade existencial com risco de paralisia em semanas.
- 🟠 **60.0 a 79.9 — Alta Criticidade (Alerta Laranja):** Alto risco estratégico com produção incipiente.
- 🟡 **40.0 a 59.9 — Média / Moderada (Alerta Amarelo):** Gargalo setorial gerenciável.
- 🟢 **0.0 a 39.9 — Baixa / Resiliente (Alerta Verde):** Autonomia consolidada ou risco devidamente mitigado.

---

## 🎨 6 Temas Visuais Integrados & Tipografia Aprimorada

O design system do Atlas foi concebido com foco absoluto em **alto contraste, acessibilidade e legibilidade**:

1. **☀️ Claro (Alto Contraste):** Fundo branco puro com textos nítidos e contrastantes.
2. **🌙 Escuro (Profundo):** Tons profundos de carbono para sessões noturnas.
3. **☕ Catppuccin Latte:** Variante suave e equilibrada em tons claros.
4. **🌿 Catppuccin Frappé:** Paleta noturna com baixa fadiga visual.
5. **🌺 Catppuccin Macchiato:** Contraste médio e vibrante.
6. **🌌 Catppuccin Mocha:** O padrão dark da família Catppuccin.

A hierarquia tipográfica foi elevada globalmente (escala base `17px`, títulos destacados em `font-black`, labels de métricas e tabelas com tipografia ampliada), com suporte nativo do Tailwind v4 via `@custom-variant dark`.

---

## 🛠️ Stack Tecnológica de Alta Performance

- **Framework Web:** [Astro 7](https://astro.build) (Static Site Generation de altíssima performance, com compressão HTML e prefetch adaptativo no hover)
- **Motor de Build:** [Vite 8](https://vite.dev) com bundler de última geração
- **Estilização & Engine:** [Tailwind CSS 4](https://tailwindcss.com) com motor nativo **Oxide** (Rust/WASM) integrado via `@tailwindcss/vite`
- **Minificação de CSS:** [LightningCSS](https://lightningcss.dev) (transformação e minificação ultrarrápida em Rust)
- **Componentes Interativos:** [React 19](https://react.dev)
- **Primitivas UI & Design System:** [shadcn/ui](https://ui.shadcn.com) + [Radix UI](https://www.radix-ui.com)
- **Gráficos Interativos:** [Recharts 3](https://recharts.org)
- **Equações e Fórmulas:** [KaTeX 0.19+](https://katex.org)
- **Ícones Vetoriais:** [Lucide React 1.65+](https://lucide.dev)
- **Linter & Padronização:** [ESLint 10](https://eslint.org) (Flat Config) + [Prettier 3](https://prettier.io)
- **Gerenciador de Pacotes:** `npm` (compatível com npm 12 via `.npmrc` nativo)

---

## ⚡ Benchmarks de Performance

- **Tempo de Build Estático Completo:** **~1.02 segundos** para gerar todas as 12 rotas estáticas (redução de ~74% no tempo de compilação em relação às versões anteriores).
- **Minificação e Otimização:** CSS compilado e minificado diretamente via LightningCSS.
- **Navegação Instantânea:** Prefetch automático de páginas nos estados de hover/foco.

---

## 🚀 Comandos de Qualidade de Vida (QoL)

O projeto inclui um conjunto completo de scripts padronizados no `package.json`:

```bash
# Iniciar servidor de desenvolvimento local
npm run dev

# Compilar para produção estática (output: dist/)
npm run build

# Pré-visualizar a build de produção localmente
npm run preview

# Checagem estrita de tipagem TypeScript e Astro
npm run typecheck

# Verificar linting do código (ESLint 10)
npm run lint

# Corrigir automaticamente problemas de linting
npm run lint:fix

# Verificar formatação com Prettier
npm run format

# Corrigir formatação de todos os arquivos
npm run format:fix

# Pipeline de validação completo (lint + typecheck + format)
npm run validate

# Limpar artefatos de build e cache
npm run clean

# Reinstalação limpa das dependências
npm run reinstall
```

---

## 📊 Estrutura de Dados Única

Todos os dados e parâmetros do Atlas estão centralizados no arquivo:

```
src/data/soberania-data.json
```

Com tipagens TypeScript estritas em:

```
src/types/soberania.ts
```

### Principais Fontes Oficiais Citadas:

- **MDIC / ComexStat:** Estatísticas de comércio exterior e balança comercial.
- **ANP:** Anuário Estatístico do Petróleo, Gás Natural e Biocombustíveis.
- **EPE / BEN:** Balanço Energético Nacional.
- **Conab:** Levantamentos da safra de grãos e balanço de fertilizantes.
- **Abiquim:** Anuário da indústria química e balança comercial de químicos.
- **ABIMAQ:** Balanço do setor de máquinas, equipamentos e bens de capital.
- **CNT:** Pesquisas de rodovias e matriz modal de transportes.
- **SIPRI:** Banco de dados de transferências militares e orçamentos de defesa.
- **SNIS:** Sistema Nacional de Informações sobre Saneamento.
- **MCTI:** Painel de semicondutores e tecnologias estratégicas.

---

## 🌐 Configuração de Implantação

- **Repositório Oficial:** [https://github.com/BanguDevClub/atlasdasoberania](https://github.com/BanguDevClub/atlasdasoberania)
- **URL Base:** `/atlasdasoberania` (configurada via `astro.config.mjs`)

---

## 📄 Licença

Distribuído sob a licença **MIT**. Consulte `LICENSE` para obter mais informações.

Desenvolvido pelo **[BanguDevClub](https://github.com/BanguDevClub)**.
