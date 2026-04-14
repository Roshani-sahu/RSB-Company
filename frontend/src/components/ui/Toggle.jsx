import { cn } from '../../utils/cn'
import Icon from './Icon'

export default function Toggle({ checked, onChange, label, className }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        'inline-flex items-center gap-2 rounded-xl border border-border/30 bg-surface/80 px-2 py-1.5 text-xs font-medium text-text-secondary transition-all duration-200 hover:bg-surface',
        className,
      )}
    >
      {label ? <span className="px-1">{label}</span> : null}
      <span
        className={cn(
          'relative h-6 w-11 rounded-full border transition-colors duration-200',
          checked ? 'border-accent/35 bg-accent/25' : 'border-border/40 bg-panel',
        )}
      >
        <span
          className={cn(
            'absolute top-1/2 h-[18px] w-[18px] -translate-y-1/2 rounded-full bg-white shadow transition-all duration-200',
            checked ? 'left-[22px] text-accent' : 'left-[3px] text-amber-500',
          )}
        >
          <span className="flex h-full w-full items-center justify-center">
            <Icon name={checked ? 'moon' : 'sun'} className="h-3 w-3" />
          </span>
        </span>
      </span>
    </button>
  )
}
