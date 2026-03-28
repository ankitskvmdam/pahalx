import type { CreateClientConfig } from "./_api/client.gen";

export const createClientConfig: CreateClientConfig = (config) => ({
  ...config,
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  auth: () => localStorage.getItem("access_token") || "",
});
