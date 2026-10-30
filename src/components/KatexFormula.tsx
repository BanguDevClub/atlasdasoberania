import { useMemo } from 'react';
import katex from 'katex';

interface KatexFormulaProps {
  formula: string;
  displayMode?: boolean;
  className?: string;
}

export function KatexFormula({
  formula,
  displayMode = true,
  className = '',
}: KatexFormulaProps) {
  const html = useMemo(() => {
    try {
      return katex.renderToString(formula, {
        displayMode,
        throwOnError: false,
      });
    } catch (e) {
      console.error('KaTeX rendering error:', e);
      return formula;
    }
  }, [formula, displayMode]);

  return (
    <div
      className={`katex-wrapper overflow-x-auto ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
