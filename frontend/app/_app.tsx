import type { AppProps } from "next/app";
import React from "react";

import { ToastProvider } from "@radix-ui/react-toast";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ToastProvider>
      <Component {...pageProps} />
    </ToastProvider>
  );
}
