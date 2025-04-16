import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, Clock, ListTodo, Trophy } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <ListTodo className="h-6 w-6" />
            <span>TaskMaster</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium">
              الرئيسية
            </Link>
            <Link href="/features" className="text-sm font-medium text-muted-foreground">
              المميزات
            </Link>
            <Link href="/pricing" className="text-sm font-medium text-muted-foreground">
              الأسعار
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline" size="sm">
                تسجيل الدخول
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm">إنشاء حساب</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container px-4 md:px-6 flex flex-col items-center text-center space-y-8">
          <div className="space-y-4 max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tighter">نظم مهامك، تتبع وقتك، احتفل بإنجازاتك</h1>
            <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              منصة متكاملة لإدارة المهام وتتبع الوقت وتحقيق الأهداف بكفاءة عالية
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/register">
              <Button size="lg" className="gap-2">
                ابدأ الآن
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/demo">
              <Button variant="outline" size="lg">
                عرض توضيحي
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">المميزات الرئيسية</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                كل ما تحتاجه لتنظيم حياتك وزيادة إنتاجيتك في مكان واحد
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="flex flex-col items-center space-y-4 p-6 border rounded-lg">
              <div className="p-2 bg-primary/10 rounded-full">
                <ListTodo className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold">إدارة المهام</h3>
              <p className="text-muted-foreground text-center">
                أنشئ مهام، نظمها في قوائم، حدد أولوياتها، وتابع تقدمك بسهولة
              </p>
            </div>
            {/* Feature 2 */}
            <div className="flex flex-col items-center space-y-4 p-6 border rounded-lg">
              <div className="p-2 bg-primary/10 rounded-full">
                <Clock className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold">تتبع الوقت</h3>
              <p className="text-muted-foreground text-center">
                سجل الوقت المستغرق في كل مهمة واحصل على تقارير مفصلة عن إنتاجيتك
              </p>
            </div>
            {/* Feature 3 */}
            <div className="flex flex-col items-center space-y-4 p-6 border rounded-lg">
              <div className="p-2 bg-primary/10 rounded-full">
                <Trophy className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold">الإنجازات</h3>
              <p className="text-muted-foreground text-center">
                احتفل بإنجازاتك واكتسب شارات تحفيزية كلما أكملت أهدافك
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* App Preview Section */}
      <section className="py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                واجهة سهلة الاستخدام تعمل على جميع الأجهزة
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                تصميم متجاوب يعمل بسلاسة على الهواتف الذكية والأجهزة اللوحية وأجهزة الكمبيوتر
              </p>
              <ul className="grid gap-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>تصميم متجاوب لجميع أحجام الشاشات</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>واجهة سهلة الاستخدام وبديهية</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>وضع مظلم/فاتح للراحة البصرية</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>تزامن البيانات بين جميع أجهزتك</span>
                </li>
              </ul>
            </div>
            <div className="mx-auto lg:mr-0 relative">
              <div className="relative overflow-hidden rounded-xl border bg-background p-2 shadow-lg">
                <div className="rounded-lg overflow-hidden border shadow-sm">
                  <img
                    src="/placeholder.svg?height=600&width=800"
                    alt="تطبيق TaskMaster على الأجهزة المختلفة"
                    className="aspect-video object-cover w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">ابدأ في تنظيم حياتك اليوم</h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                انضم إلى آلاف المستخدمين الذين يحققون المزيد من الإنتاجية مع TaskMaster
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/register">
                <Button size="lg">إنشاء حساب مجاني</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/50">
        <div className="container flex flex-col gap-6 py-8 md:py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 font-bold">
              <ListTodo className="h-6 w-6" />
              <span>TaskMaster</span>
            </div>
            <nav className="flex gap-4 sm:gap-6">
              <Link href="/terms" className="text-sm font-medium hover:underline underline-offset-4">
                الشروط والأحكام
              </Link>
              <Link href="/privacy" className="text-sm font-medium hover:underline underline-offset-4">
                سياسة الخصوصية
              </Link>
              <Link href="/contact" className="text-sm font-medium hover:underline underline-offset-4">
                اتصل بنا
              </Link>
            </nav>
          </div>
          <div className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} TaskMaster. جميع الحقوق محفوظة.
          </div>
        </div>
      </footer>
    </div>
  )
}
