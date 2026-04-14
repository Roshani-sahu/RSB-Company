import { useState } from "react"
import Badge from "../components/ui/Badge"
import Button from "../components/ui/Button"
import Chart from "../components/ui/Chart"
import GlassCard from "../components/ui/GlassCard"
import Icon from "../components/ui/Icon"
import Table from "../components/ui/Table"

export default function ProductDetail() {
  const [activeTab, setActiveTab] = useState("overview")

  const serialData = [
    {
      serial: "SN-9823-A1",
      status: "in",
      location: "NY-WH-01 (Bin A4)",
      date: "Oct 12, 2023",
    },
    {
      serial: "SN-9824-A1",
      status: "reserved",
      location: "NY-WH-01 (Bin A4)",
      date: "Oct 12, 2023",
    },
    {
      serial: "SN-9825-A1",
      status: "shipped",
      location: "Customer (SO-1042)",
      date: "Oct 10, 2023",
    },
  ]

  const serialColumns = [
    { key: "serial", header: "Serial No." },
    {
      key: "status",
      header: "Status",
      render: (row) => {
        if (row.status === "in") return <Badge variant="success">In Stock</Badge>
        if (row.status === "reserved") return <Badge variant="info">Reserved</Badge>
        return <Badge variant="secondary">Shipped</Badge>
      },
    },
    { key: "location", header: "Location" },
    { key: "date", header: "Date Received" },
  ]

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <GlassCard className="p-6 flex flex-col lg:flex-row justify-between gap-6">

        {/* LEFT */}
        <div className="flex gap-6">
          <div className="w-24 h-24 rounded-xl bg-surface flex items-center justify-center">
            <Icon name="box" className="h-8 w-8 text-text-muted" />
          </div>

          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-xl font-bold text-text-primary">
                Premium Wireless Headphones
              </h1>
              <Badge variant="success">Active</Badge>
            </div>

            <p className="text-sm text-text-muted mb-3">
              SKU: WH-PRO-BLK-01 • Electronics • Supplier: TechAudio Inc.
            </p>

            <div className="flex gap-6 text-sm">
              <div>
                <p className="text-text-muted text-xs">Total Stock</p>
                <p className="font-semibold">1,245 units</p>
              </div>
              <div>
                <p className="text-text-muted text-xs">Total Value</p>
                <p className="font-semibold">$186,750</p>
              </div>
              <div>
                <p className="text-text-muted text-xs">Unit Cost</p>
                <p className="font-semibold">$150</p>
              </div>
            </div>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" leftIcon={<Icon name="print" />}>
            Print
          </Button>
          <Button variant="secondary" leftIcon={<Icon name="truck" />}>
            Transfer
          </Button>
          <Button leftIcon={<Icon name="settings" />}>
            Adjust
          </Button>
        </div>
      </GlassCard>

      {/* TABS */}
      <div className="flex gap-12  border-b border-border text-xl">
        {["Overview",
"Stock by Location",
"Movements",
"Serial / Lot",
"Expiry",
"Documents",
"Activity"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 mt-5 ${
              activeTab === tab
                ? "text-accent border-b-2 border-accent"
                : "text-text-muted"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">

          {/* CHARTS */}
          <div className="grid md:grid-cols-2 gap-6">
            <GlassCard className="p-5 ">
              <h3 className="mb-3 font-semibold">Stock Timeline</h3>
              <Chart
                type="line"
                labels={["Jan", "Feb", "Mar", "Apr"]}
                series={[{ name: "Stock", data: [1000, 1200, 900, 1245] }]}
              />
            </GlassCard>

            <GlassCard className="p-5">
              <h3 className="mb-3 font-semibold">Sales vs Purchase</h3>
              <Chart
                type="bar"
                labels={["Q1", "Q2", "Q3"]}
                series={[
                  { name: "Sales", data: [45, 52, 60] },
                  { name: "Purchase", data: [30, 35, 40] },
                ]}
              />
            </GlassCard>
          </div>

          {/* TABLE */}
          <GlassCard className="p-5">
            <div className="flex justify-between mb-4">
              <h3 className="font-semibold">Serial Numbers</h3>
              <Button variant="ghost">View All</Button>
            </div>

            <Table columns={serialColumns} rows={serialData} />
          </GlassCard>
        </div>

        {/* RIGHT */}
        <div className="space-y-6">

          {/* DISTRIBUTION */}
          <GlassCard className="p-5">
            <h3 className="mb-4 font-semibold">Stock Distribution</h3>

            {[
              { label: "NY Warehouse", value: 850, percent: 68 },
              { label: "LA Hub", value: 320, percent: 25 },
              { label: "Transit", value: 75, percent: 7 },
            ].map((item) => (
              <div key={item.label} className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>{item.label}</span>
                  <span>{item.value}</span>
                </div>

                <div className="h-2 bg-surface rounded-full">
                  <div
                    className="h-2 bg-accent rounded-full"
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </GlassCard>

          {/* EXPIRY */}
          <GlassCard className="p-5">
            <h3 className="mb-4 font-semibold">Upcoming Expiry</h3>

            <div className="space-y-3">
              <div className="bg-surface p-3 rounded-lg">
                <p className="text-sm font-medium">Lot L-2023-X1</p>
                <p className="text-xs text-text-muted">30 days</p>
              </div>
              <div className="bg-surface p-3 rounded-lg">
                <p className="text-sm font-medium">Lot L-2023-Y2</p>
                <p className="text-xs text-text-muted">60 days</p>
              </div>
            </div>
          </GlassCard>

          {/* ACTIONS */}
          <GlassCard className="p-5">
            <h3 className="mb-4 font-semibold">Create Documents</h3>

            <div className="grid grid-cols-2 gap-3">
  <Button
    variant="secondary"
    leftIcon={<Icon name="fileInvoice" className="h-4 w-4" />}
  >
    Create SO
  </Button>

  <Button
    variant="secondary"
    leftIcon={<Icon name="cart" className="h-4 w-4" />}
  >
    Create PO
  </Button>
</div>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}