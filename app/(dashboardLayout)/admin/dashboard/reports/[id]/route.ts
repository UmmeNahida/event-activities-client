
import { NextResponse } from "next/server";

export async function PATCH(req, { params }: {params:Promise<{id:string}>}) {
  const { id } = params;
  const { action } = await req.json();

  try {
    let updateData = {};

    if (action === "REJECT_USER") {
      updateData = { status: "REJECTED" };
      // target user disable
      // await prisma.user.update({ where: { id }, data: { isActive: false } });
    }

    if (action === "REJECT_EVENT") {
      updateData = { status: "REJECTED" };
      // target event disable
      // await prisma.event.update({ where: { id }, data: { isBlocked: true } });
    }

    if (action === "RESOLVED") {
      updateData = { status: "RESOLVED" };
    }

    await prisma.report.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
