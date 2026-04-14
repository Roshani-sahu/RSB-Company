import { useEffect, useMemo, useState } from 'react'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import GlassCard from '../components/ui/GlassCard'
import Icon from '../components/ui/Icon'
import Input from '../components/ui/Input'

const statusVariant = {
  Pending: 'warning',
  Allocated: 'info',
  Received: 'success',
}

const formatCurrency = (amount) => `₹${amount.toLocaleString('en-IN')}`

const purchaseOrders = [
  {
    id: 'PO-390561',
    supplier: 'TechCorp Supply',
    status: 'Pending',
    total: 78000,
    date: 'Jan 8, 2026',
    expected: 'Jan 14, 2026',
    paymentTerms: 'Net 15',
    shipping: 1800,
    items: [
      { name: 'Drill Machine', price: 40900, qty: 1 },
      { name: 'Socket Kit', price: 18550, qty: 2 },
    ],
  },
  {
    id: 'PO-663334',
    supplier: 'Global Electronics',
    status: 'Allocated',
    total: 125000,
    date: 'Jan 6, 2026',
    expected: 'Jan 11, 2026',
    paymentTerms: 'Net 30',
    shipping: 2300,
    items: [
      { name: 'Wireless Headphones', price: 50000, qty: 2 },
      { name: 'Charging Dock', price: 11350, qty: 2 },
    ],
  },
  {
    id: 'PO-418135',
    supplier: 'Office Essentials',
    status: 'Received',
    total: 54000,
    date: 'Jan 5, 2026',
    expected: 'Jan 9, 2026',
    paymentTerms: 'Advance',
    shipping: 1200,
    items: [{ name: 'Laser Printer', price: 52800, qty: 1 }],
  },
]

export default function PurchaseOrder() {
  const [activeTab, setActiveTab] = useState('purchase')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedOrderId, setSelectedOrderId] = useState(purchaseOrders[0]?.id ?? null)

  const filteredOrders = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()
    if (!query) {
      return purchaseOrders
    }

    return purchaseOrders.filter(
      (order) =>
        order.id.toLowerCase().includes(query) || order.supplier.toLowerCase().includes(query),
    )
  }, [searchTerm])

  useEffect(() => {
    if (!filteredOrders.some((order) => order.id === selectedOrderId)) {
      setSelectedOrderId(filteredOrders[0]?.id ?? null)
    }
  }, [filteredOrders, selectedOrderId])

  const selectedOrder = filteredOrders.find((order) => order.id === selectedOrderId) ?? null

  const summary = useMemo(
    () => ({
      totalOrders: purchaseOrders.length,
      pendingOrders: purchaseOrders.filter((order) => order.status === 'Pending').length,
      totalSpend: purchaseOrders.reduce((sum, order) => sum + order.total, 0),
    }),
    [],
  )

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-xs uppercase tracking-[0.16em] text-text-muted">Procurement</p>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
            Purchase Orders
          </h1>
          <p className="mt-2 text-sm text-text-secondary">
            Track supplier orders, receiving status, and procurement spend in one place.
          </p>
        </div>

        <Button leftIcon={<Icon name="plus" className="h-4 w-4" />}>Create PO</Button>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <GlassCard className="p-5">
          <p className="text-sm text-text-secondary">Total Orders</p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-text-primary">
            {summary.totalOrders}
          </p>
        </GlassCard>
        <GlassCard className="p-5">
          <p className="text-sm text-text-secondary">Pending Approval</p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-amber-500">
            {summary.pendingOrders}
          </p>
        </GlassCard>
        <GlassCard className="p-5">
          <p className="text-sm text-text-secondary">Total Spend</p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-text-primary">
            {formatCurrency(summary.totalSpend)}
          </p>
        </GlassCard>
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <GlassCard className="overflow-hidden">
          <div className="border-b border-border/20 p-4 sm:p-5">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-2 rounded-xl border border-border/20 bg-surface/40 p-1">
                <button
                  type="button"
                  onClick={() => setActiveTab('purchase')}
                  className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                    activeTab === 'purchase'
                      ? 'bg-accent/15 text-accent'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  Purchase Orders
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('sales')}
                  className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                    activeTab === 'sales'
                      ? 'bg-accent/15 text-accent'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  Sales Orders
                </button>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <Input
                  iconName="search"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search order ID or supplier..."
                  containerClassName="w-full sm:w-[280px]"
                />
                <Button
                  variant="secondary"
                  leftIcon={<Icon name="filter" className="h-4 w-4 text-text-muted" />}
                >
                  Filter
                </Button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-border/20 text-xs uppercase tracking-wider text-text-muted">
                  <th className="px-5 py-3 text-left font-semibold">Order</th>
                  <th className="px-5 py-3 text-left font-semibold">Supplier</th>
                  <th className="px-5 py-3 text-center font-semibold">Status</th>
                  <th className="px-5 py-3 text-right font-semibold">Total</th>
                  <th className="px-5 py-3 text-right font-semibold">Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    onClick={() => setSelectedOrderId(order.id)}
                    className={`cursor-pointer border-b border-border/10 transition-colors ${
                      selectedOrderId === order.id
                        ? 'bg-accent/10'
                        : 'hover:bg-surface/60'
                    }`}
                  >
                    <td className="px-5 py-3">
                      <p className="font-semibold text-text-primary">{order.id}</p>
                    </td>
                    <td className="px-5 py-3 text-text-secondary">{order.supplier}</td>
                    <td className="px-5 py-3 text-center">
                      <Badge variant={statusVariant[order.status] ?? 'neutral'}>{order.status}</Badge>
                    </td>
                    <td className="px-5 py-3 text-right font-semibold text-text-primary">
                      {formatCurrency(order.total)}
                    </td>
                    <td className="px-5 py-3 text-right text-text-secondary">{order.date}</td>
                  </tr>
                ))}

                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-5 py-8 text-center text-sm text-text-muted">
                      No orders match your search.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </GlassCard>

        <GlassCard className="h-fit p-5">
          {selectedOrder ? (
            <div className="space-y-5">
              <div className="flex items-start justify-between gap-3 border-b border-border/15 pb-4">
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <h2 className="text-lg font-semibold text-text-primary">{selectedOrder.id}</h2>
                    <Badge variant={statusVariant[selectedOrder.status] ?? 'neutral'}>
                      {selectedOrder.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-text-secondary">{selectedOrder.supplier}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedOrderId(null)}
                  className="rounded-lg p-2 text-text-muted transition-colors hover:bg-surface hover:text-text-primary"
                  aria-label="Clear selection"
                >
                  <Icon name="close" className="h-4 w-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 gap-2 rounded-xl border border-border/20 bg-surface/45 p-4 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-text-muted">Order Date</span>
                  <span className="font-medium text-text-primary">{selectedOrder.date}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-muted">Expected</span>
                  <span className="font-medium text-text-primary">{selectedOrder.expected}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-muted">Payment Terms</span>
                  <span className="font-medium text-text-primary">{selectedOrder.paymentTerms}</span>
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-sm font-semibold text-text-primary">Order Items</h3>
                <div className="space-y-2">
                  {selectedOrder.items.map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center gap-3 rounded-xl border border-border/15 bg-surface/45 p-3"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/20 bg-panel/70 text-text-muted">
                        <Icon name="box" className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-text-primary">{item.name}</p>
                        <p className="text-xs text-text-muted">
                          {formatCurrency(item.price)} x {item.qty}
                        </p>
                      </div>
                      <span className="text-sm font-semibold text-text-primary">
                        {formatCurrency(item.price * item.qty)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2 border-t border-border/15 pt-4 text-sm">
                <div className="flex items-center justify-between text-text-secondary">
                  <span>Subtotal</span>
                  <span>
                    {formatCurrency(
                      selectedOrder.items.reduce((sum, item) => sum + item.price * item.qty, 0),
                    )}
                  </span>
                </div>
                <div className="flex items-center justify-between text-text-secondary">
                  <span>Shipping</span>
                  <span>{formatCurrency(selectedOrder.shipping)}</span>
                </div>
                <div className="flex items-center justify-between text-base font-semibold text-text-primary">
                  <span>Total</span>
                  <span>{formatCurrency(selectedOrder.total)}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="secondary"
                  leftIcon={<Icon name="warehouse" className="h-4 w-4 text-text-muted" />}
                >
                  Track
                </Button>
                <Button leftIcon={<Icon name="settings" className="h-4 w-4" />}>Modify</Button>
              </div>
            </div>
          ) : (
            <div className="flex min-h-[340px] flex-col items-center justify-center gap-3 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-accent">
                <Icon name="file" className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-semibold text-text-primary">No order selected</h3>
              <p className="max-w-[260px] text-sm text-text-secondary">
                Select a purchase order from the list to view line items and order summary.
              </p>
            </div>
          )}
        </GlassCard>
      </section>
    </div>
  )
}
