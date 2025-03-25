import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Addfriend from '@/app/(dashboard)/user/friends/Addfriend'
import useCharacterStore from '@/hooks/character'
import useCharacterNameStore from '@/hooks/characterUsername'
import { useGetFriendRequests, useGetFriends } from '@/client_actions/superadmin/friends'
import useUseridStore from '@/hooks/userid'

  

export default function Friends() {
  const { characterid} = useCharacterStore()
  const {userid, setUserid} = useUseridStore()
  const {data, isLoading} = useGetFriends(characterid, userid)
  const { charactername} = useCharacterNameStore()
  const {data: friendrequest} = useGetFriendRequests(characterid, userid)


  function formatDate(dateString: string): string {
    const date = new Date(dateString);
  
    const adjustedDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  
    return adjustedDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
  
  return (
    <div className=' w-full flex flex-col gap-8 overflow-hidden p-8'>

      <div className='w-full grid grid-cols-[repeat(auto-fill,minmax(400px,1fr))] gap-6 rounded-md overflow-hidden'>
        <div className=' flex flex-col w-full h-fit bg-zinc-900'>
          <div className=' relative w-full aspect-video bg-red-200 p-4'>
            <div className=' absolute bottom-0 w-20 translate-y-10 aspect-square rounded-full bg-zinc-800'>

            </div>
          </div>
          <div className=' flex items-center justify-between relative p-6 mt-8'>
            <p className=' text-lg font-semibold'>{charactername}</p>
          </div>
        </div>

        <div className=' flex flex-col w-full h-[500px] bg-zinc-900 p-6 text-sm rounded-md'>
          <div className=' w-full flex items-center justify-between'>
            <p className=' font-semibold'>Friend Lists</p>
            {/* <Addfriend/> */}

          </div>
          <hr className="w-full border-zinc-700 my-2" /> 
          <Tabs defaultValue="friends" className=" w-full h-full relative">
            <TabsList className=' relative'>
              {friendrequest?.friendRequests.length !== 0 && (
              <div className=' w-5 h-5 rounded-full p-1 bg-red-600 absolute right-0 top-0 text-white flex items-center justify-center text-[.6rem] translate-x-2'>{friendrequest?.friendRequests.length}</div>
              )}
              <TabsTrigger value="friends" className=' text-xs'>Your Friends</TabsTrigger>
              <TabsTrigger value="requests" className=' text-xs'>Friend Requests</TabsTrigger>
            </TabsList>
            <TabsContent value="friends" className=' w-full h-full'>
              <div className=' w-full h-full p-2 flex flex-col items-center overflow-y-auto'>
                <div className=' w-full flex flex-col gap-1'>
                  {data?.friends?.map((item, index) => (
                    <div key={item.friendId} className=' w-full flex items-center justify-between p-2 bg-zinc-950'>
                      <div className=' flex flex-col'>
                        <p className=' text-xs font-semibold'>{item.username}</p>
                        <p className=' text-[.6rem] text-zinc-500'>{formatDate(item.friendSince)}</p>

                      </div>

                      <div className=' flex flex-col items-center justify-center w-10 aspect-square rounded-full bg-zinc-900'>
                        <p className=' text-[.7rem]'>{item.level}</p>
                        <p className=' text-[.5rem] text-zinc-500'>LVL</p>
                      </div>
                    </div>
                  ))}
                  

                </div>
                {data?.friends.length === 0 && (
                  <div className=' w-full h-full flex items-center justify-center'>
                    <p className=' text-[.7rem] text-zinc-400'>No friends</p>
                  </div>
                )}
              </div>
            </TabsContent>
            <TabsContent value="requests" className=' w-full h-full'>
            <div className=' w-full h-full p-2 flex flex-col items-center overflow-y-auto'>
                <div className=' w-full flex flex-col gap-1'>
                  {friendrequest?.friendRequests?.map((item, index) => (
                    <div key={item.characterId} className=' w-full flex items-center justify-between p-2 bg-zinc-950'>
                      <div className=' flex flex-col'>
                        <p className=' text-xs font-semibold'>{item.username}</p>

                      </div>

                      <div className=' flex items-center justify-center gap-2 '>
                      
                        {/* <button disabled={isPending} onClick={() => acceptReject(item.characterId, 'rejected')} className=' bg-zinc-800 p-[2px] rounded-sm text-red-600'><X size={15}/></button>
                        <button disabled={isPending} onClick={() => acceptReject(item.characterId, 'accepted')} className=' bg-zinc-800 p-[2px] rounded-sm text-green-600'><Check size={15}/></button> */}
                      </div>
                    </div>
                  ))}
                  

                </div>
                {friendrequest?.friendRequests.length === 0 && (
                  <div className=' w-full h-full flex items-center justify-center'>
                    <p className=' text-[.7rem] text-zinc-400'>No friend requests.</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>

        </div>
      </div>

    </div>
  )
}
