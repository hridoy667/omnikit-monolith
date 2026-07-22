"use client";

import React, { useState } from "react";
import {
  UploadCloud,
  SlidersHorizontal,
  Lock,
  ArrowRight,
  Download,
  X,
  Info,
  ChevronRight,
  Archive,
} from "lucide-react";

type ExportFormat = "Original" | "WEBP" | "PNG" | "JPG";

interface ProcessedFile {
  id: string;
  name: string;
  originalSize: string;
  compressedSize: string;
  savedPercentage: number;
  previewUrl: string;
}

export default function ImageCompressorPage() {
  const [quality, setQuality] = useState<number>(80);
  const [width, setWidth] = useState<string>("1920");
  const [height, setHeight] = useState<string>("1080");
  const [lockAspect, setLockAspect] = useState<boolean>(true);
  const [exportFormat, setExportFormat] = useState<ExportFormat>("Original");

  // Mock processing queue items matching your screenshot
  const [queue, setQueue] = useState<ProcessedFile[]>([
    {
      id: "1",
      name: "hero-banner-main.webp",
      originalSize: "2.4 MB",
      compressedSize: "768 KB",
      savedPercentage: 68,
      previewUrl:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=150&q=80",
    },
    {
      id: "2",
      name: "product-display-01.avif",
      originalSize: "840 KB",
      compressedSize: "487 KB",
      savedPercentage: 42,
      previewUrl:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=150&q=80",
    },
    {
      id: "3",
      name: "footer-background-pattern.png",
      originalSize: "1.1 MB",
      compressedSize: "275 KB",
      savedPercentage: 75,
      previewUrl:
        "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=150&q=80",
    },
  ]);

  const handleRemove = (id: string) => {
    setQueue((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Breadcrumb & Header */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-text-secondary">
          <span>Tools</span>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-text-primary">Image Compressor & Resizer</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
          Image Compressor & Resizer
        </h1>
        <p className="max-w-3xl text-sm text-text-secondary">
          Effortlessly reduce image file sizes and adjust dimensions for the web without losing visual quality. Supports bulk processing for WEBP, PNG, and JPG.
        </p>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
        
        {/* LEFT COLUMN: Controls & Privacy Note */}
        <div className="space-y-4 lg:col-span-5">
          {/* Compression Settings Card */}
          <div className="rounded-xl border border-subtle bg-surface p-5 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-subtle/60 pb-3">
              <h2 className="text-base font-bold text-text-primary">
                Compression Settings
              </h2>
              <SlidersHorizontal className="h-4 w-4 text-text-secondary" />
            </div>

            {/* Drag & Drop Zone */}
            <div className="group relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-subtle bg-page p-6 text-center transition-all hover:border-accent-primary/50 hover:bg-surface cursor-pointer">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-accent-primary/10 text-accent-primary group-hover:scale-105 transition-transform">
                <UploadCloud className="h-5 w-5" />
              </div>
              <p className="text-xs font-semibold text-text-primary">
                Drag & drop images here, or click to browse
              </p>
              <p className="mt-1 text-[11px] text-text-secondary">
                Max 50MB per file • JPEG, PNG, WEBP, AVIF
              </p>
            </div>

            {/* Quality Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label className="font-semibold text-text-primary">Quality</label>
                <span className="font-semibold text-accent-primary">
                  {quality}% – Recommended
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-subtle accent-accent-primary"
              />
            </div>

            {/* Dimensions (px) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label className="font-semibold text-text-primary">
                  Dimensions (px)
                </label>
                <button
                  type="button"
                  onClick={() => setLockAspect(!lockAspect)}
                  className={`inline-flex items-center gap-1 font-semibold uppercase text-[10px] tracking-wider transition-colors cursor-pointer ${
                    lockAspect ? "text-accent-primary" : "text-text-secondary"
                  }`}
                >
                  <Lock className="h-3 w-3" />
                  <span>Lock Aspect</span>
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-xs font-bold text-text-secondary">
                    W
                  </span>
                  <input
                    type="text"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    className="w-full rounded-lg border border-subtle bg-page py-2 pl-8 pr-3 text-xs font-semibold text-text-primary focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary"
                  />
                </div>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-xs font-bold text-text-secondary">
                    H
                  </span>
                  <input
                    type="text"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="w-full rounded-lg border border-subtle bg-page py-2 pl-8 pr-3 text-xs font-semibold text-text-primary focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary"
                  />
                </div>
              </div>
            </div>

            {/* Export Format Segmented Control */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-text-primary">
                Export Format
              </label>
              <div className="grid grid-cols-4 gap-1 rounded-lg border border-subtle bg-page p-1">
                {(["Original", "WEBP", "PNG", "JPG"] as ExportFormat[]).map(
                  (fmt) => (
                    <button
                      key={fmt}
                      type="button"
                      onClick={() => setExportFormat(fmt)}
                      className={`rounded-md py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                        exportFormat === fmt
                          ? "bg-surface text-accent-primary shadow-xs"
                          : "text-text-secondary hover:text-text-primary"
                      }`}
                    >
                      {fmt}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Primary Action Button */}
            <button
              type="button"
              className="group flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-accent-primary text-sm font-semibold text-white shadow-xs transition-all hover:bg-accent-primary-hover active:scale-[0.99] cursor-pointer"
            >
              <span>Process Images</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Processing Queue */}
        <div className="flex flex-col justify-between rounded-xl border border-subtle bg-surface p-5 shadow-xs lg:col-span-7">
          <div className="space-y-5">
            {/* Queue Header */}
            <div className="flex items-center justify-between border-b border-subtle/60 pb-3">
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-text-primary">
                  Processing Queue
                </h2>
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent-primary text-[11px] font-bold text-white">
                  {queue.length}
                </span>
              </div>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded-lg border border-subtle bg-page px-3 py-1.5 text-xs font-semibold text-text-primary transition-all hover:border-accent-primary/40 hover:bg-surface cursor-pointer"
              >
                <Archive className="h-3.5 w-3.5 text-text-secondary" />
                <span>Download All (ZIP)</span>
              </button>
            </div>

            {/* Queue List */}
            {queue.length > 0 ? (
              <div className="space-y-3">
                {queue.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-3 rounded-xl border border-subtle bg-page p-3 transition-all hover:border-accent-primary/20 hover:shadow-xs"
                  >
                    {/* File Thumbnail & Name */}
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={item.previewUrl}
                        alt={item.name}
                        className="h-12 w-12 shrink-0 rounded-lg object-cover border border-subtle"
                      />
                      <div className="min-w-0 space-y-1">
                        <h3 className="truncate text-xs font-bold text-text-primary">
                          {item.name}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2 text-[11px]">
                          <span className="font-semibold text-text-secondary">
                            {item.originalSize} → {item.compressedSize}
                          </span>
                          <span className="rounded-md bg-accent-secondary/15 px-1.5 py-0.5 text-[10px] font-bold text-accent-secondary">
                            -{item.savedPercentage}% Saved
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Item Actions */}
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        aria-label="Download image"
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-text-secondary transition-colors hover:bg-surface hover:text-text-primary cursor-pointer"
                      >
                        <Download className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemove(item.id)}
                        aria-label="Remove image"
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-text-secondary transition-colors hover:bg-surface hover:text-accent-error cursor-pointer"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center text-text-secondary">
                <UploadCloud className="h-10 w-10 text-accent-primary/40 mb-2" />
                <p className="text-xs font-semibold">No images in processing queue.</p>
              </div>
            )}
          </div>

          {/* Queue Summary Footer */}
          <div className="mt-6 flex items-center justify-between border-t border-subtle pt-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                Total Space Saved
              </p>
              <p className="text-xl font-extrabold text-accent-primary sm:text-2xl">
                3.28 MB
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                Average Reduction
              </p>
              <p className="text-xl font-extrabold text-text-primary sm:text-2xl">
                61.6%
              </p>
            </div>
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