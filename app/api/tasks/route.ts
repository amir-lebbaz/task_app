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

    const tasks = await prisma.task.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(tasks)
  } catch (error) {
    console.error("[TASKS_GET]", error)
    return new NextResponse("خطأ داخلي", { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return new NextResponse("غير مصرح", { status: 401 })
    }

    const body = await req.json()
    const { title, description, priority, dueDate, listId } = body

    if (!title) {
      return new NextResponse("عنوان المهمة مطلوب", { status: 400 })
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        priority: priority || "medium",
        dueDate: dueDate ? new Date(dueDate) : null,
        listId,
        userId: session.user.id,
      },
    })

    return NextResponse.json(task)
  } catch (error) {
    console.error("[TASKS_POST]", error)
    return new NextResponse("خطأ داخلي", { status: 500 })
  }
}
