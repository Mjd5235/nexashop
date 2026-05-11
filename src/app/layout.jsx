import { Geist, Geist_Mono } from "next/font/google";
import '@/styles/globals.css'
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "NexaShop",
  description: "NexaShop —Where Innovation Meets Shopping Excellence.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div>
          {children}
          <Toaster position="top-center" />
        </div>
      </body>
    </html>
  );
}
