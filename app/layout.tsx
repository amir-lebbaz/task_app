import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/components/providers/auth-provider"
import { Toaster } from "@/components/ui/toaster"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "TaskMaster - نظم مهامك، تتبع وقتك، احتفل بإنجازاتك",
  description: "منصة متكاملة لإدارة المهام وتتبع الوقت وتحقيق الأهداف بكفاءة عالية",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {children}
            <Toaster />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}


import './globals.css'