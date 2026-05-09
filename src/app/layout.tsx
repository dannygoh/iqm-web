import type { ReactNode } from 'react'

// Root layout is intentionally a passthrough — each route group provides its own
// <html><body> structure:
//   - (site)/layout.tsx  → IQM-themed html/body
//   - (payload)/admin/layout.tsx  → Payload's RootLayout (has its own html/body)
// Without this, Payload's RootLayout creates a nested <html> inside our <html>,
// which breaks CSS cascade and causes React hydration error #418.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children as React.ReactElement
}
