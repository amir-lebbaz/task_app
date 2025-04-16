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

    const timeEntries = await prisma.timeEntry.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        task: true,
      },
      orderBy: {
        startTime: "desc",
      },
    })

    return NextResponse.json(timeEntries)
  } catch (error) {
    console.error("[TIME_ENTRIES_GET]", error)
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
    const { taskId, startTime, endTime, duration, note } = body

    if (!taskId) {
      return new NextResponse("معرف المهمة مطلوب", { status: 400 })
    }

    if (!startTime) {
      return new NextResponse("وقت البدء مطلوب", { status: 400 })
    }

    // Check if task exists and belongs to user
    const task = await prisma.task.findUnique({
      where: {
        id: taskId,
      },
    })

    if (!task) {
      return new NextResponse("المهمة غير موجودة", { status: 404 })
    }

    if (task.userId !== session.user.id) {
      return new NextResponse("غير مصرح", { status: 403 })
    }

    const timeEntry = await prisma.timeEntry.create({
      data: {
        taskId,
        startTime: new Date(startTime),
        endTime: endTime ? new Date(endTime) : null,
        duration,
        note,
        userId: session.user.id,
      },
    })

    return NextResponse.json(timeEntry)
  } catch (error) {
    console.error("[TIME_ENTRIES_POST]", error)
    return new NextResponse("خطأ داخلي", { status: 500 })
  }
}
