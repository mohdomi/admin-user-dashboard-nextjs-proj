import { SignInForm } from "@/components/Signin/signin"
export default function SignIn(){

    return(
        <div className="h-screen w-full flex flex-col justify-center items-center">
            <div className="p-5 w-3/4 lg:w-1/3">
        <SignInForm />
        </div>
        </div>
    )

}