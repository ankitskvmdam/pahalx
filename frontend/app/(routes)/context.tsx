import React from "react";

export type TDashboardContext = {
  requestPahalLLMResponse: (chatId: number, user_message: string) => void;
};

export const DashboardContext = React.createContext<TDashboardContext>(
  null as unknown as TDashboardContext
);

export function useDashboardContext() {
  const context = React.useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
}
