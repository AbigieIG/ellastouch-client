import React from 'react';

interface StepProps {
  isActive: boolean;
}

const Step: React.FC<StepProps> = ({ isActive }) => {
  return (
    <div className="flex items-center">
      <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-blue-400' : 'bg-gray-300'}`}></div>
    </div>
  );
};

interface StepBarProps {
  currentStep: number;
}

const StepBar: React.FC<StepBarProps> = ({ currentStep }) => {
  const steps = [1, 2, 3, 4];

  return (
    <div className="w-full max-w-4xl mx-auto mt-5 md:px-10">
      <div className="flex items-center">
        {steps.map((_, index) => (
          <React.Fragment key={index}>
            <Step isActive={index < currentStep} />
            {index < steps.length - 1 && (
              <div className={`flex-1 h-[2px] ${index < currentStep - 1 ? 'bg-blue-400' : 'bg-gray-300'}`}></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default StepBar;
