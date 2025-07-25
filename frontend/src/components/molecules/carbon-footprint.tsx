import { Card, Divider, Grow } from "@mui/material";
import useCarbonFootprint from "../../hooks/use-carbon-footprint";
import Error from "../atoms/error";
import TotalEmissions from "../atoms/total-emissions";
import TotalEmissionsByCategory from "../atoms/total-emissions-by-category";

function CarbonFootprint() {
  const { carbonFootprint } = useCarbonFootprint();

  return (
    <>
      {carbonFootprint ? (
        <Card variant="outlined" className="my-4">
          <Grow in timeout={800}>
            <div>
              <TotalEmissions emissions={carbonFootprint.totalEmissions} />
            </div>
          </Grow>

          <Divider />

          <Grow in timeout={1600}>
            <div>
              <TotalEmissionsByCategory
                name="Housing"
                emissions={carbonFootprint.housing.totalEmissions}
              />
            </div>
          </Grow>

          <Divider />

          <Grow in timeout={2400}>
            <div>
              <TotalEmissionsByCategory
                name="Travel"
                emissions={carbonFootprint.travel.totalEmissions}
              />
            </div>
          </Grow>
        </Card>
      ) : (
        <Error />
      )}
    </>
  );
}

export default CarbonFootprint;
