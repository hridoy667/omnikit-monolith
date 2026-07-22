"use client";

import React, { useState } from "react";
import {
  FileText,
  UploadCloud,
  ChevronRight,
  GripVertical,
  Trash2,
  ArrowRight,
  Download,
  CheckCircle2,
  Sparkles,
  Info,
  Copy,
  Check,
  Scissors,
  Layers,
} from "lucide-react";

type Mode = "merge" | "split" | "summary";

interface QueueFile {
  id: string;
  name: string;
  size: string;
}

interface PagePreview {
  id: number;
  pageNum: number;
  selected: boolean;
  title: string;
  previewUrl: string;
}

export default function SmartPDFToolkitPage() {
  const [activeTab, setActiveTab] = useState<Mode>("merge");
  const [splitRange, setSplitRange] = useState("1-3");
  const [summaryType, setSummaryType] = useState<"bullet" | "executive" | "deep">("bullet");
  const [copied, setCopied] = useState(false);

  // Mock file queue
  const [queue, setQueue] = useState<QueueFile[]>([
    { id: "1", name: "Q3_Report_Draft.pdf", size: "1.2 MB" },
    { id: "2", name: "Appendix_Data.pdf", size: "450 KB" },
  ]);

  // Mock page previews for right pane
  const [pages, setPages] = useState<PagePreview[]>([
    {
      id: 1,
      pageNum: 1,
      selected: true,
      title: "Q3 2023 STRATEGIC PERFORMANCE REVIEW",
      previewUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=300&q=80",
    },
    {
      id: 2,
      pageNum: 2,
      selected: true,
      title: "Quarterly Financial Overview",
      previewUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=300&q=80",
    },
    {
      id: 3,
      pageNum: 3,
      selected: true,
      title: "Executive Notes & Findings",
      previewUrl: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=300&q=80",
    },
    {
      id: 4,
      pageNum: 4,
      selected: true,
      title: "Additional Data Points",
      previewUrl: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=300&q=80",
    },
  ]);

  const togglePageSelect = (id: number) => {
    setPages((prev) =>
      prev.map((p) => (p.id === id ? { ...p, selected: !p.selected } : p))
    );
  };

  const handleRemoveFile = (id: string) => {
    setQueue((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCopySummary = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const selectedPagesCount = pages.filter((p) => p.selected).length;

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Breadcrumb & Header */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-text-secondary">
          <span>Tools</span>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-text-primary">Smart PDF Toolkit</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
          Smart PDF Toolkit
        </h1>
        <p className="max-w-3xl text-sm text-text-secondary">
          Merge, split, or generate quick AI summaries from your PDF documents effortlessly.
        </p>
      </div>

      {/* Main Grid Container */}
      <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12">
        
        {/* LEFT PANE: Mode Selection & Upload Zone */}
        <div className="flex flex-col justify-between rounded-xl border border-subtle bg-surface p-5 shadow-xs lg:col-span-5">
          <div className="space-y-5">
            {/* Action Tabs */}
            <div className="grid grid-cols-3 gap-1 rounded-lg border border-subtle bg-page p-1">
              <button
                type="button"
                onClick={() => setActiveTab("merge")}
                className={`flex items-center justify-center gap-1.5 rounded-md py-2 text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === "merge"
                    ? "bg-surface text-accent-primary shadow-xs"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                <Layers className="h-3.5 w-3.5" />
                <span>Merge PDFs</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("split")}
                className={`flex items-center justify-center gap-1.5 rounded-md py-2 text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === "split"
                    ? "bg-surface text-accent-primary shadow-xs"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                <Scissors className="h-3.5 w-3.5" />
                <span>Split Pages</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("summary")}
                className={`flex items-center justify-center gap-1.5 rounded-md py-2 text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === "summary"
                    ? "bg-surface text-accent-primary shadow-xs"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>AI Summary</span>
              </button>
            </div>

            {/* Dropzone Component */}
            <div className="group relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-subtle bg-page p-6 text-center transition-all hover:border-accent-primary/50 hover:bg-surface cursor-pointer">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-accent-primary/10 text-accent-primary group-hover:scale-105 transition-transform">
                <FileText className="h-5 w-5" />
              </div>
              <p className="text-xs font-semibold text-text-primary">
                Drag & drop PDF files here
              </p>
              <p className="mt-1 text-[11px] text-text-secondary">
                or click to browse from your device
              </p>
            </div>

            {/* Mode Specific Inputs */}
            {activeTab === "split" && (
              <div className="space-y-2">
                <label className="text-xs font-semibold text-text-primary">
                  Range to Extract (e.g. 1-3, 5)
                </label>
                <input
                  type="text"
                  value={splitRange}
                  onChange={(e) => setSplitRange(e.target.value)}
                  placeholder="e.g. 1-4, 7"
                  className="w-full rounded-lg border border-subtle bg-page px-3 py-2 text-xs font-semibold text-text-primary focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary"
                />
              </div>
            )}

            {activeTab === "summary" && (
              <div className="space-y-2">
                <label className="text-xs font-semibold text-text-primary">
                  Summary Depth
                </label>
                <div className="grid grid-cols-3 gap-1 rounded-lg border border-subtle bg-page p-1 text-[11px] font-semibold">
                  <button
                    type="button"
                    onClick={() => setSummaryType("bullet")}
                    className={`rounded-md py-1.5 transition-all cursor-pointer ${
                      summaryType === "bullet" ? "bg-surface text-accent-primary shadow-xs" : "text-text-secondary"
                    }`}
                  >
                    Bullets
                  </button>
                  <button
                    type="button"
                    onClick={() => setSummaryType("executive")}
                    className={`rounded-md py-1.5 transition-all cursor-pointer ${
                      summaryType === "executive" ? "bg-surface text-accent-primary shadow-xs" : "text-text-secondary"
                    }`}
                  >
                    Executive
                  </button>
                  <button
                    type="button"
                    onClick={() => setSummaryType("deep")}
                    className={`rounded-md py-1.5 transition-all cursor-pointer ${
                      summaryType === "deep" ? "bg-surface text-accent-primary shadow-xs" : "text-text-secondary"
                    }`}
                  >
                    Deep Analysis
                  </button>
                </div>
              </div>
            )}

            {/* Queue List (For Merge Mode) */}
            {activeTab === "merge" && (
              <div className="space-y-2.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-text-secondary">
                  Queue ({queue.length} Files)
                </span>
                <div className="space-y-2">
                  {queue.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between rounded-lg border border-subtle bg-page p-2.5 transition-all hover:border-accent-primary/20"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <GripVertical className="h-4 w-4 shrink-0 text-text-secondary/50 cursor-grab" />
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-accent-primary/10 text-accent-primary">
                          <FileText className="h-4 w-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-xs font-semibold text-text-primary">
                            {file.name}
                          </p>
                          <p className="text-[10px] text-text-secondary">{file.size}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveFile(file.id)}
                        className="p-1 text-text-secondary hover:text-accent-error transition-colors cursor-pointer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action CTA Button */}
          <button
            type="button"
            className="group mt-6 flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-accent-primary text-sm font-semibold text-white shadow-xs transition-all hover:bg-accent-primary-hover active:scale-[0.99] cursor-pointer"
          >
            <span>
              {activeTab === "merge" && "Merge Files"}
              {activeTab === "split" && "Split PDF"}
              {activeTab === "summary" && "Generate AI Summary"}
            </span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* RIGHT PANE: Output Preview & Page Selection */}
        <div className="flex flex-col justify-between rounded-xl border border-subtle bg-surface p-5 shadow-xs lg:col-span-7">
          <div className="space-y-5">
            {/* Pane Header */}
            <div className="flex items-center justify-between border-b border-subtle/60 pb-3">
              <div>
                <h2 className="text-base font-bold text-text-primary">
                  {activeTab === "summary" ? "AI Summary Output" : "Output Preview"}
                </h2>
                <p className="text-xs text-text-secondary">
                  {activeTab === "summary"
                    ? "Generated takeaways and key metrics"
                    : "Preview and rearrange pages before processing"}
                </p>
              </div>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded-lg border border-subtle bg-page px-3 py-1.5 text-xs font-semibold text-text-primary transition-all hover:border-accent-primary/40 hover:bg-surface cursor-pointer"
              >
                <Download className="h-3.5 w-3.5 text-text-secondary" />
                <span>Download Output</span>
              </button>
            </div>

            {/* Visual Page Thumbnails Grid (Merge & Split Modes) */}
            {activeTab !== "summary" ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {pages.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => togglePageSelect(p.id)}
                    className={`group relative flex cursor-pointer flex-col overflow-hidden rounded-lg border transition-all ${
                      p.selected
                        ? "border-accent-primary bg-accent-primary/5 ring-1 ring-accent-primary"
                        : "border-subtle bg-page opacity-60 hover:opacity-100"
                    }`}
                  >
                    {/* Checkbox Badge */}
                    <div className="absolute top-2 left-2 z-10">
                      <div
                        className={`flex h-5 w-5 items-center justify-center rounded-md transition-colors ${
                          p.selected ? "bg-accent-primary text-white" : "border border-subtle bg-surface"
                        }`}
                      >
                        {p.selected && <CheckCircle2 className="h-3.5 w-3.5" />}
                      </div>
                    </div>

                    {/* Mini Preview Mockup */}
                    <div className="h-32 w-full overflow-hidden bg-surface p-2 border-b border-subtle/50">
                      <div className="h-full w-full rounded border border-subtle/40 bg-page p-1 space-y-1">
                        <div className="h-2 w-3/4 bg-text-primary/20 rounded" />
                        <div className="h-1.5 w-1/2 bg-text-primary/10 rounded" />
                        <div className="mt-2 space-y-1">
                          <div className="h-1 w-full bg-text-primary/10 rounded" />
                          <div className="h-1 w-full bg-text-primary/10 rounded" />
                          <div className="h-1 w-2/3 bg-text-primary/10 rounded" />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-2 text-[10px] font-bold tracking-wider text-text-secondary uppercase">
                      <span>PAGE {p.pageNum}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* AI Summary Text Result Container */
              <div className="relative rounded-lg border border-subtle bg-page p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-subtle/60 pb-2">
                  <span className="text-xs font-bold text-accent-primary flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5" /> Key Takeaways
                  </span>
                  <button
                    type="button"
                    onClick={handleCopySummary}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
                  >
                    {copied ? <Check className="h-3.5 w-3.5 text-accent-secondary" /> : <Copy className="h-3.5 w-3.5" />}
                    <span>{copied ? "Copied" : "Copy"}</span>
                  </button>
                </div>
                <div className="space-y-2 text-xs text-text-primary leading-relaxed">
                  <p className="font-semibold">Key Findings from Q3 Report:</p>
                  <ul className="list-disc pl-4 space-y-1 text-text-secondary">
                    <li>Revenue increased by 18% YoY driven by cloud product adoption.</li>
                    <li>Operational costs reduced by 12% following workflow automation updates.</li>
                    <li>Recommended focus for Q4 includes expansion into EMEA markets.</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Footer Bar */}
          <div className="mt-6 flex items-center justify-between border-t border-subtle pt-4">
            <div className="flex items-center gap-1.5 text-xs text-text-secondary">
              <Info className="h-3.5 w-3.5 text-accent-primary" />
              <span>Drag pages to reorder them in the final output.</span>
            </div>
            <span className="rounded-full bg-accent-primary/10 px-3 py-1 text-xs font-bold text-accent-primary">
              {selectedPagesCount} Pages Selected
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}