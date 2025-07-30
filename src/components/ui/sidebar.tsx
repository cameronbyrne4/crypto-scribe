import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const sidebarVariants = cva(
  "group relative flex h-full w-full flex-col gap-4 border-r bg-background p-4",
  {
    variants: {
      variant: {
        default: "border-border",
        secondary: "border-border/40",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const sidebarHeaderVariants = cva(
  "flex h-[60px] shrink-0 items-center gap-2",
  {
    variants: {
      variant: {
        default: "",
        secondary: "border-b border-border/40",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const sidebarNavVariants = cva("flex flex-1 flex-col gap-2", {
  variants: {
    variant: {
      default: "",
      secondary: "pt-4",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

const sidebarFooterVariants = cva("flex shrink-0 items-center gap-2", {
  variants: {
    variant: {
      default: "",
      secondary: "border-t border-border/40 pt-4",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

interface SidebarProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sidebarVariants> {}

const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  ({ className, variant, ...props }, ref) => (
    <aside
      ref={ref}
      className={cn(sidebarVariants({ variant }), className)}
      {...props}
    />
  )
)
Sidebar.displayName = "Sidebar"

interface SidebarHeaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sidebarHeaderVariants> {}

const SidebarHeader = React.forwardRef<HTMLDivElement, SidebarHeaderProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(sidebarHeaderVariants({ variant }), className)}
      {...props}
    />
  )
)
SidebarHeader.displayName = "SidebarHeader"

interface SidebarNavProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sidebarNavVariants> {}

const SidebarNav = React.forwardRef<HTMLElement, SidebarNavProps>(
  ({ className, variant, ...props }, ref) => (
    <nav
      ref={ref}
      className={cn(sidebarNavVariants({ variant }), className)}
      {...props}
    />
  )
)
SidebarNav.displayName = "SidebarNav"

interface SidebarFooterProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sidebarFooterVariants> {}

const SidebarFooter = React.forwardRef<HTMLDivElement, SidebarFooterProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(sidebarFooterVariants({ variant }), className)}
      {...props}
    />
  )
)
SidebarFooter.displayName = "SidebarFooter"

export {
  Sidebar,
  SidebarHeader,
  SidebarNav,
  SidebarFooter,
  sidebarVariants,
  sidebarHeaderVariants,
  sidebarNavVariants,
  sidebarFooterVariants,
}
