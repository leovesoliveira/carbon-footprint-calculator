import type { ApiService, CalculatePayload } from "../services/api.service";
import { BackendApiService } from "../services/backend-api.service";
import { useCarbonFootprintStore } from "../stores/carbon-footprint.store";

function useCarbonFootprint(apiService: ApiService = new BackendApiService()) {
  const {
    carbonFootprint,
    isCalculating,
    setCarbonFootprint,
    setIsCalculating,
    reset,
  } = useCarbonFootprintStore();

  const calculate = async (payload: CalculatePayload) => {
    setIsCalculating(true);

    try {
      const response = await apiService.calculate(payload);
      setCarbonFootprint(response);
    } finally {
      setIsCalculating(false);
    }
  };

  return { carbonFootprint, isCalculating, calculate, reset };
}

export default useCarbonFootprint;
