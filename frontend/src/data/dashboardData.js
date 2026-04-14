export const dashboardAlert = {
  title: 'Critical Stock Alert',
  description:
    '18 items across 3 warehouses are completely out of stock. 63 items are below minimum threshold.',
}

export const dashboardKpis = [
  {
    id: 'inventory-value',
    title: 'Total Inventory Value',
    value: '$2.4M',
    icon: 'dollar',
    tone: 'accent',
    trend: { value: '12.5%', direction: 'up', context: 'vs last month' },
  },
  {
    id: 'low-stock',
    title: 'Low Stock Items',
    value: '63',
    icon: 'box',
    tone: 'danger',
    trend: { value: '5.2%', direction: 'up', context: 'vs last month' },
  },
  {
    id: 'orders-today',
    title: 'Orders Today',
    value: '1,248',
    icon: 'cart',
    tone: 'sky',
    trend: { value: '18.1%', direction: 'up', context: 'vs yesterday' },
  },
  {
    id: 'pending-pos',
    title: 'Pending POs',
    value: '24',
    icon: 'file',
    tone: 'warning',
    trend: { value: '0%', direction: 'flat', context: 'vs last week' },
  },
]

export const revenueChart = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  series: [
    {
      id: 'revenue',
      name: 'Revenue',
      values: [12000, 19000, 15000, 22000, 18000, 28000, 24000],
      color: 'rgb(var(--accent))',
      fill: 'rgb(var(--accent) / 0.16)',
    },
    {
      id: 'orders',
      name: 'Orders',
      values: [150, 230, 180, 290, 210, 350, 310],
      color: 'rgb(var(--sky))',
      dashed: true,
    },
  ],
}

export const warehouseCapacity = [
  { label: 'New York (HQ)', value: 85, color: 'rgb(var(--accent))' },
  { label: 'London', value: 62, color: 'rgb(var(--sky))' },
  { label: 'Singapore', value: 45, color: 'rgb(var(--text-muted))' },
]

export const topProducts = [
  {
    id: 'TS-001',
    product: 'Premium Cotton T-Shirt',
    sku: 'TS-001',
    sales: '1,245',
    revenue: '$31,125',
    category: 'Apparel',
  },
  {
    id: 'AS-003',
    product: 'Athletic Socks (3-Pack)',
    sku: 'AS-003',
    sales: '982',
    revenue: '$14,730',
    category: 'Accessories',
  },
  {
    id: 'VC-012',
    product: 'Vintage Baseball Cap',
    sku: 'VC-012',
    sales: '845',
    revenue: '$21,125',
    category: 'Headwear',
  },
  {
    id: 'SG-045',
    product: 'Polarized Sunglasses',
    sku: 'SG-045',
    sales: '620',
    revenue: '$55,800',
    category: 'Eyewear',
  },
]

export const quickActions = [
  { id: 'add-product', label: 'Add Product', icon: 'plus', tone: 'accent' },
  { id: 'create-po', label: 'Create PO', icon: 'file', tone: 'sky' },
  { id: 'transfer', label: 'Transfer', icon: 'swap', tone: 'success' },
  { id: 'scan', label: 'Scan', icon: 'scan', tone: 'warning' },
]

export const recentActivity = [
  {
    id: 'A-1',
    title: 'Stock Received',
    description: 'PO-2024-089 received at NY Warehouse. 500 units added.',
    time: '10m ago',
    tone: 'accent',
    icon: 'box',
  },
  {
    id: 'A-2',
    title: 'Order Shipped',
    description: 'SO-9923 dispatched via FedEx Express.',
    time: '1h ago',
    tone: 'success',
    icon: 'check',
  },
  {
    id: 'A-3',
    title: 'Low Stock Alert',
    description: 'SKU TS-001 dropped below minimum threshold (50 units).',
    time: '3h ago',
    tone: 'warning',
    icon: 'warning',
  },
]
