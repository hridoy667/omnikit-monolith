"use client";

import { LayoutDashboard, Settings, Heart, Sparkles, Clock, Search } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const navItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Recent Tools", url: "/recent-tools", icon: Clock },
  { title: "Favourites", url: "/favourites", icon: Heart },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      {/* Header section to fill space above menu */}
      <SidebarHeader className="p-4 border-b border-subtle flex flex-col gap-3">
        <div className="flex items-center gap-2.5 font-bold text-text-primary">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-hero text-white shrink-0 shadow-sm">
            <Sparkles className="h-4.5 w-4.5" />
          </div>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="text-base font-bold tracking-tight">OmniKit</span>
            <span className="text-[10px] text-text-secondary font-medium">Utility Suite</span>
          </div>
        </div>

        {/* Quick Search bar to fill upper area */}
        <div className="group-data-[collapsible=icon]:hidden mt-1 relative">
          <SidebarInput placeholder="Search tools..." className="h-9 text-xs pl-8" />
          <Search className="h-3.5 w-3.5 text-text-secondary absolute left-2.5 top-2.5" />
        </div>
      </SidebarHeader>

      <SidebarContent className="py-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    href={item.url} 
                    tooltip={item.title}
                    size="lg" // Uses taller h-12 layout for comfortable spacing
                    className="py-3 px-3.5"
                  >
                    <item.icon className="h-5 w-5 text-accent-primary shrink-0" />
                    <span className="font-medium text-sm">{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>

          {/* Sponsor Banner Space */}
          <div className="mt-8 px-2 group-data-[collapsible=icon]:hidden">
            <div className="mx-auto flex h-48 w-full items-center justify-center rounded-xl border border-dashed border-subtle bg-surface/60 p-4 text-xs font-semibold uppercase tracking-wider text-text-secondary">
              <div id="monetag-ad-container">SPONSOR SPACE</div>
            </div>
          </div>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}