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
import { Packs, useUpdateVipPack } from "@/client_actions/superadmin/vip-packs"

type Props = {
  id: string,
  data: Packs
}




export default function EditPack({ id, data }: Props) {

  const {mutate: updateVipPack, isPending} = useUpdateVipPack()
  const [amount, setAmount] = useState(0)
  const [name, setName] = useState('')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if(data){
        setAmount(data.amount)
        setName(data.name)
    }
  },[data])

  const handleSave = () => {
   
      updateVipPack(
        { packid: id, amount: amount, name: name, currency:'topupcredit'},
        {
          onSuccess: () => {
            toast.success(`Updated successfully.`)
            setOpen(false)
          },
          onError: (error) => {
            console.error("Failed to update data:", error)
            toast.error(`Failed to update data.`)
          },
        },
      )
    }


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="flex items-center gap-1 bg-blue-600 rounded-md p-2 text-white">
        <PenSquare size={15} />
      </DialogTrigger>
      <DialogContent className="h-fit max-h-[90%] w-full max-w-[32rem] overflow-y-auto  p-6">
        <DialogHeader>
          <DialogTitle>Edit {data.name}</DialogTitle>
          <DialogDescription>Manage vip pack data.</DialogDescription>
        </DialogHeader>


        <div className=" space-y-1">
            <label className=" text-xs">Name</label>
            <Input placeholder="Name" type="text" value={name} onChange={(e) => setName(e.target.value)}  className=" bg-zinc-900"/>
        </div>

        <div className=" space-y-1">
            <label className=" text-xs">Price</label>
            <Input placeholder="Amount" type="number" value={amount} onChange={(e) => setAmount(e.target.valueAsNumber)}  className=" bg-zinc-900"/>
        </div>

        <div className="flex justify-end pt-4">
            <Button disabled={isPending} onClick={handleSave}>
               {isPending && <Loader/>}
              Save
            </Button>
          </div>

        

     
      </DialogContent>
    </Dialog>
  )
}
