import { defineConfig } from "oxlint";

export default defineConfig({
  plugins: [
    "eslint",
    "typescript",
    "unicorn",
    "react",
    "react-perf",
    "nextjs",
    "oxc",
    "import",
    "jsx-a11y",
  ],
  options: {},
  ignorePatterns: [".next/**", "out/**", "build/**", "next-env.d.ts"],
});
