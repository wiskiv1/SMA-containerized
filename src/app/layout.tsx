import type { Metadata } from "next";
import { Providers } from "../lib/auth/Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Stock Market Anywhere",
  description: "Simulate a stock market like sale platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
