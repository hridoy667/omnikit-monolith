"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Sparkles, User, Settings, LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navLinks = [
    { href: "#tools", label: "Tools" },
    { href: "#pricing", label: "Pricing" },
    { href: "#about", label: "About" },
];

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-subtle bg-surface/80 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

                {/* Brand Logo */}
                <div className="flex items-center gap-6">
                    <Link href="/" className="flex items-center gap-2 font-bold text-text-primary text-xl">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-hero text-white shadow-sm">
                            <Sparkles className="h-4 w-4" />
                        </div>
                        <span>OmniKit</span>
                    </Link>

                    {/* Desktop Links */}
                    <nav className="hidden md:flex items-center gap-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Right Action Items */}
                <div className="hidden md:flex items-center gap-3">
                    {/* Settings / Gear Button (Left of User Menu) */}
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-9 w-9 rounded-full border-subtle bg-surface text-text-primary transition-colors hover:bg-page"
                        asChild
                    >
                        <Link href="#settings" aria-label="Settings">
                            <Settings className="h-4 w-4" />
                        </Link>
                    </Button>

                    {/* User Profile Menu */}
                    <DropdownMenu>
                        <DropdownMenuTrigger className="flex h-9 w-9 items-center justify-center rounded-full border border-subtle bg-surface text-text-primary transition-colors hover:bg-page focus:outline-none">
                            <User className="h-4 w-4" />
                            <span className="sr-only">User menu</span>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56 border-subtle bg-surface text-text-primary shadow-lg">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-subtle" />
                            <DropdownMenuItem className="cursor-pointer hover:bg-page">
                                <User className="mr-2 h-4 w-4" /> Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer hover:bg-page">
                                <Settings className="mr-2 h-4 w-4" /> Settings
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-subtle" />
                            <DropdownMenuItem className="cursor-pointer text-accent-error hover:bg-page">
                                <LogOut className="mr-2 h-4 w-4" /> Log out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                {/* Mobile Hamburger Trigger */}
                <div className="flex md:hidden">
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger className="p-2 text-text-primary rounded-md hover:bg-page focus:outline-none">
                            <Menu className="h-6 w-6" />
                            <span className="sr-only">Open main menu</span>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] border-subtle bg-surface px-6 py-6 text-text-primary sm:w-[350px]">
                            <SheetHeader className="p-0 text-left">
                                <SheetTitle className="flex items-center gap-2 font-bold text-text-primary text-lg">
                                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-hero text-white">
                                        <Sparkles className="h-3.5 w-3.5" />
                                    </div>
                                    OmniKit
                                </SheetTitle>
                            </SheetHeader>

                            <div className="mt-8 flex flex-col gap-6">
                                <nav className="flex flex-col gap-4">
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            onClick={() => setIsOpen(false)}
                                            className="text-base font-medium text-text-secondary transition-colors hover:text-text-primary"
                                        >
                                            {link.label}
                                        </Link>
                                    ))}
                                </nav>

                                <div className="h-px w-full bg-subtle" />

                                <div className="flex flex-col gap-3">
                                    <Button variant="outline" className="w-full justify-start border-subtle text-text-primary hover:bg-page">
                                        <Settings className="mr-2 h-4 w-4" />
                                        Settings
                                    </Button>
                                    <Button className="w-full bg-accent-primary text-white hover:bg-accent-primary-hover">
                                        <User className="mr-2 h-4 w-4" /> Sign up
                                    </Button>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>

            </div>
        </header>
    );
}