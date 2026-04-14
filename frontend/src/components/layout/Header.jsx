import { useTheme } from '../../context/ThemeContext.jsx'
import Button from '../ui/Button'
import Icon from '../ui/Icon'
import Input from '../ui/Input'
import Toggle from '../ui/Toggle'

export default function Header({ onMenuClick }) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <header className="sticky top-0 z-30 border-b border-border/15 bg-panel/85 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={onMenuClick}
            className="rounded-lg p-2 text-text-muted transition-colors hover:bg-surface hover:text-text-primary lg:hidden"
            aria-label="Open menu"
          >
            <Icon name="menu" className="h-5 w-5" />
          </button>

          <Input
            iconName="search"
            placeholder="Search products, orders, SKUs..."
            containerClassName="hidden w-full max-w-md md:block"
            suffix={
              <kbd className="rounded border border-border/30 px-1.5 py-0.5 text-[10px] font-semibold text-text-muted">
                C-K
              </kbd>
            }
          />
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            variant="primary"
            size="md"
            className="hidden sm:inline-flex"
            leftIcon={<Icon name="plus" className="h-4 w-4" />}
          >
            Create
          </Button>

          <button
            type="button"
            className="relative rounded-xl border border-border/25 bg-surface/80 p-2.5 text-text-secondary transition-colors hover:text-text-primary"
            aria-label="Notifications"
          >
            <Icon name="bell" className="h-[18px] w-[18px]" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
          </button>

          <Toggle checked={isDark} onChange={toggleTheme} label={isDark ? 'Dark' : 'Light'} className="hidden sm:inline-flex" />

          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-xl border border-border/25 bg-surface/80 p-2.5 text-text-secondary transition-colors hover:text-text-primary sm:hidden"
            aria-label="Toggle theme"
          >
            <Icon name={isDark ? 'moon' : 'sun'} className="h-[18px] w-[18px]" />
          </button>

          <div className="hidden items-center gap-3 border-l border-border/20 pl-3 sm:flex">
            <div className="text-right">
              <p className="text-sm font-semibold text-text-primary">Alex Morgan</p>
              <p className="text-xs text-text-muted">Admin</p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-border/30 bg-accent/15 text-xs font-semibold text-accent">
              AM
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
