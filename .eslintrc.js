/* eslint-disable max-lines */

/**
 * Common jsdoc formatting rules
 */
const JSDOC_RULES = {
  require: {
    ArrowFunctionExpression: false,
    ClassDeclaration: true,
    ClassExpression: true,
    FunctionDeclaration: true,
    FunctionExpression: true,
    MethodDefinition: true,
  },
  contexts: [
    {
      context: "TSPropertySignature",
      inlineCommentBlock: true,
    },
    "TSEnumDeclaration",
    "TSTypeAliasDeclaration",
    "FunctionDeclaration",
    "ClassDeclaration",
  ],
};

module.exports = {
  globals: {
    // Allow for self to be a mirror of window
    self: true,
  },
  parser: "@typescript-eslint/parser",
  extends: [
    "airbnb-base",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:jsdoc/recommended",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:eslint-comments/recommended",
    "next",
    "prettier",
    "next/core-web-vitals",
  ],
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  plugins: [
    "import",
    "@typescript-eslint",
    "jsdoc",
    "react",
    "jsx-a11y",
    "react-hooks",
    "simple-import-sort",
    "unicorn",
  ],
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    // //////// //
    // Disabled //
    // //////// //

    /** Handled by prettier */
    "comma-dangle": 0,
    "operator-linebreak": 0,
    "implicit-arrow-linebreak": 0,
    "@typescript-eslint/indent": 0,
    "object-curly-newline": 0,
    "template-curly-spacing": 0,
    "newline-per-chained-call": 0,
    "generator-star-spacing": 0,
    "computed-property-spacing": 0,
    "space-before-function-paren": 0,
    indent: 0,
    "function-paren-newline": 0,
    "no-confusing-arrow": 0,
    "no-multi-spaces": 0,
    "object-property-newline": 0,
    "brace-style": 0,
    "no-nested-ternary": 0,

    /** handled by no-restricted-syntax */
    "guard-for-in": 0,

    /**
     * Use types instead of interfaces
     */
    "@typescript-eslint/prefer-interface": 0,
    "@typescript-eslint/interface-name-prefix": 0,
    "@typescript-eslint/no-empty-interface": 0,

    /** Use import lint rules */
    "@typescript-eslint/no-var-requires": 0,

    /** No types required in some places, because of typescript */
    "jsdoc/require-param-type": 0,
    "jsdoc/require-returns-type": 0,
    "react/prop-types": 0,
    "react/jsx-sort-props": 0,
    "react/require-default-props": 0,

    /** Because of @typescript-eslint, we don't need these */
    "no-use-before-define": 0,
    "no-shadow": 0,
    camelcase: 0,
    "no-var-requires": 0,
    "no-inferrable-types": 0,
    "unicorn/explicit-length-check": "error",

    /** Disabled react rules */
    "react/jsx-one-expression-per-line": 0,
    "jsx-a11y/heading-has-content": 0,

    /**
     * TS allows for public syntax in constructor to make a constructor
     * parameter assigned to the class instance. We use this often and so
     * the constructor is often empty
     */
    "no-useless-constructor": 0,

    /** Bad import rules, ignore them */
    "import/no-named-as-default": 0,
    "import/extensions": 0,
    "import/prefer-default-export": 0,

    // ///// //
    // Rules //
    // ///// //

    /** Use === instead of == */
    eqeqeq: ["error"],

    /**
     * Require class methods to call this
     */
    "class-methods-use-this": ["error"],

    /**
     * @typescript-eslint rules
     */
    "@typescript-eslint/unified-signatures": ["error"],
    "@typescript-eslint/adjacent-overload-signatures": ["error"],
    "@typescript-eslint/explicit-function-return-type": [
      "error",
      { allowExpressions: true },
    ],
    "@typescript-eslint/explicit-module-boundary-types": 0,

    /** JSdoc Validation */
    "jsdoc/require-jsdoc": ["error", JSDOC_RULES],
    "jsdoc/check-types": ["error"],
    "jsdoc/check-param-names": ["error", { checkDestructured: false }],
    "jsdoc/require-returns": ["error"],
    "jsdoc/no-types": ["error"],
    "jsdoc/require-param": ["error", { checkDestructured: false }],
    "jsdoc/require-param-description": ["error"],
    "jsdoc/require-returns-description": ["error"],
    "jsdoc/require-hyphen-before-param-description": ["error"],
    "jsdoc/require-description": [
      "error",
      {
        contexts: JSDOC_RULES.contexts.map(
          (context) => context.context || context
        ),
      },
    ],

    /** Import validation */
    "import/imports-first": ["error"],
    "import/newline-after-import": ["error"],
    "import/no-dynamic-require": ["error"],
    "import/no-unresolved": ["error"],
    "import/no-webpack-loader-syntax": ["error"],

    /**
     * No console logs anywhere. They are bad and should only be used for debugging.
     */
    "no-console": ["error"],

    /** Use template strings for concatenation */
    "prefer-template": ["error"],

    /**
     * Limits on file size and line length, for readability
     */
    "max-len": ["error", 150, { comments: 150 }],

    /** Require curly brackets around newlines */
    curly: ["error"],

    /** Enforce consistent JSX quotes */
    "jsx-quotes": ["error", "prefer-double"],

    /** Accessibility on frontend react components */
    "jsx-a11y/aria-props": ["error"],
    "jsx-a11y/label-has-for": [
      "error",
      {
        required: {
          some: ["nesting", "id"],
        },
      },
    ],
    "jsx-a11y/mouse-events-have-key-events": ["error"],
    "jsx-a11y/role-has-required-aria-props": ["error"],
    "jsx-a11y/role-supports-aria-props": ["error"],

    /** React JSX Rules */
    "react/jsx-filename-extension": [
      "error",
      { extensions: [".js", ".jsx", "tsx"] },
    ],
    "react/jsx-first-prop-new-line": ["error", "multiline"],
    "react/jsx-boolean-value": ["error"],
    "react/jsx-no-target-blank": ["error"],
    "react/self-closing-comp": ["error"],
    "react/jsx-curly-brace-presence": ["error", { props: "never" }],

    /** Enforce hook rules */
    "react-hooks/rules-of-hooks": ["error"],

    /** Test for dangerously set HTML */
    "react/no-danger": ["error"],

    /** Ensure eslint-disable is not present when its not disabling any rule */
    "eslint-comments/no-unused-disable": ["error"],

    /** Arrow functions should have parentheses around inputs */
    "arrow-parens": ["error", "always"],
    "arrow-body-style": ["error", "as-needed"],

    /** Max lines in a file */
    "max-lines": ["error", 350],

    /** Generator functions should call `yield` */
    "require-yield": ["error"],

    /** Prefer for-of to for loop (in general we prefer map/forEach over for of as well) */
    "@typescript-eslint/prefer-for-of": ["error"],

    /** Should not alias this to another command */
    "@typescript-eslint/no-this-alias": ["error"],

    /** Prevent use of global variables */
    "no-restricted-globals": ["error"],

    /** No unnecessary async statements on a function */
    "require-await": ["error"],

    /**
     * If there are more than 4 arguments in a function, it should be refactored
     * to have fewer arguments. The easiest way of doing this is to create an
     * "options" parameter that holds all of the missing parameters
     *
     * @see https://eslint.org/docs/rules/max-params
     */
    "max-params": ["error", 4],

    /**
     * Sort imports
     *
     * @see https://github.com/lydell/eslint-plugin-simple-import-sort
     */
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",

    // No unused imports or variables. Convenient for pre-commit hook.
    "@typescript-eslint/no-unused-vars": 2,

    // //////// //
    // Warnings //
    // //////// //

    /** We want to eventually turn this to an error */
    "@typescript-eslint/ban-types": ["warn"],

    /** Accessibility rules */
    "jsx-a11y/media-has-caption": ["warn"],
    "jsx-a11y/click-events-have-key-events": ["warn"],
    "jsx-a11y/no-static-element-interactions": ["warn"],

    /** We disagree with these rules that are configured by eslint-config-preact */
    "constructor-super": "off",
    "no-redeclare": "off",
    "no-duplicate-imports": "off",
    "no-undef": "off",
    "no-dupe-class-members": "off",
    "no-unused-vars": "off", // we already have this covered by typescript-eslint config
    "no-empty": ["error"],
    "no-empty-pattern": ["error"],
    "react/no-direct-mutation-state": ["error"],
    "react/display-name": "off",
  },
  overrides: [
    // ///////// //
    // overrides //
    // ///////// //
    /**
     * Hooks modify their local parameters often, and so param
     * reassignments are allowed. Also the jsdoc comments are not
     * needed.
     */
    {
      files: ["**/hooks.ts"],
      rules: {
        "no-param-reassign": 0,
        "jsdoc/require-param": 0,
      },
    },
    /**
     * Javascript files can ignore type requirements as we typically want to
     * migrate these js files to typescript at some point.
     */
    {
      files: ["*.js"],
      rules: {
        "jsdoc/no-types": 0,
        "@typescript-eslint/explicit-function-return-type": 0,
      },
    },
    /**
     * TSX files are all props and state so jsdoc
     * params and returns are often redundant
     */
    {
      files: ["**/*.tsx"],
      rules: {
        "jsdoc/require-returns": 0,
        "jsdoc/require-param": 0,
        "no-empty-pattern": 0,
      },
    },
    /**
     * These are react components but the props types are defined explicitly
     * and so the extra comment is almost always redundant
     */
    {
      files: ["**/wrappers.ts"],
      rules: {
        "jsdoc/require-param": 0,
        "jsdoc/require-returns": 0,
        "no-empty-pattern": 0,
      },
    },
    {
      files: ["*.ts"],
      rules: {
        "simple-import-sort/imports": [
          "error",
          {
            groups: [
              // Side effect imports.
              ["^\\u0000"],
              // Anything not matched in another group.
              ["^"],
              // @main imports.
              ["^@main/"],
              // Relative imports.
              ["^\\."],
            ],
          },
        ],
      },
    },
  ],
  settings: {
    /** React settings based on version in monorepo */
    react: {
      version: "detect",
    },
    /** Allow typescript alias resolution */
    "import/resolver": {
      typescript: {},
    },
  },
};
/* eslint-enable max-lines */
