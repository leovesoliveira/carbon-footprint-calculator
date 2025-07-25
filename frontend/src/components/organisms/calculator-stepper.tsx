import VerticalLinearStepper from "../atoms/vertical-linear-stepper";
import HousingStep from "../molecules/housing-step";
import TravelStep from "../molecules/travel-step";
import useCarbonFootprint from "../../hooks/use-carbon-footprint";
import { useStepperStore } from "../../stores/stepper.store";
import { useEffect } from "react";
import CarbonFootprint from "../molecules/carbon-footprint";

function CalculatorStepper() {
  const steps = [
    {
      label: "Your Housing Consumption",
      component: <HousingStep />,
    },
    {
      label: "Your Travel Consumption",
      component: <TravelStep />,
    },
  ];

  const { isCalculating, reset } = useCarbonFootprint();
  const { setIsCompleting } = useStepperStore();

  useEffect(() => {
    setIsCompleting(isCalculating);
  }, [isCalculating, setIsCompleting]);

  return (
    <VerticalLinearStepper
      steps={steps}
      completedComponent={<CarbonFootprint />}
      labelToComplete="Calculate"
      onReset={reset}
    />
  );
}

export default CalculatorStepper;
