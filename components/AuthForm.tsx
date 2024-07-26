'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {Form,} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import {z} from "zod"
import { Divide, Loader2 } from 'lucide-react'
import CustomInput from './CustomInput'
import { authFormSchema } from '@/lib/utils'
import { signIn, signUp } from '@/lib/actions/user.actions'
import { useRouter } from 'next/navigation'
// const authformSchema = z.object({
//    email: z.string().email(),
//    password:z.string().min(8)
  
//     })
  

const AuthForm = ({type}:{type:string}) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const formSchema = authFormSchema(type)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          email: "", 
          password:""
        },
      })
     
     
      const onSubmit = async(data: z.infer<typeof formSchema>)=> {
        console.log('Form data:', data) 
        // setIsLoading(true)
        // console.log('e don show')
        try{
          setIsLoading(true)

          if(type === 'sign-up'){
            const newUser = await signUp(data)
            setUser(newUser)

            console.log(newUser)
            console.log('na signup')
            alert('na soo')
          }

          if(type === 'sign-in'){
            const response = await signIn({
              email: data.email,
              password: data.password

              
            })

            if(response) router.push('/')
          }

        } catch(error){
          console.log(error)
        }finally{

          console.log(data)
          setIsLoading(false)
        }
      }

  
  return (
    <section className='auth-form'>
        <header className='flex flex-col gap-5 md:gap-8'>
            <Link href="/" className='flex cursor-pointer items-center gap-1 px-4'>
                <Image
                src="/icons/logo.svg"
                width={34}
                height={34}
                alt='horizon logo'
                
                />

                <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>Horizon</h1>
            </Link>

            <div className=' flex flex-col gap-1 md:gap-3'>
                <h1 className=' text-24 lg:text-36 font-semibold text-gray-900'>
                    {user? 'link-account'
                    : type === 'sign-in'? 'Sign In': 'Sign Up'}
                    <p className=' text-16 font-normal text-gray-600'>
                        {user? 'link your account to get started':
                        'please enter your details'}
                    </p>
                
                </h1>

            </div>
        </header>
        {user? (
            <div className=' flex flex-col gap-4'>
              <p>hfshshhfshhfsh</p>
            </div>
        ): (
            <>
               <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  {type === 'sign-up'&& (
                    <>
                      <div className=' flex gap-4'>
                        <CustomInput control={form.control} name="firstName"
                        label="First name" placeholder="Enter your First name"/>
                        <CustomInput control={form.control} name="lastName"
                        label="Last name" placeholder="Enter your Last name"/>

                      </div>
                        
                      <CustomInput control={form.control} name="address1"
                      label="Address" placeholder="Enter your specific Address"/>
                      <div className=' flex gap-4'>
                        <CustomInput control={form.control} name="state"
                        label="State" placeholder="Example: NY"/>
                        <CustomInput control={form.control} name="postalCode"
                        label="Postal code" placeholder="Example: 10111"/>
                      </div>
                      <div className='flex gap-4'>

                        <CustomInput control={form.control} name="dateOfBirth"
                        label="Date of birth" placeholder="Example: YY-MM-DD"/>
                        <CustomInput control={form.control} name="ssn"
                        label="SSN" placeholder="Example:1234"/>
                      </div>
                        
                    </>
                  )}
                 

                  <CustomInput control={form.control} name="email"
                   label="Email" placeholder="Enter your email"/>
                  <CustomInput control={form.control} name="password"
                   label="Password" placeholder="Enter your password"/>

                  <div className='flex flex-col gap-4'>

                    <Button className='form-btn'  type="submit">{isLoading? (
                      <>
                      <Loader2 size={20} className='animate-spin'/> &nbsp;
                      loading...
                      </>
                    ): type=== 'sign-in'? 'sign-In': 'Sign Up'}</Button>

                    {/* <button type='submit'>sign</button> */}
                  </div>
                </form>
              </Form>

              <footer className=' flex justify-center gap-1'>
                <p className=' text-14 font-normal text-gray-600'>
                  {type === 'sign-in'? "Don't have an account": "Already have an account?"}
                </p>
                <Link href={type === 'sign-in'? "/sign-up": "/sign-in"} className='form-link'>
                  {type === "sign-in"?'sign up': 'sign in'}
                </Link>

              </footer>
            </>
        )}
    </section>
  )
}

export default AuthForm