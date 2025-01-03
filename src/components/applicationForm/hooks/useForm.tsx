import React, { createContext, useContext, useState, ReactNode } from "react";
import { Step } from "../form";

interface FormControlsContextProps {
  currentPageIndex: number;
  historicPageIndex: number;
  delta: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  handleNext: () => void;
  handleBack: () => void;
  setCurrentPageIndex: (index: number) => void;
  setHistoricPageIndex: (index: number) => void;
}

const FormControlsContext = createContext<FormControlsContextProps | undefined>(undefined);

interface FormControlsProviderProps {
  steps: Step[];
  children: ReactNode;
}

export const FormControlsProvider: React.FC<FormControlsProviderProps> = ({ steps, children }) => {
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  const [historicPageIndex, setHistoricPageIndex] = useState<number>(0);

  const delta = currentPageIndex - historicPageIndex;

  const handleNext = () => {
    if (currentPageIndex === steps.length - 1) return;
    setCurrentPageIndex(currentPageIndex + 1);
    setHistoricPageIndex(currentPageIndex);
  };

  const handleBack = () => {
    if (currentPageIndex === 0) return;
    setCurrentPageIndex(currentPageIndex - 1);
    setHistoricPageIndex(currentPageIndex);
  };

  const hasNextPage = currentPageIndex < steps.length - 1;
  const hasPreviousPage = currentPageIndex > 0;

  return (
    <FormControlsContext.Provider
      value={{
        currentPageIndex,
        historicPageIndex,
        delta,
        hasNextPage,
        hasPreviousPage,
        handleNext,
        handleBack,
        setCurrentPageIndex,
        setHistoricPageIndex,
      }}
    >
      {children}
    </FormControlsContext.Provider>
  );
};

export const useFormControls = (): FormControlsContextProps => {
  const context = useContext(FormControlsContext);
  if (!context) {
    throw new Error("useFormControls must be used within a FormControlsProvider");
  }
  return context;
};
