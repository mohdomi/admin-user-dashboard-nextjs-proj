"use client"
import { zodResolver } from '@hookform/resolvers/zod'
import {z} from 'zod'
import {useForm} from 'react-hook-form'
// import { prisma } from '@/lib/prismaClient'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import axios from 'axios'
import { useRouter } from 'next/navigation'


const formSchema = z.object({

    firstname : z.string().min(2).max(50),
    lastname : z.string().min(2).max(50),
    college_roll_no : z.string().min(4).max(50),
    university_roll_no : z.string().min(5).max(50),
    branch : z.string().min(3).max(50),
    batch : z.string(),
    semester : z.string(),
    email : z.string().email()


})


export type formSchemaType = z.infer<typeof formSchema>;

export default function ProfileForm() {
    // 1. Define your form.
    const form = useForm<formSchemaType>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        firstname: "",
        lastname: "",
        college_roll_no : "",
        university_roll_no : "",
        branch : "",
        batch : "",
        semester: "",
        email : "",

      },
    })

    const router =  useRouter();



    async function onSubmit(values: formSchemaType){

       try
       { const response = await axios.post('api/user_dashboard' , values);

            console.log(response.data);
            if(response.data.success){
                router.push("/submit");
            }

        }catch(error){

            console.error(error);

        }
    }

    // saving to database logic will be here





    
    return (

        <div className="h-screen w-full flex justify-center m-2 md:m-5 mt-10 p-1 md:p-5">        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-1/2">
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Firstname:</FormLabel>
                  <FormControl>
                    <Input placeholder="Firstname" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lastname:</FormLabel>
                  <FormControl>
                    <Input placeholder="Lastname" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="college_roll_no"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CR.Number: </FormLabel>
                  <FormControl>
                    <Input placeholder="23/XXX" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="university_roll_no"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unviersity Roll Number: </FormLabel>
                  <FormControl>
                    <Input placeholder="23EUCCSXXX" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="branch"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Branch: </FormLabel>
                  <FormControl>
                    <Input placeholder="Eg : CSE" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="batch"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Batch: </FormLabel>
                  <FormControl>
                    <Input placeholder="Eg : A4" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="semester"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Semester: </FormLabel>
                  <FormControl>
                    <Input placeholder="Eg : 4" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email: </FormLabel>
                  <FormControl>
                    <Input placeholder="something@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>

            

        </div>
      )

}
