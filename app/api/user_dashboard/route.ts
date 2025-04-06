import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prismaClient";


export async function POST(req : NextRequest){

    try{const body = await req.json();


    const response = await prisma.user.create({
        data : body
    }) 

    return NextResponse.json({
        success : true,
        response
    })
    
    }catch(error){

        console.log(error);
        return NextResponse.json({
            success : false,
            error
        })

    }

}