import { SignForm } from "@/components/Signup/signup"

export default function Signup(){

    return(
        <div className="h-screen w-full flex flex-col justify-center items-center">
            <div className="p-5 w-1/2 md:w-1/3">
        <SignForm />
        </div>
        </div>
    )

}