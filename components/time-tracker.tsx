"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Pause, Play, StopCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { format } from "date-fns"
import { ar } from "date-fns/locale"

interface Task {
  id: string
  title: string
}

interface TimeEntry {
  id: string
  taskId: string
  startTime: Date
  endTime?: Date | null
  duration?: number | null
  note?: string | null
  task: Task
}

export default function TimeTracker() {
  const { toast } = useToast()
  const [tasks, setTasks] = useState<Task[]>([])
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([])
  const [selectedTask, setSelectedTask] = useState<string>("")
  const [isTracking, setIsTracking] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [timer, setTimer] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const activeTimeEntryRef = useRef<string | null>(null)

  // Fetch tasks and time entries
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)

        // Fetch tasks
        const tasksResponse = await fetch("/api/tasks")
        if (!tasksResponse.ok) throw new Error("فشل في جلب المهام")
        const tasksData = await tasksResponse.json()
        setTasks(tasksData)

        // Fetch time entries
        const entriesResponse = await fetch("/api/time-entries")
        if (!entriesResponse.ok) throw new Error("فشل في جلب سجلات الوقت")
        const entriesData = await entriesResponse.json()
        setTimeEntries(entriesData)
      } catch (error) {
        toast({
          title: "خطأ",
          description: "حدث خطأ أثناء جلب البيانات",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [toast])

  // Format seconds to HH:MM:SS
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    return [
      hours.toString().padStart(2, "0"),
      minutes.toString().padStart(2, "0"),
      secs.toString().padStart(2, "0"),
    ].join(":")
  }

  // Start timer
  const startTimer = async () => {
    if (!selectedTask) return

    try {
      setIsTracking(true)
      setIsPaused(false)

      // Create a new time entry in the database
      const response = await fetch("/api/time-entries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          taskId: selectedTask,
          startTime: new Date(),
        }),
      })

      if (!response.ok) {
        throw new Error("فشل في إنشاء سجل وقت جديد")
      }

      const newTimeEntry = await response.json()
      activeTimeEntryRef.current = newTimeEntry.id

      // Start the timer
      const id = setInterval(() => {
        setTimer((prev) => prev + 1)
      }, 1000)

      intervalRef.current = id
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء بدء تتبع الوقت",
        variant: "destructive",
      })
      setIsTracking(false)
    }
  }

  // Pause timer
  const pauseTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setIsPaused(true)
  }

  // Stop timer and save entry
  const stopTimer = async () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }

    if (timer > 0 && selectedTask && activeTimeEntryRef.current) {
      try {
        // Update the time entry in the database
        const response = await fetch(`/api/time-entries/${activeTimeEntryRef.current}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            endTime: new Date(),
            duration: timer,
          }),
        })

        if (!response.ok) {
          throw new Error("فشل في تحديث سجل الوقت")
        }

        const updatedEntry = await response.json()

        // Update the time entries list
        setTimeEntries((prev) => [updatedEntry, ...prev])

        toast({
          title: "تم إنهاء تتبع الوقت",
          description: `تم تسجيل ${formatTime(timer)} للمهمة`,
        })
      } catch (error) {
        toast({
          title: "خطأ",
          description: "حدث خطأ أثناء إنهاء تتبع الوقت",
          variant: "destructive",
        })
      }
    }

    setIsTracking(false)
    setIsPaused(false)
    setTimer(0)
    setSelectedTask("")
    activeTimeEntryRef.current = null
  }

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  // Format date for display
  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString)
    return format(date, "dd MMMM yyyy", { locale: ar })
  }

  // Group time entries by date
  const groupedEntries = timeEntries.reduce(
    (acc, entry) => {
      const date = format(new Date(entry.startTime), "yyyy-MM-dd")
      if (!acc[date]) {
        acc[date] = []
      }
      acc[date].push(entry)
      return acc
    },
    {} as Record<string, TimeEntry[]>,
  )

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="w-full md:w-1/3">
              <Select value={selectedTask} onValueChange={setSelectedTask} disabled={isTracking && !isPaused}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر مهمة" />
                </SelectTrigger>
                <SelectContent>
                  {tasks.map((task) => (
                    <SelectItem key={task.id} value={task.id}>
                      {task.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="text-3xl font-mono font-bold text-center w-full md:w-1/3">{formatTime(timer)}</div>

            <div className="flex gap-2 w-full md:w-1/3 justify-end">
              {!isTracking ? (
                <Button onClick={startTimer} disabled={!selectedTask} className="gap-2">
                  <Play className="h-4 w-4" />
                  بدء
                </Button>
              ) : isPaused ? (
                <Button onClick={startTimer} className="gap-2">
                  <Play className="h-4 w-4" />
                  استئناف
                </Button>
              ) : (
                <>
                  <Button onClick={pauseTimer} variant="outline" className="gap-2">
                    <Pause className="h-4 w-4" />
                    إيقاف مؤقت
                  </Button>
                  <Button onClick={stopTimer} variant="destructive" className="gap-2">
                    <StopCircle className="h-4 w-4" />
                    إنهاء
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <h3 className="text-lg font-medium">سجل الوقت</h3>

        {isLoading ? (
          <div className="text-center p-4">جاري تحميل سجلات الوقت...</div>
        ) : Object.keys(groupedEntries).length === 0 ? (
          <div className="text-center p-4 border rounded-md text-muted-foreground">
            لا توجد سجلات وقت. ابدأ بتتبع وقتك للمهام.
          </div>
        ) : (
          Object.entries(groupedEntries)
            .sort(([dateA], [dateB]) => new Date(dateB).getTime() - new Date(dateA).getTime())
            .map(([date, entries]) => (
              <div key={date} className="space-y-2">
                <h4 className="font-medium">{formatDate(date)}</h4>
                <div className="border rounded-md divide-y">
                  {entries.map((entry) => (
                    <div key={entry.id} className="p-4 flex justify-between items-center">
                      <div>
                        <div className="font-medium">{entry.task.title}</div>
                        {entry.note && <div className="text-sm text-muted-foreground">{entry.note}</div>}
                      </div>
                      <div className="font-mono">{entry.duration ? formatTime(entry.duration) : "جاري التتبع..."}</div>
                    </div>
                  ))}
                  <div className="p-4 flex justify-between items-center bg-muted/50">
                    <div className="font-medium">المجموع</div>
                    <div className="font-mono font-bold">
                      {formatTime(entries.reduce((sum, entry) => sum + (entry.duration || 0), 0))}
                    </div>
                  </div>
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  )
}
