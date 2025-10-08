import React from 'react';
import { Check } from 'lucide-react';

const StepWizard = ({ steps, currentStep }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center flex-1">
            {/* Step Circle */}
            <div className={`relative flex flex-col items-center ${
              index < steps.length - 1 ? 'flex-1' : ''
            }`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                step.number < currentStep
                  ? 'bg-green-500 border-green-500 text-white'
                  : step.number === currentStep
                  ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/25'
                  : 'bg-white border-gray-300 text-gray-400'
              }`}>
                {step.number < currentStep ? (
                  <Check size={16} />
                ) : (
                  <span className="text-sm font-medium">{step.number}</span>
                )}
              </div>
              
              {/* Step Info */}
              <div className="mt-2 text-center">
                <p className={`text-xs font-medium ${
                  step.number <= currentStep ? 'text-gray-900' : 'text-gray-400'
                }`}>
                  {step.title}
                </p>
                <p className="text-xs text-gray-500 mt-1 hidden sm:block">
                  {step.description}
                </p>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className={`absolute top-5 left-1/2 w-full h-0.5 -z-10 ${
                  step.number < currentStep ? 'bg-green-500' : 'bg-gray-200'
                }`}></div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepWizard;