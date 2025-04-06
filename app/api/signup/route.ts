import { createUserWithEmailAndPassword  , getAuth } from "firebase/auth";
import { NextRequest, NextResponse } from "next/server";
import { app } from "../firebaseAuth/main";
import { FirebaseError } from "firebase/app";

export async function POST(req : NextRequest){

    const auth = getAuth(app);

    try{
    
        const {email , password} = await req.json();



        
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
 
        const userId = await userCredential.user.getIdToken(false);

        return NextResponse.json({
            status : true,
            userId
        })
    } 
    
    catch(error){

        if(error instanceof FirebaseError){

            const errorMessage = error.message;
            const errorCode = error.code;

            console.log(errorMessage , errorCode);

            return NextResponse.json({
                status : false,
                userId:""
            },
            {
                status : 400
            })  
        }
        else{
            console.log("Unknown Error." , error);

            return NextResponse.json({
                status:false,
                userId : ""
            })
        }

    }
}


