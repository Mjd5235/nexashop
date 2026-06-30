import { Geist, Geist_Mono } from "next/font/google";
import '@/styles/globals.css';
import { Toaster } from "react-hot-toast";
import { Inter } from 'next/font/google';

const InterSans = Inter({
  subsets: ["latin"],
  weight: ["400", "600", "800"],
})

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

interface layoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: layoutProps) {
  return (
    <html lang="en" >
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div className={InterSans.className}>
          {children}
          < Toaster position="top-center" />
        </div>
      </body>
    </html>
  );
}
