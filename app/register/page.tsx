"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ListTodo } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { signIn } from "next-auth/react"

export default function RegisterPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!acceptedTerms) {
      toast({
        title: "الشروط والأحكام",
        description: "يجب الموافقة على الشروط والأحكام للمتابعة",
        variant: "destructive",
      })
      return
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "كلمة المرور غير متطابقة",
        description: "يرجى التأكد من تطابق كلمة المرور وتأكيدها",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          password: formData.password,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || "حدث خطأ أثناء التسجيل")
      }

      toast({
        title: "تم إنشاء الحساب بنجاح",
        description: "يمكنك الآن تسجيل الدخول باستخدام بياناتك",
      })

      // Sign in the user automatically
      await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      })

      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "خطأ في التسجيل",
        description: error instanceof Error ? error.message : "حدث خطأ أثناء إنشاء الحساب. يرجى المحاولة مرة أخرى.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
        <div className="mx-auto w-full max-w-sm space-y-6">
          <div className="space-y-2 text-center">
            <div className="flex justify-center">
              <Link href="/" className="flex items-center gap-2">
                <ListTodo className="h-8 w-8" />
              </Link>
            </div>
            <h1 className="text-3xl font-bold">إنشاء حساب</h1>
            <p className="text-muted-foreground">أدخل بياناتك أدناه لإنشاء حساب جديد</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first-name">الاسم الأول</Label>
                <Input id="first-name" name="firstName" value={formData.firstName} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name">الاسم الأخير</Label>
                <Input id="last-name" name="lastName" value={formData.lastName} onChange={handleChange} required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <Input
                id="email"
                name="email"
                placeholder="example@example.com"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">كلمة المرور</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">تأكيد كلمة المرور</Label>
              <Input
                id="confirm-password"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex items-center space-x-2 space-x-reverse">
              <Checkbox
                id="terms"
                checked={acceptedTerms}
                onCheckedChange={(checked) => setAcceptedTerms(checked === true)}
              />
              <Label htmlFor="terms" className="text-sm">
                أوافق على{" "}
                <Link href="/terms" className="text-primary underline-offset-4 hover:underline">
                  الشروط والأحكام
                </Link>{" "}
                و{" "}
                <Link href="/privacy" className="text-primary underline-offset-4 hover:underline">
                  سياسة الخصوصية
                </Link>
              </Label>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "جاري إنشاء الحساب..." : "إنشاء حساب"}
            </Button>
          </form>
          <div className="text-center text-sm">
            لديك حساب بالفعل؟{" "}
            <Link href="/login" className="text-primary underline-offset-4 hover:underline">
              تسجيل الدخول
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
