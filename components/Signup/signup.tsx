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
import React, { useState, FormEvent, useEffect } from "react"
import OAuth from "@/app/api/firebaseAuth/GoogleOAuth"
import { useRouter } from "next/navigation"



export function SignForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token , setToken] = useState("");
  const router =  useRouter();


  useEffect(()=>{

    localStorage.setItem("token" , token);

  } , [token])


  const SignUpAuth = async (e: FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

    e.preventDefault();
    try {

      const response = await axios.post("/api/signup", {
        email, password
      })

      console.log(JSON.stringify(response.data));
      
      if (response.data.status) {
        console.log(JSON.stringify(response.data.status));        
        setToken(response.data.userId);
        router.push("/user-dashboard");
      }

    } catch (error) {

      console.error(JSON.stringify(error))


    }
  }


  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Signup to your account</CardTitle>
          <CardDescription>
            Enter your email below to signup to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={SignUpAuth}>
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
                    Forgot your password?
                  </a>
                </div>
                <Input onChange={(e) => {
                  setPassword(e.target.value);
                }} id="password" type="password" required />
              </div>
              <div className="flex flex-col gap-3">
                <Button onClick={(e) => SignUpAuth(e)} type="submit" className="w-full">
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
              Already have an account?{" "}
              <a href="/signin" className="underline underline-offset-4">
                Sign in
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
