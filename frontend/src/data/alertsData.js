export const alertsData = [
  {
    id: 'ALT-2031',
    title: 'Critical stockout risk for Premium Cotton T-Shirt',
    priority: 'Critical',
    status: 'Open',
    warehouse: 'New York (HQ)',
    sku: 'TS-001',
    updated: '8m ago',
    impact: 'Estimated lost revenue: $11,200/day',
    description:
      'Current on-hand quantity is 0 units while average daily sales remain at 57 units.',
    recommendation: 'Create emergency replenishment order and re-balance stock from London warehouse.',
  },
  {
    id: 'ALT-2030',
    title: 'Inbound PO delayed beyond SLA window',
    priority: 'High',
    status: 'In Review',
    warehouse: 'London',
    sku: 'PO-2024-089',
    updated: '22m ago',
    impact: 'Potential shortage in 2 days for 3 linked SKUs',
    description:
      'Supplier confirmed shipment delay by 48 hours due to customs hold. Current safety stock buffer is below threshold.',
    recommendation: 'Escalate to procurement and enable temporary substitute SKU routing.',
  },
  {
    id: 'ALT-2029',
    title: 'Inventory mismatch detected during cycle count',
    priority: 'Medium',
    status: 'Open',
    warehouse: 'Singapore',
    sku: 'VC-012',
    updated: '1h ago',
    impact: 'Variance: 4.3% across 26 bins',
    description:
      'Cycle count shows mismatch between scanned and expected quantities for vintage cap inventory.',
    recommendation: 'Run bin-level reconciliation and lock outbound picking for affected bins.',
  },
  {
    id: 'ALT-2028',
    title: 'Return rate anomaly on Polarized Sunglasses',
    priority: 'Low',
    status: 'Resolved',
    warehouse: 'New York (HQ)',
    sku: 'SG-045',
    updated: '5h ago',
    impact: 'Return ratio peaked at 7.2% then normalized',
    description:
      'Returns spiked due to packaging issue but stabilized after vendor fix deployed in last shipment.',
    recommendation: 'Keep weekly quality sampling enabled for the next 30 days.',
  },
]
