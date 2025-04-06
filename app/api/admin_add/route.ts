import { prisma } from "@/lib/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest){

    try{const body = await req.json();

    const response = await prisma.admin.create({
        data : body
    });

    return NextResponse.json({
        success : true,
        response
    })  
    }
    catch(error){

        return NextResponse.json({
            success : false,
            error
        })

    }    

}