import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/db"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return new NextResponse("غير مصرح", { status: 401 })
    }

    // Get all achievements with user progress
    const achievements = await prisma.achievement.findMany({
      include: {
        userAchievements: {
          where: {
            userId: session.user.id,
          },
        },
      },
    })

    // Format the response
    const formattedAchievements = achievements.map((achievement) => {
      const userAchievement = achievement.userAchievements[0] || null

      return {
        id: achievement.id,
        title: achievement.title,
        description: achievement.description,
        icon: achievement.icon,
        category: achievement.category,
        requirement: achievement.requirement,
        progress: userAchievement?.progress || 0,
        completed: userAchievement?.completed || false,
        completedDate: userAchievement?.completedDate || null,
      }
    })

    return NextResponse.json(formattedAchievements)
  } catch (error) {
    console.error("[ACHIEVEMENTS_GET]", error)
    return new NextResponse("خطأ داخلي", { status: 500 })
  }
}
