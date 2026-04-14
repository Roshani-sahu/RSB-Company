import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import GlassCard from "../components/ui/GlassCard"
import Button from "../components/ui/Button"
import Badge from "../components/ui/Badge"
import Table from "../components/ui/Table"
import Icon from "../components/ui/Icon"

const dummyProducts = [
  {
    id: 1,
    name: "Premium Cotton T-Shirt",
    variant: "Black, Large",
    sku: "TS-BLK-L-001",
    category: "Apparel",
    stock: 450,
    min: 100,
    price: 24.99,
  },
  {
    id: 2,
    name: "ThinkPad X1 Carbon Gen 10",
    variant: "Serialized",
    sku: "TP-X1-G10-001",
    category: "Electronics",
    stock: 12,
    min: 20,
    price: 1499,
  },
  {
    id: 3,
    name: "Wireless Headphones",
    variant: "Silver",
    sku: "AUD-NC-SLV-02",
    category: "Electronics",
    stock: 0,
    min: 50,
    price: 299,
  },
]

function getStatus(stock, min) {
  if (stock === 0) return "out"
  if (stock < min) return "low"
  return "in"
}

export default function Inventory() {
  const [view, setView] = useState("list")
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("all")
  const [status, setStatus] = useState("all")
  const [selectedRows, setSelectedRows] = useState([])
  const navigate = useNavigate()

  // 🔍 FILTER LOGIC
  const filteredProducts = useMemo(() => {
    return dummyProducts.filter((item) => {
      const matchSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.sku.toLowerCase().includes(search.toLowerCase())

      const matchCategory =
        category === "all" || item.category === category

      const itemStatus = getStatus(item.stock, item.min)

      const matchStatus =
        status === "all" || status === itemStatus

      return matchSearch && matchCategory && matchStatus
    })
  }, [search, category, status])

  // 🧱 TABLE COLUMNS
  const columns = useMemo(() => [
    {
      key: "name",
      header: "Product",
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-surface flex items-center justify-center">
            <Icon name="box" />
          </div>
          <div>
            <p className="text-text-primary font-medium">{row.name}</p>
            <p className="text-xs text-text-muted">{row.variant}</p>
          </div>
        </div>
      ),
    },
    { key: "sku", header: "SKU" },
    { key: "category", header: "Category" },
    {
      key: "stock",
      header: "Stock",
      align: "right",
      render: (row) => (
        <div className="text-right">
          <p className="text-text-primary font-medium">{row.stock}</p>
          <p className="text-xs text-text-muted">Min: {row.min}</p>
        </div>
      ),
    },
    {
      key: "price",
      header: "Price",
      align: "right",
      render: (row) => `₹${row.price}`,
    },
    {
      key: "status",
      header: "Status",
      render: (row) => {
        const s = getStatus(row.stock, row.min)

        if (s === "in")
          return <Badge variant="success">In Stock</Badge>
        if (s === "low")
          return <Badge variant="warning">Low Stock</Badge>

        return <Badge variant="danger">Out of Stock</Badge>
      },
    },
  ], [])

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <section className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">
            Product Inventory
          </h1>
        </div>

        <div className="flex gap-2">
          <Button
            variant={view === "list" ? "primary" : "secondary"}
            onClick={() => setView("list")}
          >
            List
          </Button>
          <Button
            variant={view === "grid" ? "primary" : "secondary"}
            onClick={() => setView("grid")}
          >
            Grid
          </Button>

          <Button leftIcon={<Icon name="plus" />} onClick={() => navigate("/add-product")}>
            Add Product
          </Button>
        </div>
      </section>

      {/* FILTER BAR */}
      <GlassCard className="p-4 flex flex-wrap gap-3">

        <input
          placeholder="Search by name or SKU"
          className="px-3 py-2 rounded-lg bg-surface border border-border"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="px-3 py-2 rounded-lg bg-surface border border-border"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Apparel">Apparel</option>
        </select>

        <select
          className="px-3 py-2 rounded-lg bg-surface border border-border"
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="in">In Stock</option>
          <option value="low">Low Stock</option>
          <option value="out">Out of Stock</option>
        </select>
      </GlassCard>

      {/* LIST VIEW */}
      {view === "list" && (
        <GlassCard className="p-4">
          <Table
            columns={columns}
            rows={filteredProducts}
            selectable
            selectedRows={selectedRows}
            onSelect={setSelectedRows}
          />
        </GlassCard>
      )}

      {/* GRID VIEW */}
      {view === "grid" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((item) => {
            const status = getStatus(item.stock, item.min)

            return (
              <GlassCard key={item.id} className="p-5 flex flex-col">
                <div className="flex justify-between">
                  <span className="text-xs text-text-muted">
                    {item.sku}
                  </span>
                  <span className="font-semibold">
                    ₹{item.price}
                  </span>
                </div>

                <h3 className="mt-2 font-medium text-text-primary">
                  {item.name}
                </h3>

                <div className="mt-auto pt-4 flex justify-between items-center">
                  <span className="text-sm">
                    {item.stock} units
                  </span>

                  {status === "in" && (
                    <Badge variant="success">In Stock</Badge>
                  )}
                  {status === "low" && (
                    <Badge variant="warning">Low</Badge>
                  )}
                  {status === "out" && (
                    <Badge variant="danger">Out</Badge>
                  )}
                </div>
              </GlassCard>
            )
          })}
        </div>
      )}
    </div>
  )
}