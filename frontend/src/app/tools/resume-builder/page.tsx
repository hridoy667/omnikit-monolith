"use client";

import React, { useState } from "react";
import {
  Upload,
  FileText,
  Sparkles,
  Download,
  CheckCircle2,
  Plus,
  GripVertical,
  ChevronDown,
  User,
  Briefcase,
  GraduationCap,
  Code2,
  FolderPlus,
  Award,
  Globe,
  Trash2,
  Lightbulb,
  ShieldCheck,
  AlertTriangle,
  CheckCircle,
  XCircle,
  TrendingUp,
  Layout,
  Image as ImageIcon,
} from "lucide-react";

type ActiveTab = "linkedin" | "upload" | "scratch";
type TemplateType = "classic" | "modern" | "photo";

interface Section {
  id: string;
  title: string;
  icon: React.ElementType;
  isRemovable: boolean;
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

export default function ATSResumeBuilder() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("scratch");
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>("classic");

  // Form State
  const [fullName, setFullName] = useState("Alex Rivera");
  const [email, setEmail] = useState("alex.rivera@example.com");
  const [phone, setPhone] = useState("+1 (555) 000-0000");
  const [location, setLocation] = useState("San Francisco, CA");
  const [role, setRole] = useState("Frontend Developer");
  const [photoUrl, setPhotoUrl] = useState(
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop"
  );

  // Accordion Expand States
  const [openSection, setOpenSection] = useState<string | null>("contact");

  // Active Dynamic Sections
  const [sections, setSections] = useState<Section[]>([
    { id: "contact", title: "Contact Info", icon: User, isRemovable: false },
    { id: "experience", title: "Work Experience", icon: Briefcase, isRemovable: false },
    { id: "education", title: "Education", icon: GraduationCap, isRemovable: false },
    { id: "skills", title: "Skills", icon: Code2, isRemovable: false },
  ]);

  // Handle adding dynamic capsule sections
  const addSection = (id: string, title: string, icon: React.ElementType) => {
    if (!sections.some((sec) => sec.id === id)) {
      setSections([...sections, { id, title, icon, isRemovable: true }]);
      setOpenSection(id);
    }
  };

  const removeSection = (id: string) => {
    setSections(sections.filter((sec) => sec.id !== id));
  };

  return (
    <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8 font-sans bg-[#FAFAFB] min-h-screen">
      
      {/* TOP NAVIGATION: Mode Selector Bar */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-3 shadow-xs">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab("linkedin")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
              activeTab === "linkedin"
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            <LinkedInIcon className="h-4 w-4" />
            <span>1. LinkedIn PDF Import</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("upload")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
              activeTab === "upload"
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            <Upload className="h-4 w-4" />
            <span>2. Audit Existing Resume</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("scratch")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
              activeTab === "scratch"
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            <Sparkles className="h-4 w-4" />
            <span>3. Start From Scratch</span>
          </button>
        </div>

        <div className="flex items-center gap-2 px-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold text-slate-500">ATS Engine v3.0 Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
        
        {/* LEFT COLUMN: Controls & Forms based on Active Tab */}
        <div className="space-y-6 lg:col-span-5">
          
          {/* OPTION 1: LINKEDIN PDF IMPORT */}
          {activeTab === "linkedin" && (
            <div className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
              <div className="space-y-1">
                <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  Build ATS Resume from LinkedIn
                </h1>
                <p className="text-xs font-medium text-slate-500 leading-relaxed">
                  Upload your LinkedIn PDF export to generate an ATS-optimized resume instantly.
                </p>
              </div>

              {/* Instructional Steps */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-start gap-2.5 rounded-xl border border-indigo-100 bg-indigo-50/50 p-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-black text-white">
                    1
                  </span>
                  <div>
                    <p className="text-[11px] font-extrabold text-indigo-950">More Options</p>
                    <p className="text-[10px] font-medium text-indigo-700">Go to profile, click "More"</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 rounded-xl border border-indigo-100 bg-indigo-50/50 p-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-black text-white">
                    2
                  </span>
                  <div>
                    <p className="text-[11px] font-extrabold text-indigo-950">Save to PDF</p>
                    <p className="text-[10px] font-medium text-indigo-700">Choose "Save to PDF" & drop below</p>
                  </div>
                </div>
              </div>

              {/* Drop Zone */}
              <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-indigo-200 bg-indigo-50/20 p-8 text-center transition-all hover:bg-indigo-50/40 cursor-pointer">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 mb-3">
                  <Upload className="h-6 w-6" />
                </div>
                <p className="text-sm font-extrabold text-slate-800">Drop your LinkedIn PDF</p>
                <p className="text-xs text-slate-400 mt-0.5">or click to browse files</p>
                <span className="mt-3 flex items-center gap-1 rounded-md bg-indigo-100/70 px-2 py-0.5 text-[10px] font-bold text-indigo-700">
                  <ShieldCheck className="h-3 w-3" /> Safe & Encrypted Parsing
                </span>
              </div>

              <button
                type="button"
                className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 text-xs font-bold text-white shadow-md shadow-indigo-600/20 hover:bg-indigo-700 cursor-pointer"
              >
                <Sparkles className="h-4 w-4" /> Parse & Auto-Fill Resume
              </button>
            </div>
          )}

          {/* OPTION 2: AUDIT EXISTING RESUME */}
          {activeTab === "upload" && (
            <div className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
              <div className="space-y-1">
                <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  Resume Score & Review
                </h1>
                <p className="text-xs font-medium text-slate-500 leading-relaxed">
                  Upload your existing resume file to calculate your ATS pass-rate and view key improvements.
                </p>
              </div>

              {/* Drop Zone */}
              <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-6 text-center transition-all hover:bg-slate-100/50 cursor-pointer">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 mb-2">
                  <Upload className="h-5 w-5" />
                </div>
                <p className="text-xs font-extrabold text-slate-800">Upload your resume to analyze</p>
                <p className="text-[10px] text-slate-400 mt-0.5">PDF or DOCX up to 10MB</p>
              </div>

              {/* Active Upload File Info */}
              <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3 shadow-2xs">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">alex_rivera_resume.pdf</p>
                    <p className="text-[10px] font-medium text-slate-400">1.2 MB • Scanned</p>
                  </div>
                </div>
                <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-bold text-emerald-700">
                  <CheckCircle className="h-3 w-3" /> Audited
                </span>
              </div>

              {/* Score Breakdown Badge */}
              <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-amber-600" />
                    <span className="text-xs font-extrabold text-amber-950">ATS Compatibility Score</span>
                  </div>
                  <span className="text-2xl font-black text-amber-600">68/100</span>
                </div>
                <div className="w-full bg-amber-200/60 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full w-[68%]" />
                </div>
                <p className="text-[11px] font-medium text-amber-800">
                  Needs Improvement — Your resume may be filtered out by strict HR scanners due to unparseable sections.
                </p>
              </div>

              {/* Actionable Feedback List */}
              <div className="space-y-3 pt-1">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                  Recommendations to Fix
                </h3>

                <div className="space-y-2">
                  <div className="flex items-start gap-2.5 rounded-xl border border-rose-100 bg-rose-50/50 p-3">
                    <XCircle className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                    <div className="space-y-0.5">
                      <p className="text-xs font-extrabold text-rose-950">Multi-column layout detected</p>
                      <p className="text-[11px] font-medium text-rose-700">
                        Convert side-by-side columns into a single linear layout so ATS bots can parse experiences in order.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 rounded-xl border border-amber-100 bg-amber-50/50 p-3">
                    <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                    <div className="space-y-0.5">
                      <p className="text-xs font-extrabold text-amber-950">Missing measurable metrics</p>
                      <p className="text-[11px] font-medium text-amber-800">
                        Add quantifiable numbers or percentages to at least 3 bullet points in your work history.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* OPTION 3: START FROM SCRATCH */}
          {activeTab === "scratch" && (
            <div className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
              <div className="space-y-1">
                <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  Create Resume from Scratch
                </h1>
                <p className="text-xs font-medium text-slate-500 leading-relaxed">
                  Build an ATS-optimized resume step-by-step with modular sections.
                </p>
              </div>

              {/* Dynamic Accordion Sections */}
              <div className="space-y-3">
                {sections.map((sec) => {
                  const Icon = sec.icon;
                  const isOpen = openSection === sec.id;

                  return (
                    <div
                      key={sec.id}
                      className="overflow-hidden rounded-xl border border-slate-200 bg-white transition-all"
                    >
                      {/* Section Header Bar */}
                      <div className="flex items-center justify-between p-3.5 bg-slate-50/50">
                        <div className="flex items-center gap-2.5">
                          <GripVertical className="h-4 w-4 text-slate-300 cursor-grab" />
                          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                            <Icon className="h-4 w-4" />
                          </div>
                          <span className="text-xs font-extrabold text-slate-800">{sec.title}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          {sec.isRemovable && (
                            <button
                              type="button"
                              onClick={() => removeSection(sec.id)}
                              className="text-slate-400 hover:text-rose-500 transition-colors p-1 cursor-pointer"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => setOpenSection(isOpen ? null : sec.id)}
                            className="text-slate-400 hover:text-slate-600 transition-colors p-1 cursor-pointer"
                          >
                            <ChevronDown
                              className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                            />
                          </button>
                        </div>
                      </div>

                      {/* Expandable Form Body */}
                      {isOpen && (
                        <div className="p-4 border-t border-slate-100 space-y-3 bg-white">
                          {sec.id === "contact" && (
                            <div className="space-y-3">
                              <div>
                                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                  Full Name
                                </label>
                                <input
                                  type="text"
                                  value={fullName}
                                  onChange={(e) => setFullName(e.target.value)}
                                  className="mt-1 w-full rounded-lg border border-slate-200 p-2 text-xs font-medium text-slate-800 focus:border-indigo-500 focus:outline-none"
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                <div>
                                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                    Email
                                  </label>
                                  <input
                                    type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="mt-1 w-full rounded-lg border border-slate-200 p-2 text-xs font-medium text-slate-800 focus:border-indigo-500 focus:outline-none"
                                  />
                                </div>
                                <div>
                                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                    Phone
                                  </label>
                                  <input
                                    type="text"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="mt-1 w-full rounded-lg border border-slate-200 p-2 text-xs font-medium text-slate-800 focus:border-indigo-500 focus:outline-none"
                                  />
                                </div>
                              </div>

                              {/* Photo URL input if Photo template is active */}
                              {selectedTemplate === "photo" && (
                                <div>
                                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                    Profile Photo URL
                                  </label>
                                  <input
                                    type="text"
                                    value={photoUrl}
                                    onChange={(e) => setPhotoUrl(e.target.value)}
                                    className="mt-1 w-full rounded-lg border border-slate-200 p-2 text-xs font-medium text-slate-800 focus:border-indigo-500 focus:outline-none"
                                  />
                                </div>
                              )}
                            </div>
                          )}

                          {sec.id !== "contact" && (
                            <div className="text-center py-3 text-xs text-slate-400 font-medium border border-dashed border-slate-200 rounded-lg">
                              Edit {sec.title} Content Here
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Dynamic Capsule Pills */}
              <div className="space-y-2 pt-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                  ADD MORE SECTIONS
                </span>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => addSection("projects", "Projects", FolderPlus)}
                    className="flex items-center gap-1.5 rounded-xl bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-all cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" /> Projects
                  </button>
                  <button
                    type="button"
                    onClick={() => addSection("certifications", "Certifications", Award)}
                    className="flex items-center gap-1.5 rounded-xl bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-all cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" /> Certifications
                  </button>
                  <button
                    type="button"
                    onClick={() => addSection("languages", "Languages", Globe)}
                    className="flex items-center gap-1.5 rounded-xl bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-all cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" /> Languages
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Ad Placement */}
          <div className="flex flex-col items-center justify-center h-20 w-full rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 p-4 text-center">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              PREMIUM AD PLACEMENT 728X90
            </span>
          </div>

        </div>

        {/* RIGHT COLUMN: Template Switcher & Live macOS Preview Workspace */}
        <div className="space-y-4 lg:col-span-7">
          
          {/* TEMPLATE CHOOSING OPTIONS BAR */}
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-slate-200 bg-white p-3 shadow-xs">
            <div className="flex items-center gap-2">
              <Layout className="h-4 w-4 text-indigo-600" />
              <span className="text-xs font-extrabold text-slate-800">Select Template:</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSelectedTemplate("classic")}
                className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                  selectedTemplate === "classic"
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                1. Classic ATS
              </button>

              <button
                type="button"
                onClick={() => setSelectedTemplate("modern")}
                className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                  selectedTemplate === "modern"
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                2. Modern Executive
              </button>

              <button
                type="button"
                onClick={() => setSelectedTemplate("photo")}
                className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                  selectedTemplate === "photo"
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                <ImageIcon className="h-3.5 w-3.5" />
                <span>3. Profile Photo</span>
              </button>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
            
            {/* macOS Title Bar */}
            <div className="flex items-center justify-between border-b border-slate-100 bg-white px-5 py-3">
              <div className="flex items-center gap-1.5">
                <div className="h-3 w-3 rounded-full bg-rose-500" />
                <div className="h-3 w-3 rounded-full bg-amber-400" />
                <div className="h-3 w-3 rounded-full bg-emerald-400" />
              </div>

              <div className="flex items-center gap-4 text-[11px] font-bold">
                <span className="text-slate-400">
                  TEMPLATE: <strong className="text-indigo-600 uppercase">{selectedTemplate}</strong>
                </span>
                <span className="text-slate-400">
                  ATS SCORE: <strong className="text-emerald-500">92/100</strong>
                </span>
              </div>
            </div>

            {/* Document Preview Sheet */}
            <div className="p-8 bg-slate-100/50 min-h-[580px] flex justify-center">
              
              {/* TEMPLATE 1: CLASSIC ATS (Default Minimalist) */}
              {selectedTemplate === "classic" && (
                <div className="w-full max-w-[500px] bg-white p-8 shadow-sm border border-slate-200/60 font-serif space-y-5">
                  <div className="text-center space-y-1 pb-3 border-b border-slate-900">
                    <h2 className="text-xl font-bold tracking-wide uppercase text-slate-900">
                      {fullName || "YOUR NAME"}
                    </h2>
                    <p className="text-[10px] text-slate-600 font-sans">
                      {location} • {email} • {phone}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-[11px] font-bold tracking-wider uppercase text-slate-900 font-sans border-b border-slate-200 pb-0.5">
                      PROFESSIONAL SUMMARY
                    </h3>
                    <p className="text-[10px] text-slate-700 font-sans leading-relaxed">
                      Results-driven {role} with 5+ years of experience in architecting scalable web applications. Proven track record in optimizing performance and clean UI design.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-[11px] font-bold tracking-wider uppercase text-slate-900 font-sans border-b border-slate-200 pb-0.5">
                      WORK EXPERIENCE
                    </h3>
                    <div className="space-y-1 font-sans">
                      <div className="flex justify-between text-[10px] font-bold text-slate-900">
                        <span>Senior {role} — TechCorp</span>
                        <span>2021 – Present</span>
                      </div>
                      <ul className="list-disc list-inside text-[9.5px] text-slate-700 space-y-0.5 pl-1">
                        <li>Spearheaded micro-frontend architecture reducing load times by 35%.</li>
                        <li>Mentored team of 5 engineers in modern TypeScript standards.</li>
                      </ul>
                    </div>
                  </div>

                  {sections.map((sec) => {
                    if (["contact", "experience"].includes(sec.id)) return null;
                    return (
                      <div key={sec.id} className="space-y-1">
                        <h3 className="text-[11px] font-bold tracking-wider uppercase text-slate-900 font-sans border-b border-slate-200 pb-0.5">
                          {sec.title}
                        </h3>
                        <p className="text-[10px] text-slate-600 font-sans italic">
                          [ {sec.title} entries rendered here in linear ATS format ]
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* TEMPLATE 2: MODERN EXECUTIVE (Indigo Header Accent) */}
              {selectedTemplate === "modern" && (
                <div className="w-full max-w-[500px] bg-white shadow-sm border border-slate-200/60 font-sans">
                  <div className="bg-slate-900 p-6 text-white space-y-1">
                    <h2 className="text-xl font-extrabold tracking-tight uppercase">
                      {fullName || "YOUR NAME"}
                    </h2>
                    <p className="text-[11px] font-bold text-indigo-400">{role}</p>
                    <p className="text-[10px] text-slate-300 pt-1">
                      {location} • {email} • {phone}
                    </p>
                  </div>

                  <div className="p-6 space-y-5">
                    <div className="space-y-1">
                      <h3 className="text-[10px] font-black tracking-widest uppercase bg-slate-100 text-slate-800 px-2 py-0.5 rounded-sm inline-block">
                        Summary
                      </h3>
                      <p className="text-[10px] text-slate-700 leading-relaxed pt-1">
                        Results-driven {role} with 5+ years of experience building high-traffic systems and frontend architecture.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-[10px] font-black tracking-widest uppercase bg-slate-100 text-slate-800 px-2 py-0.5 rounded-sm inline-block">
                        Experience
                      </h3>
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] font-bold text-slate-900">
                          <span>Senior {role} — TechCorp</span>
                          <span className="text-slate-400">2021 – Present</span>
                        </div>
                        <ul className="list-disc list-inside text-[9.5px] text-slate-600 space-y-0.5">
                          <li>Spearheaded micro-frontend architecture reducing load times by 35%.</li>
                        </ul>
                      </div>
                    </div>

                    {sections.map((sec) => {
                      if (["contact", "experience"].includes(sec.id)) return null;
                      return (
                        <div key={sec.id} className="space-y-1">
                          <h3 className="text-[10px] font-black tracking-widest uppercase bg-slate-100 text-slate-800 px-2 py-0.5 rounded-sm inline-block">
                            {sec.title}
                          </h3>
                          <p className="text-[10px] text-slate-500 italic pt-0.5">
                            [ {sec.title} section content ]
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TEMPLATE 3: PROFILE PHOTO TEMPLATE */}
              {selectedTemplate === "photo" && (
                <div className="w-full max-w-[500px] bg-white p-7 shadow-sm border border-slate-200/60 font-sans space-y-5">
                  <div className="flex items-center gap-4 pb-4 border-b border-slate-200">
                    <img
                      src={photoUrl}
                      alt="Applicant Profile"
                      className="h-16 w-16 rounded-full object-cover border-2 border-indigo-600 shrink-0"
                    />
                    <div className="space-y-0.5">
                      <h2 className="text-lg font-black text-slate-900 uppercase">
                        {fullName || "YOUR NAME"}
                      </h2>
                      <p className="text-[11px] font-bold text-indigo-600">{role}</p>
                      <p className="text-[9.5px] font-medium text-slate-500">
                        {location} • {email} • {phone}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-[10px] font-bold tracking-wider uppercase text-indigo-900 border-l-2 border-indigo-600 pl-2">
                      About Me
                    </h3>
                    <p className="text-[10px] text-slate-700 leading-relaxed pt-0.5">
                      Results-driven {role} with 5+ years of experience leading UI initiatives and backend integrations.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-[10px] font-bold tracking-wider uppercase text-indigo-900 border-l-2 border-indigo-600 pl-2">
                      Work Experience
                    </h3>
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-bold text-slate-900">
                        <span>Senior {role} — TechCorp</span>
                        <span className="text-slate-400">2021 – Present</span>
                      </div>
                      <ul className="list-disc list-inside text-[9.5px] text-slate-600 space-y-0.5 pl-1">
                        <li>Spearheaded micro-frontend architecture reducing load times by 35%.</li>
                      </ul>
                    </div>
                  </div>

                  {sections.map((sec) => {
                    if (["contact", "experience"].includes(sec.id)) return null;
                    return (
                      <div key={sec.id} className="space-y-1">
                        <h3 className="text-[10px] font-bold tracking-wider uppercase text-indigo-900 border-l-2 border-indigo-600 pl-2">
                          {sec.title}
                        </h3>
                        <p className="text-[10px] text-slate-500 italic">
                          [ {sec.title} entries rendered here ]
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}

            </div>

            {/* Footer Status Bar */}
            <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/50 px-6 py-3.5">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span>Status: Preview Ready</span>
              </div>

              <button
                type="button"
                className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-600/20 hover:bg-indigo-700 transition-all cursor-pointer"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Export ATS PDF</span>
              </button>
            </div>

          </div>

          {/* Pro Tip Box */}
          <div className="flex items-start gap-3 rounded-2xl bg-indigo-50/70 p-4 text-xs text-indigo-950">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-2xs">
              <Lightbulb className="h-4 w-4" />
            </div>
            <div className="space-y-0.5">
              <p className="font-extrabold">Pro Tip: ATS Readability</p>
              <p className="text-indigo-800 font-medium leading-relaxed">
                Single-column, linear layouts perform up to 35% better in modern ATS scanners (Greenhouse, Lever) compared to multi-column graphics.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}