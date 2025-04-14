"use client";

import { ThemeProvider } from "@/components/theme/theme-provider";

export default function FormViewer() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    ></ThemeProvider>
  );
}
