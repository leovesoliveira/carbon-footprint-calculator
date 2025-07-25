import {
  Box,
  Button,
  Paper,
  Step,
  StepContent,
  StepLabel,
  Stepper,
} from "@mui/material";
import { type ReactElement } from "react";
import { useStepperStore } from "../../stores/stepper.store";

type VerticalLinearStepper = {
  steps: {
    label: string;
    component: ReactElement;
  }[];
  completedComponent: ReactElement;
  labelToComplete?: string;
  onReset?: () => void;
};

function VerticalLinearStepper({
  steps,
  completedComponent,
  labelToComplete = "Complete",
  onReset,
}: VerticalLinearStepper) {
  const { activeStep, next, back, reset, isCompleting } = useStepperStore();

  const handleReset = () => {
    reset();
    onReset?.();
  };

  return (
    <Box>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
            <StepContent>
              {step.component}
              <Box className="flex gap-2 justify-end">
                {index === steps.length - 1 ? (
                  <Button
                    loading={isCompleting}
                    variant={isCompleting ? "outlined" : "contained"}
                    type="submit"
                  >
                    {labelToComplete}
                  </Button>
                ) : (
                  <Button variant="contained" onClick={next}>
                    Continue
                  </Button>
                )}

                <Button disabled={index === 0} onClick={back}>
                  Back
                </Button>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0}>
          {completedComponent}
          <Box className="flex gap-2 justify-center">
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </Paper>
      )}
    </Box>
  );
}

export default VerticalLinearStepper;
