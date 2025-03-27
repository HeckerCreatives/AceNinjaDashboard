import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Addfriend from '@/app/(dashboard)/user/friends/Addfriend'
import useCharacterStore from '@/hooks/character'
import useCharacterNameStore from '@/hooks/characterUsername'
import { useGetFriendRequests, useGetFriends } from '@/client_actions/superadmin/friends'
import useUseridStore from '@/hooks/userid'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

  

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

  <Table className=' text-xs'>
      <TableCaption></TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="">Date</TableHead>
          <TableHead>Username</TableHead>
          <TableHead>Level</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.friends.map((item, index) => (
            <TableRow key={index}>
            <TableCell className="font-medium">{new Date(item.friendSince).toDateString()}</TableCell>
            <TableCell className="font-medium">{item.username}</TableCell>
            <TableCell>{item.level}</TableCell>
           
            </TableRow>
          ))}
      </TableBody>
    </Table>

    </div>
  )
}
