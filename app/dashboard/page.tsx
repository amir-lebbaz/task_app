import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDays, Clock, ListTodo, Plus, Trophy } from "lucide-react"
import TaskList from "@/components/task-list"
import TimeTracker from "@/components/time-tracker"
import AchievementsList from "@/components/achievements-list"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">لوحة التحكم</h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <CalendarDays className="mr-2 h-4 w-4" />
              التقويم
            </Button>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              مهمة جديدة
            </Button>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">المهام النشطة</CardTitle>
              <ListTodo className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">3 مهام ذات أولوية عالية</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">الوقت المسجل اليوم</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3.5 ساعات</div>
              <p className="text-xs text-muted-foreground">+15% مقارنة بالأمس</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">الإنجازات</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">2 إنجازات جديدة هذا الأسبوع</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="tasks" className="space-y-4">
          <TabsList>
            <TabsTrigger value="tasks" className="flex items-center gap-2">
              <ListTodo className="h-4 w-4" />
              المهام
            </TabsTrigger>
            <TabsTrigger value="time" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              تتبع الوقت
            </TabsTrigger>
            <TabsTrigger value="achievements" className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              الإنجازات
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tasks" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>المهام</CardTitle>
                <CardDescription>إدارة مهامك وتتبع تقدمك</CardDescription>
              </CardHeader>
              <CardContent>
                <TaskList />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="time" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>تتبع الوقت</CardTitle>
                <CardDescription>سجل الوقت المستغرق في كل مهمة</CardDescription>
              </CardHeader>
              <CardContent>
                <TimeTracker />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>الإنجازات</CardTitle>
                <CardDescription>تتبع إنجازاتك وشاراتك</CardDescription>
              </CardHeader>
              <CardContent>
                <AchievementsList />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
