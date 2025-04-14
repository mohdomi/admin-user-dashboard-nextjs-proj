import { signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebaseAuth/main";
import { NextRequest, NextResponse } from "next/server";
import { FirebaseError } from "firebase/app";
import { getAuth } from "firebase/auth";
import { prisma } from "@/lib/prismaClient";


export async function POST(req: NextRequest) {

    const auth = getAuth(app);

    try {
        const { email, password } = await req.json();

        const isAdmin = await prisma.admin.findUnique({
            where : {
                email , password                    
            }
        })

        if(isAdmin){
            return NextResponse.json({
                success : true , 
                isAdmin,
                userId : "Admin"
            })
        }
        
        const userCredential = await signInWithEmailAndPassword(auth, email, password);

        const userId = await userCredential.user.getIdToken(false);


        return NextResponse.json({
            success : true,
            userId, 
            isAdmin: null
        })

    }
    catch (error) {

        if (error instanceof FirebaseError) {

            const errorCode = error.code;
            const errorMessage = error.message;

            console.log(errorCode , errorMessage);

            return NextResponse.json({
                success : false , userId: ""
            } , {
                status : 400
            })
        }else{
            return NextResponse.json({

                error

            })
        }

    }

}