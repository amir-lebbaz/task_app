"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Clock, Edit, MoreHorizontal, Plus, Trash } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { format } from "date-fns"
import { ar } from "date-fns/locale"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"

interface Task {
  id: string
  title: string
  description?: string | null
  completed: boolean
  priority: string
  dueDate?: Date | null
  createdAt: Date
  updatedAt: Date
}

export default function TaskList() {
  const { toast } = useToast()
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentTask, setCurrentTask] = useState<Task | null>(null)
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: null as Date | null,
  })

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/tasks")

      if (!response.ok) {
        throw new Error("فشل في جلب المهام")
      }

      const data = await response.json()
      setTasks(data)
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء جلب المهام",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  // Toggle task completion
  const toggleTaskCompletion = async (id: string) => {
    const task = tasks.find((t) => t.id === id)
    if (!task) return

    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          completed: !task.completed,
        }),
      })

      if (!response.ok) {
        throw new Error("فشل في تحديث المهمة")
      }

      setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)))

      toast({
        title: task.completed ? "تم إعادة فتح المهمة" : "تم إكمال المهمة",
        description: task.completed ? "تم إعادة فتح المهمة بنجاح" : "تم تحديد المهمة كمكتملة",
      })
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء تحديث المهمة",
        variant: "destructive",
      })
    }
  }

  // Delete task
  const deleteTask = async (id: string) => {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("فشل في حذف المهمة")
      }

      setTasks(tasks.filter((t) => t.id !== id))

      toast({
        title: "تم حذف المهمة",
        description: "تم حذف المهمة بنجاح",
      })
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء حذف المهمة",
        variant: "destructive",
      })
    }
  }

  // Add new task
  const addTask = async () => {
    if (!newTask.title.trim()) {
      toast({
        title: "خطأ",
        description: "عنوان المهمة مطلوب",
        variant: "destructive",
      })
      return
    }

    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newTask.title,
          description: newTask.description,
          priority: newTask.priority,
          dueDate: newTask.dueDate,
        }),
      })

      if (!response.ok) {
        throw new Error("فشل في إضافة المهمة")
      }

      const data = await response.json()
      setTasks([data, ...tasks])

      // Reset form
      setNewTask({
        title: "",
        description: "",
        priority: "medium",
        dueDate: null,
      })

      setIsAddDialogOpen(false)

      toast({
        title: "تمت إضافة المهمة",
        description: "تمت إضافة المهمة بنجاح",
      })
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء إضافة المهمة",
        variant: "destructive",
      })
    }
  }

  // Update task
  const updateTask = async () => {
    if (!currentTask) return

    try {
      const response = await fetch(`/api/tasks/${currentTask.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: currentTask.title,
          description: currentTask.description,
          priority: currentTask.priority,
          dueDate: currentTask.dueDate,
        }),
      })

      if (!response.ok) {
        throw new Error("فشل في تحديث المهمة")
      }

      const updatedTask = await response.json()
      setTasks(tasks.map((t) => (t.id === currentTask.id ? updatedTask : t)))

      setIsEditDialogOpen(false)

      toast({
        title: "تم تحديث المهمة",
        description: "تم تحديث المهمة بنجاح",
      })
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء تحديث المهمة",
        variant: "destructive",
      })
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 hover:bg-red-100/80"
      case "medium":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100/80"
      case "low":
        return "bg-green-100 text-green-800 hover:bg-green-100/80"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100/80"
    }
  }

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case "high":
        return "عالية"
      case "medium":
        return "متوسطة"
      case "low":
        return "منخفضة"
      default:
        return ""
    }
  }

  const formatDate = (date: Date | string | null | undefined) => {
    if (!date) return ""
    return format(new Date(date), "dd MMM yyyy", { locale: ar })
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">قائمة المهام</h3>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-1">
              <Plus className="h-4 w-4" /> إضافة مهمة
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>إضافة مهمة جديدة</DialogTitle>
              <DialogDescription>أضف تفاصيل المهمة الجديدة هنا</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">عنوان المهمة</Label>
                <Input
                  id="title"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  placeholder="أدخل عنوان المهمة"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">وصف المهمة (اختياري)</Label>
                <Textarea
                  id="description"
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  placeholder="أدخل وصف المهمة"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">الأولوية</Label>
                <Select value={newTask.priority} onValueChange={(value) => setNewTask({ ...newTask, priority: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الأولوية" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">منخفضة</SelectItem>
                    <SelectItem value="medium">متوسطة</SelectItem>
                    <SelectItem value="high">عالية</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dueDate">تاريخ الاستحقاق (اختياري)</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-right font-normal">
                      {newTask.dueDate ? (
                        formatDate(newTask.dueDate)
                      ) : (
                        <span className="text-muted-foreground">اختر تاريخ</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={newTask.dueDate || undefined}
                      onSelect={(date) => setNewTask({ ...newTask, dueDate: date })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                إلغاء
              </Button>
              <Button onClick={addTask}>إضافة</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-md">
        {isLoading ? (
          <div className="p-4 text-center">جاري تحميل المهام...</div>
        ) : tasks.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">لا توجد مهام. أضف مهمة جديدة للبدء.</div>
        ) : (
          <div className="divide-y">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`p-4 flex items-start justify-between gap-2 ${task.completed ? "bg-muted/50" : ""}`}
              >
                <div className="flex items-start gap-3 flex-1">
                  <Checkbox
                    id={`task-${task.id}`}
                    checked={task.completed}
                    onCheckedChange={() => toggleTaskCompletion(task.id)}
                    className="mt-1"
                  />
                  <div className="space-y-1">
                    <label
                      htmlFor={`task-${task.id}`}
                      className={`font-medium ${task.completed ? "line-through text-muted-foreground" : ""}`}
                    >
                      {task.title}
                    </label>
                    {task.description && <p className="text-sm text-muted-foreground">{task.description}</p>}
                    <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                      <Badge variant="outline" className={getPriorityColor(task.priority)}>
                        {getPriorityLabel(task.priority)}
                      </Badge>
                      {task.dueDate && (
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatDate(task.dueDate)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      className="gap-2"
                      onClick={() => {
                        setCurrentTask(task)
                        setIsEditDialogOpen(true)
                      }}
                    >
                      <Edit className="h-4 w-4" /> تعديل
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2">
                      <Clock className="h-4 w-4" /> تتبع الوقت
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2 text-red-600" onClick={() => deleteTask(task.id)}>
                      <Trash className="h-4 w-4" /> حذف
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Task Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>تعديل المهمة</DialogTitle>
            <DialogDescription>قم بتعديل تفاصيل المهمة</DialogDescription>
          </DialogHeader>
          {currentTask && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-title">عنوان المهمة</Label>
                <Input
                  id="edit-title"
                  value={currentTask.title}
                  onChange={(e) => setCurrentTask({ ...currentTask, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">وصف المهمة (اختياري)</Label>
                <Textarea
                  id="edit-description"
                  value={currentTask.description || ""}
                  onChange={(e) => setCurrentTask({ ...currentTask, description: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-priority">الأولوية</Label>
                <Select
                  value={currentTask.priority}
                  onValueChange={(value) => setCurrentTask({ ...currentTask, priority: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الأولوية" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">منخفضة</SelectItem>
                    <SelectItem value="medium">متوسطة</SelectItem>
                    <SelectItem value="high">عالية</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-dueDate">تاريخ الاستحقاق (اختياري)</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-right font-normal">
                      {currentTask.dueDate ? (
                        formatDate(currentTask.dueDate)
                      ) : (
                        <span className="text-muted-foreground">اختر تاريخ</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={currentTask.dueDate ? new Date(currentTask.dueDate) : undefined}
                      onSelect={(date) => setCurrentTask({ ...currentTask, dueDate: date })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              إلغاء
            </Button>
            <Button onClick={updateTask}>حفظ التغييرات</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
