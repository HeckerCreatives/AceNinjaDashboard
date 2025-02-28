'use client'
import AnimatedInput from "@/components/common/InputAnimatedLabel";
import Loader from "@/components/common/Loader";
import { handleAxiosError } from "@/utils/ErrorHandler";
import axios, { AxiosError } from "axios";
import { url } from "inspector";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function Home() {

  const router = useRouter()
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [loading, setLoading] = useState(false)

  const login = () => {
    if(username === 'user'){
      router.push('/user/dashboard')
    } else if( username === 'superadmin') {
      router.push('/superadmin/dashboard')

    }
  }

  // const loginUser = async () => {
  //   setLoading(true)
  //   try {
  //       const response = await axios.get(`${process.env. NEXT_PUBLIC_API_URL}/auth/login`,
  //           {
  //               withCredentials: true,
  //               headers: {
  //               'Content-Type': 'application/json'
  //               }
  //           }
  //       )

     
  //   if (response.data.data.auth === 'superadmin' ){
  //       toast.success('Successfully logged in')
  //       router.push('/superadmin/dashboard')
  //       setLoading(false)
  //   }
        
  //   } catch (error) {
  //       setLoading(false)
  //       handleAxiosError(error, router);
  //   }
  // };


  return (
    <div className=" w-full h-screen bg-zinc-100 flex items-center justify-center">

     

      <div className=" max-w-[1240px] w-[90%] h-[90%] lg:h-[700px] grid grid-cols-1 lg:grid-cols-2 rounded-lg overflow-hidden shadow-xl"
        style={{backgroundImage: "url('/Contact Bg.png')", backgroundSize: "cover", backgroundPosition: "left", backgroundRepeat:"no-repeat"}}

      >
        <div className=" relative hidden lg:flex w-full h-full"
        >
          <img src="/Characters.png" alt="" className=" absolute bottom-0 right-0 object-contain"/>
        </div>

        <div className=" relative flex flex-col gap-4 items-center justify-center w-full h-full p-12 text-black ">
          <img src="/logo.png" alt="" className=" w-[200px]"/>
          {/* <h2 className=" text-5xl font-bold">Hi ninja!</h2> */}
          <p className=" text-sm font-light">Welcome to Ace.</p>

          <div className=" w-full flex flex-col items-center gap-4">

          <div className=" w-full lg:w-[70%] flex flex-col gap-1 text-xs mt-4">
            <label htmlFor="" className=" text-zinc-400">Username</label>
            <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Username" className=" p-3 bg-zinc-200 text-black rounded-sm" />


            <label htmlFor="" className=" text-zinc-400 mt-4">Password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Username" className=" p-3 bg-zinc-200 text-black rounded-sm" />

            <div className=" w-full flex items-center justify-center">
              <button onClick={login} className=" relative w-fit rounded-md mt-10 font-semibold flex items-center gap-2 justify-center">
                {/* <Loader/> */}
                <img src="/Submit BUTTON.png" alt="" className=""/>
                <div className=" absolute z-20 w-full flex items-center justify-center gap-2">
                  <div className="loader"></div>
                  <p className="  text-sm font-semibold">Sign in</p>
                </div>
              </button>
            </div>
            

          </div>

        </div>
        </div>

        

      </div>
      
    </div>
  );
}
