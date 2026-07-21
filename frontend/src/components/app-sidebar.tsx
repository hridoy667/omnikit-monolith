"use client";

import Link from "next/link";
import { LayoutDashboard, Settings, Home, Sparkles, Folder } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const navItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Projects", url: "/projects", icon: Folder },
  { title: "Home", url: "/", icon: Home },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" className="border-r border-subtle bg-surface">
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
          <SidebarGroupLabel className="text-text-secondary">Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton tooltip={item.title}>
                    <Link href={item.url} className="flex items-center gap-2 w-full text-text-primary">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}