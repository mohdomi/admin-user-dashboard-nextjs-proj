import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ModeToggle } from "@/components/ModeToggle";
import "./globals.css";
import LandRouter from '@/components/Landing_router/LandRouter'
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FriendBook",
  description: "Open Registry for Collegemates.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster position="top-center"></Toaster>
          <div className="NAVBAR relative flex justify-end inset-0 m-2 p-3 px-5 w-full">
            <LandRouter></LandRouter>
            <ModeToggle />
          </div>
        {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
