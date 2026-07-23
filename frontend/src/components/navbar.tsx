"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Sparkles, User, Settings, LogOut, Layers } from "lucide-react";

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
  { href: "#faq", label: "Faq" },
  { href: "#about", label: "About" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Helper function to perform smooth scroll
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.replace("#", "");
      const element = document.getElementById(targetId);

      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }

      // Close mobile sheet if open
      setIsOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-subtle bg-surface/80 backdrop-blur-md px-3 sm:px-6">
      <div className="mx-auto flex h-14 items-center justify-between gap-4">

        {/* Brand Logo (Left) */}
        <div className="flex items-center">
          <Link
            href="/"
            className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary rounded-lg p-1 transition-opacity hover:opacity-90"
          >
            <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-primary text-white shadow-sm ring-1 ring-white/20 transition-transform group-hover:scale-105">
              <Layers className="h-4 w-4" />
              <div className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5 items-center justify-center rounded-full bg-surface">
                <Sparkles className="h-2 w-2 text-accent-primary" />
              </div>
            </div>

            <span className="font-semibold text-text-primary text-base tracking-tight">
              Toolq.io
            </span>
          </Link>
        </div>

        {/* Desktop Navigation (Center) */}
        <nav className="hidden md:flex flex-1 items-center justify-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(e) => handleScroll(e, link.href)}
              className="rounded-md px-3.5 py-1.5 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary hover:bg-page"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Action Items */}
        <div className="hidden md:flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon-sm"
            className="h-8 w-8 text-text-secondary hover:text-text-primary"
            nativeButton={false}
            render={
              <Link href="#settings" aria-label="Settings">
                <Settings className="h-4 w-4" />
              </Link>
            }
          />

          <DropdownMenu>
            <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-full border border-subtle bg-surface text-text-primary transition-colors hover:bg-page focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-accent-primary/10 text-accent-primary text-xs font-semibold">
                <User className="h-4 w-4" />
              </div>
              <span className="sr-only">User menu</span>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-52 border-subtle bg-surface p-1 text-text-primary shadow-lg rounded-xl"
            >
              <DropdownMenuLabel className="px-2 py-1.5">
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-semibold text-text-primary">My Account</span>
                  <span className="text-[11px] text-text-secondary font-normal truncate">user@example.com</span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-subtle/50 my-1" />

              <DropdownMenuItem className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs font-medium text-text-primary cursor-pointer hover:bg-page focus:bg-page">
                <User className="h-3.5 w-3.5 text-text-secondary" /> Profile
              </DropdownMenuItem>

              <DropdownMenuItem className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs font-medium text-text-primary cursor-pointer hover:bg-page focus:bg-page">
                <Settings className="h-3.5 w-3.5 text-text-secondary" /> Settings
              </DropdownMenuItem>

              <DropdownMenuSeparator className="bg-subtle/50 my-1" />

              <DropdownMenuItem className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs font-medium text-red-600 dark:text-red-400 cursor-pointer hover:bg-red-500/10 focus:bg-red-500/10">
                <LogOut className="h-3.5 w-3.5" /> Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="flex md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="h-8 w-8 text-text-primary"
                  aria-label="Open main menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              }
            />

            <SheetContent
              side="right"
              className="w-[280px] border-subtle bg-sidebar p-5 text-text-primary sm:w-[320px]"
            >
              <SheetHeader className="p-0 text-left border-b border-subtle pb-4">
                <SheetTitle className="flex items-center gap-2.5 font-bold text-text-primary text-base">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent-primary text-white">
                    <Layers className="h-3.5 w-3.5" />
                  </div>
                  Toolq.io
                </SheetTitle>
              </SheetHeader>

              <div className="mt-6 flex flex-col gap-5">
                <nav className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={(e) => handleScroll(e, link.href)}
                      className="rounded-lg px-3 py-2 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary hover:bg-page"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>

                <div className="h-px w-full bg-subtle" />

                <div className="flex flex-col gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start border-subtle text-text-primary hover:bg-page text-xs font-medium"
                  >
                    <Settings className="mr-2 h-3.5 w-3.5 text-text-secondary" />
                    Settings
                  </Button>
                  <Button
                    size="sm"
                    className="w-full bg-accent-primary text-white hover:bg-accent-primary/90 text-xs font-medium"
                  >
                    <User className="mr-2 h-3.5 w-3.5" /> Sign up
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