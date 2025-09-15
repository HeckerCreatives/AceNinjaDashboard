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
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, Plus, X } from "lucide-react"

import { useGetBadgeRewards, useGetItemRewards, useGetTitleRewards } from "@/client_actions/superadmin/itemrewards"
import { useGetChestRewards, ChestReward, useUpdateChestRewards } from "@/client_actions/superadmin/chest"
import toast from "react-hot-toast"

type Props = {
  chestid: string
  rewards: ChestReward[]
}

type RewardType = "coins" | "exp" | "crystal" | "weapon" | "skill" | "badge" | "title" | "outfit"

const rewardTypes: RewardType[] = ["coins", "exp", "crystal", "weapon", "skill", "badge", "title", "outfit"]

export default function EditChestRewards({ chestid, rewards }: Props) {
  const { data: weaponItems } = useGetItemRewards("weapon", "unisex")
  const { data: maleItems } = useGetItemRewards("outfit", "male")
  const { data: femaleItems } = useGetItemRewards("outfit", "female")
  const { data: skillItems } = useGetItemRewards("skills", "")
  const { data: titleItems } = useGetTitleRewards()
  const { data: badgeItems } = useGetBadgeRewards()

  const [data, setData] = useState<ChestReward[]>([])
  const {mutate: updateChestRewards} = useUpdateChestRewards()

   useEffect(() => {
    if (rewards) {
        const normalized = rewards.map(r => ({
        ...r,
        rewardtype: r.rewardtype || (r as any).rewardType || "coins",
        id: r.id ? r.id.toString() : "",
        fid: r.fid ? r.fid.toString() : "",
        amount: r.amount ?? 0,
        probability: r.probability ?? 0,
        }))
        console.log('Normalized', normalized)
        setData(normalized)
    }
    }, [rewards])




  const handleAddReward = () => {
    if (data.length >= 6) return
    setData((prev) => [...prev, { rewardtype: "coins", amount: 0, probability: 0 } as any])
  }

  const handleRewardChange = (index: number, updated: Partial<ChestReward>) => {
  setData((prev) => {
    const updatedData = [...prev]
    updatedData[index] = { ...updatedData[index], ...updated }
    return updatedData
  })
}

  const handleDeleteReward = (index: number) => {
    setData((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSave = () => {
   
      updateChestRewards(
        { chestid: chestid, rewards: data},
        {
          onSuccess: () => {
            toast.success(`Rewards  updated successfully.`)
          },
          onError: (error) => {
            console.error("Failed to update rank rewards:", error)
            toast.error(`Failed to update rewards.`)
          },
        },
      )
    }

  const renderRewardInputs = (reward: ChestReward, index: number) => {
    const isAmountType = ["coins", "exp", "crystal"].includes(reward.rewardtype)

    if (isAmountType) {
      return (
        <div className="space-y-2">
          <Label>Amount</Label>
          <Input
            type="number"
            min="1"
            value={reward.amount?.toString() || ""}
            onChange={(e) => handleRewardChange(index, { amount: Number(e.target.value) })}
            className=" border-amber-400 bg-[#4C4106] border-[1px]"

          />
          <Label>Probability (%)</Label>
          <Input
            type="number"
            min="1"
            value={reward.probability?.toString() || ""}
            onChange={(e) => handleRewardChange(index, { probability: Number(e.target.value) })}
            className=" border-amber-400 bg-[#4C4106] border-[1px]"
          />
        </div>
      )
    }

    if (reward.rewardtype === "badge") {
      return (
        <div className="space-y-2">
          <Label>Badge</Label>
          <Select value={reward.id || ""} onValueChange={(val) => handleRewardChange(index, { id: val })}>
            <SelectTrigger>
              <SelectValue placeholder="Select badge" />
            </SelectTrigger>
            <SelectContent>
              {badgeItems?.data.map((option) => (
                <SelectItem key={option.index} value={`${option.index}`}>
                  {option.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Label>Probability (%)</Label>
          <Input
            type="number"
            min="1"
            value={reward.probability?.toString() || ""}
            onChange={(e) => handleRewardChange(index, { probability: Number(e.target.value) })}
            className=" border-amber-400 bg-[#4C4106] border-[1px]"

          />
        </div>
      )
    }

    if (reward.rewardtype === "title") {
      return (
        <div className="space-y-2">
          <Label>Title</Label>
          <Select value={reward.id?.toString() || ""} onValueChange={(val) => handleRewardChange(index, { id: val })}>
            <SelectTrigger>
              <SelectValue placeholder="Select title" />
            </SelectTrigger>
            <SelectContent>
              {titleItems?.data.map((option) => (
                <SelectItem key={option.index} value={`${option.index}`}>
                  {option.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Label>Probability (%)</Label>
          <Input
            type="number"
            min="1"
            value={reward.probability?.toString() || ""}
            onChange={(e) => handleRewardChange(index, { probability: Number(e.target.value) })}
            className=" border-amber-400 bg-[#4C4106] border-[1px]"

          />
        </div>
      )
    }

    if (reward.rewardtype === "weapon") {

      return (
        <div className="space-y-2">
          <Label>Weapon</Label>
          <Select  value={reward.id?.toString() || ''} onValueChange={(val) => handleRewardChange(index, { id: val })}>
            <SelectTrigger>
              <SelectValue placeholder="Select weapon" />
            </SelectTrigger>
            <SelectContent>
              {weaponItems?.data.items.map((option) => (
                <SelectItem key={option.itemid} value={option.itemid}>
                  {option.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Label>Probability (%)</Label>
          <Input
            type="number"
            min="1"
            value={reward.probability?.toString() || ""}
            onChange={(e) => handleRewardChange(index, { probability: Number(e.target.value) })}
            className=" border-amber-400 bg-[#4C4106] border-[1px]"

          />
        </div>
      )
    }

    if (reward.rewardtype === "skill") {
      return (
        <div className="space-y-2">
          <Label>Skill</Label>
          <Select value={reward.id?.toString() || ""} onValueChange={(val) => handleRewardChange(index, { id: val })}>
            <SelectTrigger>
              <SelectValue placeholder="Select skill" />
            </SelectTrigger>
            <SelectContent>
              {skillItems?.data.items.map((option) => (
                <SelectItem key={option.itemid} value={option.itemid}>
                  {option.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Label>Probability (%)</Label>
          <Input
            type="number"
            min="1"
            value={reward.probability?.toString() || ""}
            onChange={(e) => handleRewardChange(index, { probability: Number(e.target.value) })}
            className=" border-amber-400 bg-[#4C4106] border-[1px]"

          />
        </div>
      )
    }

    if (reward.rewardtype === "outfit") {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Male Skin</Label>
            <Select value={reward.id?.toString() || ""} onValueChange={(val) => handleRewardChange(index, { id: val })}>
              <SelectTrigger>
                <SelectValue placeholder="Select male skin" />
              </SelectTrigger>
              <SelectContent>
                {maleItems?.data.items.map((option) => (
                  <SelectItem key={option.itemid} value={option.itemid}>
                    {option.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Female Skin</Label>
            <Select value={reward.fid?.toString() || ""} onValueChange={(val) => handleRewardChange(index, { fid: val })}>
              <SelectTrigger>
                <SelectValue placeholder="Select female skin" />
              </SelectTrigger>
              <SelectContent>
                {femaleItems?.data.items.map((option) => (
                  <SelectItem key={option.itemid} value={option.itemid}>
                    {option.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="col-span-2">
            <Label>Probability (%)</Label>
            <Input
              type="number"
              min="1"
              value={reward.probability?.toString() || ""}
              onChange={(e) => handleRewardChange(index, { probability: Number(e.target.value) })}
            className=" border-amber-400 bg-[#4C4106] border-[1px]"

            />
          </div>
        </div>
      )
    }

  }

  return (
    <Dialog>
      <DialogTrigger className="flex items-center gap-1 bg-amber-700 rounded-md px-3 py-1">
        <Eye size={20} />
        Rewards
      </DialogTrigger>
      <DialogContent className="h-fit max-h-[90%] w-full max-w-[700px] overflow-y-auto bg-amber-950 p-6">
        <DialogHeader>
          <DialogTitle>Edit Chest Rewards</DialogTitle>
          <DialogDescription>Configure rewards for this chest</DialogDescription>
        </DialogHeader>

        <Card className="bg-amber-950 border-amber-800 border-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Rewards</CardTitle>
              <Button onClick={handleAddReward} >
                <Plus className="w-4 h-4" /> Add Reward
              </Button>
            </div>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.map((reward, i) => (
              <div key={i} className="relative p-4 rounded-lg border bg-zinc-950 space-y-4">
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute top-2 right-2 hover:bg-destructive/10"
                  onClick={() => handleDeleteReward(i)}
                >
                  <X className="w-5 h-5 text-red-600" />
                </Button>

                <div className="space-y-2">
                  <Label>Reward Type</Label>
                  <Select
                    value={reward.rewardtype}
                    onValueChange={(val: RewardType) =>
                      handleRewardChange(i, {
                        rewardtype: val,
                        id: "",
                        fid: "",
                        amount: undefined,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Reward Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {rewardTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {renderRewardInputs(reward, i)}
              </div>
            ))}
          </CardContent>
        </Card>

        {data.length > 0 && (
          <div className="flex justify-end pt-4">
            <Button onClick={handleSave}>
              Submit
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
