"use client";

import Link from "next/link";
import { Rocket, History, FileText, Wand2, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const recentlyUsed = [
    {
        title: "PDF to JPG",
        time: "2 mins ago",
        icon: FileText,
        iconBg: "bg-accent-secondary/15 text-accent-secondary",
    },
    {
        title: "AI Upscaler",
        time: "1 hour ago",
        icon: Wand2,
        iconBg: "bg-accent-primary/15 text-accent-primary",
    },
    {
        title: "JSON Formatter",
        time: "Yesterday",
        icon: Code2,
        iconBg: "bg-accent-tertiary/15 text-accent-tertiary",
    },
];

export function HeroSection() {
    return (
        <div className="w-full space-y-6">
            {/* Sponsor Space */}
            <div className="mx-auto flex h-20 w-full items-center justify-center rounded-t-xl border border-dashed border-subtle bg-surface/60 text-xs font-semibold uppercase tracking-wider text-text-secondary">
                <div id="monetag-ad-container">SPONSOR SPACE</div>
            </div>

            {/* Hero Banner */}
            <section className="-mt-6 rounded-b-xl bg-gradient-to-b from-accent-primary/10 via-accent-primary/5 to-transparent p-8 text-center sm:p-12">
                <div className="mx-auto max-w-3xl space-y-4">
                    {/* Increased scale for primary impact */}
                    <h1 className="text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl md:text-5xl">
                        Your All-in-One Utility Hub
                    </h1>
                    {/* Body text scale */}
                    <p className="mx-auto max-w-xl text-sm leading-relaxed text-text-secondary sm:text-base">
                        The precision toolkit for modern developers and digital creators. Fast, reliable, and entirely browser-based.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                        <Button size="lg" className="bg-accent-primary px-6 text-sm font-medium text-white hover:bg-accent-primary-hover">
                            Get Started
                        </Button>
                        <Button size="lg" variant="outline" className="border-subtle bg-surface px-6 text-sm font-medium text-text-primary hover:bg-page">
                            View Pricing
                        </Button>
                    </div>
                </div>
            </section>

            {/* Recently Used Section with White Background Container */}
            <section className="space-y-9 rounded-xl bg-white p-4 shadow-xs sm:p-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-text-primary text-lg sm:text-xl">
                        <History className="h-5 w-5 text-accent-primary" />
                        <h2>Recently Used</h2>
                    </div>
                    <button
                        type="button"
                        className="text-xs font-semibold text-accent-primary transition-colors hover:text-accent-primary-hover"
                        onClick={() => {
                            /* Handle clear history logic */
                        }}
                    >
                        Clear History
                    </button>
                </div>

                {/* Recent Cards Grid */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {recentlyUsed.map((item) => (
                        <div
                            key={item.title}
                            className="flex items-center gap-3.5 rounded-lg border border-subtle bg-page p-3.5 transition-all hover:bg-surface hover:shadow-xs"
                        >
                            <div
                                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${item.iconBg}`}
                            >
                                <item.icon className="h-5 w-5" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-text-primary text-sm sm:text-base">
                                    {item.title}
                                </h3>
                                <p className="text-xs text-text-secondary">{item.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}