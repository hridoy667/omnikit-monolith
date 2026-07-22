"use client";

import React, { useState } from "react";
import {
  ChevronRight,
  Link as LinkIcon,
  Wand2,
  Copy,
  Check,
  QrCode,
  Share2,
  Trash2,
  MousePointerClick,
  Globe,
  Zap,
} from "lucide-react";

interface RecentLink {
  id: string;
  shortUrl: string;
  originalUrl: string;
  clicks: number;
}

export default function URLShortenerPage() {
  const [longUrl, setLongUrl] = useState("");
  const [shortDomain, setShortDomain] = useState("omni.link");
  const [autoCopy, setAutoCopy] = useState(true);
  const [generateQR, setGenerateQR] = useState(true);

  // Output States
  const [shortUrl, setShortUrl] = useState("omni.link/x89k2a");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Mock Recent Links
  const [recentLinks, setRecentLinks] = useState<RecentLink[]>([
    {
      id: "1",
      shortUrl: "omni.link/promo2026",
      originalUrl: "https://marketing.site.com/campaigns/summer-special-discount-deal",
      clicks: 124,
    },
    {
      id: "2",
      shortUrl: "omni.link/portfolio-v3",
      originalUrl: "https://behance.net/profiles/creative-designer-showcase-2026",
      clicks: 892,
    },
  ]);

  const handleShorten = (e: React.FormEvent) => {
    e.preventDefault();
    if (!longUrl) return;

    // Generate random slug
    const randomSlug = Math.random().toString(36).substring(2, 8);
    const newShort = `${shortDomain}/${randomSlug}`;
    setShortUrl(newShort);

    // Add to recent list
    const newEntry: RecentLink = {
      id: Date.now().toString(),
      shortUrl: newShort,
      originalUrl: longUrl,
      clicks: 0,
    };
    setRecentLinks([newEntry, ...recentLinks]);

    if (autoCopy) {
      navigator.clipboard.writeText(`https://${newShort}`);
      setCopiedId("main");
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(`https://${text}`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = (id: string) => {
    setRecentLinks((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Breadcrumb & Header */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-text-secondary">
          <span>Tools</span>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-text-primary">URL Shortener</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
          URL Shortener
        </h1>
        <p className="max-w-3xl text-sm text-text-secondary">
          Transform long, complex URLs into concise, branded links in seconds.
        </p>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
        
        {/* LEFT COLUMN: Input Card + Ad Box below */}
        <div className="space-y-6 lg:col-span-6">
          <form
            onSubmit={handleShorten}
            className="rounded-xl border border-subtle bg-surface p-5 shadow-xs space-y-5"
          >
            {/* Long URL Input */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-text-primary">
                Enter Long URL
              </label>
              <div className="relative flex items-center">
                <LinkIcon className="absolute left-3 h-4 w-4 text-text-secondary/60" />
                <input
                  type="url"
                  required
                  value={longUrl}
                  onChange={(e) => setLongUrl(e.target.value)}
                  placeholder="https://example.com/very/long/path/name/to/shorten"
                  className="w-full rounded-xl border border-subtle bg-page pl-9 pr-3 py-2.5 text-xs font-medium text-text-primary focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary placeholder:text-text-secondary/50"
                />
              </div>
            </div>

            {/* Replacement Space: Domain Selector & Quick Options */}
            <div className="rounded-xl border border-subtle bg-page p-3.5 space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-text-secondary flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5 text-accent-primary" /> Quick Options
              </span>

              {/* Toggles */}
              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-subtle/50 text-[11px] font-semibold text-text-secondary">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={autoCopy}
                    onChange={(e) => setAutoCopy(e.target.checked)}
                    className="h-3.5 w-3.5 rounded border-subtle text-accent-primary focus:ring-accent-primary cursor-pointer"
                  />
                  <span>Auto-copy result</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={generateQR}
                    onChange={(e) => setGenerateQR(e.target.checked)}
                    className="h-3.5 w-3.5 rounded border-subtle text-accent-primary focus:ring-accent-primary cursor-pointer"
                  />
                  <span>Auto-generate QR</span>
                </label>
              </div>
            </div>

            {/* Primary Action Button */}
            <button
              type="submit"
              className="group flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-accent-primary text-sm font-semibold text-white shadow-xs transition-all hover:bg-accent-primary-hover active:scale-[0.99] cursor-pointer"
            >
              <span>Shorten Link</span>
              <Wand2 className="h-4 w-4" />
            </button>
          </form>

          {/* Ad Banner Placement directly under left card */}
          <div className="flex h-24 w-full items-center justify-center rounded-xl border border-dashed border-subtle bg-page text-xs font-bold uppercase tracking-widest text-text-secondary/40">
            PREMIUM AD PLACEMENT 728X90
          </div>
        </div>

        {/* RIGHT COLUMN: Output Card & Recent Links */}
        <div className="space-y-6 lg:col-span-6">
          {/* Main Result Card */}
          <div className="rounded-xl border border-subtle bg-surface p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                Your Link is Ready
              </span>
              <span className="rounded-full bg-accent-primary/10 px-2.5 py-0.5 text-[10px] font-bold text-accent-primary">
                -72% shorter
              </span>
            </div>

            {/* Shortened URL Output Display */}
            <div className="text-xl font-extrabold text-accent-primary tracking-tight">
              {shortUrl}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => copyToClipboard(shortUrl, "main")}
                className="flex h-10 flex-1 items-center justify-center gap-2 rounded-lg bg-text-primary text-xs font-bold text-white shadow-xs transition-all hover:bg-text-primary/90 cursor-pointer"
              >
                {copiedId === "main" ? (
                  <>
                    <Check className="h-4 w-4 text-accent-secondary" />
                    <span>Copied to Clipboard</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>

              <button
                type="button"
                aria-label="View QR Code"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-subtle bg-page text-text-primary hover:border-accent-primary/40 hover:bg-surface transition-all cursor-pointer"
              >
                <QrCode className="h-4 w-4" />
              </button>

              <button
                type="button"
                aria-label="Share Link"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-subtle bg-page text-text-primary hover:border-accent-primary/40 hover:bg-surface transition-all cursor-pointer"
              >
                <Share2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Recent Links Section */}
          <div className="rounded-xl border border-subtle bg-surface p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-subtle/60 pb-3">
              <h2 className="text-base font-bold text-text-primary">
                Recent Links
              </h2>
              <button
                type="button"
                className="text-xs font-bold text-accent-primary hover:underline cursor-pointer"
              >
                View All
              </button>
            </div>

            {/* List */}
            <div className="space-y-3">
              {recentLinks.map((item) => (
                <div
                  key={item.id}
                  className="rounded-lg border border-subtle bg-page p-3 space-y-2 transition-all hover:border-accent-primary/30"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate text-xs font-bold text-accent-primary">
                        {item.shortUrl}
                      </p>
                      <p className="truncate text-[11px] text-text-secondary">
                        {item.originalUrl}
                      </p>
                    </div>

                    {/* Clicks Badge */}
                    <div className="flex shrink-0 items-center gap-1 rounded-md bg-surface px-2 py-1 text-[10px] font-bold text-text-secondary border border-subtle">
                      <MousePointerClick className="h-3 w-3 text-accent-primary" />
                      <span>{item.clicks} Clicks</span>
                    </div>
                  </div>

                  {/* Actions Row */}
                  <div className="flex items-center gap-4 text-[11px] font-semibold text-text-secondary pt-1 border-t border-subtle/40">
                    <button
                      type="button"
                      onClick={() => copyToClipboard(item.shortUrl, item.id)}
                      className="flex items-center gap-1 hover:text-text-primary transition-colors cursor-pointer"
                    >
                      {copiedId === item.id ? (
                        <Check className="h-3 w-3 text-accent-secondary" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                      <span>{copiedId === item.id ? "Copied" : "Copy"}</span>
                    </button>

                    <button
                      type="button"
                      className="flex items-center gap-1 hover:text-text-primary transition-colors cursor-pointer"
                    >
                      <QrCode className="h-3 w-3" />
                      <span>QR</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      className="flex items-center gap-1 hover:text-accent-error transition-colors cursor-pointer"
                    >
                      <Trash2 className="h-3 w-3" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}