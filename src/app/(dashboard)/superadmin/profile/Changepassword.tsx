'use client'
import { changePassword, ChangePassword } from '@/validation/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeClosed, EyeOff } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function Changepassword() {
    const [show, setShow] = useState('password')
    const [show2, setShow2] = useState('password')

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        trigger,
        formState: { errors },
      } = useForm<ChangePassword>({
        resolver: zodResolver(changePassword),
      });
    
      const changeSuperadminpassword = async ( data: ChangePassword) => {
        console.log(data)
       
      }
    
      console.log(errors)
  return (
    <div className=' max-w-[600px] h-auto w-full flex flex-col gap-6 bg-zinc-950 rounded-md p-6'>
        <p className=' text-sm font-semibold'>Change Password</p>

        <form onSubmit={handleSubmit(changeSuperadminpassword)} className=' flex flex-col'>
            <label htmlFor="" className=' text-xs text-zinc-400'>New password</label>
            <div className=' relative'>
                <input type={show} placeholder='New password' className={` input ${errors.new && 'border-[1px] focus:outline-none border-red-500'} `} {...register('new')} />
                <button onClick={() => setShow(show === 'password' ? 'text' : 'password' )} className=' absolute right-2 top-2 p-2 bg-zinc-950 rounded-sm'>{show === 'password' ? <EyeOff size={15}/> : <Eye size={15}/>  }</button>
            </div>
            {errors.new && <p className=' text-[.6em] text-red-500'>{errors.new.message}</p>}


            <label htmlFor="" className=' text-xs text-zinc-400 mt-4'>Confirm password</label>
            <div className=' relative'>
                <input type={show2} placeholder='Confirm password'  className={` input ${errors.confirm && 'border-[1px] focus:outline-none border-red-500'} `} {...register('confirm')} />
                <button onClick={() => setShow2(show2 === 'password' ? 'text' : 'password' )} className=' absolute right-2 top-2 p-2 bg-zinc-950 rounded-sm'>{show2 === 'password' ? <EyeOff size={15}/> : <Eye size={15}/>  }</button>
            </div>
            {errors.confirm && <p className=' text-[.6em] text-red-500'>{errors.confirm.message}</p>}


            <div className=' w-full flex items-end justify-end mt-8'>
                <button className=' active-gradient py-2 px-4 w-fit text-sm'>Save</button>
            </div>

        </form>

    </div>
  )
}
