import { useFormContext } from "react-hook-form";
import MeassurementInput from "../atoms/measurement-input";
import { Unit } from "../../shared/unit";

function TravelStep() {
  const { control } = useFormContext();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
      <MeassurementInput
        name="travel.vehicle"
        label="Vehicle"
        unit={Unit.KILOMETER_PER_YEAR}
        helperText="distance in km per year"
        control={control}
      />

      <MeassurementInput
        name="travel.bus"
        label="Bus"
        unit={Unit.KILOMETER_PER_YEAR}
        helperText="distance in km per year"
        control={control}
      />

      <MeassurementInput
        name="travel.metro"
        label="Metro"
        unit={Unit.KILOMETER_PER_YEAR}
        helperText="distance in km per year"
        control={control}
      />

      <MeassurementInput
        name="travel.taxi"
        label="Taxi"
        unit={Unit.KILOMETER_PER_YEAR}
        helperText="distance in km per year"
        control={control}
      />

      <MeassurementInput
        name="travel.rail"
        label="Rail"
        unit={Unit.KILOMETER_PER_YEAR}
        helperText="distance in km per year"
        control={control}
      />

      <MeassurementInput
        name="travel.flight"
        label="Flight"
        unit={Unit.KILOMETER_PER_YEAR}
        helperText="distance in km per year"
        control={control}
      />
    </div>
  );
}

export default TravelStep;
