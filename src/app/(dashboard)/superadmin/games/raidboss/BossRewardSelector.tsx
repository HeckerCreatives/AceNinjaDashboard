"use client"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import {
  useGetBadgeRewards,
  useGetItemRewards,
  useGetTitleRewards,
} from "@/client_actions/superadmin/itemrewards"
import { useGetCompanion } from "@/client_actions/superadmin/companion"

interface Reward {
  type: string
  amount?: number
  id?: any
  fid?: string
  maleSkin?: string
  femaleSkin?: string
}

interface RewardSelectorProps {
  reward: Reward
  onChange: (updatedReward: Reward) => void
}

export default function BossRewardSelector({ reward, onChange }: RewardSelectorProps) {
  const [localReward, setLocalReward] = useState<Reward>(reward)

//   const { data: weaponData } = useGetItemRewards("weapon", "unisex")
//   const { data: maleItems } = useGetItemRewards("item", "male")
//   const { data: femaleItems } = useGetItemRewards("item", "female")
//   const { data: skillItems } = useGetItemRewards("skills", "")
  const { data: titleItems } = useGetTitleRewards()
  const { data: badgeItems } = useGetBadgeRewards()
  const { data: itemsRewards } = useGetItemRewards("", "")
  const {data: companionItems} = useGetCompanion(0,99999)

  


  useEffect(() => {
    setLocalReward(reward)
  }, [reward])

  useEffect(() => {
    onChange(localReward)
  }, [localReward])

  const handleChange = (field: keyof Reward, value: string | number) => {
    setLocalReward((prev) => ({
      ...prev,
      [field]: field === "amount" ? Number(value) : value,
    }))
  }

  console.log(companionItems)

  return (
    <div className="space-y-2">
      <Label className="text-xs">Reward Type</Label>
      <Select
        value={localReward.type}
        onValueChange={(value) => handleChange("type", value)}
      >
        <SelectTrigger className="bg-slate-600 border-slate-500 text-white text-xs">
          <SelectValue placeholder="Select Reward Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="badge">Badge</SelectItem>
          <SelectItem value="title">Title</SelectItem>
          <SelectItem value="item">Items</SelectItem>
          <SelectItem value="companion">Companion</SelectItem>
          {/* <SelectItem value="weapon">Weapon</SelectItem>
          <SelectItem value="skill">Skill</SelectItem>
          <SelectItem value="skin">Skin</SelectItem> */}
          <SelectItem value="coins">Coins</SelectItem>
          <SelectItem value="exp">EXP</SelectItem>
          <SelectItem value="crystal">Crystal</SelectItem>
        </SelectContent>
      </Select>

      { localReward.type === "item" ? (
        <div>
          <Label className="text-xs">Select Item</Label>
          <Select
            value={localReward.id || ""}
            onValueChange={(value) => handleChange("id", value)}
          >
            <SelectTrigger className="bg-slate-600 border-slate-500 text-white text-xs">
              <SelectValue placeholder="Select item" />
            </SelectTrigger>
            <SelectContent>
              {itemsRewards?.data?.items?.map((item) => (
                <SelectItem key={item.itemid} value={item.itemid}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ) : localReward.type === "title" ? (
        <div>
          <Label className="text-xs">Select Title</Label>
          <Select
            value={localReward.id || ""}
            onValueChange={(value) => handleChange("id", value)}
          >
            <SelectTrigger className="bg-slate-600 border-slate-500 text-white text-xs">
              <SelectValue placeholder="Select Title" />
            </SelectTrigger>
            <SelectContent>
              {titleItems?.data?.map((item) => (
                <SelectItem key={item.id} value={String(item.index)}>
                  {item.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ) : localReward.type === "badge" ? (
        <div>
          <Label className="text-xs">Select Badge</Label>
          <Select
            value={localReward.id || ""}
            onValueChange={(value) => handleChange("id", value)}
          >
            <SelectTrigger className="bg-slate-600 border-slate-500 text-white text-xs">
              <SelectValue placeholder="Select Badge" />
            </SelectTrigger>
            <SelectContent>
              {badgeItems?.data?.map((item) => (
                <SelectItem key={item.id} value={String(item.index)}>
                  {item.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ) : localReward.type === "companion" ? (
        <div>
          <Label className="text-xs">Select Companion</Label>
          <Select
            value={localReward.id || ""}
            onValueChange={(value) => handleChange("id", value)}
          >
            <SelectTrigger className="bg-slate-600 border-slate-500 text-white text-xs">
              <SelectValue placeholder="Select companion" />
            </SelectTrigger>
            <SelectContent>
              {companionItems?.data?.map((item) => (
                <SelectItem key={item.id} value={String(item.id)}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ) : (
        <>
          <Label className="text-xs">Amount</Label>
          <Input
            type="text"
            value={localReward.amount}
            onChange={(e) => handleChange("amount", e.target.value)}
            className="bg-slate-600 border-slate-500 text-white text-xs"
            placeholder="Amount"
          />
        </>
      )}
    </div>
  )
}
