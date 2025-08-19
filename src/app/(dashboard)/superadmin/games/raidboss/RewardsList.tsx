"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Trash2, Plus, Pencil, Check } from "lucide-react"
import BossRewardSelector from "./BossRewardSelector"
import toast from "react-hot-toast"
import { useGetBadgeRewards, useGetItemRewards, useGetTitleRewards } from "@/client_actions/superadmin/itemrewards"
import { useEditBossRewards } from "@/client_actions/superadmin/raidboss"
import Loader from "@/components/common/Loader"
import { useGetCompanion } from "@/client_actions/superadmin/companion"

interface Reward {
  type: string
  amount?: number
  id?: string
  fid?: string
  maleSkin?: string
  femaleSkin?: string
}

interface RewardListManagerProps {
    id: string
  initialRewards?: Reward[]
  onChange: (rewards: Reward[]) => void
   onClose?: () => void
}

export default function RewardListManager({ initialRewards = [], onChange, id, onClose }: RewardListManagerProps) {
  const [rewards, setRewards] = useState<Reward[]>(initialRewards)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
    const { data: itemsRewards } = useGetItemRewards("", "")
    const { data: titleItems } = useGetTitleRewards()
    const { data: badgeItems } = useGetBadgeRewards()
    const {mutate: editBossRewards, isPending} = useEditBossRewards()
    const {data: companionItems} = useGetCompanion(0,99999)
    

  

    const transformRewardsForSubmit = (rewards: Reward[]) => {
    const output: any[] = []

    rewards.forEach((reward) => {
        if (["exp", "coins", "crystal"].includes(reward.type)) {
        if (reward.amount) {
            const displayName =
            reward.type === "exp"
                ? "exp"
                : reward.type === "coins"
                ? "coins"
                : "crystal"

            output.push({
            type: reward.type,
            amount: reward.amount,
            name: displayName,
            })
        }
        }

        // Item
        else if (reward.type === "item" && reward.id) {
        const item = itemsRewards?.data.items.find((i) => i.itemid === reward.id)
        if (item) {
            output.push({
            type: "item",
            id: reward.id,
            name: item.name,
            gender: item.gender,
            })
        }
        }

        // Skin (male + female names)
        else if (reward.type === "skin") {
        const maleItem = reward.maleSkin
            ? itemsRewards?.data.items.find((i) => i.itemid === reward.maleSkin)
            : null
        const femaleItem = reward.femaleSkin
            ? itemsRewards?.data.items.find((i) => i.itemid === reward.femaleSkin)
            : null

        output.push({
            type: "skin",
            id: reward.maleSkin,
            fid: reward.femaleSkin,
            name: maleItem?.name || "Male Skin",   // 👈 male skin name
            fname: femaleItem?.name || "Female Skin", // 👈 female skin name
        })
        }

        // Title
        else if (reward.type === "title" && reward.id) {
        const title = titleItems?.data.find((i) => i.index === Number(reward.id))
        if (title) {
            output.push({
            type: "title",
            id: reward.id,
            name: title.title,
            })
        }
        }

        // Badge
        else if (reward.type === "badge" && reward.id) {
        const badge = badgeItems?.data.find((i) => i.index === Number(reward.id))
        if (badge) {
            output.push({
            type: "badge",
            id: reward.id,
            name: badge.title,
            })
        }
        }

        // Companion
        else if (reward.type === "companion" && reward.id) {
        const item = companionItems?.data.find((i) => i.id === reward.id)
        output.push({
            type: "companion",
            id: reward.id,
            name: item?.name || "Companion",
        })
        }
    })

    return output
    }



  const findItems = (data: string) => {
        const itemData = itemsRewards?.data.items.find((item) => item.itemid === data)
        return itemData

  }

  const findTitle = (data: number) => {
    const itemData = titleItems?.data.find((item) => item.index === data)
    return itemData
  }

  const findBadge = (data: number) => {
    const itemData = badgeItems?.data.find((item) => item.index === data)
    return itemData
    
  }


  const findCompanion = (data: string) => {
    const itemData = companionItems?.data.find((item) => item.id === data)
    return itemData
    
  }

  

  const handleAddReward = () => {
  if (rewards.length > 0) {
    const lastReward = rewards[0]
    if (!lastReward.type || lastReward.type.trim() === "") {
      return toast.error('Please fill the previous item details before adding new one.')
    }
  }

  const newReward: Reward = { type: "" }
  setRewards((prev) => [newReward, ...prev]) // add at the front
  setEditingIndex(0) // new one editable
}


  const handleUpdateReward = (index: number, updated: Reward) => {
    const newRewards = [...rewards]
    newRewards[index] = updated
    setRewards(newRewards)
    onChange(newRewards)
  }

  const handleDeleteReward = (index: number) => {
    const newRewards = rewards.filter((_, i) => i !== index)
    setRewards(newRewards)
    onChange(newRewards)
    if (editingIndex === index) setEditingIndex(null)
  }

  const handleSave = () => {
    setEditingIndex(null) // exit edit mode
  }


  const handleSubmit = async () => {
    const payload = {
        status,
        rewards: transformRewardsForSubmit(rewards), 
    }

   editBossRewards({id: id, rewards: rewards} , {
        onSuccess: () => {
          toast.success(`Raid boss rewards updated successfully.`);
         if (onClose) onClose()
        },
      })


}


  console.log(rewards)

  return (
    <div className="space-y-4">
        <div className=" flex items-center justify-between w-full">
            <Button disabled={isPending} className=" text-white bg-amber-950 flex items-center gap-2 w-fit" onClick={handleAddReward}>
                <Plus className="w-4 h-4" /> Add Reward
            </Button>

             <Button disabled={isPending} className=" text-white bg-amber-950 flex items-center gap-2 w-fit" onClick={handleSubmit}>
                 {isPending && <Loader/>}
                 Save
            </Button>
        </div>

        <p className=" text-xs text-white">Total rewards: {rewards.length} items</p>
        
      {rewards.map((reward, index) => (
        <Card key={index} className="bg-amber-950 border-amber-700">
          <CardHeader className="flex flex-row items-center justify-between p-3">
            <span className="text-sm font-semibold text-white capitalize">
              {reward.type || "Not set"}
            </span>
            <div className="flex gap-2">
              {editingIndex === index ? (
                <Button size="sm" onClick={handleSave} className=" text-xs bg-amber-700 text-white">
                    Save
                </Button>
              ) : (
                <Button size="sm" variant="ghost" onClick={() => setEditingIndex(index)}>
                  <Pencil className="w-4 h-4 text-blue-400" />
                </Button>
              )}
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleDeleteReward(index)}
              >
                <Trash2 className="w-4 h-4 text-red-400" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className=" ">
            {editingIndex === index ? (
              <BossRewardSelector
                reward={reward}
                onChange={(updated) => handleUpdateReward(index, updated)}
              />
            ) : (
              <div className="text-sm text-white font-semibold">
                {(reward.type === 'skill' || reward.type === 'weapon') && (
                    <p>{findItems(reward.id || '',)?.name} <span className=" text-xs text-amber-600 capitalize">({findItems(reward.id || '',)?.type})</span></p>
                )}

                 {(reward.type === 'skin') && (
                   <>
                    <p>{findItems(reward.id || '',)?.name} <span className=" text-xs text-amber-600 capitalize">({findItems(reward.id || '',)?.type})</span></p>
                    <p>{findItems(reward.fid || '',)?.name} <span className=" text-xs text-amber-600 capitalize">({findItems(reward.fid || '',)?.type})</span></p>
                   </>
                )}

                 {reward.type === 'title' && (
                    <p>{findTitle(Number(reward.id) || 0,)?.title} <span className=" text-xs text-amber-600 capitalize">(Title)</span></p>
                )}

                {reward.type === 'badge' && (
                    <p>{findBadge(Number(reward.id) || 0,)?.title} <span className=" text-xs text-amber-600 capitalize">(Badge)</span></p>
                )}

                {reward.type === 'companion' && (
                    <p>{findCompanion(reward.id || '')?.name} <span className=" text-xs text-amber-600 capitalize">(Companion)</span></p>
                )}

                {(reward.type === 'exp' || reward.type === 'crystal' || reward.type === 'coins') && (
                    <p>{reward.amount?.toLocaleString()} <span className=" text-xs text-amber-600 capitalize">({reward.type})</span></p>
                )}

                


              </div>
            )}
          </CardContent>
        </Card>
      ))}

      {rewards.length === 0 && (
        <div className=" py-16 w-full flex items-center justify-center">
            <p className=" text-xs text-white">No items yet.</p>

        </div>
      )}

      
    </div>
  )
}
