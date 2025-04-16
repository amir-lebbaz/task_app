import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/db"

export async function PATCH(req: Request, { params }: { params: { entryId: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return new NextResponse("غير مصرح", { status: 401 })
    }

    if (!params.entryId) {
      return new NextResponse("معرف سجل الوقت مطلوب", { status: 400 })
    }

    const body = await req.json()
    const { endTime, duration, note } = body

    const timeEntry = await prisma.timeEntry.findUnique({
      where: {
        id: params.entryId,
      },
      include: {
        task: true,
      },
    })

    if (!timeEntry) {
      return new NextResponse("سجل الوقت غير موجود", { status: 404 })
    }

    if (timeEntry.userId !== session.user.id) {
      return new NextResponse("غير مصرح", { status: 403 })
    }

    const updatedTimeEntry = await prisma.timeEntry.update({
      where: {
        id: params.entryId,
      },
      data: {
        endTime: endTime ? new Date(endTime) : timeEntry.endTime,
        duration,
        note,
      },
      include: {
        task: true,
      },
    })

    return NextResponse.json(updatedTimeEntry)
  } catch (error) {
    console.error("[TIME_ENTRY_PATCH]", error)
    return new NextResponse("خطأ داخلي", { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { entryId: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return new NextResponse("غير مصرح", { status: 401 })
    }

    if (!params.entryId) {
      return new NextResponse("معرف سجل الوقت مطلوب", { status: 400 })
    }

    const timeEntry = await prisma.timeEntry.findUnique({
      where: {
        id: params.entryId,
      },
    })

    if (!timeEntry) {
      return new NextResponse("سجل الوقت غير موجود", { status: 404 })
    }

    if (timeEntry.userId !== session.user.id) {
      return new NextResponse("غير مصرح", { status: 403 })
    }

    await prisma.timeEntry.delete({
      where: {
        id: params.entryId,
      },
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error("[TIME_ENTRY_DELETE]", error)
    return new NextResponse("خطأ داخلي", { status: 500 })
  }
}
