import * as path from "node:path"
import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    include: ["./test/**/*.test.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"]
  },
  resolve: {
    alias: {
      "@effect/typeclass/test": path.resolve(__dirname, "/test"),
      "@effect/typeclass": path.resolve(__dirname, "/src")
    }
  }
})
