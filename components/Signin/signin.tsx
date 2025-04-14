"use client"
import axios from "axios"
import { cn } from "@/lib/utils"
import { Button } from "@/components/Signup/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/Signup/ui/card"
import { Input } from "@/components/Signup/ui/input"
import { Label } from "@/components/Signup/ui/label"
import React, { FormEvent, useEffect, useState } from "react"
import OAuth from "@/app/api/firebaseAuth/GoogleOAuth"
import { useRouter } from "next/navigation"
import { toast } from "sonner"


export function SignInForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const [token , setToken] = useState("");
    const router = useRouter();

    useEffect(()=>{

      localStorage.setItem("token" , token);

    } , [token])


    const SignInAuth = async (e : FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement , MouseEvent>)=>{

        e.preventDefault();
        
        try{

          toast("Loading please wait..." , {
            duration:Infinity
          });

          const response = await axios.post("/api/signin" , {
            email , password
          })

          console.log(JSON.stringify(response.data));

          setToken(response.data.userId);
          if(response.data.success){
            toast.dismiss()  
            if(response.data.isAdmin !== null){
              router.push("/admin-dashboard");
            }else{
              router.push("/user-dashboard");
            }

          }
        }
        catch(error){

          console.error(JSON.stringify(error));

        }
       

    }


  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
          <Card>
            <CardHeader>
              <CardTitle>Login to your account</CardTitle>
              <CardDescription>
                Enter your email below to Login to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={SignInAuth}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      onChange={(e) => {
    
                        setEmail(e.target.value);
    
                      }}
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                    />
                  </div>
                  <div className="grid gap-3">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      <a
                        href="#"
                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                      >
                      
                      </a>
                    </div>
                    <Input onChange={(e) => {
                      setPassword(e.target.value);
                    }} id="password" type="password" required />
                  </div>
                  <div className="flex flex-col gap-3">
                    <Button onClick={(e) => SignInAuth(e)} type="submit" className="w-full">
                      Login
                    </Button>
                    <Button onClick={async () => {
                      const {userId} = await OAuth();
    
                      console.log(userId);

                      if(userId){
                        router.push("user-dashboard");
                      }
    
    
                    }} variant="outline" className="w-full">
                      Login with Google
                    </Button>
                  </div>
                </div>
                <div className="mt-4 text-center text-sm">
                  Don{"'"}t have an account?{" "}
                  <a href="/signup" className="underline underline-offset-4">
                    Sign up
                  </a>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
  )
}
