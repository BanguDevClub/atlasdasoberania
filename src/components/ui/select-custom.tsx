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
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {icon && (
          <div className="pointer-events-none absolute left-3 flex items-center text-muted-foreground">
            {icon}
          </div>
        )}
        <select
          ref={ref}
          className={cn(
            'flex h-10 w-full cursor-pointer appearance-none rounded-md border border-input bg-background py-2 pr-8 text-sm font-medium text-foreground ring-offset-background transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50',
            icon ? 'pl-9' : 'pl-3',
            className
          )}
          {...props}
        >
          {children}
        </select>
        <div className="pointer-events-none absolute right-3 flex items-center text-muted-foreground">
          <ChevronDown className="size-4" />
        </div>
      </div>
    </div>
  );
});

SelectCustom.displayName = 'SelectCustom';
