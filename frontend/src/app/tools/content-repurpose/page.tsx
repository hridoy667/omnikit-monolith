"use client";

import React, { useState } from "react";
import { Sparkles, Copy, Check, Mail, ArrowRight, RefreshCw, ChevronRight } from "lucide-react";

type Platform = "twitter" | "linkedin" | "newsletter";

// Custom Twitter / X SVG Icon
function TwitterXIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

// Custom LinkedIn SVG Icon
function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function SocialPostGeneratorPage() {
  const [inputText, setInputText] = useState("");
  const [activeTab, setActiveTab] = useState<Platform>("twitter");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const [generatedPosts, setGeneratedPosts] = useState<Record<Platform, string>>({
    twitter: "",
    linkedin: "",
    newsletter: "",
  });

  const handleGenerate = () => {
    if (!inputText.trim()) return;
    setIsGenerating(true);

    setTimeout(() => {
      setGeneratedPosts({
        twitter: `🚀 Excited to share key takeaways from our latest notes!\n\n1️⃣ Simplify your workflow\n2️⃣ Focus on high-impact output\n3️⃣ Leverage AI for fast drafting\n\nWhat's your main takeaway? 👇\n#Productivity #BuildInPublic`,
        linkedin: `Turning ideas into formatted social content doesn't have to take hours.\n\nHere is a breakdown of key insights:\n\n• Streamline your creative pipeline\n• Tailor message tone per platform\n• Consistency beats perfection every single time\n\nHow are you optimizing your content creation strategy this week? Let me know in the comments below!`,
        newsletter: `Subject: Quick Insights: Optimizing Your Workflow 💡\n\nHey Readers,\n\nWe recently compiled a set of rough notes and turned them into actionable tips for content execution.\n\nKey Takeaways:\n- Always start with raw thoughts before refining.\n- Adapt your voice based on where your audience hangs out.\n\nCatch you in the next update!\n\nBest,\nYour Team`,
      });
      setIsGenerating(false);
    }, 1200);
  };

  const handleCopy = () => {
    const textToCopy = generatedPosts[activeTab];
    if (!textToCopy) return;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentPost = generatedPosts[activeTab];

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Breadcrumb & Header */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-text-secondary">
          <span>Tools</span>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-text-primary">AI Social Post Generator</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
          AI Social Post Generator
        </h1>
        <p className="max-w-3xl text-sm text-text-secondary">
          Turn articles or rough notes into formatted Twitter, LinkedIn, and newsletter posts.
        </p>
      </div>

      {/* Main Split Container with equal-height stretch */}
      <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2">
        
        {/* LEFT PANE: Input Section */}
        <div className="flex flex-col justify-between rounded-xl border border-subtle bg-surface p-5 shadow-xs">
          <div className="flex flex-1 flex-col gap-3">
            <label htmlFor="notes-input" className="text-sm font-semibold text-text-primary">
              Source Notes or Article Link
            </label>
            <textarea
              id="notes-input"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste your article link or type rough notes here..."
              className="min-h-[260px] w-full flex-1 resize-none rounded-lg border border-subtle bg-page p-3.5 text-sm text-text-primary placeholder:text-text-secondary/50 focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary transition-all"
            />
          </div>

          <button
            type="button"
            onClick={handleGenerate}
            disabled={isGenerating || !inputText.trim()}
            className="group mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-accent-primary px-4 font-semibold text-white shadow-xs transition-all hover:bg-accent-primary-hover disabled:pointer-events-none disabled:opacity-50 cursor-pointer"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>Generating Posts...</span>
              </>
            ) : (
              <>
                <span>Generate Posts</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>
        </div>

        {/* RIGHT PANE: Output Section */}
        <div className="flex flex-col rounded-xl border border-subtle bg-surface p-5 shadow-xs">
          {/* Tab Navigation */}
          <div className="flex items-center gap-1.5 rounded-lg border border-subtle bg-page p-1">
            <button
              type="button"
              onClick={() => setActiveTab("twitter")}
              className={`flex flex-1 items-center justify-center gap-2 rounded-md py-2 text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "twitter"
                  ? "bg-surface text-accent-primary shadow-xs"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              <TwitterXIcon className="h-3.5 w-3.5" />
              <span>Twitter / X</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("linkedin")}
              className={`flex flex-1 items-center justify-center gap-2 rounded-md py-2 text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "linkedin"
                  ? "bg-surface text-accent-primary shadow-xs"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              <LinkedInIcon className="h-3.5 w-3.5" />
              <span>LinkedIn</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("newsletter")}
              className={`flex flex-1 items-center justify-center gap-2 rounded-md py-2 text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "newsletter"
                  ? "bg-surface text-accent-primary shadow-xs"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              <Mail className="h-3.5 w-3.5" />
              <span>Newsletter</span>
            </button>
          </div>

          {/* Output Content Container */}
          <div className="relative mt-4 flex min-h-[260px] flex-1 flex-col justify-between rounded-lg border border-subtle bg-page p-4">
            {currentPost ? (
              <p className="whitespace-pre-line text-sm text-text-primary leading-relaxed">
                {currentPost}
              </p>
            ) : (
              <div className="flex flex-1 flex-col items-center justify-center py-12 text-center text-text-secondary">
                <Sparkles className="h-8 w-8 text-accent-primary/40 mb-2" />
                <p className="text-xs font-medium">Your generated post preview will appear here.</p>
              </div>
            )}

            {/* Card Footer: Copy & Character Count */}
            {currentPost && (
              <div className="mt-4 flex items-center justify-between border-t border-subtle pt-3">
                <span className="text-xs font-medium text-text-secondary">
                  {currentPost.length} characters
                </span>

                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 rounded-md border border-subtle bg-surface px-3 py-1.5 text-xs font-semibold text-text-primary transition-all hover:bg-page hover:border-accent-primary/40 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-accent-secondary" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5 text-text-secondary" />
                      <span>Copy Post</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Promotion Placeholder (728x90) */}
      <div className="flex h-20 w-full items-center justify-center rounded-xl border border-dashed border-subtle bg-page text-xs font-bold uppercase tracking-widest text-text-secondary/40">
        Promotion Placeholder (728x90)
      </div>
    </div>
  );
}