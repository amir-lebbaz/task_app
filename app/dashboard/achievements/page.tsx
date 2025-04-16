import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import AchievementsList from "@/components/achievements-list"

export default function AchievementsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">الإنجازات</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>الإنجازات</CardTitle>
          <CardDescription>تتبع إنجازاتك وشاراتك</CardDescription>
        </CardHeader>
        <CardContent>
          <AchievementsList />
        </CardContent>
      </Card>
    </div>
  )
}
