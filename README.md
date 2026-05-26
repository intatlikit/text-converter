# Text Converter & Kotlin Data Class Generator

A specialized utility for developers to convert JSON to Kotlin Data Classes and generate SCREAMING_SNAKE_CASE identifiers.

**Live Demo:** [https://text-converter-bice-five.vercel.app/](https://text-converter-bice-five.vercel.app/)

---

## ✨ Features

- **JSON to Kotlin**: Automatically generates Kotlin data classes from JSON strings.
  - **GSON Ready**: Adds `@SerializedName` annotations to every field.
  - **Null Safety**: All fields are nullable with a default value of `null`.
  - **Nested Classes**: Generates nested data classes for complex JSON structures.
  - **List Detection**: Automatically appends `List` suffix to array fields and handles item types.
  - **Decimal Precision**: Preserves precision (e.g., distinguishing `20` from `20.00`).
  - **Smart Filtering**: Automatically ignores `headerResp` and `headerReq`.
  - **Content Scope**: Automatically zooms into the `content` field if present at the top level.
- **Screaming Snake Case**: Converts text/identifiers to `SCREAMING_SNAKE_CASE("original")` format.
  - **Kotlin Integration**: Extracts identifiers from Kotlin `val`/`var` declarations and annotations.
  - **Bulk Support**: Process multiple identifiers separated by spaces or newlines.
- **Modern UI**: Clean, responsive interface with dark mode support and glass-morphism effects.

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or later)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/text-converter.git
cd text-converter

# Install dependencies
npm install
```

### Development Server

Run the development server on **port 3001**:

```bash
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Library**: React 19
- **Language**: TypeScript
- **Styling**: CSS Modules (Vanilla CSS)
- **Testing**: Vitest with 97%+ coverage requirement

---

## 🧪 Testing

We maintain a high standard for code quality with strict coverage requirements.

```bash
# Run tests
npm run test

# Run tests with coverage report
npx vitest run --coverage
```

---

## 📄 License

Distributed under the MIT License.
