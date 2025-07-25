import { TextField, type TextFieldProps } from "@mui/material";
import { useController, type UseControllerProps } from "react-hook-form";
import type { Unit } from "../../shared/unit";
import { NumericFormat, type NumericFormatProps } from "react-number-format";

type MeassurementInputProps = UseControllerProps &
  NumericFormatProps &
  TextFieldProps & { unit: Unit };

function MeassurementInput({
  control,
  name,
  unit,
  ...rest
}: MeassurementInputProps) {
  const { field: valueField } = useController({
    name: `${name}.value`,
    control,
  });
  const { field: unitField } = useController({
    name: `${name}.unit`,
    control,
    defaultValue: unit,
  });

  return (
    <>
      <NumericFormat
        onChange={valueField.onChange}
        onBlur={valueField.onBlur}
        value={valueField.value as string}
        name={valueField.name}
        inputRef={valueField.ref}
        defaultValue=""
        {...rest}
        customInput={TextField}
        slotProps={{
          input: {
            endAdornment: unit,
          },
        }}
        fullWidth
        decimalScale={2}
        fixedDecimalScale
        valueIsNumericString
      />

      <input {...unitField} type="hidden" />
    </>
  );
}

export default MeassurementInput;
