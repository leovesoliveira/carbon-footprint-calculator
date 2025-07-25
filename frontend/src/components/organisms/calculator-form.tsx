import { type PropsWithChildren } from "react";
import type { CalculatePayload } from "../../services/api.service";
import { FormProvider, useForm } from "react-hook-form";
import useCarbonFootprint from "../../hooks/use-carbon-footprint";
import { useStepperStore } from "../../stores/stepper.store";

type FormValues = CalculatePayload;

function CalculatorForm({ children }: PropsWithChildren) {
  const methods = useForm<FormValues>();
  const { calculate } = useCarbonFootprint();
  const { complete } = useStepperStore();

  const onSubmit = async ({ housing, travel }: FormValues) => {
    const payload = {
      housing: {
        electricity: housing.electricity?.value ? housing.electricity : null,
        naturalGas: housing.naturalGas?.value ? housing.naturalGas : null,
        fuelOil: housing.fuelOil?.value ? housing.fuelOil : null,
        lpg: housing.lpg?.value ? housing.lpg : null,
        waste: housing.waste?.value ? housing.waste : null,
        water: housing.water?.value ? housing.water : null,
      },
      travel: {
        vehicle: travel.vehicle?.value ? travel.vehicle : null,
        bus: travel.bus?.value ? travel.bus : null,
        metro: travel.metro?.value ? travel.metro : null,
        taxi: travel.taxi?.value ? travel.taxi : null,
        rail: travel.rail?.value ? travel.rail : null,
        flight: travel.flight?.value ? travel.flight : null,
      },
    };

    try {
      await calculate(payload);
    } catch (error) {
      console.error(error);
    } finally {
      complete();
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
}

export default CalculatorForm;
