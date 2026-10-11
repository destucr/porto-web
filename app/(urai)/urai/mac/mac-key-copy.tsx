"use client";

import { useEffect, useState } from "react";
import styles from "../urai.module.css";

/// The key arrives after "#" in the link Urai on the iPhone sent (browsers
/// never send that part to a server). Shown with a Copy button so the Mac
/// doesn't depend on Universal Clipboard, then removed from the address bar.
export function MacKeyCopy() {
  const [accessKey, setAccessKey] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const keyFromLink = new URLSearchParams(window.location.hash.slice(1)).get("key");
    if (keyFromLink?.startsWith("urai_")) {
      setAccessKey(keyFromLink);
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, []);

  if (!accessKey) {
    return (
      <p className={styles.macHint}>
        Open this page from Urai on your iPhone (Settings → Mac → Set Up on Mac → Send Link to Mac) to get your key here.
      </p>
    );
  }

  const copyKey = async () => {
    try {
      await navigator.clipboard.writeText(accessKey);
      setIsCopied(true);
    } catch {
      setIsCopied(false);
    }
  };

  return (
    <div className={styles.macKeyBox}>
      <code>{accessKey}</code>
      <button type="button" className={styles.primaryButton} onClick={copyKey}>
        {isCopied ? "Copied ✓" : "Copy Key"}
      </button>
    </div>
  );
}
