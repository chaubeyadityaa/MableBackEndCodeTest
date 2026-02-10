import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
  baseDirectory: process.cwd(),
  recommendedConfig: true,
});

export default [
  // Use your current rules + plugins
  ...compat.extends("eslint:recommended"),
  ...compat.extends("plugin:@typescript-eslint/recommended"),
  ...compat.extends("plugin:prettier/recommended"),

  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
    rules: {
      "prettier/prettier": ["error"],
    },
  },
];
