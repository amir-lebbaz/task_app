import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import TaskList from "@/components/task-list"

export default function TasksPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">المهام</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>إدارة المهام</CardTitle>
          <CardDescription>قم بإنشاء وتعديل وإكمال مهامك</CardDescription>
        </CardHeader>
        <CardContent>
          <TaskList />
        </CardContent>
      </Card>
    </div>
  )
}
