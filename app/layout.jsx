import { clsx } from "clsx";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Apple Timer - Easy web timer",
  description:
    "Welcome to online Apple Timer, discover the beautiful UX of Apple Timer inside a beautiful web app.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className={clsx(inter.className, "h-full")}>{children}</body>
    </html>
  );
}
