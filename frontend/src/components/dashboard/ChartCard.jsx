import GlassCard from '../ui/GlassCard'

export default function ChartCard({ title, subtitle, legend = [], actions, children, className }) {
  return (
    <GlassCard className={className}>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
          {subtitle ? <p className="mt-1 text-xs text-text-secondary">{subtitle}</p> : null}
        </div>
        {actions}
      </div>

      {legend.length ? (
        <div className="mb-4 flex flex-wrap gap-3">
          {legend.map((item) => (
            <span key={item.label} className="inline-flex items-center gap-1.5 text-xs text-text-secondary">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
              {item.label}
            </span>
          ))}
        </div>
      ) : null}

      {children}
    </GlassCard>
  )
}
