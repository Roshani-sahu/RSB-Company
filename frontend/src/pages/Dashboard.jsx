import { useEffect, useMemo, useState } from 'react'
import ActivityTimeline from '../components/dashboard/ActivityTimeline'
import ChartCard from '../components/dashboard/ChartCard'
import KPIWidget from '../components/dashboard/KPIWidget'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import Chart from '../components/ui/Chart'
import GlassCard from '../components/ui/GlassCard'
import Icon from '../components/ui/Icon'
import { Skeleton, SkeletonRows } from '../components/ui/Skeleton'
import Table from '../components/ui/Table'
import {
  dashboardAlert,
  dashboardKpis,
  quickActions,
  recentActivity,
  revenueChart,
  topProducts,
  warehouseCapacity,
} from '../data/dashboardData'

const quickActionTone = {
  accent: 'text-accent border-accent/25 bg-accent/10',
  sky: 'text-sky border-sky/25 bg-sky/10',
  success: 'text-emerald-500 border-emerald-500/25 bg-emerald-500/10',
  warning: 'text-amber-500 border-amber-500/25 bg-amber-500/10',
}

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState(null)

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 700)
    return () => window.clearTimeout(timer)
  }, [])

  const capacityAverage = Math.round(
    warehouseCapacity.reduce((sum, item) => sum + item.value, 0) / warehouseCapacity.length,
  )

  const productColumns = useMemo(
    () => [
      {
        key: 'product',
        header: 'Product',
        render: (row) => {
          const initials = row.product
            .split(' ')
            .slice(0, 2)
            .map((word) => word[0])
            .join('')
            .toUpperCase()

          return (
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-border/25 bg-surface text-[11px] font-bold tracking-wide text-text-muted">
                {initials}
              </span>
              <div>
                <p className="font-medium text-text-primary">{row.product}</p>
                <p className="text-xs text-text-muted">{row.category}</p>
              </div>
            </div>
          )
        },
      },
      { key: 'sku', header: 'SKU' },
      { key: 'sales', header: 'Sales', align: 'right' },
      {
        key: 'revenue',
        header: 'Revenue',
        align: 'right',
        render: (row) => <span className="font-semibold text-emerald-500">{row.revenue}</span>,
      },
    ],
    [],
  )

  return (
    <div className="space-y-6 lg:space-y-8">
      <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <nav className="mb-2 flex items-center gap-1 text-xs text-text-muted">
            <span>Home</span>
            <Icon name="chevronRight" className="h-3 w-3" />
            <span className="text-text-secondary">Dashboard</span>
          </nav>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
            Executive Overview
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="secondary"
            leftIcon={<Icon name="calendar" className="h-4 w-4 text-text-muted" />}
            rightIcon={<Icon name="chevronDown" className="h-3.5 w-3.5 text-text-muted" />}
          >
            Last 30 Days
          </Button>
          <Button
            variant="secondary"
            leftIcon={<Icon name="download" className="h-4 w-4 text-text-muted" />}
          >
            Export
          </Button>
        </div>
      </section>

      <GlassCard className="flex flex-col gap-3 border-l-4 border-l-red-500 p-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-red-500/15 text-red-500">
            <Icon name="warning" className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-text-primary">{dashboardAlert.title}</h2>
            <p className="mt-1 text-sm text-text-secondary">{dashboardAlert.description}</p>
          </div>
        </div>
        <Button variant="ghost" className="self-start text-accent hover:text-accent">
          Review Now
        </Button>
      </GlassCard>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {isLoading
          ? Array.from({ length: 4 }).map((_, index) => (
              <GlassCard key={`kpi-skeleton-${index}`} className="p-5">
                <Skeleton className="mb-4 h-4 w-32" />
                <Skeleton className="mb-4 h-8 w-20" />
                <Skeleton className="h-5 w-36" />
              </GlassCard>
            ))
          : dashboardKpis.map((kpi) => <KPIWidget key={kpi.id} {...kpi} />)}
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <ChartCard
          className="p-6 lg:col-span-2"
          title="Revenue & Order Volume"
          subtitle="Daily breakdown for the selected period"
          legend={[
            { label: 'Revenue', color: 'rgb(var(--accent))' },
            { label: 'Orders', color: 'rgb(var(--sky))' },
          ]}
        >
          {isLoading ? (
            <Skeleton className="h-[320px] w-full rounded-xl" />
          ) : (
            <Chart type="line" labels={revenueChart.labels} series={revenueChart.series} />
          )}
        </ChartCard>

        <ChartCard
          className="p-6"
          title="Warehouse Capacity"
          actions={
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Icon name="dots" className="h-4 w-4" />
            </Button>
          }
        >
          {isLoading ? (
            <Skeleton className="mb-5 h-[240px] w-full rounded-xl" />
          ) : (
            <Chart
              type="donut"
              centerLabel={`${capacityAverage}%`}
              segments={warehouseCapacity}
              className="mb-5"
            />
          )}

          <div className="space-y-2.5">
            {warehouseCapacity.map((warehouse) => (
              <div key={warehouse.label} className="flex items-center justify-between text-sm">
                <span className="inline-flex items-center gap-2 text-text-secondary">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: warehouse.color }} />
                  {warehouse.label}
                </span>
                <span className="font-semibold text-text-primary">{warehouse.value}%</span>
              </div>
            ))}
          </div>
        </ChartCard>
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <GlassCard className="p-6">
          <div className="mb-6 flex items-center justify-between gap-3">
            <h3 className="text-lg font-semibold text-text-primary">Top Selling Products</h3>
            <Button variant="ghost" size="sm" className="text-accent hover:text-accent">
              View All
            </Button>
          </div>

          <Table
            columns={productColumns}
            rows={topProducts}
            loading={isLoading}
            onRowClick={setSelectedProduct}
          />

          {selectedProduct ? (
            <div className="mt-4 border-t border-border/15 pt-4">
              <Badge variant="accent">Selected: {selectedProduct.product}</Badge>
            </div>
          ) : null}
        </GlassCard>

        <div className="space-y-6">
          <GlassCard className="p-6">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {quickActions.map((action) => (
                <button
                  key={action.id}
                  type="button"
                  className="group rounded-xl border border-border/20 bg-surface/55 p-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-border/40 hover:bg-surface/85"
                >
                  <span
                    className={`mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-lg border ${quickActionTone[action.tone]}`}
                  >
                    <Icon name={action.icon} className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
                  </span>
                  <span className="text-xs font-semibold text-text-secondary">{action.label}</span>
                </button>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <h3 className="mb-5 text-lg font-semibold text-text-primary">Recent Activity</h3>
            {isLoading ? <SkeletonRows rows={3} /> : <ActivityTimeline items={recentActivity} />}
          </GlassCard>
        </div>
      </section>
    </div>
  )
}
