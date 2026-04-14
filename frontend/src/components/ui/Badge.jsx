import { cn } from '../../utils/cn'

const variants = {
  neutral: 'bg-surface text-text-secondary border-border/35',
  accent: 'bg-accent/15 text-accent border-accent/30',
  info: 'bg-sky/15 text-sky border-sky/30',
  success: 'bg-emerald-500/15 text-emerald-500 border-emerald-500/30',
  warning: 'bg-amber-500/15 text-amber-500 border-amber-500/30',
  danger: 'bg-red-500/15 text-red-500 border-red-500/30',
}

export default function Badge({ variant = 'neutral', className, children }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold tracking-wide',
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}
