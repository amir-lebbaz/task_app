import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import prisma from "@/lib/db"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, password } = body

    if (!name || !email || !password) {
      return new NextResponse("جميع الحقول مطلوبة", { status: 400 })
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (existingUser) {
      return new NextResponse("البريد الإلكتروني مسجل بالفعل", { status: 400 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
      },
    })

    // Create default achievements for the user
    await createDefaultAchievements(user.id)

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    })
  } catch (error) {
    console.error("[REGISTER_POST]", error)
    return new NextResponse("خطأ داخلي", { status: 500 })
  }
}

// Helper function to create default achievements for a new user
async function createDefaultAchievements(userId: string) {
  // First, ensure default achievements exist in the system
  const defaultAchievements = [
    {
      title: "منجز المهام",
      description: "أكمل 50 مهمة",
      icon: "CheckCircle2",
      category: "tasks",
      requirement: 50,
    },
    {
      title: "متتبع الوقت",
      description: "سجل 100 ساعة من العمل",
      icon: "Clock",
      category: "time",
      requirement: 100,
    },
    {
      title: "ملتزم يومياً",
      description: "استخدم التطبيق لمدة 30 يوم متتالي",
      icon: "Calendar",
      category: "streak",
      requirement: 30,
    },
    {
      title: "محقق الأهداف",
      description: "أكمل 10 أهداف كبيرة",
      icon: "Target",
      category: "goals",
      requirement: 10,
    },
    {
      title: "خبير الإنتاجية",
      description: "أكمل جميع المهام المخطط لها في يوم واحد 5 مرات",
      icon: "Award",
      category: "productivity",
      requirement: 5,
    },
    {
      title: "منظم محترف",
      description: "أنشئ 5 قوائم مهام مختلفة",
      icon: "ListTodo",
      category: "organization",
      requirement: 5,
    },
  ]

  for (const achievement of defaultAchievements) {
    // Check if achievement exists
    let dbAchievement = await prisma.achievement.findFirst({
      where: {
        title: achievement.title,
      },
    })

    // If not, create it
    if (!dbAchievement) {
      dbAchievement = await prisma.achievement.create({
        data: achievement,
      })
    }

    // Create user achievement progress
    await prisma.userAchievement.create({
      data: {
        userId,
        achievementId: dbAchievement.id,
        progress: 0,
        completed: false,
      },
    })
  }
}
