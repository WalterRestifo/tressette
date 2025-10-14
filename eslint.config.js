import tseslint from "typescript-eslint";
import unusedImports from "eslint-plugin-unused-imports";

export default tseslint.config({
  plugins: {
    "unused-imports": unusedImports,
  },
  rules: {
    "unused-imports/no-unused-imports": "warn",
  },
});
