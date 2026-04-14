import { cn } from '../../utils/cn'
import Badge from '../ui/Badge'
import Icon from '../ui/Icon'

const priorityVariant = {
  Critical: { badge: 'danger', border: 'border-red-500/40', icon: 'text-red-500' },
  High: { badge: 'warning', border: 'border-amber-500/40', icon: 'text-amber-500' },
  Medium: { badge: 'info', border: 'border-sky/40', icon: 'text-sky' },
  Low: { badge: 'neutral', border: 'border-border/35', icon: 'text-text-muted' },
}

const statusVariant = {
  Open: 'danger',
  'In Review': 'warning',
  Resolved: 'success',
}

export default function AlertCard({ alert, onSelect }) {
  const priority = priorityVariant[alert.priority] ?? priorityVariant.Low

  return (
    <button
      type="button"
      onClick={() => onSelect?.(alert)}
      className={cn(
        'group w-full rounded-2xl border bg-surface/50 p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:bg-surface/75',
        priority.border,
      )}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <span
            className={cn(
              'mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl border border-current/30 bg-panel',
              priority.icon,
            )}
          >
            <Icon name="warning" className="h-4 w-4" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-text-primary">{alert.title}</p>
            <p className="mt-1 text-xs text-text-muted">
              {alert.id} • {alert.warehouse}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <Badge variant={priority.badge}>{alert.priority}</Badge>
          <Badge variant={statusVariant[alert.status] ?? 'neutral'}>{alert.status}</Badge>
        </div>
      </div>

      <p className="text-sm text-text-secondary">{alert.description}</p>

      <div className="mt-3 flex items-center justify-between text-xs text-text-muted">
        <span className="inline-flex items-center gap-1.5">
          <Icon name="warehouse" className="h-3.5 w-3.5" />
          {alert.sku}
        </span>
        <span>Updated {alert.updated}</span>
      </div>
    </button>
  )
}
