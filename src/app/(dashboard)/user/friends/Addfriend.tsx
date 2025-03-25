'use client'
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { Input } from '@/components/ui/input'
import { useAddFriend, useGetFriends, useGetUser } from '@/client_actions/user/friends'
import useCharacterStore from '@/hooks/character'
import useCharacterNameStore from '@/hooks/characterUsername'
import { FaPlus } from 'react-icons/fa'
import { Search, UserPlus } from 'lucide-react'
import toast from 'react-hot-toast'
import Loader from '@/components/common/Loader'

export default function Addfriend() {
    const { characterid} = useCharacterStore()
    const [search, setSearch] = useState('')
    const { data, isLoading} = useGetUser(characterid, search, 99999999)
    const {mutate: addFriend} = useAddFriend()
    const [userid, setUserid] = useState('')

    const addtoFriends = () => {
        if(userid){
            addFriend({characterId: characterid, friendId:userid}, {
                onSuccess: () => {
                    toast.success('Friend request sent successfully.');
                  }
            })
        }
        
    }


  return (
    <Dialog>
    <DialogTrigger>
      <FaPlus size={15} className=' text-green-500'/>
    </DialogTrigger>
    <DialogContent className=' max-w-[500px] p-6 h-fit'>
      <DialogHeader>
        <DialogTitle className=' text-sm'>Add Friend</DialogTitle>
        <DialogDescription>
          
        </DialogDescription>
      </DialogHeader>

      <div className=' w-full flex flex-col gap-4'>
        <div className=' relative'>
          <Search size={20} className=' absolute left-2 top-[10px]'/>
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Enter player id' className=' pl-10 placeholder:text-sm'/>
          <div className=' w-full flex flex-col gap-1 max-h-[200px] overflow-y-auto mt-4'>
                {isLoading && (
                    <div className=' p-6 flex items-center justify-center'>
                         <Loader/>
                    </div>
                )}
            {data?.data.map((item, index) => (
                <div key={item.id} className=' flex items-center justify-between p-2 bg-zinc-800 rounded-sm'>
                    <p className=' text-sm font-semibold'>{item.username}</p>
                    <button onClick={() => {setUserid(item.id); addtoFriends()}}>
                        <FaPlus size={12} className=''/>
                    </button>
                </div>
            ))}

            {data?.data.length === 0 && (
                <div className='p-6 flex items-center justify-center w-full'>
                    <p className=' text-zinc-500 text-[.7rem]'>No user found.</p>
                </div>
            )}
            

          </div>
        </div>
      </div>
    </DialogContent>
  </Dialog>
  )
}
