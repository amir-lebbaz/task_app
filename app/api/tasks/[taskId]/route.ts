import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/db"

export async function GET(req: Request, { params }: { params: { taskId: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return new NextResponse("غير مصرح", { status: 401 })
    }

    if (!params.taskId) {
      return new NextResponse("معرف المهمة مطلوب", { status: 400 })
    }

    const task = await prisma.task.findUnique({
      where: {
        id: params.taskId,
      },
    })

    if (!task) {
      return new NextResponse("المهمة غير موجودة", { status: 404 })
    }

    if (task.userId !== session.user.id) {
      return new NextResponse("غير مصرح", { status: 403 })
    }

    return NextResponse.json(task)
  } catch (error) {
    console.error("[TASK_GET]", error)
    return new NextResponse("خطأ داخلي", { status: 500 })
  }
}

export async function PATCH(req: Request, { params }: { params: { taskId: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return new NextResponse("غير مصرح", { status: 401 })
    }

    if (!params.taskId) {
      return new NextResponse("معرف المهمة مطلوب", { status: 400 })
    }

    const body = await req.json()
    const { title, description, completed, priority, dueDate, listId } = body

    const task = await prisma.task.findUnique({
      where: {
        id: params.taskId,
      },
    })

    if (!task) {
      return new NextResponse("المهمة غير موجودة", { status: 404 })
    }

    if (task.userId !== session.user.id) {
      return new NextResponse("غير مصرح", { status: 403 })
    }

    const updatedTask = await prisma.task.update({
      where: {
        id: params.taskId,
      },
      data: {
        title,
        description,
        completed: completed !== undefined ? completed : task.completed,
        priority,
        dueDate: dueDate ? new Date(dueDate) : task.dueDate,
        listId,
      },
    })

    return NextResponse.json(updatedTask)
  } catch (error) {
    console.error("[TASK_PATCH]", error)
    return new NextResponse("خطأ داخلي", { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { taskId: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return new NextResponse("غير مصرح", { status: 401 })
    }

    if (!params.taskId) {
      return new NextResponse("معرف المهمة مطلوب", { status: 400 })
    }

    const task = await prisma.task.findUnique({
      where: {
        id: params.taskId,
      },
    })

    if (!task) {
      return new NextResponse("المهمة غير موجودة", { status: 404 })
    }

    if (task.userId !== session.user.id) {
      return new NextResponse("غير مصرح", { status: 403 })
    }

    await prisma.task.delete({
      where: {
        id: params.taskId,
      },
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error("[TASK_DELETE]", error)
    return new NextResponse("خطأ داخلي", { status: 500 })
  }
}
