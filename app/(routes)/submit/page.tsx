'use client'
import { useEffect } from "react"
import { useRouter } from "next/navigation";
import { toast } from "sonner";



export default function Submit(){

    const router = useRouter();

    useEffect(()=>{
        toast("Redirecting to Landing Page...")
        setTimeout(()=>{
            router.push('/landing-page')
        } , 5000)
    } , [router]);


    return(<div className="h-screen flex justify-center items-center">
        <div className="text-5xl flex flex-col justify-center items-center">
            <span>The Form is Submitted Successfully.</span>
            <br />
            <span>Thank you</span>
        </div>
        </div>
    )

}