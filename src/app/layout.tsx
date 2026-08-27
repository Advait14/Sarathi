import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sarathi Journey",
  description: "A clearer driving licence application journey.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
