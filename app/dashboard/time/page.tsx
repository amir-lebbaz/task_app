import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import TimeTracker from "@/components/time-tracker"

export default function TimePage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">تتبع الوقت</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>تتبع الوقت</CardTitle>
          <CardDescription>سجل الوقت المستغرق في كل مهمة</CardDescription>
        </CardHeader>
        <CardContent>
          <TimeTracker />
        </CardContent>
      </Card>
    </div>
  )
}
