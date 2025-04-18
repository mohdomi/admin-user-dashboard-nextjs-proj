'use client'

import { useRouter , usePathname } from "next/navigation"
import { useState } from "react";



export default function LandRouter(){

    const router = useRouter();
    const pathname = usePathname();
    const isAdminDashboard = pathname?.startsWith('/admin-dashboard');


    return(<div>
        {isAdminDashboard && (<button onClick={()=>{
            router.push("/accept-users");
        }} className="hover:bg-red-300 mt-0 m-1 p-1 pb-2 border-1 border-neutral-500 rounded-sm text-neutral-500">
                Requests
        </button>)}
        <button onClick={
            ()=>{
                router.push("/landing-page")
                localStorage.setItem('token' , "");
            }
        } className="hover:bg-neutral-100  mt-0 mx-2 m-1 p-1 pb-2 border-1 border-neutral-500 rounded-sm text-neutral-500" >
            Logout
        </button>
        </div>

    )

}