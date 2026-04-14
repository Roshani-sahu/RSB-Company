import { useEffect, useState } from "react"
import GlassCard from "../components/ui/GlassCard"
import Button from "../components/ui/Button"
import Icon from "../components/ui/Icon"
import Chart from "../components/ui/Chart"

export default function Reports() {
  const [activeTab, setActiveTab] = useState("analytics")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 700)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="space-y-6 lg:space-y-8">

      {/* 🔥 TOP BAR */}
      <section className="flex flex-col lg:flex-row justify-between gap-4 p-4 rounded-2xl border border-border bg-surface/60 backdrop-blur-md">

        {/* TABS */}
        <div className="flex flex-wrap gap-6 text-sm">
          {[
            { id: "analytics", label: "Analytics Dashboard" },
            { id: "inventory", label: "Inventory Reports" },
            { id: "sales", label: "Sales Reports" },
            { id: "warehouse", label: "Warehouse Reports" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-1 ${
                activeTab === tab.id
                  ? "text-text-primary border-b-2 border-accent"
                  : "text-text-muted"
              }`}
            >
              {tab.label}
            </button>
          ))}

          <button className="text-accent flex items-center gap-2">
            <Icon name="sparkles" className="h-4 w-4" />
            Custom Builder
          </button>
        </div>

        {/* FILTER */}
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary">Last 30 Days</Button>
          <Button variant="secondary" leftIcon={<Icon name="calendar" />}>
            Date
          </Button>
          <Button variant="secondary" leftIcon={<Icon name="download" />}>
            Export
          </Button>
        </div>
      </section>

      {/* 🔥 KPI GRID */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        <GlassCard className="p-6">
          <p className="text-sm text-text-muted">Total Revenue</p>
          <h3 className="text-3xl font-bold">$43K</h3>
          <p className="text-xs text-emerald-400 mt-2">+12.5%</p>
        </GlassCard>

        <GlassCard className="p-6">
          <p className="text-sm text-text-muted">Total Orders</p>
          <h3 className="text-3xl font-bold">1,284</h3>
          <p className="text-xs text-emerald-400 mt-2">+8.2%</p>
        </GlassCard>

        <GlassCard className="p-6">
          <p className="text-sm text-text-muted">Inventory Value</p>
          <h3 className="text-3xl font-bold">$892K</h3>
          <p className="text-xs text-red-400 mt-2">-2.4%</p>
        </GlassCard>

        <GlassCard className="p-6">
          <p className="text-sm text-text-muted">Avg Fulfillment</p>
          <h3 className="text-3xl font-bold">
            1.2 <span className="text-sm text-text-muted">days</span>
          </h3>
          <p className="text-xs text-emerald-400 mt-2">-0.3 days</p>
        </GlassCard>
      </section>

      {/* 🔥 CHARTS */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* MAIN CHART */}
        <GlassCard className="p-6 lg:col-span-2">
          <div className="flex justify-between mb-4">
            <div>
              <h3 className="font-semibold">Revenue & Sales Trends</h3>
              <p className="text-xs text-text-muted">
                Monthly breakdown
              </p>
            </div>

            <Button variant="ghost" size="icon">
              <Icon name="dots" />
            </Button>
          </div>

          {isLoading ? (
            <div className="h-[300px] flex items-center justify-center text-text-muted">
              Loading...
            </div>
          ) : (
            <Chart
              type="line"
              labels={["Jan", "Feb", "Mar", "Apr", "May", "Jun"]}
              series={[
                { name: "Revenue", data: [30, 45, 38, 52, 48, 65] },
                { name: "Orders", data: [20, 35, 25, 45, 35, 50] },
              ]}
            />
          )}
        </GlassCard>

        {/* DONUT */}
        <GlassCard className="p-6">
          <h3 className="mb-4 font-semibold">Top Categories</h3>

          <Chart
            type="donut"
            segments={[
              { label: "Electronics", value: 45 },
              { label: "Office", value: 30 },
              { label: "Furniture", value: 25 },
            ]}
            centerLabel="8.4k"
          />

          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Electronics</span>
              <span>45%</span>
            </div>
            <div className="flex justify-between">
              <span>Office</span>
              <span>30%</span>
            </div>
            <div className="flex justify-between">
              <span>Furniture</span>
              <span>25%</span>
            </div>
          </div>
        </GlassCard>
      </section>
    </div>
  )
}