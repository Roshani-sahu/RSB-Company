// Step1.jsx
import { useState, useRef } from 'react';
import GlassCard from '../ui/GlassCard';
import Icon from '../ui/Icon';
import Button from '../ui/Button';

export default function Step1({ formData, setFormData }) {
  const [tags, setTags] = useState(['Summer', 'New Arrival']);
  const [tagInput, setTagInput] = useState('');
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTag = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  const handleAutoGenerateSKU = () => {
    const randomSKU = 'SKU-' + Math.random().toString(36).substring(2, 10).toUpperCase();
    setFormData((prev) => ({ ...prev, sku: randomSKU }));
  };

  const handleFileUpload = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      console.log('Files selected:', files);
      setFormData((prev) => ({ ...prev, media: files }));
    }
  };

  const calculateMargin = () => {
    const cost = parseFloat(formData.costPrice) || 0;
    const selling = parseFloat(formData.sellingPrice) || 0;
    if (cost === 0) return 0;
    const margin = ((selling - cost) / cost) * 100;
    return margin.toFixed(2);
  };

  return (
    <div className="space-y-6">
      {/* Core Information Section */}
      <section className="glass-panel rounded-2xl p-6 lg:p-8">
        <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
          <Icon name="box" className="text-accent" />
          Basic Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-gray-300">
              Product Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="productName"
              value={formData.productName || ''}
              onChange={handleInputChange}
              className="w-full  bg-[#1a1b23]   border-surface-border rounded-xl py-2.5 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-sm"
              placeholder="e.g. Premium Cotton T-Shirt"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 flex justify-between">
              <span>SKU (Stock Keeping Unit) <span className="text-red-400">*</span></span>
              <button
                type="button"
                onClick={handleAutoGenerateSKU}
                className="text-xs text-accent hover:text-white transition-colors"
              >
                Auto-generate
              </button>
            </label>
            <input
              type="text"
              name="sku"
              value={formData.sku || ''}
              onChange={handleInputChange}
              className="w-full bg-[#1a1b23]   border-surface-border rounded-xl py-2.5 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-sm font-mono"
              placeholder="e.g. TS-BLK-L-001"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Barcode / UPC</label>
            <div className="relative">
              <input
                type="text"
                name="barcode"
                value={formData.barcode || ''}
                onChange={handleInputChange}
                className="w-full bg-[#1a1b23]   border-surface-border rounded-xl py-2.5 pl-4 pr-10 text-white placeholder-gray-500 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-sm"
                placeholder="Scan or enter barcode"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <button type="button" className="text-gray-400 hover:text-white">
                  <Icon name="barcode" />
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-gray-300">Description</label>
            <textarea
              name="description"
              value={formData.description || ''}
              onChange={handleInputChange}
              rows="3"
              className="w-full bg-[#1a1b23]   border-surface-border rounded-xl py-2.5 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-sm resize-none"
              placeholder="Detailed product description..."
            />
          </div>
        </div>
      </section>

      {/* Classification Section */}
      <section className="glass-panel rounded-2xl p-6 lg:p-8">
        <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
          <Icon name="tags" className="text-accent" />
          Classification
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 flex justify-between">
              Category <span className="text-red-400">*</span>
              <button type="button" className="text-xs text-accent hover:text-white transition-colors">
                <Icon name="plus" className="mr-1" /> New
              </button>
            </label>
            <div className="relative">
              <select
                name="category"
                value={formData.category || ''}
                onChange={handleInputChange}
                className="w-full bg-[#1a1b23]   border-surface-border rounded-xl py-2.5 pl-4 pr-10 text-white appearance-none focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-sm"
              >
                <option value="" disabled selected>Select a category</option>
                <option value="apparel">Apparel</option>
                <option value="electronics">Electronics</option>
                <option value="food">Food & Beverage</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Icon name="chevronDown" className="text-gray-500 text-xs" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Brand / Manufacturer</label>
            <div className="relative">
              <select
                name="brand"
                value={formData.brand || ''}
                onChange={handleInputChange}
                className="w-full bg-[#1a1b23]   border-surface-border rounded-xl py-2.5 pl-4 pr-10 text-white appearance-none focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-sm"
              >
                <option value="" disabled selected>Select brand</option>
                <option value="internal">Internal Brand</option>
                <option value="partner">Partner Brand</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Icon name="chevronDown" className="text-gray-500 text-xs" />
              </div>
            </div>
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-gray-300">Tags</label>
            <div className="w-full bg-[#1a1b23]   border-surface-border rounded-xl p-2 min-h-[44px] flex flex-wrap gap-2 items-center focus-within:border-accent focus-within:ring-1 focus-within:ring-accent transition-all">
              {tags.map((tag, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1.5 bg-surface-card border border-surface-border px-2.5 py-1 rounded-lg text-xs text-gray-300"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(index)}
                    className="text-gray-500 hover:text-white ml-1"
                  >
                    <Icon name="xmark" />
                  </button>
                </div>
              ))}
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                className="flex-1 bg-transparent border-none text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-0 min-w-[120px]"
                placeholder="Add tags..."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Media Section */}
      <section className="glass-panel rounded-2xl p-6 lg:p-8">
        <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
          <Icon name="image" className="text-accent" />
          Media
        </h2>

        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-surface-border rounded-xl p-8 text-center hover:bg-surface-card hover:border-gray-500 transition-all cursor-pointer group"
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          <div className="w-16 h-16 rounded-full bg-[#1a1b23]   border-surface-border flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/10 group-hover:border-accent/30 group-hover:text-accent transition-all">
            <Icon name="cloudArrowUp" className="text-2xl text-gray-400 group-hover:text-accent" />
          </div>
          <h3 className="text-sm font-medium text-white mb-1">Click to upload or drag and drop</h3>
          <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (max. 5MB)</p>
        </div>
      </section>

      {/* Costing & Pricing Section */}
      <section className="glass-panel rounded-2xl p-6 lg:p-8">
        <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
          <Icon name="dollarSign" className="text-accent" />
          Costing & Pricing
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Cost Price</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="text-gray-500 text-sm">$</span>
              </div>
              <input
                type="number"
                name="costPrice"
                value={formData.costPrice || ''}
                onChange={handleInputChange}
                className="w-full bg-[#1a1b23]   border-surface-border rounded-xl py-2.5 pl-8 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-sm"
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">
              Selling Price <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="text-gray-500 text-sm">$</span>
              </div>
              <input
                type="number"
                name="sellingPrice"
                value={formData.sellingPrice || ''}
                onChange={handleInputChange}
                className="w-full bg-[#1a1b23]   border-surface-border rounded-xl py-2.5 pl-8 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-sm"
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Tax Class</label>
            <div className="relative">
              <select
                name="taxClass"
                value={formData.taxClass || 'standard'}
                onChange={handleInputChange}
                className="w-full bg-[#1a1b23]   border-surface-border rounded-xl py-2.5 pl-4 pr-10 text-white appearance-none focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-sm"
              >
                <option value="standard">Standard Tax (20%)</option>
                <option value="reduced">Reduced Tax (5%)</option>
                <option value="zero">Zero Tax (0%)</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Icon name="chevronDown" className="text-gray-500 text-xs" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-surface-border flex items-center justify-between bg-[#1a1b23]/50 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <Icon name="chartPie" className="text-gray-400" />
            <div>
              <p className="text-sm font-medium text-white">Estimated Margin</p>
              <p className="text-xs text-gray-500">Based on cost and selling price</p>
            </div>
          </div>
          <span className="text-lg font-bold text-emerald-400">{calculateMargin()}%</span>
        </div>
      </section>

      {/* Advanced Controls Section */}
      <section className="glass-panel rounded-2xl p-6 lg:p-8">
        <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
          <Icon name="sliders" className="text-accent" />
          Inventory Controls
        </h2>

        <div className="space-y-6">
          {/* Toggle 1 */}
          <div className="flex items-start justify-between p-4 rounded-xl  border-surface-border bg-[#1a1b23] hover:border-gray-600 transition-colors">
            <div className="flex-1 pr-4">
              <h4 className="text-sm font-medium text-white mb-1">Track Serial Numbers</h4>
              <p className="text-xs text-gray-400">
                Require unique serial numbers for each unit when receiving or shipping.
              </p>
            </div>
            <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in mt-1">
              <input
                type="checkbox"
                name="trackSerialNumbers"
                id="toggle1"
                checked={formData.trackSerialNumbers || false}
                onChange={(e) => setFormData((prev) => ({ ...prev, trackSerialNumbers: e.target.checked }))}
                className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 border-[#1a1b23] appearance-none cursor-pointer transition-all duration-300 z-10"
              />
              <label
                htmlFor="toggle1"
                className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-600 cursor-pointer transition-colors duration-300"
              ></label>
            </div>
          </div>

          {/* Toggle 2 */}
          <div className="flex items-start justify-between p-4 rounded-xl  border-surface-border bg-[#1a1b23] hover:border-gray-600 transition-colors">
            <div className="flex-1 pr-4">
              <h4 className="text-sm font-medium text-white mb-1">Track Expiry Dates / Lots</h4>
              <p className="text-xs text-gray-400">
                Enable lot tracking and expiration date management for perishable goods.
              </p>
            </div>
            <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in mt-1">
              <input
                type="checkbox"
                name="trackExpiryDates"
                id="toggle2"
                checked={formData.trackExpiryDates || false}
                onChange={(e) => setFormData((prev) => ({ ...prev, trackExpiryDates: e.target.checked }))}
                className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 border-[#1a1b23] appearance-none cursor-pointer transition-all duration-300 z-10"
              />
              <label
                htmlFor="toggle2"
                className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-600 cursor-pointer transition-colors duration-300"
              ></label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-surface-border">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Unit of Measure (UOM)</label>
              <div className="relative">
                <select
                  name="uom"
                  value={formData.uom || 'pcs'}
                  onChange={handleInputChange}
                  className="w-full bg-[#1a1b23]   border-surface-border rounded-xl py-2.5 pl-4 pr-10 text-white appearance-none focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-sm"
                >
                  <option value="pcs">Pieces (pcs)</option>
                  <option value="box">Box</option>
                  <option value="kg">Kilograms (kg)</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Icon name="chevronDown" className="text-gray-500 text-xs" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Weight (per unit)</label>
              <div className="flex relative">
                <input
                  type="number"
                  name="weight"
                  value={formData.weight || ''}
                  onChange={handleInputChange}
                  className="w-full bg-[#1a1b23]   border-surface-border border-r-0 rounded-l-xl py-2.5 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-sm"
                  placeholder="0.00"
                />
                <select
                  name="weightUnit"
                  value={formData.weightUnit || 'kg'}
                  onChange={handleInputChange}
                  className="bg-[#13141a] border border-surface-border rounded-r-xl py-2.5 px-3 text-gray-300 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all appearance-none"
                >
                  <option>kg</option>
                  <option>lbs</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .toggle-checkbox:checked {
          right: 0;
          border-color: #602ff7;
        }
        .toggle-checkbox:checked + .toggle-label {
          background-color: #602ff7;
        }
        .glass-panel {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
      `}</style>
    </div>
  );
}