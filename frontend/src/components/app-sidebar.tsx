"use client";

import { LayoutDashboard, Settings, Home, Sparkles, Folder } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const navItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Recent Tools", url: "/recent-tools", icon: Folder },
  { title: "Favourites", url: "/favourites", icon: Home },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4 border-b border-subtle">
        <div className="flex items-center gap-2 font-bold text-text-primary">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-hero text-white shrink-0">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="group-data-[collapsible=icon]:hidden">OmniKit</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton href={item.url} tooltip={item.title}>
                    <item.icon className="h-4 w-4 text-accent-primary" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>

          {/* Sponsor Space placed directly below menu items with explicit margin */}
          <div className="mt-8 px-2 group-data-[collapsible=icon]:hidden">
            <div className="mx-auto flex h-50 w-full items-center justify-center rounded-t-xl border border-dashed border-subtle bg-surface/60 text-xs font-semibold uppercase tracking-wider text-text-secondary">
              <div id="monetag-ad-container">SPONSOR SPACE</div>
            </div>
          </div>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}