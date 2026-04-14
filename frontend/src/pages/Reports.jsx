import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import EmptyState from '../components/ui/EmptyState'
import GlassCard from '../components/ui/GlassCard'
import Icon from '../components/ui/Icon'

export default function Reports() {
  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-xs uppercase tracking-[0.16em] text-text-muted">Reports</p>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
            Analytics & Reports
          </h1>
          <p className="mt-2 text-sm text-text-secondary">
            Build custom summaries for inventory flow, sales throughput, and demand.
          </p>
        </div>
        <Button
          variant="secondary"
          leftIcon={<Icon name="download" className="h-4 w-4 text-text-muted" />}
        >
          Export Reports
        </Button>
      </section>

      <GlassCard className="p-6">
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <Badge variant="accent">Monthly</Badge>
          <Badge variant="info">Warehouse</Badge>
          <Badge variant="neutral">Finance-ready</Badge>
        </div>
        <EmptyState
          icon="reports"
          title="Report builder scaffolded"
          description="Hook your reporting service to power downloadable views, charts, and scheduled exports."
        />
      </GlassCard>
    </div>
  )
}
