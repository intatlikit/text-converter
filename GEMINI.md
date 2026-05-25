# Project: Text Converter

A specialized utility for developers to convert JSON to Kotlin Data Classes and generate SCREAMING_SNAKE_CASE identifiers.

## Project Overview

- **Main Technologies**: Next.js 15 (App Router), React 19, TypeScript, CSS Modules.
- **Architecture**: A client-side web application where core logic is decoupled into the `lib/` directory.
- **Core Functionality**:
    - **JSON to Kotlin**: Converts JSON strings into robust Kotlin Data Classes.
    - **Screaming Snake**: Converts identifiers or code snippets into `SCREAMING_SNAKE_CASE("original")` format.

## Building and Running

- **Development**: `npm run dev` (Runs on [http://localhost:3001](http://localhost:3001))
- **Production Build**: `npm run build`
- **Production Start**: `npm start` (Runs on port 3001)
- **Linting**: `npm run lint`

## Development Conventions

### Pre-Push Validation (Mandatory)
- **Rule**: Before pushing any changes to `origin main`, you MUST run `npm run test` (or `npx vitest run --coverage`).
- **Requirements**:
    - **All tests must pass.**
    - **Code coverage must be at least 97%** (Statements/Lines).
- **Enforcement**: If these conditions are not met, the push is prohibited.

### Kotlin Generation (`lib/kotlinConverter.ts`)
- **Nullability**: All generated fields are nullable with a default value of `null`.
- **Annotations**: Every property is annotated with `@SerializedName` for GSON compatibility.
- **Nesting**: Nested JSON objects are generated as nested data classes within the parent class.
- **Naming**: 
    - Arrays are automatically suffixed with `List` (e.g., `items` becomes `itemsList`).
    - Standard headers like `headerResp` and `headerReq` are ignored by default.
- **Decimal Precision**: The converter attempts to preserve decimal precision (distinguishing between `20` and `20.00`) during parsing.

### Screaming Snake Conversion (`lib/snakeConverter.ts`)
- **Extraction**: Can extract identifiers from Kotlin `val` and `var` declarations.
- **Bulk Support**: Supports multi-line input and space-separated identifiers.
- **Format**: Outputs in the format `UPPER_CASE("original_identifier")`.

### UI & Styling
- **Styling**: Uses Vanilla CSS with CSS Modules (`*.module.css`).
- **Theme**: Supports dark mode via `prefers-color-scheme`.
- **UI Components**: Follows a modern, clean aesthetic with glass-morphism tendencies.

## Key Files
- `app/page.tsx`: The main entry point and UI logic.
- `lib/kotlinConverter.ts`: Core logic for JSON to Kotlin transformation.
- `lib/snakeConverter.ts`: Core logic for identifier conversion.
- `app/page.module.css`: Main layout and component styles.
