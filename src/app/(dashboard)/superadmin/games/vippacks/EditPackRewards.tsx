"use client"

import React, { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Boxes, Plus, X } from "lucide-react"

import {
  useGetBadgeRewards,
  useGetItemRewards,
  useGetTitleRewards,
} from "@/client_actions/superadmin/itemrewards"

import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createPackSchema, CreatePackForm } from "@/validation/schema"
import { PackItem, Packs, useAddVipPack, useUpdateVipPackRewards } from "@/client_actions/superadmin/vip-packs"
import toast from "react-hot-toast"
import Loader from "@/components/common/Loader"

const rewardTypes = [
  "coins",
  "exp",
  "crystal",
  "weapon",
//   "skill",
  "badge",
  "title",
  "outfit",
] as const

type Props = {
  data: Packs
}

export default function EditPackRewards({data}: Props) {
  const { data: weaponItems } = useGetItemRewards("weapon", "unisex")
  const { data: maleItems } = useGetItemRewards("outfit", "male")
  const { data: femaleItems } = useGetItemRewards("outfit", "female")
  const { data: skillItems } = useGetItemRewards("skills", "")
  const { data: titleItems } = useGetTitleRewards()
  const { data: badgeItems } = useGetBadgeRewards()
  const {mutate: updateVipPackRewards, isPending} = useUpdateVipPackRewards()
  const [open, setOpen] = useState(false)
 const transformRewards = data.rewards && data.rewards.map(({ rewardType, ...rest }) => ({
    ...rest,
    rewardtype: rewardType,
  }))


  const form = useForm<CreatePackForm>({
    resolver: zodResolver(createPackSchema),
    defaultValues: {
      packid:data.id,
      name: data.name,
      currency: "topupcredit",
      amount: data.amount,
      rewards: transformRewards,
    },
  })

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = form

  const { fields, append, remove } = useFieldArray({
    control,
    name: "rewards",
  })

  const rewards = watch("rewards")

  const onSubmit = (data: CreatePackForm) => {
    updateVipPackRewards(data,{
        onSuccess: () => {
            toast.success('Success')
            setOpen(false)
        }
    })

  }

  console.log(errors)



  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className=" flex items-center gap-1 bg-orange-700 p-2 rounded-md">
       
             <Boxes size={15} />
            Rewards
      </DialogTrigger>

      <DialogContent className="max-h-[90%] h-fit w-full max-w-[700px] overflow-y-auto  p-6">
        <DialogHeader>
          <DialogTitle>Edit Rewards ({data.name})</DialogTitle>
          <DialogDescription>Manage vip pack rewards data.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {/* Rewards */}
          <Card className="bg-zinc-900 border-zinc-800 border-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Rewards</CardTitle>
                <Button
                  type="button"
                  onClick={() =>
                    append({
                      rewardtype: "coins",
                      amount: 1,
                      probability: 0,
                    })
                  }
                >
                  <Plus className="w-4 h-4" /> Add Reward
                </Button>
              </div>
            </CardHeader>

            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {fields.map((field, index) => {
                const rewardType = rewards?.[index]?.rewardtype

                return (
                  <div key={field.id} className="relative p-4 rounded-lg border bg-zinc-950 space-y-4">

                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      className="absolute top-2 right-2"
                      onClick={() => remove(index)}
                    >
                      <X className="w-5 h-5 text-red-600" />
                    </Button>

                    {/* Reward Type */}
                    <div>
                      <Label>Reward Type</Label>
                      <Select
                        value={rewardType}
                        onValueChange={(val: any) =>
                          setValue(`rewards.${index}.rewardtype`, val)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Reward Type" />
                        </SelectTrigger>
                        <SelectContent>
                          {rewardTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type.toUpperCase()}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Amount Rewards */}
                    {["coins", "exp", "crystal"].includes(rewardType) && (
                      <div>
                        <Label>Amount</Label>
                        <Input
                          type="number"
                          {...register(`rewards.${index}.amount`, {
                            valueAsNumber: true,
                          })}
                        />
                        {errors.rewards?.[index]?.amount && (
                          <p className="text-red-500 text-sm">
                            {errors.rewards[index]?.amount?.message}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Weapon */}
                    {rewardType === "weapon" && (
                      <div>
                        <Label>Weapon</Label>
                        <Select
                        defaultValue={field.reward?.id}
                          onValueChange={(val) =>
                            setValue(`rewards.${index}.reward.id`, val)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select weapon" />
                          </SelectTrigger>
                          <SelectContent>
                            {weaponItems?.data.items.map((item) => (
                              <SelectItem 
                              onClick={() => setValue(`rewards.${index}.reward.name`, item.name)}
                              key={item.itemid} value={item.itemid}>
                                {item.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    {rewardType === "badge" && (
                      <div>
                        <Label>Badge</Label>
                        <Select
                         defaultValue={String(field.reward?.id)}
                          onValueChange={(val) =>
                            setValue(`rewards.${index}.reward.id`, val)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select badge" />
                          </SelectTrigger>
                          <SelectContent>
                            {badgeItems?.data.map((item) => (
                              <SelectItem 
                              onClick={() => setValue(`rewards.${index}.reward.name`, item.title)}
                            
                              key={item.index} value={String(item.index)}>
                                {item.title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                     {rewardType === "title" && (
                      <div>
                        <Label>Title</Label>
                        <Select
                         defaultValue={String(field.reward?.id)}
                          onValueChange={(val) =>
                            setValue(`rewards.${index}.reward.id`, val)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select title" />
                          </SelectTrigger>
                          <SelectContent>
                            {titleItems?.data.map((item) => (
                              <SelectItem 
                              onClick={() => setValue(`rewards.${index}.reward.name`, item.title)}
                              
                              key={item.index} value={String(item.index)}>
                                {item.title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    {/* Outfit */}
                    {rewardType === "outfit" && (
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Male Outfit</Label>
                          <Select
                           defaultValue={field.reward?.id}
                            onValueChange={(val) =>
                              setValue(`rewards.${index}.reward.id`, val)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select male" />
                            </SelectTrigger>
                            <SelectContent>
                              {maleItems?.data.items.map((item) => (
                                <SelectItem 
                              onClick={() => setValue(`rewards.${index}.reward.name`, item.name)}
                                
                                key={item.itemid} value={item.itemid}>
                                  {item.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label>Female Outfit</Label>
                          <Select
                           defaultValue={field.reward?.fid}
                            onValueChange={(val) =>
                              setValue(`rewards.${index}.reward.fid`, val)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select female" />
                            </SelectTrigger>
                            <SelectContent>
                              {femaleItems?.data.items.map((item) => (
                                <SelectItem 
                              onClick={() => setValue(`rewards.${index}.reward.fname`, item.name)}
                                
                                key={item.itemid} value={item.itemid}>
                                  {item.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </CardContent>
          </Card>

            {errors.rewards && <p className="text-red-500 text-sm">{errors.rewards.root?.message}</p>}


          <div className="flex justify-end">
            <Button disabled={isPending} type="submit">
                {isPending && <Loader />}
                Save</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
