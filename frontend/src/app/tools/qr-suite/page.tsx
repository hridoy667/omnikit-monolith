"use client";

import React, { useState } from "react";
import {
  ChevronRight,
  Sparkles,
  Download,
  Link,
  Wifi,
  MoreVertical,
  QrCode,
} from "lucide-react";

type InputType = "URL" | "Text" | "Wi-Fi" | "Email";
type CornerStyle = "square" | "rounded" | "dots";

export default function QRCodeStudioPage() {
  const [inputType, setInputType] = useState<InputType>("URL");
  const [content, setContent] = useState<string>("https://example.com");
  
  // Styling States
  const [fgColor, setFgColor] = useState<string>("#1E1B2E");
  const [bgColor, setBgColor] = useState<string>("#FFFFFF");
  const [cornerStyle, setCornerStyle] = useState<CornerStyle>("square");

  // Mock Recent Generations for Right Column
  const recentGenerations = [
    {
      id: "1",
      title: "Portfolio Website",
      subtitle: "omnitools.dev/u/john-doe",
      icon: Link,
    },
    {
      id: "2",
      title: "Home Guest Wi-Fi",
      subtitle: "Generated 2 days ago",
      icon: Wifi,
    },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Breadcrumb & Header */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-text-secondary">
          <span>Tools</span>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-text-primary">QR Code Studio</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
          QR Code Studio
        </h1>
        <p className="max-w-3xl text-sm text-text-secondary">
          Create professional, custom-styled QR codes instantly for URLs, text, Wi-Fi networks, and more.
        </p>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
        
        {/* LEFT COLUMN: Main Controls + Ad Box below */}
        <div className="space-y-6 lg:col-span-6">
          {/* Main Controls Card */}
          <div className="rounded-xl border border-subtle bg-surface p-5 shadow-xs space-y-5">
            {/* Input Type Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-text-secondary">
                Input Type
              </label>
              <div className="flex flex-wrap gap-2">
                {(["URL", "Text", "Wi-Fi", "Email"] as InputType[]).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setInputType(type)}
                    className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                      inputType === type
                        ? "bg-accent-primary text-white shadow-xs"
                        : "bg-page text-text-secondary border border-subtle hover:text-text-primary"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Content Input Area */}
            <div className="space-y-2">
              <textarea
                rows={3}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="https://example.com or enter custom text..."
                className="w-full rounded-xl border border-subtle bg-page p-3 text-xs font-medium text-text-primary focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary placeholder:text-text-secondary/50 resize-none"
              />
            </div>

            <hr className="border-subtle/60" />

            {/* Colors & Corner Styles */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Color Controls */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-text-secondary">
                  Colors
                </label>
                <div className="space-y-2 text-xs font-semibold text-text-primary">
                  <div className="flex items-center justify-between">
                    <span>Foreground</span>
                    <div className="flex items-center gap-1.5">
                      {["#1E1B2E", "#312E81", "#047857", "#B91C1C"].map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => setFgColor(c)}
                          style={{ backgroundColor: c }}
                          className={`h-5 w-5 rounded-full transition-transform cursor-pointer ${
                            fgColor === c ? "ring-2 ring-accent-primary ring-offset-2 scale-110" : ""
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span>Background</span>
                    <div className="flex items-center gap-1.5">
                      {["#FFFFFF", "#F3F4F6", "#EEF2FF", "#CCFBF1"].map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => setBgColor(c)}
                          style={{ backgroundColor: c }}
                          className={`h-5 w-5 rounded-full border border-subtle transition-transform cursor-pointer ${
                            bgColor === c ? "ring-2 ring-accent-primary ring-offset-2 scale-110" : ""
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Corner Style Options */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-text-secondary">
                  Corner Style
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {/* Square */}
                  <button
                    type="button"
                    onClick={() => setCornerStyle("square")}
                    className={`flex flex-col items-center justify-center gap-1.5 rounded-lg border p-2.5 transition-all cursor-pointer ${
                      cornerStyle === "square"
                        ? "border-accent-primary bg-accent-primary/5 text-accent-primary"
                        : "border-subtle bg-page text-text-secondary hover:text-text-primary"
                    }`}
                  >
                    <div className="h-4 w-4 bg-current" />
                    <span className="text-[10px] font-bold">Square</span>
                  </button>

                  {/* Rounded */}
                  <button
                    type="button"
                    onClick={() => setCornerStyle("rounded")}
                    className={`flex flex-col items-center justify-center gap-1.5 rounded-lg border p-2.5 transition-all cursor-pointer ${
                      cornerStyle === "rounded"
                        ? "border-accent-primary bg-accent-primary/5 text-accent-primary"
                        : "border-subtle bg-page text-text-secondary hover:text-text-primary"
                    }`}
                  >
                    <div className="h-4 w-4 rounded-sm bg-current" />
                    <span className="text-[10px] font-bold">Rounded</span>
                  </button>

                  {/* Dots */}
                  <button
                    type="button"
                    onClick={() => setCornerStyle("dots")}
                    className={`flex flex-col items-center justify-center gap-1.5 rounded-lg border p-2.5 transition-all cursor-pointer ${
                      cornerStyle === "dots"
                        ? "border-accent-primary bg-accent-primary/5 text-accent-primary"
                        : "border-subtle bg-page text-text-secondary hover:text-text-primary"
                    }`}
                  >
                    <div className="h-4 w-4 rounded-full bg-current" />
                    <span className="text-[10px] font-bold">Dots</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Primary Action Button */}
            <button
              type="button"
              className="group flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-accent-primary text-sm font-semibold text-white shadow-xs transition-all hover:bg-accent-primary-hover active:scale-[0.99] cursor-pointer"
            >
              <Sparkles className="h-4 w-4" />
              <span>Generate QR Code</span>
            </button>
          </div>

          {/* Ad Banner Box Under Left Div */}
          <div className="flex h-24 w-full items-center justify-center rounded-xl border border-dashed border-subtle bg-page text-xs font-bold uppercase tracking-widest text-text-secondary/40">
            PREMIUM AD PLACEMENT
          </div>
        </div>

        {/* RIGHT COLUMN: Live QR Preview & Recent Generations */}
        <div className="space-y-6 lg:col-span-6">
          {/* Main Preview Card */}
          <div className="rounded-xl border border-subtle bg-surface p-5 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-subtle/60 pb-3">
              <h2 className="text-base font-bold text-text-primary">
                QR Code Preview
              </h2>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded-lg border border-subtle bg-page px-3 py-1.5 text-xs font-semibold text-text-primary transition-all hover:border-accent-primary/40 hover:bg-surface cursor-pointer"
              >
                <Download className="h-3.5 w-3.5 text-text-secondary" />
                <span>Download</span>
              </button>
            </div>

            {/* Visual Preview Container */}
            <div className="flex flex-col items-center justify-center rounded-xl bg-page p-8">
              <div
                style={{ backgroundColor: bgColor }}
                className="flex items-center justify-center rounded-xl p-6 shadow-sm border border-subtle"
              >
                {/* Generated QR Placeholder / Canvas */}
                <div className="relative flex h-48 w-48 items-center justify-center">
                  <QrCode
                    className="h-full w-full"
                    style={{ color: fgColor }}
                  />
                </div>
              </div>
            </div>

            {/* Metadata Footer */}
            <div className="grid grid-cols-3 border-t border-subtle/60 pt-3 text-center">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                  Format
                </p>
                <p className="text-xs font-bold text-text-primary">SVG</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                  Size
                </p>
                <p className="text-xs font-bold text-text-primary">1024 x 1024</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                  Correction
                </p>
                <p className="text-xs font-bold text-text-primary">High (30%)</p>
              </div>
            </div>
          </div>

          {/* Your Recent Generations */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-text-primary">
              Your Recent Generations
            </h3>
            <div className="space-y-2">
              {recentGenerations.map((item) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded-xl border border-subtle bg-surface p-3 transition-all hover:border-accent-primary/20"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-primary/10 text-accent-primary">
                        <IconComponent className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-xs font-bold text-text-primary">
                          {item.title}
                        </p>
                        <p className="truncate text-[11px] text-text-secondary">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      aria-label="Options"
                      className="p-1 text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}