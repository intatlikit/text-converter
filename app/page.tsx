"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";
import { convertToScreamingSnake } from "../lib/snakeConverter";
import { convertJsonToKotlin } from "../lib/kotlinConverter";

type Mode = "kotlin" | "snake";

export default function Home() {
  const [mode, setMode] = useState<Mode>("kotlin");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copyText, setCopyText] = useState("Copy");

  useEffect(() => {
    handleConvert();
  }, [mode, input]);

  const handleConvert = () => {
    if (!input.trim()) {
      setOutput("");
      return;
    }

    if (mode === "kotlin") {
      setOutput(convertJsonToKotlin(input));
    } else {
      setOutput(convertToScreamingSnake(input));
    }
  };

  const handleModeChange = (newMode: Mode) => {
    setMode(newMode);
    setInput("");
    setOutput("");
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopyText("Copied!");
    setTimeout(() => setCopyText("Copy"), 2000);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Text Converter</h1>
        <p>Transform your data with ease</p>
      </header>

      <div className={styles.modeSelector}>
        <button
          className={`${styles.modeButton} ${mode === "kotlin" ? styles.modeButtonActive : ""}`}
          onClick={() => handleModeChange("kotlin")}
        >
          JSON to Kotlin
        </button>
        <button
          className={`${styles.modeButton} ${mode === "snake" ? styles.modeButtonActive : ""}`}
          onClick={() => handleModeChange("snake")}
        >
          Screaming Snake
        </button>
      </div>

      <main className={styles.mainGrid}>
        <section className={styles.section}>
          <div className={styles.labelRow}>
            <label className={styles.label}>
              {mode === "kotlin" ? "JSON Input" : "Text Input (one per line)"}
            </label>
            {input && (
              <button className={styles.clearInputButton} onClick={handleClear} title="Clear input">
                ✕
              </button>
            )}
          </div>
          <textarea
            className={styles.textarea}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              mode === "kotlin"
                ? '{\n  "name": "John",\n  "age": 30\n}'
                : "database.host_name\nmyApiKey"
            }
          />
        </section>

        <section className={`${styles.section} ${styles.outputArea}`}>
          <label className={styles.label}>Output</label>
          <button className={styles.copyButton} onClick={handleCopy} disabled={!output}>
            {copyText}
          </button>
          <textarea
            className={styles.textarea}
            value={output}
            readOnly
            placeholder="Result will appear here..."
          />
        </section>
      </main>

      <footer className={styles.footer}>
        <p>Built with Next.js & React 19</p>
      </footer>
    </div>
  );
}
