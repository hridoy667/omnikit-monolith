import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/navbar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SmoothScroll } from "@/components/smooth-scroll";

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
  title: {
    default: "Toolq — All-in-One AI & Developer Utility Suite",
    template: "%s | Toolq.io",
  },
  description:
    "Free, fast, and privacy-first web utilities. AI content generators, image compressors, PDF toolkits, QR suites, ATS resume builders, and developer tools in one place.",
  keywords: [
    "AI Tools",
    "Developer Tools",
    "Image Compressor",
    "PDF Toolkit",
    "QR Code Generator",
    "Resume Builder",
    "SEO Auditor",
    "URL Shortener",
  ],
  authors: [{ name: "Toolq.io Team" }],
  openGraph: {
    title: "Toolq — All-in-One AI & Developer Utility Suite",
    description:
      "Boost your productivity with free AI content repurposers, PDF suites, image compressors, and developer utilities.",
    type: "website",
    locale: "en_US",
    siteName: "Toolq.io",
  },
  twitter: {
    card: "summary_large_image",
    title: "Toolq.io— All-in-One AI & Developer Utility Suite",
    description:
      "Free, fast, and privacy-first web utilities. AI generators, media compressors, PDF toolkits, and developer tools.",
  },
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
        <SmoothScroll>
          <TooltipProvider>
            {/* Top Sticky Navbar */}
            <Navbar />

            {/* Sidebar Provider wraps the area below Navbar */}
            <SidebarProvider className="flex-1 flex flex-row min-h-0">
              {/* Left Sidebar */}
              <AppSidebar />

              {/* Main Page Content */}
              <main className="flex-1 overflow-y-auto">
                <SidebarTrigger className="mb-4 text-text-primary md:hidden" />
                {children}
              </main>
            </SidebarProvider>
          </TooltipProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}