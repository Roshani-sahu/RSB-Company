import { useEffect, useMemo, useState } from 'react'
import AlertCard from '../components/alerts/AlertCard'
import AlertDetails from '../components/alerts/AlertDetails'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import EmptyState from '../components/ui/EmptyState'
import GlassCard from '../components/ui/GlassCard'
import Icon from '../components/ui/Icon'
import { SkeletonRows } from '../components/ui/Skeleton'
import { alertsData } from '../data/alertsData'

export default function Alerts() {
  const [isLoading, setIsLoading] = useState(true)
  const [selectedAlert, setSelectedAlert] = useState(null)

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 650)
    return () => window.clearTimeout(timer)
  }, [])

  const stats = useMemo(
    () => ({
      total: alertsData.length,
      open: alertsData.filter((alert) => alert.status === 'Open').length,
      critical: alertsData.filter((alert) => alert.priority === 'Critical').length,
    }),
    [],
  )

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-xs uppercase tracking-[0.16em] text-text-muted">Alerts Center</p>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
            Inventory Alerts
          </h1>
          <p className="mt-2 text-sm text-text-secondary">
            Prioritized incidents and stock events across warehouses.
          </p>
        </div>
        <Button
          variant="secondary"
          leftIcon={<Icon name="filter" className="h-4 w-4 text-text-muted" />}
        >
          Filter Alerts
        </Button>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <GlassCard className="p-5">
          <p className="text-sm text-text-secondary">Total Alerts</p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-text-primary">{stats.total}</p>
        </GlassCard>
        <GlassCard className="p-5">
          <p className="text-sm text-text-secondary">Open Alerts</p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-text-primary">{stats.open}</p>
        </GlassCard>
        <GlassCard className="p-5">
          <p className="text-sm text-text-secondary">Critical Priority</p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-red-500">{stats.critical}</p>
        </GlassCard>
      </section>

      <GlassCard className="p-5 sm:p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-semibold text-text-primary">Active Queue</h2>
          <div className="flex flex-wrap gap-2">
            <Badge variant="danger">Critical</Badge>
            <Badge variant="warning">High</Badge>
            <Badge variant="info">Medium</Badge>
            <Badge variant="neutral">Low</Badge>
          </div>
        </div>

        {isLoading ? (
          <SkeletonRows rows={4} />
        ) : alertsData.length ? (
          <div className="space-y-3">
            {alertsData.map((alert) => (
              <AlertCard key={alert.id} alert={alert} onSelect={setSelectedAlert} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon="check"
            title="No alerts right now"
            description="Everything looks healthy across your warehouses."
          />
        )}
      </GlassCard>

      <AlertDetails alert={selectedAlert} open={Boolean(selectedAlert)} onClose={() => setSelectedAlert(null)} />
    </div>
  )
}
