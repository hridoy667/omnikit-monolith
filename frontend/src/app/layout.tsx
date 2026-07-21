import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/navbar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OmniKit Monolith",
  description: "Next.js Monolith application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable
      )}
    >
      <body className="min-h-screen flex flex-col bg-page text-text-primary">
        <TooltipProvider>
          {/* Top Sticky Navbar */}
          <Navbar />

          {/* Sidebar Provider wraps the area below Navbar */}
          <SidebarProvider className="flex-1 flex flex-row min-h-0">
            {/* Left Sidebar */}
            <AppSidebar />

            {/* Main Page Content */}
            <main className="flex-1 overflow-y-auto p-4 md:p-6">
              <SidebarTrigger className="mb-4 text-text-primary md:hidden" />
              {children}
            </main>
          </SidebarProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}