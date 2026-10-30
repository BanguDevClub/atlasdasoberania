import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`;
}

export function formatScore(value: number): string {
  return value.toFixed(1);
}

export function getCriticalityBadge(score: number): {
  label: string;
  variant: 'critical' | 'high' | 'moderate' | 'low';
  bgClass: string;
  textClass: string;
  borderClass: string;
} {
  if (score >= 80) {
    return {
      label: 'Crítica / Extrema',
      variant: 'critical',
      bgClass: 'bg-red-500/15 text-red-700 dark:text-red-400 border-red-500/30',
      textClass: 'text-red-600 dark:text-red-400',
      borderClass: 'border-red-500',
    };
  }
  if (score >= 60) {
    return {
      label: 'Alta Criticidade',
      variant: 'high',
      bgClass:
        'bg-amber-500/15 text-amber-800 dark:text-amber-300 border-amber-500/30',
      textClass: 'text-amber-600 dark:text-amber-400',
      borderClass: 'border-amber-500',
    };
  }
  if (score >= 40) {
    return {
      label: 'Média / Moderada',
      variant: 'moderate',
      bgClass:
        'bg-yellow-500/15 text-yellow-800 dark:text-yellow-300 border-yellow-500/30',
      textClass: 'text-yellow-600 dark:text-yellow-400',
      borderClass: 'border-yellow-500',
    };
  }
  return {
    label: 'Baixa / Resiliente',
    variant: 'low',
    bgClass:
      'bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border-emerald-500/30',
    textClass: 'text-emerald-600 dark:text-emerald-400',
    borderClass: 'border-emerald-500',
  };
}
