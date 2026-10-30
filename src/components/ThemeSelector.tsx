import { useEffect, useState } from 'react';
import { Palette, Check, Sun, Moon, Coffee } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@radix-ui/react-dropdown-menu';
import { Button } from '@/components/ui/button';

export type ThemeType =
  'light' | 'dark' | 'latte' | 'frappe' | 'macchiato' | 'mocha';

export const THEMES: {
  id: ThemeType;
  name: string;
  category: 'Standard' | 'Catppuccin';
  previewBg: string;
  previewBorder: string;
  isDark: boolean;
}[] = [
  {
    id: 'light',
    name: 'Claro (Alto Contraste)',
    category: 'Standard',
    previewBg: '#ffffff',
    previewBorder: '#cbd5e1',
    isDark: false,
  },
  {
    id: 'dark',
    name: 'Escuro (Profundo)',
    category: 'Standard',
    previewBg: '#090d16',
    previewBorder: '#334155',
    isDark: true,
  },
  {
    id: 'latte',
    name: 'Catppuccin Latte',
    category: 'Catppuccin',
    previewBg: '#eff1f5',
    previewBorder: '#ccd0da',
    isDark: false,
  },
  {
    id: 'frappe',
    name: 'Catppuccin Frappé',
    category: 'Catppuccin',
    previewBg: '#303446',
    previewBorder: '#51576d',
    isDark: true,
  },
  {
    id: 'macchiato',
    name: 'Catppuccin Macchiato',
    category: 'Catppuccin',
    previewBg: '#24273a',
    previewBorder: '#494d64',
    isDark: true,
  },
  {
    id: 'mocha',
    name: 'Catppuccin Mocha',
    category: 'Catppuccin',
    previewBg: '#1e1e2e',
    previewBorder: '#45475a',
    isDark: true,
  },
];

export function ThemeSelector() {
  const [currentTheme, setCurrentTheme] = useState<ThemeType>('mocha');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('theme') as ThemeType;
    if (saved && THEMES.some((t) => t.id === saved)) {
      setTheme(saved);
    } else {
      setTheme('mocha');
    }
  }, []);

  const setTheme = (theme: ThemeType) => {
    setCurrentTheme(theme);
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);

    const themeObj = THEMES.find((t) => t.id === theme);
    if (themeObj?.isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const activeThemeObj = THEMES.find((t) => t.id === currentTheme) || THEMES[5];

  if (!mounted) {
    return (
      <Button variant="outline" size="sm" className="gap-2 text-xs font-medium">
        <Palette className="size-4" />
        <span className="hidden sm:inline">Tema</span>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 border-border bg-card text-xs font-semibold transition-all hover:bg-accent"
          title="Alterar tema visual do Atlas"
        >
          <span
            className="shadow-xs size-3.5 rounded-full border"
            style={{
              backgroundColor: activeThemeObj.previewBg,
              borderColor: activeThemeObj.previewBorder,
            }}
          />
          <span className="hidden md:inline">
            {activeThemeObj.name.split(' ')[0]}
          </span>
          <Palette className="size-3.5 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="animate-in fade-in-80 zoom-in-95 z-50 min-w-[210px] rounded-xl border border-border bg-card p-1.5 text-card-foreground shadow-xl"
      >
        <DropdownMenuLabel className="px-2 py-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Temas Padrão
        </DropdownMenuLabel>
        {THEMES.filter((t) => t.category === 'Standard').map((theme) => (
          <DropdownMenuItem
            key={theme.id}
            onClick={() => setTheme(theme.id)}
            className="flex cursor-pointer items-center justify-between rounded-lg px-2.5 py-2 text-sm font-medium outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <div className="flex items-center gap-2.5">
              <span
                className="shadow-xs size-3.5 rounded-full border"
                style={{
                  backgroundColor: theme.previewBg,
                  borderColor: theme.previewBorder,
                }}
              />
              <span className="flex items-center gap-1.5">
                {theme.id === 'light' ? (
                  <Sun className="size-3.5 text-amber-500" />
                ) : (
                  <Moon className="size-3.5 text-blue-400" />
                )}
                {theme.name}
              </span>
            </div>
            {currentTheme === theme.id && (
              <Check className="size-4 text-primary" />
            )}
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator className="my-1.5 h-px bg-border" />

        <DropdownMenuLabel className="flex items-center gap-1.5 px-2 py-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
          <Coffee className="size-3 text-orange-400" />
          Variantes Catppuccin
        </DropdownMenuLabel>
        {THEMES.filter((t) => t.category === 'Catppuccin').map((theme) => (
          <DropdownMenuItem
            key={theme.id}
            onClick={() => setTheme(theme.id)}
            className="flex cursor-pointer items-center justify-between rounded-lg px-2.5 py-2 text-sm font-medium outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <div className="flex items-center gap-2.5">
              <span
                className="shadow-xs size-3.5 rounded-full border"
                style={{
                  backgroundColor: theme.previewBg,
                  borderColor: theme.previewBorder,
                }}
              />
              <span>{theme.name}</span>
            </div>
            {currentTheme === theme.id && (
              <Check className="size-4 text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
