"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { PanelLeftIcon, Sparkles, LogOut, User } from "lucide-react"

const SIDEBAR_COOKIE_NAME = "sidebar_state"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_WIDTH = "15rem"
const SIDEBAR_WIDTH_MOBILE = "18rem"
const SIDEBAR_WIDTH_ICON = "3.5rem"
const SIDEBAR_KEYBOARD_SHORTCUT = "b"

type SidebarContextProps = {
  state: "expanded" | "collapsed"
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContextProps | null>(null)

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.")
  }

  return context
}

function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}) {
  const isMobile = useIsMobile()
  const [openMobile, setOpenMobile] = React.useState(false)

  const [_open, _setOpen] = React.useState(defaultOpen)
  const open = openProp ?? _open
  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === "function" ? value(open) : value
      if (setOpenProp) {
        setOpenProp(openState)
      } else {
        _setOpen(openState)
      }

      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
    },
    [setOpenProp, open]
  )

  const toggleSidebar = React.useCallback(() => {
    return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open)
  }, [isMobile, setOpen, setOpenMobile])

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault()
        toggleSidebar()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [toggleSidebar])

  const state = open ? "expanded" : "collapsed"

  const contextValue = React.useMemo<SidebarContextProps>(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }),
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
  )

  return (
    <SidebarContext.Provider value={contextValue}>
      <div
        data-slot="sidebar-wrapper"
        style={
          {
            "--sidebar-width": SIDEBAR_WIDTH,
            "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
            ...style,
          } as React.CSSProperties
        }
        className={cn(
          "group/sidebar-wrapper flex min-h-svh w-full has-data-[variant=inset]:bg-surface",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  )
}

function Sidebar({
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  className,
  children,
  dir,
  ...props
}: React.ComponentProps<"div"> & {
  side?: "left" | "right"
  variant?: "sidebar" | "floating" | "inset"
  collapsible?: "offcanvas" | "icon" | "none"
}) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar()

  if (collapsible === "none") {
    return (
      <div
        data-slot="sidebar"
        className={cn(
          "flex h-full w-(--sidebar-width) flex-col border-r border-subtle bg-sidebar text-sidebar-foreground",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
        <SheetContent
          dir={dir}
          data-sidebar="sidebar"
          data-slot="sidebar"
          data-mobile="true"
          className={cn(
            "w-(--sidebar-width) border-subtle bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden",
            className
          )}
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
            } as React.CSSProperties
          }
          side={side}
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Sidebar</SheetTitle>
            <SheetDescription>Displays navigation links.</SheetDescription>
          </SheetHeader>
          <div className="flex h-full w-full flex-col">{children}</div>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <div
      className="group peer hidden text-sidebar-foreground md:block"
      data-state={state}
      data-collapsible={state === "collapsed" ? collapsible : ""}
      data-variant={variant}
      data-side={side}
      data-slot="sidebar"
    >
      <div
        data-slot="sidebar-gap"
        className={cn(
          "relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear",
          "group-data-[collapsible=offcanvas]:w-0",
          "group-data-[side=right]:rotate-180",
          variant === "floating" || variant === "inset"
            ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]"
            : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)"
        )}
      />
      <div
        data-slot="sidebar-container"
        data-side={side}
        className={cn(
          "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear data-[side=left]:left-0 data-[side=left]:group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)] data-[side=right]:right-0 data-[side=right]:group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)] md:flex",
          variant === "floating" || variant === "inset"
            ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]"
            : "border-subtle group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l"
        )}
        {...props}
      >
        <div
          data-sidebar="sidebar"
          data-slot="sidebar-inner"
          className={cn(
            "flex size-full flex-col border-r border-subtle bg-sidebar text-sidebar-foreground group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:shadow-sm group-data-[variant=floating]:ring-1 group-data-[variant=floating]:ring-subtle",
            className
          )}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

function SidebarTrigger({
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { toggleSidebar } = useSidebar()

  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon-sm"
      className={cn(className)}
      onClick={(event) => {
        onClick?.(event)
        toggleSidebar()
      }}
      {...props}
    >
      <PanelLeftIcon />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  )
}

function SidebarRail({ className, ...props }: React.ComponentProps<"button">) {
  const { toggleSidebar } = useSidebar()

  return (
    <button
      data-sidebar="rail"
      data-slot="sidebar-rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      className={cn(
        "absolute inset-y-0 z-20 hidden w-4 transition-all ease-linear group-data-[side=left]:-right-4 group-data-[side=right]:left-0 after:absolute after:inset-y-0 after:start-1/2 after:w-[2px] hover:after:bg-subtle sm:flex ltr:-translate-x-1/2 rtl:-translate-x-1/2",
        "in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize",
        "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
        "group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full hover:group-data-[collapsible=offcanvas]:bg-surface",
        "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
        "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
        className
      )}
      {...props}
    />
  )
}

function SidebarInset({ className, ...props }: React.ComponentProps<"main">) {
  return (
    <main
      data-slot="sidebar-inset"
      className={cn(
        "relative flex w-full flex-1 flex-col bg-background md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2",
        className
      )}
      {...props}
    />
  )
}

function SidebarInput({
  className,
  ...props
}: React.ComponentProps<typeof Input>) {
  return (
    <Input
      data-slot="sidebar-input"
      data-sidebar="input"
      className={cn("h-8 w-full bg-background shadow-none", className)}
      {...props}
    />
  )
}

function SidebarHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-header"
      data-sidebar="header"
      className={cn("flex flex-col gap-3 p-3 pb-2", className)}
      {...props}
    >
      {/* Brand / Logo Space */}
      <div className="flex items-center gap-2 px-1 py-1">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold shadow-sm">
          <Sparkles className="h-4 w-4" />
        </div>
        <div className="flex flex-col group-data-[collapsible=icon]:hidden">
          <span className="text-sm font-bold tracking-tight text-text-primary">
            Toolq.io
          </span>
          <span className="text-[10px] text-text-secondary font-medium">
            Utility Suite v1.0
          </span>
        </div>
      </div>

      {/* Quick Search Bar to fill space */}
      <div className="group-data-[collapsible=icon]:hidden">
        <SidebarInput placeholder="Search tools..." className="h-9 text-xs" />
      </div>
    </div>
  )
}

function SidebarFooter({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-footer"
      data-sidebar="footer"
      className={cn("mt-auto flex flex-col gap-2 p-3 border-t border-subtle/50", className)}
      {...props}
    >
      {children ? (
        children
      ) : (
        <div className="flex flex-col gap-1">
          <button className="flex w-full items-center gap-2.5 rounded-lg p-2 text-left text-sm font-medium text-text-primary hover:bg-page transition-colors group-data-[collapsible=icon]:justify-center">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-primary/10 text-accent-primary">
              <User className="h-4 w-4" />
            </div>
            <span className="truncate group-data-[collapsible=icon]:hidden">
              My Account
            </span>
          </button>

          <button className="flex w-full items-center gap-2.5 rounded-lg p-2 text-left text-xs font-medium text-text-secondary hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400 transition-colors group-data-[collapsible=icon]:justify-center">
            <LogOut className="h-4 w-4 shrink-0" />
            <span className="truncate group-data-[collapsible=icon]:hidden">
              Sign Out
            </span>
          </button>
        </div>
      )}
    </div>
  )
}

function SidebarSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="sidebar-separator"
      data-sidebar="separator"
      className={cn("mx-2 w-auto bg-subtle", className)}
      {...props}
    />
  )
}

function SidebarContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-content"
      data-sidebar="content"
      className={cn(
        "no-scrollbar flex min-h-0 flex-1 flex-col gap-3 overflow-auto group-data-[collapsible=icon]:overflow-hidden px-2 py-2",
        className
      )}
      {...props}
    />
  )
}

function SidebarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group"
      data-sidebar="group"
      className={cn("relative flex w-full min-w-0 flex-col", className)}
      {...props}
    />
  )
}

function SidebarGroupLabel({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div"> & React.ComponentProps<"div">) {
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        className: cn(
          "flex h-7 shrink-0 items-center rounded-md px-2 text-xs font-semibold text-text-secondary/70 uppercase tracking-wider ring-sidebar-ring outline-hidden transition-[margin,opacity] duration-200 ease-linear group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0 focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
          className
        ),
      },
      props
    ),
    render,
    state: {
      slot: "sidebar-group-label",
      sidebar: "group-label",
    },
  })
}

function SidebarGroupAction({
  className,
  render,
  ...props
}: useRender.ComponentProps<"button"> & React.ComponentProps<"button">) {
  return useRender({
    defaultTagName: "button",
    props: mergeProps<"button">(
      {
        className: cn(
          "absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-text-primary ring-sidebar-ring outline-hidden transition-transform group-data-[collapsible=icon]:hidden after:absolute after:-inset-2 hover:bg-page hover:text-accent-primary focus-visible:ring-2 md:after:hidden [&>svg]:size-4 [&>svg]:shrink-0",
          className
        ),
      },
      props
    ),
    render,
    state: {
      slot: "sidebar-group-action",
      sidebar: "group-action",
    },
  })
}

function SidebarGroupContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group-content"
      data-sidebar="group-content"
      className={cn("w-full text-sm", className)}
      {...props}
    />
  )
}

function SidebarMenu({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="sidebar-menu"
      data-sidebar="menu"
      className={cn("flex w-full min-w-0 flex-col gap-2 m-0 p-0 list-none", className)} // Increased gap from gap-1 to gap-2
      {...props}
    />
  )
}

function SidebarMenuItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="sidebar-menu-item"
      data-sidebar="menu-item"
      className={cn("group/menu-item relative list-none m-0 p-0", className)}
      {...props}
    />
  )
}

const sidebarMenuButtonVariants = cva(
  "peer/menu-button group/menu-button flex w-full items-center gap-3 overflow-hidden rounded-lg text-left font-medium ring-sidebar-ring outline-hidden transition-all group-has-data-[sidebar=menu-action]/menu-item:pr-8 group-data-[collapsible=icon]:size-10! group-data-[collapsible=icon]:p-2! hover:bg-page hover:text-accent-primary focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg]:size-4.5 [&_svg]:shrink-0 [&>span:last-child]:truncate",
  {
    variants: {
      variant: {
        default:
          "text-text-primary hover:bg-page hover:text-accent-primary data-[active=true]:bg-accent-primary/10 data-[active=true]:text-accent-primary data-[active=true]:font-semibold",
        outline:
          "bg-surface shadow-[0_0_0_1px_var(--subtle)] hover:bg-page hover:text-accent-primary data-[active=true]:bg-accent-primary/10 data-[active=true]:text-accent-primary data-[active=true]:font-semibold",
      },
      size: {
        default: "h-10 px-3.5 py-2.5 text-sm", // Increased height and padding
        sm: "h-8 px-2.5 py-1.5 text-xs",
        lg: "h-12 px-4 py-3 text-base group-data-[collapsible=icon]:p-0!", // Extra padded layout
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function SidebarMenuButton({
  render,
  isActive: isActiveProp,
  href,
  variant = "default",
  size = "default",
  tooltip,
  className,
  ...props
}: useRender.ComponentProps<"button"> &
  React.ComponentProps<"button"> & {
    isActive?: boolean
    href?: string
    tooltip?: string | React.ComponentProps<typeof TooltipContent>
  } & VariantProps<typeof sidebarMenuButtonVariants>) {
  const { isMobile, state } = useSidebar()
  const pathname = usePathname()

  const isCurrentActive = React.useMemo(() => {
    if (isActiveProp !== undefined) return isActiveProp
    if (!href) return false
    
    // Normalize trailing slashes
    const currentPath = pathname.endsWith("/") && pathname !== "/" ? pathname.slice(0, -1) : pathname
    const targetHref = href.endsWith("/") && href !== "/" ? href.slice(0, -1) : href

    if (targetHref === "/" || targetHref === "/dashboard") {
      return currentPath === "/" || currentPath === "/dashboard"
    }
    return currentPath.startsWith(targetHref)
  }, [isActiveProp, href, pathname])

  const defaultElement = href ? <Link href={href} /> : <button />

  const comp = useRender({
    defaultTagName: href ? "a" : "button",
    props: mergeProps<"button">(
      {
        className: cn(sidebarMenuButtonVariants({ variant, size }), className),
        "data-active": isCurrentActive ? "true" : "false",
      } as Record<string, unknown>,
      props
    ),
    render: render || defaultElement,
    state: {
      slot: "sidebar-menu-button",
      sidebar: "menu-button",
      size,
    },
  })

  if (!tooltip) {
    return comp
  }

  if (typeof tooltip === "string") {
    tooltip = { children: tooltip }
  }

  return (
    <Tooltip>
      <TooltipTrigger render={comp} />
      <TooltipContent
        side="right"
        align="center"
        hidden={state !== "collapsed" || isMobile}
        {...tooltip}
      />
    </Tooltip>
  )
}

function SidebarMenuAction({
  className,
  render,
  showOnHover = false,
  ...props
}: useRender.ComponentProps<"button"> &
  React.ComponentProps<"button"> & {
    showOnHover?: boolean
  }) {
  return useRender({
    defaultTagName: "button",
    props: mergeProps<"button">(
      {
        className: cn(
          "absolute top-2 right-1 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-text-primary ring-sidebar-ring outline-hidden transition-transform group-data-[collapsible=icon]:hidden peer-hover/menu-button:text-accent-primary peer-data-[size=default]/menu-button:top-2 peer-data-[size=lg]/menu-button:top-3 peer-data-[size=sm]/menu-button:top-1.5 after:absolute after:-inset-2 hover:bg-page hover:text-accent-primary focus-visible:ring-2 md:after:hidden [&>svg]:size-4 [&>svg]:shrink-0",
          showOnHover &&
          "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 peer-data-[active=true]/menu-button:text-accent-primary aria-expanded:opacity-100 md:opacity-0",
          className
        ),
      },
      props
    ),
    render,
    state: {
      slot: "sidebar-menu-action",
      sidebar: "menu-action",
    },
  })
}

function SidebarMenuBadge({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-menu-badge"
      data-sidebar="menu-badge"
      className={cn(
        "pointer-events-none absolute right-2 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium text-text-primary tabular-nums select-none group-data-[collapsible=icon]:hidden peer-hover/menu-button:text-accent-primary peer-data-[size=default]/menu-button:top-2 peer-data-[size=lg]/menu-button:top-3 peer-data-[size=sm]/menu-button:top-1.5 peer-data-[active=true]/menu-button:text-accent-primary",
        className
      )}
      {...props}
    />
  )
}

function SidebarMenuSkeleton({
  className,
  showIcon = false,
  ...props
}: React.ComponentProps<"div"> & {
  showIcon?: boolean
}) {
  const [width] = React.useState(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`
  })

  return (
    <div
      data-slot="sidebar-menu-skeleton"
      data-sidebar="menu-skeleton"
      className={cn("flex h-9 items-center gap-2 rounded-lg px-2", className)}
      {...props}
    >
      {showIcon && (
        <Skeleton
          className="size-4 rounded-md"
          data-sidebar="menu-skeleton-icon"
        />
      )}
      <Skeleton
        className="h-4 max-w-(--skeleton-width) flex-1"
        data-sidebar="menu-skeleton-text"
        style={
          {
            "--skeleton-width": width,
          } as React.CSSProperties
        }
      />
    </div>
  )
}

function SidebarMenuSub({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="sidebar-menu-sub"
      data-sidebar="menu-sub"
      className={cn(
        "mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-subtle px-2.5 py-0.5 group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  )
}

function SidebarMenuSubItem({
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="sidebar-menu-sub-item"
      data-sidebar="menu-sub-item"
      className={cn("group/menu-sub-item relative", className)}
      {...props}
    />
  )
}

function SidebarMenuSubButton({
  render,
  size = "md",
  isActive = false,
  className,
  ...props
}: useRender.ComponentProps<"a"> &
  React.ComponentProps<"a"> & {
    size?: "sm" | "md"
    isActive?: boolean
  }) {
  return useRender({
    defaultTagName: "a",
    props: mergeProps<"a">(
      {
        className: cn(
          "flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-text-primary ring-sidebar-ring outline-hidden group-data-[collapsible=icon]:hidden hover:bg-page hover:text-accent-primary focus-visible:ring-2 active:bg-page active:text-accent-primary disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[size=md]:text-sm data-[size=sm]:text-xs data-[active=true]:bg-page data-[active=true]:text-accent-primary [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-accent-primary",
          className
        ),
        "data-active": isActive ? "true" : "false",
      } as Record<string, unknown>,
      props
    ),
    render,
    state: {
      slot: "sidebar-menu-sub-button",
      sidebar: "menu-sub-button",
      size,
    },
  })
}

function SidebarSponsorAd({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-sponsor-ad"
      className={cn(
        "mt-auto flex flex-col gap-2 rounded-xl border border-dashed border-subtle bg-surface/50 p-3 text-center group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-accent-primary">
        <Sparkles className="h-3.5 w-3.5" />
        <span>Sponsor Space</span>
      </div>
      <p className="text-[11px] leading-relaxed text-text-secondary">
        Promote your project or banner ad here.
      </p>
    </div>
  )
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarSponsorAd,
  SidebarTrigger,
  useSidebar,
}