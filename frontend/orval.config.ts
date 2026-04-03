import { defineConfig } from "orval";

export default defineConfig({
  pahalx: {
    output: {
      mode: "tags-split",
      target: "app/_api/client.ts",
      schemas: "app/_api/model",
      client: "react-query",
      clean: true,
      override: {
        mutator: {
          path: "app/query-fetch.ts",
          name: "queryFetch",
        },
      },
    },
    input: {
      target: "http://localhost:8000/openapi.json",
    },
  },
});
