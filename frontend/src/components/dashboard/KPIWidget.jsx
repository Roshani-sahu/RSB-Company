import { cn } from '../../utils/cn'
import GlassCard from '../ui/GlassCard'
import Icon from '../ui/Icon'

const toneStyles = {
  accent: {
    glow: 'bg-accent/25',
    icon: 'border-accent/30 bg-accent/15 text-accent',
    trend: 'bg-emerald-500/15 text-emerald-500',
  },
  danger: {
    glow: 'bg-red-500/25',
    icon: 'border-red-500/30 bg-red-500/15 text-red-500',
    trend: 'bg-red-500/15 text-red-500',
  },
  sky: {
    glow: 'bg-sky/25',
    icon: 'border-sky/30 bg-sky/15 text-sky',
    trend: 'bg-emerald-500/15 text-emerald-500',
  },
  warning: {
    glow: 'bg-amber-500/20',
    icon: 'border-amber-500/30 bg-amber-500/15 text-amber-500',
    trend: 'bg-amber-500/15 text-amber-500',
  },
}

export default function KPIWidget({ title, value, icon, tone = 'accent', trend }) {
  const styles = toneStyles[tone] ?? toneStyles.accent
  const trendIcon = trend?.direction === 'flat' ? 'minus' : 'arrowUp'

  return (
    <GlassCard className="group relative overflow-hidden p-5">
      <div className={cn('absolute -right-6 -top-6 h-24 w-24 rounded-full blur-3xl transition-all duration-300 group-hover:opacity-100', styles.glow, tone === 'warning' ? 'opacity-65' : 'opacity-75')} />

      <div className="relative z-10 mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="mb-1 text-sm font-medium text-text-secondary">{title}</p>
          <h3 className="text-2xl font-bold tracking-tight text-text-primary">{value}</h3>
        </div>
        <div className={cn('flex h-10 w-10 items-center justify-center rounded-xl border', styles.icon)}>
          <Icon name={icon} className="h-4 w-4" />
        </div>
      </div>

      {trend ? (
        <div className="relative z-10 flex items-center gap-2">
          <span className={cn('inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-semibold', styles.trend)}>
            <Icon name={trendIcon} className="h-3.5 w-3.5" />
            {trend.value}
          </span>
          <span className="text-xs text-text-muted">{trend.context}</span>
        </div>
      ) : null}
    </GlassCard>
  )
}
