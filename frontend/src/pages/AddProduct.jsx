// AddProduct.jsx
import { useState } from 'react';
import Step1 from '../components/InventoryComp/Step1';
import Step2 from '../components/InventoryComp/Step2';
import GlassCard from '../components/ui/GlassCard';
import Icon from '../components/ui/Icon';
import Button from '../components/ui/Button';

export default function AddProduct() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});

  const handleNextStep = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSaveDraft = () => {
    console.log('Draft saved:', formData);
    // Implement draft save logic
  };

  const handleCancel = () => {
    // Implement cancel/navigation logic
    console.log('Cancelled');
  };

  const progressWidth = currentStep === 1 ? 'w-1/2' : 'w-full';

  return (
    <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative z-10 bg-[#0a0a0f]">
      {/* Atmospheric Background */}
      {/* <div id="atmospheric-background" className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full bg-accent opacity-10 blur-[120px]"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#16C1F3] opacity-5 blur-[100px]"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDIiLz4KPC9zdmc+')] opacity-30 mix-blend-overlay"></div>
      </div> */}

      {/* Main Scrollable Area */}
      <main className="flex-1 overflow-y-auto scrollbar-hide p-6 lg:p-8">
        <div className="max-w-5xl mx-auto">
          {/* Header & Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {currentStep === 1 ? 'Create New Product' : 'Warehouse & Controls'}
              </h1>
              <p className="text-sm text-gray-400 mt-1">
                {currentStep === 1
                  ? 'Add a new item to your inventory catalog.'
                  : 'Configure storage and tracking settings.'}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleCancel}
                className="bg-[#13141a] border border-surface-border hover:bg-surface-card text-gray-300 px-4 py-2 rounded-xl text-sm transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveDraft}
                className="bg-[#13141a] border border-surface-border hover:bg-surface-card text-gray-300 px-4 py-2 rounded-xl text-sm transition-all"
              >
                Save Draft
              </button>
              <button
                onClick={handleNextStep}
                className="flex items-center gap-2 bg-accent hover:bg-[#7244eb] text-white px-5 py-2 rounded-xl text-sm font-medium transition-all shadow-[0_0_15px_rgba(96,47,247,0.2)]"
              >
                {currentStep === 1 ? 'Next Step' : 'Submit Product'}{' '}
                <Icon name="arrowRight" className="text-xs" />
              </button>
            </div>
          </div>

          {/* Progress Stepper */}
          <div className="mb-8">
            <div className="flex items-center justify-between relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-surface-border z-0"></div>
              <div
                className={`absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-accent z-0 transition-all duration-500 ${progressWidth}`}
              ></div>

              {/* Step 1 */}
              <div className="relative z-10 flex flex-col items-center gap-2">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-medium border-4 border-[#0a0a0f] ${
                    currentStep >= 1
                      ? 'bg-accent text-white shadow-[0_0_15px_rgba(96,47,247,0.3)]'
                      : 'bg-[#13141a] text-gray-500 border border-surface-border'
                  }`}
                >
                  1
                </div>
                <span
                  className={`text-xs font-medium ${currentStep >= 1 ? 'text-white' : 'text-gray-500'}`}
                >
                  Core Details
                </span>
              </div>

              {/* Step 2 */}
              <div className="relative z-10 flex flex-col items-center gap-2">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-medium border-4 border-[#0a0a0f] ${
                    currentStep >= 2
                      ? 'bg-accent text-white shadow-[0_0_15px_rgba(96,47,247,0.3)]'
                      : 'bg-[#13141a] text-gray-500 border border-surface-border'
                  }`}
                >
                  2
                </div>
                <span
                  className={`text-xs font-medium ${currentStep >= 2 ? 'text-white' : 'text-gray-500'}`}
                >
                  Warehouse & Controls
                </span>
              </div>
            </div>
          </div>

          {/* Step Content */}
          {currentStep === 1 && (
            <Step1 formData={formData} setFormData={setFormData} />
          )}
          {currentStep === 2 && (
            <Step2
              formData={formData}
              setFormData={setFormData}
              onBack={handlePrevStep}
              onSaveDraft={handleSaveDraft}
              onSubmit={() => console.log('Submit:', formData)}
            />
          )}

          {/* Bottom Actions */}
          <div className="mt-8 flex items-center justify-between pt-6 border-t border-surface-border">
            <button
              onClick={handleCancel}
              className="bg-[#13141a] border border-surface-border hover:bg-surface-card text-gray-300 px-5 py-2.5 rounded-xl text-sm font-medium transition-all"
            >
              Cancel
            </button>
            <div className="flex gap-3">
              <button
                onClick={handleSaveDraft}
                className="bg-[#13141a] border border-surface-border hover:bg-surface-card text-gray-300 px-5 py-2.5 rounded-xl text-sm font-medium transition-all"
              >
                Save as Draft
              </button>
              <button
                onClick={handleNextStep}
                className="flex items-center gap-2 bg-accent hover:bg-[#7244eb] text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-all shadow-[0_0_15px_rgba(96,47,247,0.2)]"
              >
                {currentStep === 1 ? 'Next Step' : 'Submit Product'}{' '}
                <Icon name="arrowRight" className="text-xs ml-1" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}