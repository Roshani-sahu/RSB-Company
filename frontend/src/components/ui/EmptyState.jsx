import Icon from './Icon'

export default function EmptyState({ icon = 'info', title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border/40 bg-surface/55 px-6 py-10 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-panel text-accent shadow-soft">
        <Icon name={icon} className="h-5 w-5" />
      </div>
      <div>
        <h3 className="text-sm font-semibold text-text-primary">{title}</h3>
        <p className="mt-1 text-sm text-text-secondary">{description}</p>
      </div>
      {action}
    </div>
  )
}
