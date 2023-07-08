/// <reference types="vitest" />
import path from "path"
import { defineConfig } from "vite"

export default defineConfig({
  test: {
    include: ["./test/**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    exclude: ["./test/**/util.ts", "./test/instances/**"],
    globals: true,
    coverage: {
      provider: "c8"
    }
  },
  resolve: {
    alias: {
      "@effect/typeclass/test": path.resolve(__dirname, "/test"),
      "@effect/typeclass": path.resolve(__dirname, "/src")
    }
  }
})
