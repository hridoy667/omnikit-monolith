"use client";

import React, { useState } from "react";
import {
  UploadCloud,
  FileText,
  Trash2,
  Hourglass,
  Lock,
  Copy,
  Check,
  QrCode,
  ShieldCheck,
  Clock,
  ShieldAlert,
} from "lucide-react";

export default function SecureFileSharingPage() {
  const [selectedFile, setSelectedFile] = useState<{
    name: string;
    size: string;
  } | null>({
    name: "financial_report_2026.pdf",
    size: "14.2 MB",
  });

  const [copied, setCopied] = useState(false);
  const shareUrl = "omni.share/s8f92a1k";

  const handleCopy = () => {
    navigator.clipboard.writeText(`https://${shareUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  return (
    <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8 font-sans">
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
        
        {/* LEFT COLUMN: Upload Card & Ad Placeholder */}
        <div className="space-y-6 lg:col-span-5">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-5">
            
            {/* Header Text */}
            <div className="space-y-1.5">
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Secure File Sharing
              </h1>
              <p className="text-xs font-medium text-slate-500 leading-relaxed">
                Share files securely with self-expiring 24-hour temporary links.
              </p>
            </div>

            {/* Drag and Drop Zone */}
            <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-indigo-200 bg-[#f8f7ff] p-6 text-center transition-colors hover:border-indigo-400">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-white shadow-md shadow-indigo-600/30">
                <UploadCloud className="h-6 w-6" />
              </div>
              <p className="mt-3 text-xs font-bold text-slate-700">
                Drag and drop your file here, or click to browse
              </p>
              <span className="mt-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                MAX FILE SIZE: 100 MB
              </span>
            </div>

            {/* Selected File Card */}
            {selectedFile && (
              <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3 shadow-2xs">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-rose-50 text-rose-500 border border-rose-100">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">
                      {selectedFile.name}
                    </p>
                    <p className="text-[11px] font-semibold text-slate-400">
                      {selectedFile.size}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleRemoveFile}
                  className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors cursor-pointer"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            )}

            {/* Expiration Info Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-[#f0edff] px-3.5 py-1.5 text-[11px] font-bold text-indigo-700">
              <Hourglass className="h-3.5 w-3.5 text-indigo-500" />
              <span>Link Expires: Automatically in 24 Hours</span>
            </div>

            {/* Generate Secure Link Button */}
            <button
              type="button"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 text-sm font-bold text-white shadow-md shadow-indigo-600/20 transition-all hover:bg-indigo-700 active:scale-[0.99] cursor-pointer"
            >
              <Lock className="h-4 w-4" />
              <span>Generate Secure Link</span>
            </button>

          </div>

          {/* Premium Ad Placement Box */}
          <div className="flex h-24 w-full items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 p-4 text-center">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              PREMIUM AD PLACEMENT 728X90
            </span>
          </div>
        </div>

        {/* RIGHT COLUMN: macOS Secure Output Workspace */}
        <div className="lg:col-span-7">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
            
            {/* macOS Window Header */}
            <div className="flex items-center justify-between border-b border-slate-100 bg-white px-5 py-3">
              <div className="flex items-center gap-1.5">
                <div className="h-3 w-3 rounded-full bg-rose-500" />
                <div className="h-3 w-3 rounded-full bg-amber-400" />
                <div className="h-3 w-3 rounded-full bg-emerald-400" />
              </div>

              <div className="rounded bg-slate-900 px-2 py-0.5 font-mono text-[10px] font-bold text-white tracking-wider">
                ENCRYPTION_ENGINE_v4.0
              </div>
            </div>

            {/* Output Workspace Body */}
            <div className="p-6 space-y-6">
              
              {/* Secure Link Box */}
              <div className="rounded-2xl border border-slate-200/80 bg-[#f8f9fc] p-6 text-center space-y-4">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                  SECURE LINK READY
                </span>

                <div className="break-all font-mono text-2xl font-black text-slate-900 tracking-tight">
                  {shareUrl}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-center gap-2 pt-2">
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="flex h-11 items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 text-xs font-bold text-white shadow-xs hover:bg-slate-800 transition-all cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4 text-emerald-400" />
                        <span>Copied Link</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        <span>Copy Secure Link</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    aria-label="View QR Code"
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-all cursor-pointer"
                  >
                    <QrCode className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Access Status Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-500">Access Status</span>
                  <span className="flex items-center gap-1.5 text-emerald-600">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    Live Monitoring
                  </span>
                </div>

                {/* Status Badges List */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2.5 rounded-xl bg-[#eafaf1] p-3 text-xs font-bold text-emerald-800 border border-emerald-100">
                    <ShieldCheck className="h-4 w-4 text-emerald-600" />
                    <span>256-bit AES Encryption: Applied</span>
                  </div>

                  <div className="flex items-center gap-2.5 rounded-xl bg-[#eafaf1] p-3 text-xs font-bold text-emerald-800 border border-emerald-100">
                    <ShieldCheck className="h-4 w-4 text-emerald-600" />
                    <span>Self-Destruct Timer: 24 Hours Active</span>
                  </div>

                  <div className="flex items-center gap-2.5 rounded-xl bg-[#eafaf1] p-3 text-xs font-bold text-emerald-800 border border-emerald-100">
                    <ShieldCheck className="h-4 w-4 text-emerald-600" />
                    <span>Access Type: Direct One-Time Link</span>
                  </div>
                </div>
              </div>

              {/* Countdown Pill */}
              <div className="flex justify-center">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#f0edff] px-4 py-1.5 text-xs font-bold text-indigo-700">
                  <Clock className="h-3.5 w-3.5 text-indigo-500" />
                  <span>Expires in 23h 59m</span>
                </div>
              </div>

            </div>

            {/* Footer Bar */}
            <div className="flex items-center justify-between border-t border-slate-100 bg-[#f8f7ff] px-6 py-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 truncate max-w-[240px]">
                <FileText className="h-4 w-4 text-slate-400 shrink-0" />
                <span className="truncate">
                  File: {selectedFile ? selectedFile.name : "financial_report_2026..."}
                </span>
              </div>

              <button
                type="button"
                className="flex items-center gap-1.5 text-xs font-bold text-rose-500 hover:text-rose-600 transition-colors cursor-pointer"
              >
                <ShieldAlert className="h-4 w-4" />
                <span>Delete Link</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}