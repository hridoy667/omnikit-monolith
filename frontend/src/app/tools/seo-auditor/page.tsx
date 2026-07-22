"use client";

import React, { useState } from "react";
import {
  Globe,
  Smartphone,
  Monitor,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Search,
} from "lucide-react";

type AnalysisMode = "mobile" | "desktop";

interface AnalysisItem {
  id: string;
  title: string;
  subtitle: string;
  status: "Passed" | "Warning" | "Failed";
}

export default function WebsiteAuditorPage() {
  const [url, setUrl] = useState("https://yourwebsite.com");
  const [mode, setMode] = useState<AnalysisMode>("mobile");

  const detailedAnalysis: AnalysisItem[] = [
    {
      id: "1",
      title: "SSL Certificate",
      subtitle: "Valid through 2027 (Let's Encrypt)",
      status: "Passed",
    },
    {
      id: "2",
      title: "Meta Tags Optimization",
      subtitle: "Correct length and keyword density",
      status: "Passed",
    },
    {
      id: "3",
      title: "Image Compression",
      subtitle: "4 images could be optimized further",
      status: "Warning",
    },
    {
      id: "4",
      title: "Mobile Responsiveness",
      subtitle: "Viewport correctly configured",
      status: "Passed",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8 font-sans">
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
        
        {/* LEFT COLUMN: Input Controls & Ad Placement */}
        <div className="space-y-6 lg:col-span-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-6">
            
            {/* Header Text */}
            <div className="space-y-2">
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Website Audit
              </h1>
              <p className="text-xs font-medium text-slate-500 leading-relaxed">
                Analyze SEO, performance, and security benchmarks in seconds.
              </p>
            </div>

            {/* Website URL Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">
                Website URL
              </label>
              <div className="relative flex items-center">
                <Globe className="absolute left-3.5 h-4 w-4 text-slate-400" />
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://yourwebsite.com"
                  className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3 py-2.5 text-xs font-medium text-slate-800 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Analysis Mode Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">
                Analysis Mode
              </label>
              <div className="flex items-center rounded-xl bg-slate-100 p-1 border border-slate-200/60">
                <button
                  type="button"
                  onClick={() => setMode("mobile")}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-1.5 text-xs font-bold transition-all cursor-pointer ${
                    mode === "mobile"
                      ? "bg-white text-indigo-600 shadow-xs"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <Smartphone className="h-3.5 w-3.5" />
                  <span>Mobile</span>
                </button>

                <button
                  type="button"
                  onClick={() => setMode("desktop")}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-1.5 text-xs font-bold transition-all cursor-pointer ${
                    mode === "desktop"
                      ? "bg-white text-indigo-600 shadow-xs"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <Monitor className="h-3.5 w-3.5" />
                  <span>Desktop</span>
                </button>
              </div>
            </div>

            {/* Primary Action Button */}
            <button
              type="button"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 text-sm font-bold text-white shadow-md shadow-indigo-600/20 transition-all hover:bg-indigo-700 active:scale-[0.99] cursor-pointer"
            >
              <span>Run Audit</span>
            </button>
          </div>

          {/* Premium Ad Placement Box */}
          <div className="flex h-24 w-full items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 p-4 text-center">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              PREMIUM AD PLACEMENT 728X90
            </span>
          </div>
        </div>

        {/* RIGHT COLUMN: macOS Window Audit Dashboard */}
        <div className="lg:col-span-8">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
            
            {/* Window Header Bar */}
            <div className="flex items-center justify-between border-b border-slate-100 bg-white px-5 py-3">
              <div className="flex items-center gap-1.5">
                <div className="h-3 w-3 rounded-full bg-rose-500" />
                <div className="h-3 w-3 rounded-full bg-amber-400" />
                <div className="h-3 w-3 rounded-full bg-emerald-400" />
              </div>

              <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-slate-400">
                <Search className="h-3.5 w-3.5" />
                <span>AUDIT_ENGINE_v3.1</span>
              </div>

              <span className="rounded-md bg-indigo-50 px-2.5 py-1 text-[11px] font-bold text-indigo-600">
                Live Analysis
              </span>
            </div>

            <div className="p-6 space-y-8">
              {/* Score Cards Grid */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                
                {/* SEO Health Card */}
                <div className="flex flex-col items-center justify-center rounded-2xl bg-[#f8f6ff] p-6 text-center">
                  <div className="relative flex h-24 w-24 items-center justify-center">
                    <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-slate-200"
                        strokeWidth="3.5"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="text-[#3be3ba]"
                        strokeDasharray="88, 100"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <span className="absolute text-2xl font-black text-[#22c59b]">
                      88
                    </span>
                  </div>
                  <h3 className="mt-4 text-base font-extrabold text-slate-900">
                    SEO Health
                  </h3>
                  <p className="text-xs font-semibold text-slate-400">
                    Excellent
                  </p>
                </div>

                {/* Loading Speed Card */}
                <div className="flex flex-col items-center justify-center rounded-2xl bg-[#f8f6ff] p-6 text-center">
                  <div className="relative flex h-24 w-24 items-center justify-center">
                    <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-slate-200"
                        strokeWidth="3.5"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="text-[#3b82f6]"
                        strokeDasharray="94, 100"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <span className="absolute text-xl font-black text-[#2563eb]">
                      1.2s
                    </span>
                  </div>
                  <h3 className="mt-4 text-base font-extrabold text-slate-900">
                    Loading Speed
                  </h3>
                  <p className="text-xs font-semibold text-slate-400">
                    94% Score
                  </p>
                </div>

                {/* Security Card */}
                <div className="flex flex-col items-center justify-center rounded-2xl bg-[#f8f6ff] p-6 text-center">
                  <div className="relative flex h-24 w-24 items-center justify-center">
                    <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-slate-200"
                        strokeWidth="3.5"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="text-[#6366f1]"
                        strokeDasharray="98, 100"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <span className="absolute text-2xl font-black text-[#4f46e5]">
                      A+
                    </span>
                  </div>
                  <h3 className="mt-4 text-base font-extrabold text-slate-900">
                    Security
                  </h3>
                  <p className="text-xs font-semibold text-slate-400">
                    Military Grade
                  </p>
                </div>

              </div>

              {/* Detailed Analysis List */}
              <div className="space-y-4">
                <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-600">
                  DETAILED ANALYSIS
                </h2>

                <div className="rounded-2xl border border-slate-100 divide-y divide-slate-100">
                  {detailedAnalysis.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-4"
                    >
                      <div className="flex items-start gap-3">
                        {item.status === "Passed" ? (
                          <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500 mt-0.5" />
                        ) : (
                          <AlertTriangle className="h-5 w-5 shrink-0 text-amber-500 mt-0.5" />
                        )}
                        <div>
                          <p className="text-sm font-bold text-slate-800">
                            {item.title}
                          </p>
                          <p className="text-xs font-medium text-slate-400">
                            {item.subtitle}
                          </p>
                        </div>
                      </div>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-extrabold ${
                          item.status === "Passed"
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-amber-50 text-amber-600"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Bar */}
            <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/50 px-6 py-4">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-500" />
                <span className="text-xs font-bold text-slate-500">
                  Target: <span className="text-slate-800">{url}</span>
                </span>
              </div>

              <button
                type="button"
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 shadow-xs hover:bg-slate-50 transition-all cursor-pointer"
              >
                <FileText className="h-3.5 w-3.5 text-slate-500" />
                <span>Export Audit Report</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}