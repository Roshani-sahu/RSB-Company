// Step2.jsx
import { useState, useMemo } from 'react';
import Icon from '../ui/Icon';

export default function Step2({ formData, setFormData, onBack, onSaveDraft, onSubmit }) {
  // Warehouse allocations state
  const [warehouses, setWarehouses] = useState([
    {
      id: 1,
      name: 'Main Distribution Center',
      location: 'New York, NY',
      bin: '',
      quantity: 0,
    },
    {
      id: 2,
      name: 'West Coast Hub',
      location: 'Los Angeles, CA',
      bin: '',
      quantity: 0,
    },
  ]);

  // Supplier state
  const [supplier, setSupplier] = useState({
    primarySupplier: '',
    supplierSku: '',
    leadTime: '',
    moq: '',
  });

  // Reorder rules state
  const [reorderRules, setReorderRules] = useState({
    reorderPoint: '',
    reorderQuantity: '',
  });

  const handleWarehouseChange = (id, field, value) => {
    setWarehouses((prev) =>
      prev.map((warehouse) =>
        warehouse.id === id ? { ...warehouse, [field]: value } : warehouse
      )
    );
  };

  const addWarehouse = () => {
    const newId = Math.max(...warehouses.map((w) => w.id), 0) + 1;
    setWarehouses([
      ...warehouses,
      {
        id: newId,
        name: 'New Warehouse',
        location: 'Location',
        bin: '',
        quantity: 0,
      },
    ]);
  };

  const removeWarehouse = (id) => {
    setWarehouses(warehouses.filter((warehouse) => warehouse.id !== id));
  };

  const handleSupplierChange = (field, value) => {
    setSupplier((prev) => ({ ...prev, [field]: value }));
  };

  const handleReorderChange = (field, value) => {
    setReorderRules((prev) => ({ ...prev, [field]: value }));
  };

  // Calculate totals for preview
  const totalUnits = warehouses.reduce((sum, w) => sum + (Number(w.quantity) || 0), 0);
  const activeWarehouses = warehouses.filter((w) => w.bin || w.quantity).length;

  // Get product data from formData (passed from parent)
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

  return (
    <div className="max-w-7xl mx-auto flex flex-col xl:flex-row gap-8">
      {/* Left Column - Form Content */}
      <div className="flex-1 space-y-8">
        {/* Header & Actions */}
        {/* <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Create New Product
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Configure warehouse and inventory settings.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="bg-[#13141a] border border-surface-border hover:bg-surface-card text-gray-300 px-4 py-2 rounded-xl text-sm transition-all"
            >
              Back
            </button>
            <button
              onClick={onSaveDraft}
              className="bg-[#13141a] border border-surface-border hover:bg-surface-card text-gray-300 px-4 py-2 rounded-xl text-sm transition-all"
            >
              Save Draft
            </button>
            <button
              onClick={onSubmit}
              className="flex items-center gap-2 bg-accent hover:bg-[#7244eb] text-white px-5 py-2 rounded-xl text-sm font-medium transition-all shadow-[0_0_15px_rgba(96,47,247,0.2)]"
            >
              Create Product <Icon name="check" className="text-xs" />
            </button>
          </div>
        </div> */}

        {/* Progress Stepper */}
        {/* <div className="">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-surface-border z-0"></div>
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-accent z-0 transition-all duration-500"></div>

           
            <div className="relative z-10 flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center font-medium shadow-[0_0_15px_rgba(96,47,247,0.3)] border-4 border-[#0a0a0f]">
                <Icon name="check" className="text-sm" />
              </div>
              <span className="text-xs font-medium text-white">Core Details</span>
            </div>

            <div className="relative z-10 flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center font-medium shadow-[0_0_15px_rgba(96,47,247,0.3)] border-4 border-[#0a0a0f]">
                2
              </div>
              <span className="text-xs font-medium text-white">Warehouse & Controls</span>
            </div>
          </div>
        </div> */}

        {/* Form Content */}
        <div className="space-y-6">
          {/* Warehouse Allocation Section */}
          <section className="glass-panel rounded-2xl p-6 lg:p-8">
            <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <Icon name="warehouse" className="text-accent" />
              Initial Stock Allocation
            </h2>

            <div className="space-y-4">
              <div className="grid grid-cols-12 gap-4 text-xs font-medium text-gray-400 pb-2 border-b border-surface-border px-4">
                <div className="col-span-5">Warehouse / Location</div>
                <div className="col-span-3">Default Bin</div>
                <div className="col-span-3">Initial Quantity</div>
                <div className="col-span-1 text-right">Actions</div>
              </div>

              {warehouses.map((warehouse) => (
                <div
                  key={warehouse.id}
                  className="grid grid-cols-12 gap-4 items-center bg-[#1a1b23] border border-surface-border rounded-xl p-4"
                >
                  <div className="col-span-5 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-surface-card flex items-center justify-center text-accent">
                      <Icon name="building" />
                    </div>
                    <div>
                      <input
                        type="text"
                        value={warehouse.name}
                        onChange={(e) =>
                          handleWarehouseChange(warehouse.id, 'name', e.target.value)
                        }
                        className="text-sm font-medium text-white bg-transparent border-none focus:outline-none focus:ring-0 p-0"
                        placeholder="Warehouse Name"
                      />
                      <input
                        type="text"
                        value={warehouse.location}
                        onChange={(e) =>
                          handleWarehouseChange(warehouse.id, 'location', e.target.value)
                        }
                        className="text-xs text-gray-500 bg-transparent border-none focus:outline-none focus:ring-0 p-0 mt-0.5"
                        placeholder="Location"
                      />
                    </div>
                  </div>
                  <div className="col-span-3">
                    <input
                      type="text"
                      value={warehouse.bin}
                      onChange={(e) =>
                        handleWarehouseChange(warehouse.id, 'bin', e.target.value)
                      }
                      className="w-full bg-[#13141a] border border-surface-border rounded-lg py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-sm"
                      placeholder="e.g. A1-05"
                    />
                  </div>
                  <div className="col-span-3">
                    <input
                      type="number"
                      value={warehouse.quantity}
                      onChange={(e) =>
                        handleWarehouseChange(warehouse.id, 'quantity', parseInt(e.target.value) || 0)
                      }
                      className="w-full bg-[#13141a] border border-surface-border rounded-lg py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-sm"
                      placeholder="0"
                    />
                  </div>
                  <div className="col-span-1 text-right">
                    <button
                      onClick={() => removeWarehouse(warehouse.id)}
                      className="text-gray-500 hover:text-red-400 transition-colors"
                    >
                      <Icon name="trash" />
                    </button>
                  </div>
                </div>
              ))}

              <button
                onClick={addWarehouse}
                className="w-full py-3 border border-dashed border-surface-border rounded-xl text-sm font-medium text-accent hover:bg-surface-card transition-colors flex items-center justify-center gap-2"
              >
                <Icon name="plus" /> Add Warehouse Location
              </button>
            </div>
          </section>

          {/* Reorder & Replenishment Section */}
          <section className="glass-panel rounded-2xl p-6 lg:p-8">
            <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <Icon name="rotate" className="text-accent" />
              Reorder Rules
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  Reorder Point (Min Stock)
                </label>
                <input
                  type="number"
                  value={reorderRules.reorderPoint}
                  onChange={(e) => handleReorderChange('reorderPoint', e.target.value)}
                  className="w-full bg-[#1a1b23] border border-surface-border rounded-xl py-2.5 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-sm"
                  placeholder="e.g. 50"
                />
                <p className="text-xs text-gray-500">
                  Alert triggered when stock falls below this level.
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  Reorder Quantity (Max Stock)
                </label>
                <input
                  type="number"
                  value={reorderRules.reorderQuantity}
                  onChange={(e) => handleReorderChange('reorderQuantity', e.target.value)}
                  className="w-full bg-[#1a1b23] border border-surface-border rounded-xl py-2.5 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-sm"
                  placeholder="e.g. 200"
                />
                <p className="text-xs text-gray-500">
                  Target stock level when creating a purchase order.
                </p>
              </div>
            </div>
          </section>

          {/* Supplier Mapping Section */}
          <section className="glass-panel rounded-2xl p-6 lg:p-8">
            <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <Icon name="truckFast" className="text-accent" />
              Supplier Mapping
            </h2>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Primary Supplier</label>
                  <div className="relative">
                    <select
                      value={supplier.primarySupplier}
                      onChange={(e) => handleSupplierChange('primarySupplier', e.target.value)}
                      className="w-full bg-[#1a1b23] border border-surface-border rounded-xl py-2.5 pl-4 pr-10 text-white appearance-none focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-sm"
                    >
                      <option value="" disabled>Select supplier</option>
                      <option value="global">Global Textiles Inc.</option>
                      <option value="prime">Prime Electronics</option>
                      <option value="united">United Supplies Co.</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <Icon name="chevronDown" className="text-gray-500 text-xs" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">
                    Supplier SKU / Part Number
                  </label>
                  <input
                    type="text"
                    value={supplier.supplierSku}
                    onChange={(e) => handleSupplierChange('supplierSku', e.target.value)}
                    className="w-full bg-[#1a1b23] border border-surface-border rounded-xl py-2.5 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-sm"
                    placeholder="Their reference number"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-surface-border">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Lead Time (Days)</label>
                  <input
                    type="number"
                    value={supplier.leadTime}
                    onChange={(e) => handleSupplierChange('leadTime', e.target.value)}
                    className="w-full bg-[#1a1b23] border border-surface-border rounded-xl py-2.5 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-sm"
                    placeholder="e.g. 14"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">
                    Minimum Order Quantity (MOQ)
                  </label>
                  <input
                    type="number"
                    value={supplier.moq}
                    onChange={(e) => handleSupplierChange('moq', e.target.value)}
                    className="w-full bg-[#1a1b23] border border-surface-border rounded-xl py-2.5 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-sm"
                    placeholder="e.g. 100"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Right Sidebar (Preview Panel) */}
      <div className="w-full xl:w-80 flex-shrink-0 space-y-6">
        <div className="glass-panel rounded-2xl p-6 sticky top-24">
          <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider text-gray-400">
            Summary Preview
          </h3>

          <div className="space-y-4">
            {/* Product Snapshot */}
            <div className="flex gap-4 pb-4 border-b border-surface-border">
              <div className="w-16 h-16 rounded-xl bg-surface-card border border-surface-border flex items-center justify-center flex-shrink-0">
                <Icon name="image" className="text-gray-500 text-xl" />
              </div>
              <div>
                <p className="text-sm font-medium text-white line-clamp-1">{productName}</p>
                <p className="text-xs text-gray-500 font-mono mt-1">{sku}</p>
                <div className="mt-2 flex gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-accent/20 text-accent text-[10px] font-medium border border-accent/30">
                    {category}
                  </span>
                </div>
              </div>
            </div>

            {/* Financials */}
            <div className="pb-4 border-b border-surface-border space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Cost Price</span>
                <span className="text-white font-medium">${costPrice}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Selling Price</span>
                <span className="text-white font-medium">${sellingPrice}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Est. Margin</span>
                <span className="text-emerald-400 font-medium">{estimatedMargin}%</span>
              </div>
            </div>

            {/* Stock Summary */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Initial Allocation
              </h4>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Total Units</span>
                <span className="text-white font-medium">{totalUnits} pcs</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Warehouses</span>
                <span className="text-white font-medium">{activeWarehouses}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Reorder Point</span>
                <span className="text-white font-medium">
                  {reorderRules.reorderPoint || '—'} pcs
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .glass-panel {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}