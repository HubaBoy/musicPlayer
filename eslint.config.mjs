import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([

  // ✅ Base JS rules
  js.configs.recommended,

  // 🌐 FRONTEND (React)
  {
    files: ["client/**/*.{js,jsx}", "**/*.{jsx}"],
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
      "no-undef": "off"   // 🔥 HERE
    },
  },

  // 🟢 BACKEND (Node / Electron / server)
  {
    files: ["server/**/*.js", "main.js"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      "no-unused-vars": "off",
      "no-undef": "off"
    },
  },
]);