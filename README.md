# Text Converter & Kotlin Data Class Generator

A specialized utility for developers to convert JSON to Kotlin Data Classes and generate SCREAMING_SNAKE_CASE identifiers.

**Live Demo:** [https://text-converter-bice-five.vercel.app/](https://text-converter-bice-five.vercel.app/)

---

## ✨ Features

- **JSON to Kotlin**: Automatically generates Kotlin data classes from JSON strings.
  - Adds `@SerializedName` annotations (GSON).
  - Handles nested objects and lists.
  - Automatically appends `List` suffix to array fields.
  - Supports ignoring standard headers (like `headerResp`/`headerReq`).
- **Screaming Snake Case**: Converts text/identifiers to `SCREAMING_SNAKE_CASE("original")` format.
  - Extracts identifiers from Kotlin `val`/`var` declarations.
  - Supports bulk conversion.
- **Sleek UI**: Modern dark-mode interface with glass-morphism effects.

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

## 🛠️ Building for Production

```bash
npm run build
npm start
```

The production server will also run on **port 3001**.

---

## 📄 License

Distributed under the MIT License.
