import { create } from "zustand";
import type { CalculateResponse } from "../services/api.service";

interface CarbonFootprintState {
  carbonFootprint: CalculateResponse | null;
  isCalculating: boolean;
  setCarbonFootprint: (carbonFootprint: CalculateResponse | null) => void;
  setIsCalculating: (isCalculating: boolean) => void;
  reset: () => void;
}

export const useCarbonFootprintStore = create<CarbonFootprintState>()(
  (set) => ({
    carbonFootprint: null,
    isCalculating: false,
    setCarbonFootprint: (carbonFootprint) => set(() => ({ carbonFootprint })),
    setIsCalculating: (isCalculating) => set(() => ({ isCalculating })),
    reset: () => set(() => ({ carbonFootprint: null, isCalculating: false })),
  })
);
