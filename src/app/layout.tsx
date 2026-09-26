import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ToastProvider } from "@/context/ToastContext";
import { PlanProvider } from "@/context/PlanContext";

const inter = localFont({
  variable: "--font-inter",
  src: [
    { path: "./assets/fonts/inter-400.woff2", weight: "400", style: "normal" },
    { path: "./assets/fonts/inter-500.woff2", weight: "500", style: "normal" },
    { path: "./assets/fonts/inter-600.woff2", weight: "600", style: "normal" },
    { path: "./assets/fonts/inter-700.woff2", weight: "700", style: "normal" },
  ],
});

const oswald = localFont({
  variable: "--font-oswald",
  src: [
    { path: "./assets/fonts/oswald-500.woff2", weight: "500", style: "normal" },
    { path: "./assets/fonts/oswald-600.woff2", weight: "600", style: "normal" },
    { path: "./assets/fonts/oswald-700.woff2", weight: "700", style: "normal" },
  ],
});

export const metadata: Metadata = {
  title: "FitLog — Workout Library",
  description:
    "FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${oswald.variable} h-full antialiased`}
      data-theme="fitlog"
    >
      <body className="min-h-full flex flex-col bg-base-100 text-base-content">
        <ToastProvider>
          <PlanProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </PlanProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
