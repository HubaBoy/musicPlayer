import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([

  // ❌ GLOBAL IGNORE (ВАЖНО - ТУК!)
  {
    ignores: [
      "**/dist/**",
      "**/build/**",
      "**/node_modules/**"
    ],
  },

  js.configs.recommended,

  // 🌐 FRONTEND
  {
    files: ["client/**/*.{js,jsx}"],

    plugins: {
      react: pluginReact,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    rules: {
      "react/prop-types": "off",
      "no-unused-vars": "off",
      "no-undef": "off",
    },
  },

  // 🟢 BACKEND (ако го lint-ваш)
  {
    files: ["server/**/*.js"],

    languageOptions: {
      globals: {
        ...globals.node,
      },
    },

    rules: {
      "no-unused-vars": "off",
      "no-undef": "off",
    },
  },
]);