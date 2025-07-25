import { ErrorOutlineRounded } from "@mui/icons-material";
import { Card, Typography } from "@mui/material";

function Error() {
  return (
    <Card
      variant="outlined"
      className="flex flex-col items-center py-4 my-4 bg-slate-50"
    >
      <ErrorOutlineRounded className="text-teal-700 text-5xl" />
      <Typography variant="h6" className="text-slate-700">
        Something went wrong!
      </Typography>
    </Card>
  );
}

export default Error;
