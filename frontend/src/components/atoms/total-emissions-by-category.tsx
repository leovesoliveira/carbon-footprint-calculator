import { Typography } from "@mui/material";

type TotalEmissionsByCategoryProps = {
  name: string;
  emissions: {
    value: string;
    unit: string;
  };
};

function TotalEmissionsByCategory({
  name,
  emissions,
}: TotalEmissionsByCategoryProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:gap-2 items-center justify-center py-4 bg-teal-50">
      <Typography variant="h6" className="text-teal-700">
        In {name} is:
      </Typography>
      <div className="flex items-center gap-1">
        <Typography variant="h5" className="font-bold text-teal-700">
          {emissions.value
            ? new Intl.NumberFormat("en-US").format(Number(emissions.value))
            : "0"}
        </Typography>
        <Typography variant="subtitle1" className="font-bold text-teal-700">
          {emissions.unit ?? ""}
        </Typography>
      </div>
    </div>
  );
}

export default TotalEmissionsByCategory;
