// Step2.jsx
import { useState, useMemo } from 'react';
import Icon from '../ui/Icon';

export default function Step2({ formData, setFormData, onBack, onSaveDraft, onSubmit }) {
  const [warehouses, setWarehouses] = useState([
    { id: 1, name: 'Main Distribution Center', location: 'New York, NY', bin: '', quantity: 0 },
    { id: 2, name: 'West Coast Hub', location: 'Los Angeles, CA', bin: '', quantity: 0 },
  ]);

  const [supplier, setSupplier] = useState({
    primarySupplier: '',
    supplierSku: '',
    leadTime: '',
    moq: '',
  });

  const [reorderRules, setReorderRules] = useState({
    reorderPoint: '',
    reorderQuantity: '',
  });

  const handleWarehouseChange = (id, field, value) => {
    setWarehouses((prev) =>
      prev.map((w) => (w.id === id ? { ...w, [field]: value } : w))
    );
  };

  const addWarehouse = () => {
    const newId = Math.max(...warehouses.map((w) => w.id), 0) + 1;
    setWarehouses([...warehouses, { id: newId, name: 'New Warehouse', location: 'Location', bin: '', quantity: 0 }]);
  };

  const removeWarehouse = (id) => {
    setWarehouses(warehouses.filter((w) => w.id !== id));
  };

  const handleSupplierChange = (field, value) => setSupplier((prev) => ({ ...prev, [field]: value }));
  const handleReorderChange = (field, value) => setReorderRules((prev) => ({ ...prev, [field]: value }));

  const totalUnits = warehouses.reduce((sum, w) => sum + (Number(w.quantity) || 0), 0);
  const activeWarehouses = warehouses.filter((w) => w.bin || w.quantity).length;

  const productName = formData?.productName || 'Premium Cotton T-Shirt';
  const sku = formData?.sku || 'TS-BLK-L-001';
  const category = formData?.category || 'Apparel';
  const costPrice = formData?.costPrice || '12.50';
  const sellingPrice = formData?.sellingPrice || '29.99';

  const estimatedMargin = useMemo(() => {
    const cost = parseFloat(costPrice) || 0;
    const selling = parseFloat(sellingPrice) || 0;
    if (cost === 0) return '0';
    return (((selling - cost) / cost) * 100).toFixed(1);
  }, [costPrice, sellingPrice]);

  const inputCls = "w-full bg-surface border border-border/20 rounded-xl py-2.5 px-4 text-text-primary placeholder-text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-sm";
  const selectCls = "w-full bg-surface border border-border/20 rounded-xl py-2.5 pl-4 pr-10 text-text-primary appearance-none focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-sm";

  return (
    <div className="max-w-7xl mx-auto flex flex-col xl:flex-row gap-8">
      {/* Left Column */}
      <div className="flex-1 space-y-8">
        <div className="space-y-6">
          {/* Warehouse Allocation */}
          <section className="glass-panel rounded-2xl p-6 lg:p-8">
            <h2 className="text-lg font-semibold text-text-primary mb-6 flex items-center gap-2">
              <Icon name="warehouse" className="text-accent" />
              Initial Stock Allocation
            </h2>

            <div className="space-y-4">
              <div className="grid grid-cols-12 gap-4 text-xs font-medium text-text-muted pb-2 border-b border-border/20 px-4">
                <div className="col-span-5">Warehouse / Location</div>
                <div className="col-span-3">Default Bin</div>
                <div className="col-span-3">Initial Quantity</div>
                <div className="col-span-1 text-right">Actions</div>
              </div>

              {warehouses.map((warehouse) => (
                <div key={warehouse.id} className="grid grid-cols-12 gap-4 items-center bg-surface border border-border/20 rounded-xl p-4">
                  <div className="col-span-5 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-panel flex items-center justify-center text-accent">
                      <Icon name="building" />
                    </div>
                    <div>
                      <input
                        type="text"
                        value={warehouse.name}
                        onChange={(e) => handleWarehouseChange(warehouse.id, 'name', e.target.value)}
                        className="text-sm font-medium text-text-primary bg-transparent border-none focus:outline-none focus:ring-0 p-0"
                        placeholder="Warehouse Name"
                      />
                      <input
                        type="text"
                        value={warehouse.location}
                        onChange={(e) => handleWarehouseChange(warehouse.id, 'location', e.target.value)}
                        className="text-xs text-text-muted bg-transparent border-none focus:outline-none focus:ring-0 p-0 mt-0.5"
                        placeholder="Location"
                      />
                    </div>
                  </div>
                  <div className="col-span-3">
                    <input
                      type="text"
                      value={warehouse.bin}
                      onChange={(e) => handleWarehouseChange(warehouse.id, 'bin', e.target.value)}
                      className="w-full bg-panel border border-border/20 rounded-lg py-2 px-3 text-text-primary placeholder-text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-sm"
                      placeholder="e.g. A1-05"
                    />
                  </div>
                  <div className="col-span-3">
                    <input
                      type="number"
                      value={warehouse.quantity}
                      onChange={(e) => handleWarehouseChange(warehouse.id, 'quantity', parseInt(e.target.value) || 0)}
                      className="w-full bg-panel border border-border/20 rounded-lg py-2 px-3 text-text-primary placeholder-text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-sm"
                      placeholder="0"
                    />
                  </div>
                  <div className="col-span-1 text-right">
                    <button onClick={() => removeWarehouse(warehouse.id)} className="text-text-muted hover:text-red-400 transition-colors">
                      <Icon name="trash" />
                    </button>
                  </div>
                </div>
              ))}

              <button
                onClick={addWarehouse}
                className="w-full py-3 border border-dashed border-border/20 rounded-xl text-sm font-medium text-accent hover:bg-surface transition-colors flex items-center justify-center gap-2"
              >
                <Icon name="plus" /> Add Warehouse Location
              </button>
            </div>
          </section>

          {/* Reorder Rules */}
          <section className="glass-panel rounded-2xl p-6 lg:p-8">
            <h2 className="text-lg font-semibold text-text-primary mb-6 flex items-center gap-2">
              <Icon name="rotate" className="text-accent" />
              Reorder Rules
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-secondary">Reorder Point (Min Stock)</label>
                <input
                  type="number"
                  value={reorderRules.reorderPoint}
                  onChange={(e) => handleReorderChange('reorderPoint', e.target.value)}
                  className={inputCls}
                  placeholder="e.g. 50"
                />
                <p className="text-xs text-text-muted">Alert triggered when stock falls below this level.</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-text-secondary">Reorder Quantity (Max Stock)</label>
                <input
                  type="number"
                  value={reorderRules.reorderQuantity}
                  onChange={(e) => handleReorderChange('reorderQuantity', e.target.value)}
                  className={inputCls}
                  placeholder="e.g. 200"
                />
                <p className="text-xs text-text-muted">Target stock level when creating a purchase order.</p>
              </div>
            </div>
          </section>

          {/* Supplier Mapping */}
          <section className="glass-panel rounded-2xl p-6 lg:p-8">
            <h2 className="text-lg font-semibold text-text-primary mb-6 flex items-center gap-2">
              <Icon name="truckFast" className="text-accent" />
              Supplier Mapping
            </h2>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-secondary">Primary Supplier</label>
                  <div className="relative">
                    <select
                      value={supplier.primarySupplier}
                      onChange={(e) => handleSupplierChange('primarySupplier', e.target.value)}
                      className={selectCls}
                    >
                      <option value="" disabled>Select supplier</option>
                      <option value="global">Global Textiles Inc.</option>
                      <option value="prime">Prime Electronics</option>
                      <option value="united">United Supplies Co.</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <Icon name="chevronDown" className="text-text-muted text-xs" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-secondary">Supplier SKU / Part Number</label>
                  <input
                    type="text"
                    value={supplier.supplierSku}
                    onChange={(e) => handleSupplierChange('supplierSku', e.target.value)}
                    className={inputCls}
                    placeholder="Their reference number"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-border/20">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-secondary">Lead Time (Days)</label>
                  <input
                    type="number"
                    value={supplier.leadTime}
                    onChange={(e) => handleSupplierChange('leadTime', e.target.value)}
                    className={inputCls}
                    placeholder="e.g. 14"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-secondary">Minimum Order Quantity (MOQ)</label>
                  <input
                    type="number"
                    value={supplier.moq}
                    onChange={(e) => handleSupplierChange('moq', e.target.value)}
                    className={inputCls}
                    placeholder="e.g. 100"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Right Sidebar - Summary Preview */}
      <div className="w-full xl:w-80 flex-shrink-0 space-y-6">
        <div className="glass-panel rounded-2xl p-6 sticky top-24">
          <h3 className="text-sm font-bold text-text-muted mb-4 uppercase tracking-wider">
            Summary Preview
          </h3>

          <div className="space-y-4">
            {/* Product Snapshot */}
            <div className="flex gap-4 pb-4 border-b border-border/20">
              <div className="w-16 h-16 rounded-xl bg-surface border border-border/20 flex items-center justify-center flex-shrink-0">
                <Icon name="image" className="text-text-muted text-xl" />
              </div>
              <div>
                <p className="text-sm font-medium text-text-primary line-clamp-1">{productName}</p>
                <p className="text-xs text-text-muted font-mono mt-1">{sku}</p>
                <div className="mt-2 flex gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-accent/20 text-accent text-[10px] font-medium border border-accent/30">
                    {category}
                  </span>
                </div>
              </div>
            </div>

            {/* Financials */}
            <div className="pb-4 border-b border-border/20 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Cost Price</span>
                <span className="text-text-primary font-medium">${costPrice}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Selling Price</span>
                <span className="text-text-primary font-medium">${sellingPrice}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Est. Margin</span>
                <span className="text-emerald-500 font-medium">{estimatedMargin}%</span>
              </div>
            </div>

            {/* Stock Summary */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
                Initial Allocation
              </h4>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Total Units</span>
                <span className="text-text-primary font-medium">{totalUnits} pcs</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Warehouses</span>
                <span className="text-text-primary font-medium">{activeWarehouses}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Reorder Point</span>
                <span className="text-text-primary font-medium">{reorderRules.reorderPoint || '—'} pcs</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
