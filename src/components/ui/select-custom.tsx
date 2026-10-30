import * as React from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

export interface SelectCustomProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  icon?: React.ReactNode;
}

export const SelectCustom = React.forwardRef<
  HTMLSelectElement,
  SelectCustomProps
>(({ className, children, label, icon, ...props }, ref) => {
  return (
    <div className="relative flex flex-col gap-1">
      {label && (
        <label className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {icon && (
          <div className="text-muted-foreground pointer-events-none absolute left-3 flex items-center">
            {icon}
          </div>
        )}
        <select
          ref={ref}
          className={cn(
            'border-input bg-background text-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full cursor-pointer appearance-none rounded-md border py-2 pr-8 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
            icon ? 'pl-9' : 'pl-3',
            className
          )}
          {...props}
        >
          {children}
        </select>
        <div className="text-muted-foreground pointer-events-none absolute right-3 flex items-center">
          <ChevronDown className="size-4" />
        </div>
      </div>
    </div>
  );
});

SelectCustom.displayName = 'SelectCustom';
