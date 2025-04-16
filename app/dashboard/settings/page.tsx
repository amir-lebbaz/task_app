"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import { Bell, Lock, User } from "lucide-react"

export default function SettingsPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const [profileData, setProfileData] = useState({
    name: "محمد أحمد",
    email: "mohammed@example.com",
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    taskReminders: true,
    achievementNotifications: true,
    weeklyReports: false,
  })

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfileData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotificationSettings((prev) => ({ ...prev, [key]: value }))
  }

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "تم تحديث الملف الشخصي",
        description: "تم تحديث معلومات الملف الشخصي بنجاح",
      })
    }, 1000)
  }

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "كلمة المرور غير متطابقة",
        description: "كلمة المرور الجديدة وتأكيدها غير متطابقين",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "تم تغيير كلمة المرور",
        description: "تم تغيير كلمة المرور بنجاح",
      })

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
    }, 1000)
  }

  const handleNotificationSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "تم تحديث إعدادات الإشعارات",
        description: "تم تحديث إعدادات الإشعارات بنجاح",
      })
    }, 1000)
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">الإعدادات</h2>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            الملف الشخصي
          </TabsTrigger>
          <TabsTrigger value="password" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            كلمة المرور
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            الإشعارات
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>الملف الشخصي</CardTitle>
              <CardDescription>قم بتعديل معلومات ملفك الشخصي هنا. سيتم عرض هذه المعلومات للآخرين.</CardDescription>
            </CardHeader>
            <form onSubmit={handleProfileSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">الاسم</Label>
                  <Input id="name" name="name" value={profileData.name} onChange={handleProfileChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">البريد الإلكتروني</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={profileData.email}
                    onChange={handleProfileChange}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "جاري الحفظ..." : "حفظ التغييرات"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="password" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>تغيير كلمة المرور</CardTitle>
              <CardDescription>قم بتغيير كلمة المرور الخاصة بك. يجب أن تكون كلمة المرور قوية وآمنة.</CardDescription>
            </CardHeader>
            <form onSubmit={handlePasswordSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">كلمة المرور الحالية</Label>
                  <Input
                    id="current-password"
                    name="currentPassword"
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">كلمة المرور الجديدة</Label>
                  <Input
                    id="new-password"
                    name="newPassword"
                    type="password"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">تأكيد كلمة المرور الجديدة</Label>
                  <Input
                    id="confirm-password"
                    name="confirmPassword"
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "جاري التغيير..." : "تغيير كلمة المرور"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>إعدادات الإشعارات</CardTitle>
              <CardDescription>
                قم بتخصيص إعدادات الإشعارات الخاصة بك. يمكنك تفعيل أو تعطيل الإشعارات حسب تفضيلاتك.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleNotificationSubmit}>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">إشعارات البريد الإلكتروني</Label>
                    <p className="text-sm text-muted-foreground">استلام إشعارات عبر البريد الإلكتروني</p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={(checked) => handleNotificationChange("emailNotifications", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="task-reminders">تذكيرات المهام</Label>
                    <p className="text-sm text-muted-foreground">استلام تذكيرات للمهام القادمة</p>
                  </div>
                  <Switch
                    id="task-reminders"
                    checked={notificationSettings.taskReminders}
                    onCheckedChange={(checked) => handleNotificationChange("taskReminders", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="achievement-notifications">إشعارات الإنجازات</Label>
                    <p className="text-sm text-muted-foreground">استلام إشعارات عند تحقيق إنجاز جديد</p>
                  </div>
                  <Switch
                    id="achievement-notifications"
                    checked={notificationSettings.achievementNotifications}
                    onCheckedChange={(checked) => handleNotificationChange("achievementNotifications", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="weekly-reports">التقارير الأسبوعية</Label>
                    <p className="text-sm text-muted-foreground">استلام تقارير أسبوعية عن نشاطك وإنتاجيتك</p>
                  </div>
                  <Switch
                    id="weekly-reports"
                    checked={notificationSettings.weeklyReports}
                    onCheckedChange={(checked) => handleNotificationChange("weeklyReports", checked)}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "جاري الحفظ..." : "حفظ الإعدادات"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
