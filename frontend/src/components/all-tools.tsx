"use client";

import { 
  Share2, 
  ImageIcon, 
  FileText, 
  QrCode, 
  FileUser, 
  ShieldCheck, 
  Globe, 
  Link2, 
  Keyboard, 
  Sparkles,
  Mail,
  Plus
} from "lucide-react";
import { ToolCard, type ToolItem } from "@/components/tool-card"


// Tool Items Array
const toolsList: ToolItem[] = [
  {
    id: "1",
    title: "AI Social Post Generator",
    description: "Turn articles or rough notes into formatted Twitter, LinkedIn, and newsletter posts.",
    url: "/tools/content-repurposer",
    icon: Share2,
    tags: ["AI Tool", "Social"],
    accent: "indigo",
  },
  {
    id: "2",
    title: "Image Compressor & Resizer",
    description: "Compress, resize, and convert single or bulk images with instant downloads.",
    url: "/tools/image-compressor",
    icon: ImageIcon,
    tags: ["Media", "Batch"],
    accent: "teal",
  },
  {
    id: "3",
    title: "Smart PDF Toolkit",
    description: "Merge, split, or generate quick AI summaries from your PDF documents.",
    url: "/tools/pdf-suite",
    icon: FileText,
    tags: ["PDF", "AI Tool"],
    accent: "indigo",
  },
  {
    id: "4",
    title: "QR Code Generator & Scanner",
    description: "Create custom QR codes or scan existing ones using your webcam.",
    url: "/tools/qr-suite",
    icon: QrCode,
    tags: ["Share", "Utility"],
    accent: "amber",
  },
  {
    id: "5",
    title: "AI Resume Builder",
    description: "Build ATS-friendly resumes with a real-time live preview panel.",
    url: "/tools/resume-builder",
    icon: FileUser,
    tags: ["AI Tool", "Career"],
    accent: "indigo",
  },
  {
    id: "6",
    title: "Secure File & Link Sharing",
    description: "Share files and links securely with self-expiring 24-hour temporary links.",
    url: "/tools/secure-generator",
    icon: ShieldCheck,
    tags: ["Security", "Privacy"],
    accent: "amber",
  },
  {
    id: "7",
    title: "Website SEO & Speed Auditor",
    description: "Check any website's SEO health, loading speed, and security score.",
    url: "/tools/seo-auditor",
    icon: Globe,
    tags: ["Dev", "SEO"],
    accent: "teal",
  },
  {
    id: "8",
    title: "URL Shortener",
    description: "Convert long links into short, shareable URLs in one click.",
    url: "/tools/url-shortener",
    icon: Link2,
    tags: ["Utility", "Share"],
    accent: "indigo",
  },
  {
    id: "9",
    title: "Keyboard Key Tester",
    description: "Test keyboard buttons on an interactive 1:1 screen layout.",
    url: "/tools/keyboard-tester",
    icon: Keyboard,
    tags: ["Hardware", "Dev"],
    accent: "teal",
  },
  {
    id: "10",
    title: "AI Draft Refiner & Word Counter",
    description: "Track text metrics, switch text cases, and fix draft grammar instantly with AI.",
    url: "/tools/text-utilities",
    icon: Sparkles,
    tags: ["Text", "AI Tool"],
    accent: "indigo",
  },
  {
    id: "11",
    title: "AI Cover Letter & Email Generator",
    description: "Generate targeted job application cover letters and professional emails in seconds.",
    url: "/tools/cover-letter-generator",
    icon: Mail,
    tags: ["AI Tool", "Career"],
    accent: "teal",
  },
];
export function ExploreToolsSection() {
  return (
    <section id="tools" className="w-full space-y-5 px-2 sm:px-4 py-6">
      {/* Section Heading */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-text-primary">
          Explore All Tools
        </h2>
      </div>

      {/* Grid containing 10 items total (9 Tool Cards + 1 Request Card) */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {toolsList.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}

        {/* 10th Card: Request a Tool */}
        <button
          type="button"
          className="flex flex-col items-center justify-center min-h-[220px] rounded-2xl border-2 border-dashed border-subtle bg-surface/40 p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-accent-primary/60 hover:bg-surface hover:shadow-xs group cursor-pointer"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-subtle bg-page text-text-secondary transition-colors group-hover:border-accent-primary group-hover:text-accent-primary">
            <Plus className="h-6 w-6" />
          </div>
          <span className="mt-3 font-semibold text-text-primary text-sm group-hover:text-accent-primary">
            Request a Tool
          </span>
        </button>
      </div>
    </section>
  );
}