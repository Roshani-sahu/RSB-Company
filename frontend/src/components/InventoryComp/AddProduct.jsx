// AddProduct.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Icon from "../ui/Icon";

export default function AddProduct() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleNextStep = () => {
    if (currentStep < 2) setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSaveDraft = () => navigate("/inventory");
  const handleCancel = () => navigate("/inventory");

  const progressWidth = currentStep === 1 ? "w-1/2" : "w-full";

  return (
    <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative z-10 bg-bg">
      <main className="flex-1 overflow-y-auto scrollbar-hide ">
        <div className="mx-auto">
          {/* Header & Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight">
                {currentStep === 1 ? "Create New Product" : "Warehouse & Controls"}
              </h1>
              <p className="text-sm text-text-secondary mt-1">
                {currentStep === 1
                  ? "Add a new item to your inventory catalog."
                  : "Configure storage and tracking settings."}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {currentStep === 2 && (
                <button
                  onClick={handlePrevStep}
                  className="flex items-center gap-2 bg-panel border border-border/20 hover:bg-surface text-text-secondary px-4 py-2 rounded-xl text-sm transition-all"
                >
                  <Icon name="arrowLeft" className="text-xs" /> Previous
                </button>
              )}
              <button
                onClick={handleCancel}
                className="bg-panel border border-border/20 hover:bg-surface text-text-secondary px-4 py-2 rounded-xl text-sm transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveDraft}
                className="bg-panel border border-border/20 hover:bg-surface text-text-secondary px-4 py-2 rounded-xl text-sm transition-all"
              >
                Save Draft
              </button>
              <button
                onClick={handleNextStep}
                className="flex items-center gap-2 bg-accent hover:bg-[#7244eb] text-white px-5 py-2 rounded-xl text-sm font-medium transition-all shadow-[0_0_15px_rgba(96,47,247,0.2)]"
              >
                {currentStep === 1 ? "Next Step" : "Submit Product"}{" "}
                <Icon name="arrowRight" className="text-xs" />
              </button>
            </div>
          </div>

          {/* Progress Stepper */}
          <div className="mb-8">
            <div className="flex items-center justify-between relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-border/20 z-0"></div>
              <div
                className={`absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-accent z-0 transition-all duration-500 ${progressWidth}`}
              ></div>

              {/* Step 1 */}
              <div className="relative z-10 flex flex-col items-center gap-2">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-medium border-4 border-bg ${
                    currentStep >= 1
                      ? "bg-accent text-white shadow-[0_0_15px_rgba(96,47,247,0.3)]"
                      : "bg-panel text-text-muted border border-border/20"
                  }`}
                >
                  1
                </div>
                <span className={`text-xs font-medium ${currentStep >= 1 ? "text-text-primary" : "text-text-muted"}`}>
                  Core Details
                </span>
              </div>

              {/* Step 2 */}
              <div className="relative z-10 flex flex-col items-center gap-2">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-medium border-4 border-bg ${
                    currentStep >= 2
                      ? "bg-accent text-white shadow-[0_0_15px_rgba(96,47,247,0.3)]"
                      : "bg-panel text-text-muted border border-border/20"
                  }`}
                >
                  2
                </div>
                <span className={`text-xs font-medium ${currentStep >= 2 ? "text-text-primary" : "text-text-muted"}`}>
                  Warehouse & Controls
                </span>
              </div>
            </div>
          </div>

          {/* Step Content */}
          {currentStep === 1 && <Step1 formData={formData} setFormData={setFormData} />}
          {currentStep === 2 && (
            <Step2
              formData={formData}
              setFormData={setFormData}
              onBack={handlePrevStep}
              onSaveDraft={handleSaveDraft}
              onSubmit={() => console.log("Submit:", formData)}
            />
          )}

          {/* Bottom Actions */}
          <div className="mt-8 flex items-center justify-between pt-6 border-t border-border/20">
            <button
              onClick={handleCancel}
              className="bg-panel border border-border/20 hover:bg-surface text-text-secondary px-5 py-2.5 rounded-xl text-sm font-medium transition-all"
            >
              Cancel
            </button>
            <div className="flex gap-3">
              {currentStep === 2 && (
                <button
                  onClick={handlePrevStep}
                  className="flex items-center gap-2 bg-panel border border-border/20 hover:bg-surface text-text-secondary px-5 py-2.5 rounded-xl text-sm font-medium transition-all"
                >
                  <Icon name="arrowLeft" className="text-xs" /> Previous
                </button>
              )}
              <button
                onClick={handleSaveDraft}
                className="bg-panel border border-border/20 hover:bg-surface text-text-secondary px-5 py-2.5 rounded-xl text-sm font-medium transition-all"
              >
                Save as Draft
              </button>
              <button
                onClick={handleNextStep}
                className="flex items-center gap-2 bg-accent hover:bg-[#7244eb] text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-all shadow-[0_0_15px_rgba(96,47,247,0.2)]"
              >
                {currentStep === 1 ? "Next Step" : "Submit Product"}{" "}
                <Icon name="arrowRight" className="text-xs ml-1" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
