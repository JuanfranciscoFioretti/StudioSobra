
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased bg-white overflow-x-hidden`}>
        <div className="min-h-screen w-full bg-white text-gray-900 font-serif relative">
          {children}
        </div>
      </body>
    </html>
  );
}