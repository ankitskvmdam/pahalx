import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  input: "http://localhost:8000/openapi.json",
  output: "./app/_api",
  plugins: [
    {
      name: "@hey-api/client-axios",
      runtimeConfigPath: "../api.runtime-config",
    },
  ],
});
