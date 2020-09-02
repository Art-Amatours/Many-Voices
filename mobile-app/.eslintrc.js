module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "react/jsx-filename-extension": [
      2,
      {
        extensions: [".tsx"],
      },
    ],
    // This may lead to more verbose code, but being able to easily see that a variable is
    // coming from props makes code more readable imo.
    "react/destructuring-assignment": 0,
    // Prevent "file extension missing" errors with Typescript files.
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        ts: "never",
        tsx: "never",
      },
    ],
  },
  settings: {
    // Prevent "unable to resolve path to module" errors.
    "import/resolver": {
      node: {
        extensions: [".ts", ".tsx"],
      },
    },
  },
};
