import {
  Wheat,
  Beef,
  Zap,
  Droplets,
  Flame,
  Factory,
  ShieldAlert,
  Cpu,
  Layers,
  HelpCircle,
  Truck,
  Train,
  Ship,
  AlertTriangle,
  CheckCircle,
  Globe,
  TrendingUp,
  Scale,
  type LucideIcon,
} from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
  Wheat,
  Beef,
  Zap,
  Droplets,
  Flame,
  Factory,
  ShieldAlert,
  Cpu,
  Layers,
  Truck,
  Train,
  Ship,
  AlertTriangle,
  CheckCircle,
  Globe,
  TrendingUp,
  Scale,
};

interface DynamicIconProps {
  name: string;
  className?: string;
}

export function DynamicIcon({ name, className = 'size-5' }: DynamicIconProps) {
  const IconComponent = ICON_MAP[name] || HelpCircle;
  return <IconComponent className={className} />;
}
