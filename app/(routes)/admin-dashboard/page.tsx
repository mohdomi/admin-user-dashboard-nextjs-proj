'use client'
import  AdminDashboardTable  from "@/components/Dashboard/admin-dashboard";

import { useState } from "react"

export default function Dashboard(){

    const [admin , ] = useState(true);

    return((admin)? <div className="h-screen w-screen flex justify-center items-center">

        <div className="w-100 sm:w-4/5"><AdminDashboardTable /></div>

        </div> 
        : 
        <div>
            
            bye there
            
        </div>)

}


