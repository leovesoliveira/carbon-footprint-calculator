import MeassurementInput from "../atoms/measurement-input";
import { useFormContext } from "react-hook-form";
import { Unit } from "../../shared/unit";

function HousingStep() {
  const { control } = useFormContext();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
      <MeassurementInput
        name="housing.electricity"
        label="Electricity"
        unit={Unit.KILOWATT_HOURS_PER_YEAR}
        helperText="consumption in kWh per year"
        control={control}
      />

      <MeassurementInput
        name="housing.naturalGas"
        label="Natural Gas"
        unit={Unit.THERMS_PER_YEAR}
        helperText="consumption in therm per year"
        control={control}
      />

      <MeassurementInput
        name="housing.fuelOil"
        label="Fuel Oil"
        unit={Unit.LITRES_PER_YEAR}
        helperText="consumption in litres per year"
        control={control}
      />

      <MeassurementInput
        name="housing.lpg"
        label="LPG"
        unit={Unit.LITRES_PER_YEAR}
        helperText="consumption in litres per year"
        control={control}
      />

      <MeassurementInput
        name="housing.waste"
        label="Waste"
        unit={Unit.KILOGRAMS_PER_WEEK}
        helperText="produced in kg per week"
        control={control}
      />

      <MeassurementInput
        name="housing.water"
        label="Water"
        unit={Unit.LITRES_PER_DAY}
        helperText="consumption in litres per day"
        control={control}
      />
    </div>
  );
}

export default HousingStep;
