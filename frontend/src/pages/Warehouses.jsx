// Warehouses.jsx
import { useState } from 'react'

const warehouses = [
  {
    id: 1,
    name: 'NY Central Hub',
    address: '125 Main St, NY 10001',
    zones: ['Zone A: 85% Full', 'Zone B: 40% Full'],
    status: 'active',
    capacity: 85,
    bins: 1200,
  },
  {
    id: 2,
    name: 'LA Distribution Center',
    address: '4500 West Blvd, CA 90001',
    zones: ['Zone 1: 60% Full'],
    status: 'active',
    capacity: 60,
    bins: 800,
  },
  {
    id: 3,
    name: 'Chicago Overflow',
    address: '800 North Ave, IL 60601',
    zones: ['Zone A: 95% Full'],
    status: 'warning',
    capacity: 95,
    bins: 600,
  },
]

const zoneUtilization = [
  { label: 'Receiving (A)',    value: 45, bar: 'bg-emerald-500', text: 'text-emerald-500' },
  { label: 'Bulk Storage (B)', value: 85, bar: 'bg-amber-500',   text: 'text-amber-500'   },
  { label: 'Pick Face (C)',    value: 60, bar: 'bg-sky',         text: 'text-sky'          },
]

const putawayQueue = [
  { id: 'PO-2023-089', suggestion: 'Zone B, Aisle 4' },
  { id: 'PO-2023-090', suggestion: 'Zone A, Aisle 1' },
]

const WarehouseIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <path d="M4 10.8 12 5l8 5.8V20H4z" strokeLinejoin="round" />
    <path d="M9 20v-5h6v5M8.5 12.5h.01M12 12.5h.01M15.5 12.5h.01" strokeLinecap="round" />
  </svg>
)

const SearchIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" strokeLinecap="round" />
  </svg>
)

const CheckIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <path d="m5 12 4 4 10-10" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const BoxIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <path d="m4 8 8-4 8 4-8 4-8-4Z" strokeLinejoin="round" />
    <path d="M4 8v8l8 4 8-4V8M12 12v8" strokeLinejoin="round" />
  </svg>
)

const TriangleIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <path d="M12 4 3.2 19h17.6L12 4Z" strokeLinejoin="round" />
    <path d="M12 9v4.5M12 16h.01" strokeLinecap="round" />
  </svg>
)

export default function Warehouses() {
  const [selected, setSelected] = useState(warehouses[0])
  const [view, setView] = useState('map')

  return (
    <div className="space-y-0">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <nav className="mb-1 flex items-center gap-1 text-xs text-text-muted">
            <span>Home</span>
            <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="m10 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <span className="text-text-secondary">Warehouses</span>
          </nav>
          <h1 className="text-2xl font-bold text-text-primary">Warehouses</h1>
        </div>
        <button className="bg-accent hover:bg-[#7244eb] text-white px-4 py-2 rounded-xl text-sm font-medium transition-all shadow-[0_0_15px_rgba(96,47,247,0.2)] flex items-center gap-2">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" strokeLinecap="round" /></svg>
          Add Zone
        </button>
      </div>

      {/* 3-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_280px] gap-6 items-start">

        {/* ── Left: Warehouse List ── */}
        <div className="glass-panel rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-border/15">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
              <input
                type="text"
                placeholder="Search locations, bins..."
                className="w-full bg-surface border border-border/20 rounded-xl py-2 pl-9 pr-3 text-text-primary text-sm placeholder-text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
              />
            </div>
          </div>

          <div className="p-3 space-y-2">
            {warehouses.map((wh) => (
              <div
                key={wh.id}
                onClick={() => setSelected(wh)}
                className={`rounded-xl p-3 cursor-pointer transition-all border ${
                  selected.id === wh.id
                    ? 'bg-surface border-accent'
                    : 'border-transparent hover:bg-surface/60 hover:border-border/20'
                }`}
              >
                <div className="flex items-start justify-between mb-1.5">
                  <div className="flex items-center gap-2 min-w-0">
                    <WarehouseIcon className={`h-4 w-4 flex-shrink-0 ${selected.id === wh.id ? 'text-accent' : 'text-text-muted'}`} />
                    <span className={`text-sm font-semibold truncate ${selected.id === wh.id ? 'text-text-primary' : 'text-text-secondary'}`}>
                      {wh.name}
                    </span>
                  </div>
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 mt-1.5 ml-2 ${wh.status === 'active' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                </div>
                <p className="text-xs text-text-muted mb-2">{wh.address}</p>
                <div className="flex flex-wrap gap-1.5">
                  {wh.zones.map((z) => (
                    <span key={z} className="px-2 py-0.5 bg-panel border border-border/20 rounded text-[10px] text-text-secondary whitespace-nowrap">
                      {z}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Center: Map + Operations ── */}
        <div className="space-y-6 min-w-0">

          {/* Sub-header */}
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <h2 className="text-xl font-bold text-text-primary truncate">{selected.name}</h2>
              <p className="text-sm text-text-secondary mt-0.5">
                Total Capacity: {selected.capacity}% &bull; {selected.bins.toLocaleString()} Bins Active
              </p>
            </div>
            <div className="flex bg-surface border border-border/20 rounded-xl p-1 flex-shrink-0">
              {['Map View', 'List View'].map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v === 'Map View' ? 'map' : 'list')}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                    (v === 'Map View' && view === 'map') || (v === 'List View' && view === 'list')
                      ? 'bg-panel text-text-primary shadow-sm'
                      : 'text-text-muted hover:text-text-primary'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* Map */}
          <div className="relative h-72 border border-border/15 rounded-2xl bg-panel overflow-hidden">
            <img
              className="w-full h-full object-cover opacity-95 mix-blend-normal dark:opacity-80 dark:mix-blend-screen"
              src="https://storage.googleapis.com/uxpilot-auth.appspot.com/e76d67e872-5e1413415db7c9cd891d.png"
              alt="Warehouse map"
            />

            {/* Zone Utilization Overlay */}
            <div className="absolute top-4 left-4 glass-panel p-3 rounded-xl space-y-2.5 z-10 w-52">
              <h3 className="text-xs font-semibold text-text-primary">Zone Utilization</h3>
              {zoneUtilization.map((z) => (
                <div key={z.label}>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-text-secondary">{z.label}</span>
                    <span className={z.text}>{z.value}%</span>
                  </div>
                  <div className="w-full bg-bg rounded-full h-1">
                    <div className={`${z.bar} h-1 rounded-full`} style={{ width: `${z.value}%` }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Marker — Active */}
            <div className="absolute top-1/3 left-1/4 group cursor-pointer">
              <div className="w-4 h-4 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.8)] relative z-10 border-2 border-panel" />
              <div className="absolute w-8 h-8 bg-emerald-500/20 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-ping" />
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-44 glass-panel p-3 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                <p className="text-xs font-bold text-text-primary mb-1">Bin A-12-04</p>
                <p className="text-[10px] text-text-muted">Premium Headphones</p>
                <p className="text-[10px] text-emerald-500 mt-1">Status: Active</p>
              </div>
            </div>

            {/* Marker — Warning */}
            <div className="absolute top-1/2 left-2/3 group cursor-pointer">
              <div className="w-4 h-4 bg-amber-500 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.8)] relative z-10 border-2 border-panel" />
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-44 glass-panel p-3 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                <p className="text-xs font-bold text-text-primary mb-1">Bin B-45-01</p>
                <p className="text-[10px] text-text-muted">Mechanical Keyboards</p>
                <p className="text-[10px] text-amber-500 mt-1">Status: Needs Restock</p>
              </div>
            </div>
          </div>

          {/* Operations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Putaway Queue */}
            <div className="glass-panel rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-text-primary">Putaway Queue</h3>
                <span className="px-2 py-1 rounded bg-accent/20 text-accent text-[10px] border border-accent/30">12 Pending</span>
              </div>
              <div className="space-y-3">
                {putawayQueue.map((item) => (
                  <div key={item.id} className="bg-surface border border-border/20 p-3 rounded-xl flex items-center justify-between gap-3 hover:border-accent transition-colors cursor-pointer">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-panel border border-border/20 flex items-center justify-center text-text-muted flex-shrink-0">
                        <BoxIcon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-text-primary">{item.id}</p>
                        <p className="text-xs text-text-muted truncate">Suggest: {item.suggestion}</p>
                      </div>
                    </div>
                    <button className="text-xs bg-panel hover:bg-surface border border-border/20 px-3 py-1.5 rounded-lg text-text-secondary transition-colors flex-shrink-0">
                      Start
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Fulfillment */}
            <div className="glass-panel rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-text-primary">Active Fulfillment</h3>
                <button className="text-xs text-text-muted hover:text-text-primary transition-colors">View All</button>
              </div>

              <div className="bg-surface border border-border/20 rounded-xl p-4">
                <div className="flex items-center justify-between mb-4 border-b border-border/15 pb-3">
                  <div>
                    <p className="text-sm font-bold text-text-primary">SO-1042-X</p>
                    <p className="text-xs text-text-muted">Priority: High</p>
                  </div>
                  <span className="text-xs font-mono text-text-muted">4 Items</span>
                </div>

                {/* Stepper */}
                <div className="relative flex items-start justify-between px-2">
                  <div className="absolute top-3 left-6 right-6 h-0.5 bg-border/20 z-0" />
                  <div className="absolute top-3 left-6 right-1/2 h-0.5 bg-accent z-0" />

                  {[
                    { label: 'Pick', state: 'done'    },
                    { label: 'Pack', state: 'active'  },
                    { label: 'Ship', state: 'pending' },
                  ].map((step, i) => (
                    <div key={step.label} className="relative z-10 flex flex-col items-center gap-1.5">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-medium ${
                        step.state === 'done'
                          ? 'bg-accent text-white shadow-[0_0_10px_rgba(96,47,247,0.4)]'
                          : step.state === 'active'
                          ? 'bg-surface border-2 border-accent text-accent'
                          : 'bg-surface border-2 border-border/30 text-text-muted'
                      }`}>
                        {step.state === 'done' ? <CheckIcon className="h-3 w-3" /> : i + 1}
                      </div>
                      <span className={`text-[10px] font-medium ${step.state === 'pending' ? 'text-text-muted' : 'text-text-primary'}`}>
                        {step.label}
                      </span>
                    </div>
                  ))}
                </div>

                <button className="w-full mt-4 bg-panel hover:bg-surface border border-border/20 text-text-secondary py-2 rounded-lg text-xs transition-colors">
                  Continue Packing
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right: Alerts + Activity ── */}
        <div className="space-y-6">

          {/* Exceptions & Alerts */}
          <div className="glass-panel rounded-2xl overflow-hidden">
            <div className="p-5 border-b border-border/15">
              <h3 className="text-sm font-bold text-text-primary">Exceptions & Alerts</h3>
              <p className="text-xs text-text-muted mt-0.5">Requires attention</p>
            </div>
            <div className="p-4 space-y-3">
              <div className="bg-surface border border-red-500/20 rounded-xl p-3">
                <div className="flex items-start gap-3">
                  <TriangleIcon className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-text-primary mb-1">Inventory Discrepancy</p>
                    <p className="text-xs text-text-secondary mb-2">Bin C-02 count mismatch during cycle count.</p>
                    <button className="text-xs text-red-500 hover:text-red-400 font-medium">Investigate</button>
                  </div>
                </div>
              </div>

              <div className="bg-surface border border-amber-500/20 rounded-xl p-3">
                <div className="flex items-start gap-3">
                  <TriangleIcon className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-text-primary mb-1">Temp Warning</p>
                    <p className="text-xs text-text-secondary mb-2">Zone D (Cold Storage) temp above threshold.</p>
                    <button className="text-xs text-amber-500 hover:text-amber-400 font-medium">View Logs</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Daily Activity */}
          <div className="glass-panel rounded-2xl p-5">
            <h3 className="text-sm font-bold text-text-primary mb-4">Daily Activity</h3>
            <div className="space-y-3 relative before:absolute before:left-[7px] before:top-1 before:bottom-1 before:w-0.5 before:bg-border/20">
              {[
                { title: 'PO Received',   desc: 'PO-2023-089 checked in.', time: '10:42 AM', done: true  },
                { title: 'Order Shipped', desc: 'SO-1041 dispatched.',      time: '09:15 AM', done: false },
              ].map((item) => (
                <div key={item.title} className="relative flex items-start gap-3 pl-6">
                  <div className={`absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full border-2 border-panel flex-shrink-0 ${item.done ? 'bg-accent' : 'bg-border/40'}`} />
                  <div className="glass-panel flex-1 p-3 rounded-xl">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-text-primary">{item.title}</span>
                      <span className="text-[10px] text-text-muted">{item.time}</span>
                    </div>
                    <p className="text-xs text-text-secondary">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
