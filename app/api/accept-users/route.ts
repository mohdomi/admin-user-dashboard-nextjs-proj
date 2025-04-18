import { prisma } from "@/lib/prismaClient";
import { NextRequest, NextResponse } from "next/server";



export async function POST(req : NextRequest){

    const {college_roll_no , accepted } = await req.json();

    const response = await prisma.user.update({
        where : {
            college_roll_no
        } ,
        data : {
            accepted : accepted
        }
    })

    return NextResponse.json({
        response
    })





}