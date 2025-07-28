# Styling Guidelines 
## Overview
This document outlines the visual identity for ChainQuery, focusing on a modern, data-centric aesthetic characterized by dark tones, frosted glass effects, and subtle textures. The design leverages shadcn/ui components as the foundation, customized with our design system for optimal development speed and accessibility.

## Component Foundation: shadcn/ui Integration

### Setup & Installation
```bash
npx shadcn-ui@latest init
npx shadcn-ui@latest add button input dialog table card

Configuration
// tailwind.config.js
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Custom ChainQuery colors
        background: "#0D0D10",
        surface: "#1A1A1E", 
        frosted: "rgba(26, 26, 30, 0.5)",
        border: "#333338",
        // shadcn/ui integration
        primary: "#4F46E5",
        secondary: "#33D69F",
        accent: "#4F46E5",
        muted: "#8A8A93",
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
}

Color Palette
The palette combines dark, tech-driven tones with vibrant accents, optimized for both custom styling and shadcn/ui component theming.
Primary & Neutrals
Name
Hex
Tailwind Class
shadcn/ui Usage
Background
#0D0D10
bg-background
Default page background
Primary UI Surface
#1A1A1E
bg-surface
Card, Dialog backgrounds
Frosted Glass Fill
rgba(26, 26, 30, 0.5)
bg-surface/50
Overlay components
Borders
#333338
border-border
Component borders
Primary Text
#E5E5E6
text-foreground
Main text content
Secondary Text
#8A8A93
text-muted-foreground
Secondary text

Accent & System Colors
Name
Hex
Tailwind Class
shadcn/ui Usage
Primary Accent
#4F46E5
bg-primary
Primary buttons, focus states
Secondary Accent
#33D69F
bg-secondary
Success states, secondary buttons
Warning
#FFC700
bg-yellow-500
Warning alerts, badges
Error
#F87171
bg-destructive
Error states, validation

Typography
Font Families
Font Family
Weight
Usage
Implementation
Inter
400 (Regular)
Body text, shadcn/ui components
Default font family
Inter
600 (SemiBold)
Headings, button text
font-semibold
Inter
700 (Bold)
Main headings
font-bold
Fira Code
400 (Regular)
Code, wallet addresses
font-mono class

shadcn/ui Typography Classes
// components.json typography config
{
  "typography": {
    "h1": "text-3xl font-bold",
    "h2": "text-xl font-semibold", 
    "h3": "text-lg font-semibold",
    "p": "text-base",
    "small": "text-sm text-muted-foreground"
  }
}

Component Customization
Custom Frosted Glass Components
Frosted Dialog:
import { Dialog, DialogContent } from "@/components/ui/dialog"

<Dialog>
  <DialogContent className="bg-surface/50 backdrop-blur-md border-border">
    {/* Content */}
  </DialogContent>
</Dialog>

Frosted Card:
import { Card } from "@/components/ui/card"

<Card className="bg-surface/50 backdrop-blur-md border-border">
  {/* Content */}
</Card>

Enhanced Button Variants
// components/ui/button.tsx customization
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        frosted: "bg-surface/50 backdrop-blur-md border border-border hover:bg-surface/70",
        glow: "bg-primary hover:shadow-[0_0_20px_rgba(79,70,229,0.3)]",
      },
    },
  }
)

Custom Input with Frosted Effect
import { Input } from "@/components/ui/input"

<Input 
  className="bg-surface/50 backdrop-blur-md border-border text-foreground placeholder:text-muted-foreground"
  placeholder="Ask about on-chain activity..."
/>

UI Effects & Animations
Grainy Texture Component
// components/ui/grainy-background.tsx
export function GrainyBackground({ children, className }) {
  return (
    <div className={`relative ${className}`}>
      {children}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E")`
        }}
      />
    </div>
  )
}

Enhanced Table for Query Results
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

<Card className="bg-surface/50 backdrop-blur-md">
  <Table>
    <TableHeader>
      <TableRow className="border-border">
        <TableHead className="text-foreground">Wallet Address</TableHead>
        <TableHead className="text-foreground">Transaction</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow className="border-border hover:bg-surface/30">
        <TableCell className="font-mono text-sm">0x123...abc</TableCell>
        <TableCell>Bridge: 150K USDC</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</Card>

Component Usage Guidelines
Landing Page Components
// Hero section with frosted navigation
<header className="bg-background border-b border-border">
  <nav className="bg-surface/50 backdrop-blur-md">
    <Button variant="default">Sign Up</Button>
    <Button variant="outline">Sign In</Button>
  </nav>
</header>

// Pricing modal
<Dialog>
  <DialogContent className="bg-surface/50 backdrop-blur-md border-border">
    <Card className="bg-surface/30">
      <Button variant="glow">Upgrade to Premium</Button>
    </Card>
  </DialogContent>
</Dialog>

Query Interface Components
// Search input
<Card className="bg-surface/50 backdrop-blur-md">
  <Input 
    className="bg-transparent border-0 text-lg"
    placeholder="Show wallets that bridged >$100K to Base..."
  />
</Card>

// Results display
<GrainyBackground>
  <Table className="bg-surface/30 backdrop-blur-sm">
    {/* Query results */}
  </Table>
</GrainyBackground>



