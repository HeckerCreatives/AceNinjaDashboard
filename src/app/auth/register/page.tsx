'use client'
import axiosInstance from "@/lib/axiosInstance";
import { handleApiError } from "@/lib/errorHandler";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import router from "next/router";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterUser, registerValidations } from "@/validation/schema";
import { useRegister } from "@/client_actions/auth/auth";

interface Login {
  username: string
  password: string
}


export default function page() {

  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { mutate: registerUser, isPending } = useRegister();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    trigger,
    formState: { errors },
  } = useForm<RegisterUser>({
    resolver: zodResolver(registerValidations),
  });


 const onSubmit = async (data: RegisterUser ) => {
      registerUser(
        {
         username: data.username,
         email: data.email,
         password: data.password
        },{
        onSuccess: () => {
          toast.success("Account registered successfully.");
          reset()
          router.push('/')

        },
      });
 };

  

  return (
    <div className=" w-full h-screen bg-zinc-100 flex items-center justify-center">

     

      <div className=" max-w-[1240px] w-[90%] h-[90%] lg:h-[700px] grid grid-cols-1 lg:grid-cols-2 rounded-lg overflow-hidden shadow-xl"
        style={{backgroundImage: "url('/Contact BG.png')", backgroundSize: "cover", backgroundPosition: "left", backgroundRepeat:"no-repeat"}}

      >
        <div className=" relative hidden lg:flex w-full h-full"
        >
          <img src="/Characters.png" alt="" className=" absolute bottom-0 right-0 object-contain"/>
        </div>

        <div className=" relative flex flex-col gap-4 items-center justify-center w-full h-full p-12 text-black ">
          <img src="/logo.png" alt="" className=" w-[200px]"/>
          <p className=" text-sm font-light">Register to Ace.</p>

          <div className=" w-full flex flex-col items-center gap-4">

          <form onSubmit={handleSubmit(onSubmit)} className=" w-full lg:w-[70%] flex flex-col gap-1 text-xs mt-4">
            <label htmlFor="" className=" text-zinc-400">Username</label>
            <input type="text" placeholder="Username" className=" p-3 bg-zinc-200 text-black rounded-sm" {...register('username')}/>
            {errors.username && <p className=' input-error'>{errors.username.message}</p>}


            <label htmlFor="" className=" text-zinc-400 mt-1">Email</label>
            <input  type="text" placeholder="Username" className=" p-3 bg-zinc-200 text-black rounded-sm" {...register('email')}/>
            {errors.email && <p className=' input-error'>{errors.email.message}</p>}


            <label htmlFor="" className=" text-zinc-400 mt-1 ">Password</label>
            <input type="password" placeholder="Username" className=" p-3 bg-zinc-200 text-black rounded-sm" {...register('password')}/>
            {errors.password && <p className=' input-error'>{errors.password.message}</p>}


            <label htmlFor="" className=" text-zinc-400 mt-1">Confirm Password</label>
            <input type="password" placeholder="Username" className=" p-3 bg-zinc-200 text-black rounded-sm" {...register('confirmPassword')}/>
            {errors.confirmPassword && <p className=' input-error'>{errors.confirmPassword.message}</p>}


            <div className=" w-full flex items-center justify-center">
              <button  className=" relative w-fit rounded-md mt-10 font-semibold flex items-center gap-2 justify-center">
                <img src="/Submit BUTTON.png" alt="" className=""/>
                <div className=" absolute z-20 w-full flex items-center justify-center gap-2">
                  {loading && (
                  <div className="loader"></div>
                  )}
                  <p className="  text-sm font-semibold">Register</p>
                </div>
              </button>
            </div>
            

          </form>

        </div>
        </div>

        

      </div>
      
    </div>
  );
}
