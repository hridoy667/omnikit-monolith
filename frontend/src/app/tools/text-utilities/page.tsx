"use client";

import React, { useState } from "react";
import { Sparkles, Copy, Download, CheckCircle2, Lightbulb } from "lucide-react";

export default function TextRefinerPage() {
  const [text, setText] = useState(
    "This tool automatically leverages powerful AI algorithms to enhance your writing style. Simply paste your draft into the editor, and our sophisticated engine will perform a comprehensive scan for grammatical errors, readability issues, and redundant phrasing.\n\nThe result is a more polished, professional version of your work that maintains your original voice while improving clarity. You can also monitor real-time metrics."
  );

  // Live metric calculations
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const charCount = text.length;
  const readingTime = (wordCount / 200).toFixed(1);

  // Case Conversion Utilities
  const handleUppercase = () => setText(text.toUpperCase());
  const handleLowercase = () => setText(text.toLowerCase());
  const handleTitleCase = () => {
    setText(
      text.replace(
        /\w\S*/g,
        (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      )
    );
  };
  const handleCleanSpaces = () => {
    setText(text.replace(/\s+/g, " ").trim());
  };

  return (
    <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8 font-sans">
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
        
        {/* LEFT COLUMN: Input, Tools & Ad Placement */}
        <div className="space-y-6 lg:col-span-5">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-5">
            
            {/* Header Text */}
            <div className="space-y-1.5">
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                AI Draft Refiner & Word Counter
              </h1>
              <p className="text-xs font-medium text-slate-500 leading-relaxed">
                Track text metrics, switch text cases, and fix draft grammar instantly with AI.
              </p>
            </div>

            {/* Draft Textarea */}
            <div className="relative">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste or type your draft text here..."
                rows={10}
                className="w-full resize-none rounded-xl border border-slate-200 p-4 text-xs font-medium text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 leading-relaxed"
              />
              <span className="absolute bottom-3 right-3 rounded-md bg-slate-100 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                DRAFT MODE
              </span>
            </div>

            {/* Case Switches Row */}
            <div className="space-y-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                CASE SWITCHES:
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleUppercase}
                  className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-200 transition-all cursor-pointer"
                >
                  UPPERCASE
                </button>
                <button
                  type="button"
                  onClick={handleLowercase}
                  className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-200 transition-all cursor-pointer"
                >
                  lowercase
                </button>
                <button
                  type="button"
                  onClick={handleTitleCase}
                  className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-200 transition-all cursor-pointer"
                >
                  Title Case
                </button>
                <button
                  type="button"
                  onClick={handleCleanSpaces}
                  className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-200 transition-all cursor-pointer"
                >
                  Clean Spaces
                </button>
              </div>
            </div>

            {/* Primary Action Button */}
            <button
              type="button"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 text-sm font-bold text-white shadow-md shadow-indigo-600/20 transition-all hover:bg-indigo-700 active:scale-[0.99] cursor-pointer"
            >
              <Sparkles className="h-4 w-4" />
              <span>Refine Draft with AI</span>
            </button>
          </div>

          {/* Premium Ad Placement Box */}
          <div className="flex flex-col items-center justify-center h-24 w-full rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 p-4 text-center">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              PREMIUM AD PLACEMENT 728X90
            </span>
            <span className="mt-1 text-[10px] text-slate-400">
              Upgrade to OmniPlus to hide advertisements
            </span>
          </div>
        </div>

        {/* RIGHT COLUMN: macOS Output & Metrics Workspace */}
        <div className="space-y-4 lg:col-span-7">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
            
            {/* macOS Window Title Bar */}
            <div className="flex items-center justify-between border-b border-slate-100 bg-white px-5 py-3">
              <div className="flex items-center gap-1.5">
                <div className="h-3 w-3 rounded-full bg-rose-500" />
                <div className="h-3 w-3 rounded-full bg-amber-400" />
                <div className="h-3 w-3 rounded-full bg-emerald-400" />
              </div>

              <span className="font-mono text-xs font-bold text-slate-400 tracking-wider">
                TEXT_ENGINE_v2.0
              </span>
            </div>

            <div className="p-6 space-y-6">
              
              {/* Stat Cards Grid */}
              <div className="grid grid-cols-3 gap-3">
                {/* Word Count */}
                <div className="flex flex-col items-start justify-center rounded-2xl bg-[#f2efff] p-4">
                  <span className="text-[9px] font-extrabold uppercase tracking-wider text-indigo-400">
                    WORD COUNT
                  </span>
                  <span className="mt-1 text-2xl font-black text-indigo-600">
                    {wordCount}
                  </span>
                  <span className="text-[10px] font-semibold text-indigo-400">
                    Words
                  </span>
                </div>

                {/* Character Count */}
                <div className="flex flex-col items-start justify-center rounded-2xl bg-[#f2efff] p-4">
                  <span className="text-[9px] font-extrabold uppercase tracking-wider text-indigo-400">
                    CHARACTER COUNT
                  </span>
                  <span className="mt-1 text-2xl font-black text-indigo-600">
                    {charCount.toLocaleString()}
                  </span>
                  <span className="text-[10px] font-semibold text-indigo-400">
                    Chars
                  </span>
                </div>

                {/* Reading Time */}
                <div className="flex flex-col items-start justify-center rounded-2xl bg-[#f2efff] p-4">
                  <span className="text-[9px] font-extrabold uppercase tracking-wider text-indigo-400">
                    READING TIME
                  </span>
                  <span className="mt-1 text-2xl font-black text-indigo-600">
                    ~{readingTime}
                  </span>
                  <span className="text-[10px] font-semibold text-indigo-400">
                    Min
                  </span>
                </div>
              </div>

              {/* Refined Output Header */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                    REFINED DRAFT
                  </span>
                  <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-extrabold text-emerald-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Grammar & Clarity Fixed
                  </span>
                </div>

                <button
                  type="button"
                  className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700 cursor-pointer"
                >
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy Refined Text</span>
                </button>
              </div>

              {/* Highlighted AI Output Text */}
              <div className="text-xs font-medium text-slate-700 leading-relaxed space-y-3 p-1">
                <p>
                  This tool{" "}
                  <span className="rounded bg-indigo-100 px-1 py-0.5 font-bold text-indigo-800">
                    automatically leverages
                  </span>{" "}
                  powerful AI algorithms to{" "}
                  <span className="rounded bg-indigo-100 px-1 py-0.5 font-bold text-indigo-800">
                    enhance
                  </span>{" "}
                  your writing style. Simply paste your draft into the editor, and our{" "}
                  <span className="rounded bg-indigo-100 px-1 py-0.5 font-bold text-indigo-800">
                    sophisticated engine
                  </span>{" "}
                  will perform a comprehensive scan for grammatical errors, readability issues, and redundant phrasing.
                </p>
                <p>
                  The result is a{" "}
                  <span className="rounded bg-indigo-100 px-1 py-0.5 font-bold text-indigo-800">
                    more polished
                  </span>
                  , professional version of your work that maintains your original voice while improving clarity. You can also monitor real-time metrics.
                </p>
              </div>

            </div>

            {/* Footer Bar */}
            <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/50 px-6 py-4">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-teal-500" />
                  <span className="text-xs font-extrabold text-teal-600">
                    Saved 14 redundant words
                  </span>
                </div>

                <span className="text-xs font-bold text-slate-400">
                  Status: <span className="text-slate-700">Optimized</span>
                </span>
              </div>

              <button
                type="button"
                className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-slate-800 transition-all cursor-pointer"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Export Text</span>
              </button>
            </div>

          </div>

          {/* Pro Tip Card */}
          <div className="flex items-start gap-3 rounded-2xl bg-[#f0edff] p-4 text-xs text-indigo-900">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-xs">
              <Lightbulb className="h-4 w-4" />
            </div>
            <div className="space-y-0.5">
              <p className="font-extrabold text-indigo-950">Pro Tip: Case Switching</p>
              <p className="font-medium text-indigo-700 leading-relaxed">
                Use the Clean Spaces utility after pasting from PDFs to remove double-spaces and hidden formatting characters.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}