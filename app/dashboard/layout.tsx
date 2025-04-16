import type React from "react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Bell, ListTodo, LogOut, Menu, Settings, User } from "lucide-react"
import Link from "next/link"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <nav className="grid gap-6 text-lg font-medium">
              <Link href="/dashboard" className="flex items-center gap-2 text-lg font-semibold">
                <ListTodo className="h-6 w-6" />
                <span>TaskMaster</span>
              </Link>
              <Link href="/dashboard" className="flex items-center gap-2 text-muted-foreground">
                لوحة التحكم
              </Link>
              <Link href="/dashboard/tasks" className="flex items-center gap-2 text-muted-foreground">
                المهام
              </Link>
              <Link href="/dashboard/time" className="flex items-center gap-2 text-muted-foreground">
                تتبع الوقت
              </Link>
              <Link href="/dashboard/achievements" className="flex items-center gap-2 text-muted-foreground">
                الإنجازات
              </Link>
              <Link href="/dashboard/settings" className="flex items-center gap-2 text-muted-foreground">
                الإعدادات
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <Link href="/dashboard" className="flex items-center gap-2 text-lg font-semibold">
          <ListTodo className="h-6 w-6" />
          <span className="hidden md:inline">TaskMaster</span>
        </Link>
        <div className="flex-1"></div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
            <span className="sr-only">الإشعارات</span>
          </Button>
          <ModeToggle />
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
            <span className="sr-only">الملف الشخصي</span>
          </Button>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r bg-muted/40 md:block">
          <nav className="grid gap-2 p-4 text-sm">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              لوحة التحكم
            </Link>
            <Link
              href="/dashboard/tasks"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              المهام
            </Link>
            <Link
              href="/dashboard/time"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              تتبع الوقت
            </Link>
            <Link
              href="/dashboard/achievements"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              الإنجازات
            </Link>
            <Link
              href="/dashboard/settings"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <Settings className="h-4 w-4" />
              الإعدادات
            </Link>
            <Link
              href="/"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <LogOut className="h-4 w-4" />
              تسجيل الخروج
            </Link>
          </nav>
        </aside>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}
