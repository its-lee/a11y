module.exports = {
  env: {
    browser: true,
    node: true
  },
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended', '@vue/prettier'],
  plugins: ['prettier', 'vue', 'todos', 'import'],
  parserOptions: {
    ecmaVersion: 2020,
    project: ['./tsconfig.json']
  },
  ignorePatterns: ['dist', 'coverage'],
  rules: {
    curly: ['error', 'all'],
    'prettier/prettier': ['error', { singleQuote: true, endOfLine: 'auto' }]
  },
  overrides: [
    // Defaulting the env to jest to permit jest globals has been removed since we're transitioning
    // to vitest which has better compatibility with vite & vue. If you want the below, add that
    // override in your project's eslintrc file.
    // {
    //   files: [
    //     "**/__tests__/*.{j,t}s?(x)",
    //     "**/tests/unit/**/*.spec.{j,t}s?(x)",
    //   ],
    //   env: { jest: true },
    // },
    // Certain rules only work on certain files types - notably the following won't work on JSON files (which we include for i18n linting).
    // Any such rules that only apply for both JS & TS-like code should go here (followed by specifically TS-like below) - see https://stackoverflow.com/questions/58510287/parseroptions-project-has-been-set-for-typescript-eslint-parser
    {
      files: ['*.js', '*.jsx', '*.ts', '*.tsx', '*.vue'],
      rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-unused-expressions': ['error', { allowTernary: true, allowShortCircuit: true }],
        'vue/no-deprecated-slot-attribute': 'off',
        'vue/html-self-closing': [
          'error',
          {
            html: { normal: 'always', void: 'always' }
          }
        ],
        'vue/attribute-hyphenation': ['error', 'always'],
        'vue/component-name-in-template-casing': [
          'error',
          'kebab-case',
          {
            ignores: [],
            registeredComponentsOnly: true
          }
        ],
        'vue/require-explicit-emits': ['error'],
        'space-before-function-paren': [
          'error',
          {
            anonymous: 'never',
            named: 'never',
            asyncArrow: 'always'
          }
        ],
        'vue/match-component-file-name': [
          'error',
          {
            extensions: ['vue'],
            shouldMatchCase: false
          }
        ],
        'vue/max-attributes-per-line': [
          2,
          {
            multiline: 1,
            singleline: 20
          }
        ],
        'vue/first-attribute-linebreak': [
          'error',
          {
            singleline: 'ignore',
            multiline: 'below'
          }
        ],
        'vue/no-unused-properties': [
          'error',
          {
            groups: ['props']
          }
        ],
        'vue/no-useless-mustaches': [
          'error',
          {
            ignoreIncludesComment: false,
            ignoreStringEscape: false
          }
        ],
        'vue/no-useless-v-bind': [
          'error',
          {
            ignoreIncludesComment: false,
            ignoreStringEscape: false
          }
        ],
        'vue/no-v-html': 'off',
        'todos/only-documented-todos': [
          'warn',
          {
            terms: ['todo'],
            location: 'start'
          }
        ],
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            argsIgnorePattern: '^_$',
            varsIgnorePattern: '^_$',
            caughtErrorsIgnorePattern: '^_$'
          }
        ],
        'vue/require-emit-validator': ['error'],
        'vue/custom-event-name-casing': [
          'error',
          'camelCase',
          {
            ignores: []
          }
        ],
        // We only want to use sort-imports for the sorting of declarations destructured from an
        // import as it can't distinguish between external and internal imports.
        'sort-imports': [
          'error',
          {
            ignoreCase: true,
            ignoreDeclarationSort: true
          }
        ],
        'import/order': [
          'error',
          {
            // Ideally we'd make this "always" - but that breaks when you have newlines introduced
            // by enough destructured assignments having to break over multiple lines.
            'newlines-between': 'always-and-inside-groups',
            alphabetize: {
              order: 'asc',
              orderImportKind: 'asc'
            }
          }
        ],
        'import/first': ['error'],
        'require-await': ['error'],
        'no-restricted-imports': [
          'error',
          // In dayjs@1.10.0 they added "module": "dayjs/esm" to their package.json - meaning that
          // you could have imported from 'esm' and Vite / any modern bundler would know to use
          // the ESM code in the esm folder. However, someone annoyingly reverted that in a patch
          // release as it was technically a breaking change.
          //   Instead, this change is slated for dayjs v2. However, at time of writing (2023/06/01),
          // that's been delayed for about a year, with no clear progress. For more information, see
          // the dayjs repo.
          //   So - until then, we'll tell people to use the right imports. When 2.0 is released,
          // then either this rule can be disabled per repository until it is removed from this config.
          {
            name: 'dayjs',
            message:
              'Please use dayjs/esm or dayjs/esm/* so that this codebase is compatible with modern ESM & Vite.'
          }
        ]
      }
    },
    {
      files: ['*.js', '*.jsx'],
      rules: {
        // We need to enforce casing rules here as the typescript casing rule only works on non-JS files.
        camelcase: ['error', { properties: 'never' }]
        // Yoodee has the import/no-unresolved rule - but we don't really wanna use it:
        //   - Our tsconfig already causes this to be implemented for .ts & .vue files - that leaves
        //     unit tests.
        //   - We'd then need to specify the import/resolver, which could be vite, it could be node
        //     - it depends on the build toolchain - which we want to be agnostic to.
        // "import/no-unresolved": ["error", { caseSensitiveStrict: true }]
      }
    },
    {
      files: ['*.ts', '*.tsx', '*.vue'],
      extends: ['@vue/typescript/recommended', '@vue/prettier/@typescript-eslint'],
      rules: {
        '@typescript-eslint/no-var-requires': 0,
        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: ['function', 'parameter'],
            format: ['camelCase'],
            leadingUnderscore: 'allow'
          },
          {
            selector: 'variable',
            format: ['camelCase', 'UPPER_CASE'],
            leadingUnderscore: 'allow'
          },
          {
            selector: 'typeLike',
            format: ['PascalCase'],
            leadingUnderscore: 'allow'
          }
        ],
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/explicit-module-boundary-types': ['error'],
        '@typescript-eslint/explicit-function-return-type': ['error'],
        // You shouldn't use no-undef in TS & Vue (which is essentially TS) as it breaks when using
        // modern Typescript (e.g. satisfies) - and baseline Typescript already does an equivalent
        // or better job:
        //
        // > We strongly recommend that you do not use the no-undef lint rule on TypeScript projects.
        // > The checks it provides are already provided by TypeScript without the need for
        // > configuration - TypeScript just does this significantly better.
        // (https://stackoverflow.com/questions/65054079/eslint-with-typescript-and-firebase-no-undef-error)
        'no-undef': 'off',
        // We can do better than the 'require-await' eslint rule in TS code by turning it off and
        // using the TS version.
        'require-await': 'off',
        // The same as the above, but enhanced for TS - prevents pointless async functions (those containing no awaits)
        '@typescript-eslint/require-await': 'error',
        // The actual rules that force you to await calls to async functions.
        '@typescript-eslint/no-floating-promises': ['error', { ignoreIIFE: true }],
        '@typescript-eslint/no-misused-promises': 'error',
        '@typescript-eslint/switch-exhaustiveness-check': 'error',
        // In Yoodee-land, this is implemented via "import/consistent-type-specifier-style": ["error"]
        // which requires you to specify what your build system is (vite, webpack, etc) - which we
        // want to stay agnostic against. The other reason we do this is to support vite (
        // https://vitejs.dev/guide/features.html#transpile-only):
        //   Vite uses esbuild to transpile TypeScript into JavaScript which is about 20~30x faster
        // than vanilla tsc, and HMR updates can reflect in the browser in under 50ms.
        //   Use the Type-Only Imports and Export syntax to avoid potential problems like type-only
        // imports being incorrectly bundled
        '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }]
        // This rule goes hand-in-hand with @typescript-eslint/consistent-type-imports. However,
        // we're only on @typescript-eslint@4.33 and this isn't added until @typescript-eslint@5.2.0
        // - we'll come back around and look at migrating as this will be a breaking change. This
        // one's not super urgent either as we tend to export one thing at a time rather than export {}.
        // "@typescript-eslint/consistent-type-exports": [
        //   "error",
        //   { fixMixedExportsWithInlineTypeSpecifier: false },
        // ],
      }
    }
  ]
};
