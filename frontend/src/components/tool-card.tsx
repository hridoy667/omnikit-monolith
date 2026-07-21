"use client";

import Link from "next/link";
import { type LucideIcon } from "lucide-react";

export interface ToolItem {
  id: string;
  title: string;
  description: string;
  url: string;
  icon: LucideIcon;
  tags: string[];
  accent: "indigo" | "teal" | "amber";
}

const colorStyles = {
  indigo: {
    border: "border-l-indigo-600 dark:border-l-indigo-500",
    iconBg: "bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400",
    badgePrimary: "bg-indigo-100/70 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300",
    badgeSecondary: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
  },
  teal: {
    border: "border-l-teal-500 dark:border-l-teal-400",
    iconBg: "bg-teal-50 dark:bg-teal-950/50 text-teal-600 dark:text-teal-400",
    badgePrimary: "bg-teal-100/70 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300",
    badgeSecondary: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
  },
  amber: {
    border: "border-l-amber-600 dark:border-l-amber-500",
    iconBg: "bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400",
    badgePrimary: "bg-amber-100/70 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
    badgeSecondary: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
  },
};

export function ToolCard({ tool }: { tool: ToolItem }) {
  const styles = colorStyles[tool.accent];

  return (
    <Link
      href={tool.url}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-xl border border-subtle border-l-[4px] ${styles.border} bg-surface p-4 sm:p-5 shadow-xs transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:shadow-md`}
    >
      <div className="space-y-3">
        {/* Icon Circle: 40px (10) instead of 48px (12) for better balance */}
        <div className={`flex h-10 w-10 items-center justify-center rounded-full transition-transform duration-200 group-hover:scale-105 ${styles.iconBg}`}>
          <tool.icon className="h-5 w-5" />
        </div>

        {/* Title & Description Sizing */}
        <div className="space-y-1">
          <h3 className="font-bold text-text-primary text-sm sm:text-base group-hover:text-accent-primary transition-colors">
            {tool.title}
          </h3>
          <p className="line-clamp-2 text-xs sm:text-[13px] leading-relaxed text-text-secondary">
            {tool.description}
          </p>
        </div>
      </div>

      {/* Badges / Tags */}
      <div className="mt-4 flex flex-wrap items-center gap-1.5">
        {tool.tags.map((tag, index) => (
          <span
            key={tag}
            className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${
              index === 0 ? styles.badgePrimary : styles.badgeSecondary
            }`}
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}