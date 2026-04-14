import { cn } from '../../utils/cn'
import Icon from '../ui/Icon'

const toneStyles = {
  accent: 'bg-accent/15 text-accent border-accent/30',
  success: 'bg-emerald-500/15 text-emerald-500 border-emerald-500/30',
  warning: 'bg-amber-500/15 text-amber-500 border-amber-500/30',
}

export default function ActivityTimeline({ items = [] }) {
  return (
    <div className="relative space-y-4 pl-1 before:absolute before:left-5 before:top-2 before:h-[calc(100%-0.5rem)] before:w-px before:bg-border/30">
      {items.map((item) => (
        <div key={item.id} className="relative flex gap-3">
          <span
            className={cn(
              'relative z-10 mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border bg-panel',
              toneStyles[item.tone] ?? toneStyles.accent,
            )}
          >
            <Icon name={item.icon} className="h-4 w-4" />
          </span>
          <div className="min-w-0 flex-1 rounded-xl border border-border/20 bg-surface/55 p-3 transition-colors duration-200 hover:bg-surface/70">
            <div className="mb-1 flex items-start justify-between gap-2">
              <h4 className="text-sm font-semibold text-text-primary">{item.title}</h4>
              <span className="text-[10px] font-medium uppercase tracking-wide text-text-muted">{item.time}</span>
            </div>
            <p className="text-xs leading-relaxed text-text-secondary">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
