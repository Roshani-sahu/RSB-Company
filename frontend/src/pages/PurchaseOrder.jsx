import { useState } from "react"
import GlassCard from "../components/ui/GlassCard"
import Badge from "../components/ui/Badge"
import Button from "../components/ui/Button"
import Icon from "../components/ui/Icon"

export default function Orders() {
  const [selectedOrder, setSelectedOrder] = useState(null)

  const orders = [
    {
      id: "#PO-390561",
      supplier: "TechCorp Supply",
      status: "Pending",
      total: 780,
      date: "Jan 8",
      items: [
        { name: "Drill Machine", price: 409, qty: 1 },
        { name: "Socket", price: 238, qty: 2 },
      ],
    },
    {
      id: "#PO-663334",
      supplier: "Global Electronics",
      status: "Allocated",
      total: 1250,
      date: "Jan 6",
      items: [
        { name: "Headphones", price: 500, qty: 2 },
      ],
    },
    {
      id: "#PO-418135",
      supplier: "Office Essentials",
      status: "Received",
      total: 540,
      date: "Jan 5",
      items: [
        { name: "Printer", price: 540, qty: 1 },
      ],
    },
  ]

  return (
    <div className="flex h-[calc(98vh-80px)]">

      {/* LEFT SIDE */}
      <div className="flex-1 flex flex-col">

        {/* HEADER */}
        <div className="p-6  flex justify-between items-center">
          <div className="flex gap-6">
            <button className="text-sm font-bold border-b-2 border-accent pb-2">
              Purchase Orders
            </button>
            <button className="text-sm text-text-muted">
              Sales Orders
            </button>
          </div>

          <Button leftIcon={<Icon name="plus" />}>
            Create PO
          </Button>
        </div>

        {/* SEARCH */}
        <div className="p-4 border-b border-border flex gap-3">
          <input
            placeholder="Search orders..."
            className="flex-1 px-3 py-2 bg-surface border border-border rounded-lg"
          />
          <Button variant="secondary">Filter</Button>
        </div>

        {/* TABLE */}
        <div className="p-6 overflow-auto">
          <GlassCard className="overflow-hidden">

            <table className="w-full text-sm">
              <thead className="text-text-muted border-b border-border">
                <tr>
                  <th className="p-3 text-left">Order</th>
                  <th className="p-3 text-left">Supplier</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Total</th>
                  <th className="p-3">Date</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    onClick={() => setSelectedOrder(order)}
                    className={`cursor-pointer border-b border-border hover:bg-surface ${
                      selectedOrder?.id === order.id
                        ? "bg-surface"
                        : ""
                    }`}
                  >
                    <td className="p-3 font-medium">{order.id}</td>
                    <td className="p-3">{order.supplier}</td>
                    <td className="p-3 text-center">
                      <Badge
                        variant={
                          order.status === "Pending"
                            ? "warning"
                            : order.status === "Allocated"
                            ? "info"
                            : "success"
                        }
                      >
                        {order.status}
                      </Badge>
                    </td>
                    <td className="p-3 text-center">₹{order.total}</td>
                    <td className="p-3 text-center">{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>

          </GlassCard>
        </div>
      </div>

      {/* RIGHT PANEL */}
      {selectedOrder && (
        <div className="w-[380px] border-l border-border bg-surface/60 backdrop-blur-md flex flex-col">

          {/* HEADER */}
          <div className="p-5 border-b border-border flex justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-semibold">
                  {selectedOrder.id}
                </h2>

                <Badge variant="warning">
                  {selectedOrder.status}
                </Badge>
              </div>

              <p className="text-xs text-text-muted mt-1">
                {selectedOrder.date}
              </p>
            </div>

            <button onClick={() => setSelectedOrder(null)}>
              <Icon name="x" />
            </button>
          </div>

          {/* BODY */}
          <div className="p-5 space-y-5 overflow-y-auto">

            {/* SUPPLIER */}
            <GlassCard className="p-4 text-center">
              <div className="w-12 h-12 rounded-full bg-surface mx-auto mb-2" />
              <p className="font-medium">{selectedOrder.supplier}</p>
              <p className="text-xs text-text-muted">
                supplier@email.com
              </p>
            </GlassCard>

            {/* ITEMS */}
            <div>
              <h3 className="text-sm font-semibold mb-3">
                Order Items
              </h3>

              {selectedOrder.items.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 bg-surface rounded-lg mb-2"
                >
                  <div className="w-10 h-10 bg-background rounded" />

                  <div className="flex-1">
                    <p className="text-sm">{item.name}</p>
                    <p className="text-xs text-text-muted">
                      ₹{item.price} × {item.qty}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* TOTAL */}
            <div className="border-t border-border pt-3">
              <div className="flex justify-between mb-4">
                <span>Total</span>
                <span className="font-semibold">
                  ₹{selectedOrder.total}
                </span>
              </div>

              <div className="flex gap-2">
                <Button variant="secondary">
                  <Icon name="location" className="mr-1" />
                  Track
                </Button>

                <Button variant="warning">
                  <Icon name="refresh" className="mr-1" />
                  Modify
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}