"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Award, Calendar, CheckCircle2, Clock, ListTodo, Target, Trophy } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { format } from "date-fns"
import { ar } from "date-fns/locale"

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  category: string
  requirement: number
  progress: number
  completed: boolean
  completedDate: string | null
}

export default function AchievementsList() {
  const { toast } = useToast()
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("/api/achievements")

        if (!response.ok) {
          throw new Error("فشل في جلب الإنجازات")
        }

        const data = await response.json()
        setAchievements(data)
      } catch (error) {
        toast({
          title: "خطأ",
          description: "حدث خطأ أثناء جلب الإنجازات",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchAchievements()
  }, [toast])

  // Format date for display
  const formatDate = (dateString: string | null) => {
    if (!dateString) return ""
    return format(new Date(dateString), "dd MMMM yyyy", { locale: ar })
  }

  // Calculate progress percentage
  const getProgressPercentage = (progress: number, total: number) => {
    return Math.round((progress / total) * 100)
  }

  // Get icon component based on icon name
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "CheckCircle2":
        return <CheckCircle2 className="h-6 w-6" />
      case "Clock":
        return <Clock className="h-6 w-6" />
      case "Calendar":
        return <Calendar className="h-6 w-6" />
      case "Target":
        return <Target className="h-6 w-6" />
      case "Award":
        return <Award className="h-6 w-6" />
      case "ListTodo":
        return <ListTodo className="h-6 w-6" />
      default:
        return <Trophy className="h-6 w-6" />
    }
  }

  // Group achievements by completion status
  const completedAchievements = achievements.filter((a) => a.completed)
  const inProgressAchievements = achievements.filter((a) => !a.completed)

  if (isLoading) {
    return <div className="text-center p-4">جاري تحميل الإنجازات...</div>
  }

  return (
    <div className="space-y-6">
      {/* Completed Achievements */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          <h3 className="text-lg font-medium">الإنجازات المكتملة ({completedAchievements.length})</h3>
        </div>

        {completedAchievements.length === 0 ? (
          <div className="text-center p-4 border rounded-md text-muted-foreground">
            لم تكمل أي إنجازات بعد. استمر في العمل!
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {completedAchievements.map((achievement) => (
              <Card key={achievement.id} className="overflow-hidden">
                <div className="h-2 bg-green-500 w-full" />
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-green-100 rounded-full text-green-700">
                      {getIconComponent(achievement.icon)}
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold">{achievement.title}</h4>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      <p className="text-xs text-green-600 font-medium">
                        أكتمل في {formatDate(achievement.completedDate)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* In Progress Achievements */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Target className="h-5 w-5" />
          <h3 className="text-lg font-medium">الإنجازات قيد التقدم ({inProgressAchievements.length})</h3>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {inProgressAchievements.map((achievement) => {
            const progressPercentage = getProgressPercentage(achievement.progress, achievement.requirement)

            return (
              <Card key={achievement.id}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-2 bg-primary/10 rounded-full text-primary">
                      {getIconComponent(achievement.icon)}
                    </div>
                    <div className="space-y-1 flex-1">
                      <h4 className="font-bold">{achievement.title}</h4>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>
                        {achievement.progress} / {achievement.requirement}
                      </span>
                      <span>{progressPercentage}%</span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
