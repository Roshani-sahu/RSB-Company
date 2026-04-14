import Badge from '../ui/Badge'
import Button from '../ui/Button'
import Icon from '../ui/Icon'
import Modal from '../ui/Modal'

const priorityVariant = {
  Critical: 'danger',
  High: 'warning',
  Medium: 'info',
  Low: 'neutral',
}

const statusVariant = {
  Open: 'danger',
  'In Review': 'warning',
  Resolved: 'success',
}

export default function AlertDetails({ alert, open, onClose }) {
  if (!alert) {
    return null
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={alert.title}
      description={`${alert.id} • ${alert.warehouse}`}
    >
      <div className="space-y-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={priorityVariant[alert.priority] ?? 'neutral'}>{alert.priority}</Badge>
          <Badge variant={statusVariant[alert.status] ?? 'neutral'}>{alert.status}</Badge>
          <Badge variant="neutral">{alert.updated}</Badge>
        </div>

        <section className="grid gap-4 sm:grid-cols-2">
          <article className="rounded-xl border border-border/25 bg-surface/50 p-4">
            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-text-muted">
              Business Impact
            </h4>
            <p className="text-sm text-text-primary">{alert.impact}</p>
          </article>
          <article className="rounded-xl border border-border/25 bg-surface/50 p-4">
            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-text-muted">
              Recommended Action
            </h4>
            <p className="text-sm text-text-primary">{alert.recommendation}</p>
          </article>
        </section>

        <article className="rounded-xl border border-border/25 bg-surface/50 p-4">
          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-text-muted">Details</h4>
          <p className="text-sm leading-relaxed text-text-secondary">{alert.description}</p>
        </article>

        <div className="flex flex-wrap justify-end gap-2">
          <Button variant="ghost" onClick={onClose}>
            Dismiss
          </Button>
          <Button
            variant="primary"
            leftIcon={<Icon name="check" className="h-4 w-4" />}
          >
            Resolve Alert
          </Button>
        </div>
      </div>
    </Modal>
  )
}
