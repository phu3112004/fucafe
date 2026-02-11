import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Fu Café",
  description:
    "Welcome to Fu Café - Your cozy corner for the best coffee and pastries in town.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <Toaster position="top-right" />
        {children}
        <Footer />
      </body>
    </html>
  );
}
