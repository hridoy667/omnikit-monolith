"use client";

import React, { useState } from "react";
import { Sparkles, Copy, Download, Briefcase, Clock } from "lucide-react";

type DocType = "cover-letter" | "email";
type ToneType = "confident" | "professional" | "friendly";

export default function CoverLetterGeneratorPage() {
  const [docType, setDocType] = useState<DocType>("cover-letter");
  const [role, setRole] = useState("Senior Frontend Engineer");
  const [company, setCompany] = useState("Stripe");
  const [tone, setTone] = useState<ToneType>("confident");
  const [context, setContext] = useState("");

  const letterText = `Dear Hiring Manager at Stripe,

I am writing to express my enthusiastic interest in the Senior Frontend Engineer position. Having followed Stripe's evolution as the bedrock of global digital commerce, I have long admired your commitment to technical excellence and developer-centric design.

With over seven years of experience architecting high-performance React applications, I specialize in building robust, scalable UI systems that prioritize user experience without compromising on speed. My previous work at high-growth fintech platforms involved optimizing complex payment flows that directly impacted conversion rates—experience that aligns perfectly with Stripe's mission to increase the GDP of the internet.

I am particularly drawn to this role because of Stripe's focus on elegant abstractions and performance. I am confident that my background in TypeScript, low-latency rendering, and accessibility will allow me to contribute meaningfully to your engineering team from day one.

Thank you for your time and consideration. I look forward to the possibility of discussing how my technical background can support Stripe's ongoing innovation.

Sincerely,
[Your Name]`;

  return (
    <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8 font-sans">
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
        
        {/* LEFT COLUMN: Form Inputs & Ad Placement */}
        <div className="space-y-6 lg:col-span-5">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-5">
            
            {/* Header Text */}
            <div className="space-y-1">
              <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
                AI Cover Letter & Email Generator
              </h1>
              <p className="text-xs font-medium text-slate-500 leading-relaxed">
                Generate targeted job application cover letters and professional emails in seconds.
              </p>
            </div>

            {/* Document Type Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">
                Document Type
              </label>
              <div className="flex items-center rounded-xl bg-slate-100 p-1 border border-slate-200/60">
                <button
                  type="button"
                  onClick={() => setDocType("cover-letter")}
                  className={`flex-1 rounded-lg py-2 text-xs font-bold transition-all cursor-pointer ${
                    docType === "cover-letter"
                      ? "bg-white text-indigo-600 shadow-xs"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  Cover Letter
                </button>
                <button
                  type="button"
                  onClick={() => setDocType("email")}
                  className={`flex-1 rounded-lg py-2 text-xs font-bold transition-all cursor-pointer ${
                    docType === "email"
                      ? "bg-white text-indigo-600 shadow-xs"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  Professional Email
                </button>
              </div>
            </div>

            {/* Role and Company Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Target Role / Title
                </label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g., Senior Frontend Eng..."
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-800 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Company / Recipient
                </label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="e.g., Stripe or Hiring Mar..."
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-800 focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Tone Preset Buttons */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">
                Tone Preset
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setTone("confident")}
                  className={`rounded-xl border py-2 text-xs font-bold transition-all cursor-pointer ${
                    tone === "confident"
                      ? "border-indigo-300 bg-indigo-50/50 text-indigo-600"
                      : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  Confident
                </button>
                <button
                  type="button"
                  onClick={() => setTone("professional")}
                  className={`rounded-xl border py-2 text-xs font-bold transition-all cursor-pointer ${
                    tone === "professional"
                      ? "border-indigo-300 bg-indigo-50/50 text-indigo-600"
                      : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  Professional
                </button>
                <button
                  type="button"
                  onClick={() => setTone("friendly")}
                  className={`rounded-xl border py-2 text-xs font-bold transition-all cursor-pointer ${
                    tone === "friendly"
                      ? "border-indigo-300 bg-indigo-50/50 text-indigo-600"
                      : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  Friendly
                </button>
              </div>
            </div>

            {/* Context Textarea */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">
                Key Skills / Context
              </label>
              <textarea
                value={context}
                onChange={(e) => setContext(e.target.value)}
                placeholder="Paste job requirements or your relevant skills here..."
                rows={4}
                className="w-full resize-none rounded-xl border border-slate-200 p-3 text-xs font-medium text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            {/* Primary Action Button */}
            <button
              type="button"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 text-sm font-bold text-white shadow-md shadow-indigo-600/20 transition-all hover:bg-indigo-700 active:scale-[0.99] cursor-pointer"
            >
              <Sparkles className="h-4 w-4" />
              <span>Generate Document with AI</span>
            </button>
          </div>

          {/* Premium Ad Placement Box */}
          <div className="flex h-24 w-full items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 p-4 text-center">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              PREMIUM AD PLACEMENT 728X90
            </span>
          </div>
        </div>

        {/* RIGHT COLUMN: macOS Document Workspace */}
        <div className="lg:col-span-7">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
            
            {/* macOS Window Header Bar */}
            <div className="flex items-center justify-between border-b border-slate-100 bg-white px-5 py-3">
              <div className="flex items-center gap-1.5">
                <div className="h-3 w-3 rounded-full bg-rose-500" />
                <div className="h-3 w-3 rounded-full bg-amber-400" />
                <div className="h-3 w-3 rounded-full bg-emerald-400" />
              </div>

              <span className="font-mono text-xs font-bold text-slate-400 tracking-wider">
                CAREER_ENGINE_v3.2
              </span>
            </div>

            <div className="p-6 space-y-6">
              
              {/* Stat Cards Grid */}
              <div className="grid grid-cols-3 gap-3">
                {/* Match Score */}
                <div className="flex flex-col items-center justify-center rounded-2xl bg-[#f2efff] p-4 text-center">
                  <span className="text-[10px] font-bold text-indigo-500">
                    Match Score
                  </span>
                  <span className="mt-1 text-xl font-black text-indigo-600">
                    96%
                  </span>
                </div>

                {/* Word Count */}
                <div className="flex flex-col items-center justify-center rounded-2xl bg-[#f2efff] p-4 text-center">
                  <span className="text-[10px] font-bold text-indigo-500">
                    Word Count
                  </span>
                  <span className="mt-1 text-xl font-black text-indigo-600">
                    285
                  </span>
                </div>

                {/* Readability */}
                <div className="flex flex-col items-center justify-center rounded-2xl bg-[#f2efff] p-4 text-center">
                  <span className="text-[10px] font-bold text-indigo-500">
                    Readability
                  </span>
                  <span className="mt-1 text-xl font-black text-indigo-600">
                    High
                  </span>
                </div>
              </div>

              {/* Document Paper Area */}
              <div className="rounded-2xl border border-slate-100 bg-slate-50/40 p-6 space-y-4">
                {/* Header Actions */}
                <div className="flex items-center justify-between border-b border-slate-200/60 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-slate-800">
                      GENERATED COVER LETTER
                    </span>
                    <span className="rounded-md bg-indigo-100 px-2 py-0.5 text-[9px] font-extrabold text-indigo-600 uppercase tracking-wide">
                      TAILORED TO STRIPE
                    </span>
                  </div>

                  <button
                    type="button"
                    className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700 cursor-pointer"
                  >
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy</span>
                  </button>
                </div>

                {/* Letter Body Text */}
                <div className="text-xs font-medium text-slate-700 leading-relaxed space-y-4 whitespace-pre-line pt-2">
                  {letterText}
                </div>
              </div>

            </div>

            {/* Footer Bar */}
            <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/50 px-6 py-4">
              <div className="flex items-center gap-4 text-xs text-slate-500">
                <div className="flex items-center gap-1.5 font-medium">
                  <Briefcase className="h-3.5 w-3.5 text-slate-400" />
                  <span>Role: <strong className="text-slate-800">Senior Frontend Engineer</strong></span>
                </div>
                <div className="flex items-center gap-1.5 font-medium">
                  <Clock className="h-3.5 w-3.5 text-slate-400" />
                  <span>Generated 2m ago</span>
                </div>
              </div>

              <button
                type="button"
                className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-slate-800 transition-all cursor-pointer"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Export PDF</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}