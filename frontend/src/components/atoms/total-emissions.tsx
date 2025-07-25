import { Typography } from "@mui/material";

type TotalEmissionsProps = {
  emissions: {
    value: string;
    unit: string;
  };
};

function TotalEmissions({ emissions }: TotalEmissionsProps) {
  return (
    <div className="flex flex-col items-center py-4 bg-teal-600">
      <Typography
        variant="h5"
        className="text-teal-100 leading-none text-center"
      >
        Your Carbon Footprint is:
      </Typography>
      <div className="flex flex-col items-center gap-1">
        <Typography
          variant="h4"
          className="font-bold text-white leading-8 mt-4"
        >
          {emissions.value
            ? new Intl.NumberFormat("en-US").format(Number(emissions.value))
            : "0"}
        </Typography>

        <Typography
          variant="h6"
          className="font-bold text-teal-100 leading-none"
        >
          {emissions.unit ?? ""}
        </Typography>
      </div>
    </div>
  );
}

export default TotalEmissions;
