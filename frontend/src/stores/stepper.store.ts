import { create } from "zustand";

interface StepperState {
  activeStep: number;
  isCompleting: boolean;
  next: () => void;
  complete: () => void;
  back: () => void;
  reset: () => void;
  setIsCompleting: (isCompleting: boolean) => void;
}

export const useStepperStore = create<StepperState>()((set) => ({
  activeStep: 0,
  isCompleting: false,
  next: () => set((state) => ({ activeStep: state.activeStep + 1 })),
  complete: () =>
    set((state) => ({ activeStep: state.activeStep + 1, isCompleting: false })),
  back: () => set((state) => ({ activeStep: state.activeStep - 1 })),
  reset: () => set(() => ({ activeStep: 0, isCompleting: false })),
  setIsCompleting: (isCompleting) => set(() => ({ isCompleting })),
}));
