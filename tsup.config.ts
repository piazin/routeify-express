import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/exceptions/index.ts", "src/decorators/index.ts"],
  format: ["cjs", "esm"],
  splitting: false,
  dts: true,
  sourcemap: true,
  clean: true,
});
