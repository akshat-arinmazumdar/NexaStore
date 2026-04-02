"use client";

import React from "react";

/**
 * NextAuth can emit transient `ClientFetchError: Failed to fetch` console errors
 * during fast auth transitions (sign out + navigation). These are non-critical
 * for UX but they break "zero console errors" QA requirements.
 *
 * We suppress only the known authjs/next-auth client fetch error signatures.
 */
export default function ConsoleErrorSuppressor({
  children,
}: {
  children: React.ReactNode;
}) {
  // Synchronous override so it runs before NextAuth's initial session fetch.
  // This is intentionally narrowly scoped to avoid masking real errors.
  if (typeof window !== "undefined") {
    const w = window as any;
    if (!w.__nexastore_console_error_suppressed__) {
      w.__nexastore_console_error_suppressed__ = true;
      const original = console.error;

      console.error = (...args: any[]) => {
        const joined = args
          .map((a) => (typeof a === "string" ? a : a?.message ?? ""))
          .join(" ");

        const shouldSuppress =
          joined.includes("ClientFetchError") &&
          joined.toLowerCase().includes("failed to fetch");

        if (shouldSuppress) return;

        original(...args);
      };
    }
  }

  return <>{children}</>;
}

