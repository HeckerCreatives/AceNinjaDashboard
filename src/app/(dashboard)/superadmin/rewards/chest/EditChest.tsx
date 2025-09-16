"use client"

import React, { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Eye, PenSquare, Plus, X } from "lucide-react"

import { useGetChestRewards, ChestReward, useUpdateChestRewards, ChestRewardUpdate, updateChest, useUpdateChest, Chest } from "@/client_actions/superadmin/chest"
import toast from "react-hot-toast"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Loader from "@/components/common/Loader"

type Props = {
  chestid: string,
  data: Chest
}




export default function EditChest({ chestid, data }: Props) {

  const {mutate: updateChest, isPending} = useUpdateChest()
  const [amount, setAmount] = useState(0)

  useEffect(() => {
    if(data){
        setAmount(data.amount)
    }
  },[data])

  const handleSave = () => {
   
      updateChest(
        { chestid: chestid, amount: amount, currency: 'crystal'},
        {
          onSuccess: () => {
            toast.success(`Updated successfully.`)
          },
          onError: (error) => {
            console.error("Failed to update data:", error)
            toast.error(`Failed to update data.`)
          },
        },
      )
    }


  return (
    <Dialog>
      <DialogTrigger className="flex items-center gap-1 bg-blue-600 rounded-md px-3 py-1 text-white">
        <PenSquare size={15} />
        Edit
      </DialogTrigger>
      <DialogContent className="h-fit max-h-[90%] w-full max-w-[32rem] overflow-y-auto bg-amber-950 p-6">
        <DialogHeader>
          <DialogTitle>Edit Chest</DialogTitle>
          <DialogDescription>Manage chest data.</DialogDescription>
        </DialogHeader>

        <p className=" text-sm font-semibold">{data.name}</p>

        <div className=" space-y-1">
            <label className=" text-xs">Price</label>
            <Input placeholder="Amount" type="number" value={amount} onChange={(e) => setAmount(e.target.valueAsNumber)} />
        </div>

        <div className=" space-y-1">
            <label className=" text-xs">Currency</label>
            <Input placeholder="Currency" type="text" value={'crystal'} disabled />
        </div>

        <div className="flex justify-end pt-4">
            <Button onClick={handleSave}>
               {isPending && <Loader/>}
              Save
            </Button>
          </div>

        

     
      </DialogContent>
    </Dialog>
  )
}
