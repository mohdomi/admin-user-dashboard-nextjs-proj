import { prisma } from "@/lib/prismaClient";
import { NextResponse } from "next/server";



export async function GET(){

    try{
        const response = await prisma.user.findMany();

        return NextResponse.json(response);
    }
    catch(error){

        return NextResponse.json(error);

    }

}