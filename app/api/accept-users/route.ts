import { NextResponse } from "next/server";
import { prisma } from "@/lib/prismaClient";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { collegeRollNoArray, accepted, status } = body;

    console.log(body);

    if (!collegeRollNoArray || !collegeRollNoArray.length) {
      return new NextResponse("Roll numbers are required", { status: 400 });
    }


    const users = await prisma.user.updateMany({
      where: {
        college_roll_no: {
            in : collegeRollNoArray
        }
      },
      data: {
        accepted : accepted,
        status : status,
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.log("[ACCEPT_USER]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}