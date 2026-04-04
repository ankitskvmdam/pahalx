import React from "react";
import { DashboardContext } from "./context";
import { useRequestPahalLLMResponse } from "./use-request-pahal-llm-response";

export const DashboardProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { requestPahalLLMResponse } = useRequestPahalLLMResponse();

  return (
    <DashboardContext.Provider value={{ requestPahalLLMResponse }}>
      {children}
    </DashboardContext.Provider>
  );
};
