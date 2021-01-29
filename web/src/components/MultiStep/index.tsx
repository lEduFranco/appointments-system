import React from 'react';
import { ReactElement, useState } from 'react';

import { ButtonsDiv, ButtonNextStep, ButtonBackStep } from './styles';

interface MultiStepProps {
  children: ReactElement[];
}

export default function MultiStep({ children }: MultiStepProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const numberOfSteps = children.length;

  function handleNextStep(): void {
    if (currentStep === numberOfSteps - 1) {
      return;
    }

    setCurrentStep(currentStep + 1);
  }

  function handlePreviousStep(): void {
    if (currentStep === 0) {
      return;
    }

    setCurrentStep(currentStep - 1);
  }

  return (
    <div>
      <div>
        {children.map((step, index) => {
          return (
            <div key={`step_${index}`} hidden={currentStep !== index}>
              {step}
            </div>
          );
        })}
      </div>

      <ButtonsDiv>
        <ButtonBackStep
          disabled={currentStep === 0}
          type="button"
          onClick={handlePreviousStep}
        >
          Previous
        </ButtonBackStep>
        <ButtonNextStep
          disabled={currentStep === numberOfSteps - 1}
          type="button"
          onClick={handleNextStep}
        >
          Next
        </ButtonNextStep>
      </ButtonsDiv>
    </div>
  );
}
