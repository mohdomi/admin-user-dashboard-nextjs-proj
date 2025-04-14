'use client'

import { useRouter } from "next/navigation"

export default function LandRouter(){

    const router = useRouter();

    return(
        <button onClick={
            ()=>{
                router.push("/landing-page")
                localStorage.setItem('token' , "");
            }
        } className="hover:bg-neutral-100  mt-0 mx-2 m-1 p-1 pb-2 border-1 border-neutral-500 rounded-sm " >
            Logout
        </button>
    )

}