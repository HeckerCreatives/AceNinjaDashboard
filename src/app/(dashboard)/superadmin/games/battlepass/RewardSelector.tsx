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

interface Reward {
  type: string
  amount?: number
  id?: string
  fid?: string
  maleSkin?: string
  femaleSkin?: string
}

interface RewardSelectorProps {
  reward: Reward
  onChange: (updatedReward: Reward) => void
  isPremium?: boolean
}

export default function RewardSelector({ reward, onChange, isPremium = false }: RewardSelectorProps) {
  const [localReward, setLocalReward] = useState<Reward>(reward)

  const { data: weaponData } = useGetItemRewards("weapon", "unisex")
  const { data: maleItems } = useGetItemRewards("outfit", "male")
  const { data: femaleItems } = useGetItemRewards("outfit", "female")
  const { data: skillItems } = useGetItemRewards("skills", "")
  const { data: titleItems } = useGetTitleRewards()
  const { data: badgeItems } = useGetBadgeRewards()

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
          {/* {isPremium && (
            <>
              <SelectItem value="badge">Badge</SelectItem>
              <SelectItem value="title">Title</SelectItem>
              <SelectItem value="weapon">Weapon</SelectItem>
              <SelectItem value="skill">Skill</SelectItem>
              <SelectItem value="skin">Skin</SelectItem>
            </>
          )} */}

          <SelectItem value="badge">Badge</SelectItem>
          <SelectItem value="title">Title</SelectItem>
          <SelectItem value="weapon">Weapon</SelectItem>
          <SelectItem value="skill">Skill</SelectItem>
          <SelectItem value="skin">Skin</SelectItem>
          <SelectItem value="coins">Coins</SelectItem>
          <SelectItem value="exp">EXP</SelectItem>
          <SelectItem value="crystal">Crystal</SelectItem>
        </SelectContent>
      </Select>

      {/* Skin Selection */}
      {localReward.type === "skin" ? (
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label className="text-xs">Male Skin</Label>
            <Select
              value={localReward.id || ""}
              onValueChange={(value) => handleChange("id", value)}
            >
              <SelectTrigger className="bg-slate-600 border-slate-500 text-white text-xs">
                <SelectValue placeholder="Select Male Skin" />
              </SelectTrigger>
              <SelectContent>
                {maleItems?.data?.items?.map((item) => (
                  <SelectItem key={item.itemid} value={item.itemid}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-xs">Female Skin</Label>
            <Select
              value={localReward.fid || ""}
              onValueChange={(value) => handleChange("fid", value)}
            >
              <SelectTrigger className="bg-slate-600 border-slate-500 text-white text-xs">
                <SelectValue placeholder="Select Female Skin" />
              </SelectTrigger>
              <SelectContent>
                {femaleItems?.data?.items?.map((item) => (
                  <SelectItem key={item.itemid} value={item.itemid}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      ) : localReward.type === "weapon" ? (
        <div>
          <Label className="text-xs">Select Weapon</Label>
          <Select
            value={localReward.id || ""}
            onValueChange={(value) => handleChange("id", value)}
          >
            <SelectTrigger className="bg-slate-600 border-slate-500 text-white text-xs">
              <SelectValue placeholder="Select Weapon" />
            </SelectTrigger>
            <SelectContent>
              {weaponData?.data?.items?.map((item) => (
                <SelectItem key={item.itemid} value={item.itemid}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ) : localReward.type === "skill" ? (
        <div>
          <Label className="text-xs">Select Skill</Label>
          <Select
            value={localReward.id || ""}
            onValueChange={(value) => handleChange("id", value)}
          >
            <SelectTrigger className="bg-slate-600 border-slate-500 text-white text-xs">
              <SelectValue placeholder="Select Skill" />
            </SelectTrigger>
            <SelectContent>
              {skillItems?.data?.items?.map((item) => (
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
                <SelectItem key={item.id} value={item.id}>
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
                <SelectItem key={item.id} value={item.id}>
                  {item.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ) : (
        // Default for currency types
        <>
          <Label className="text-xs">Amount</Label>
          <Input
            type="number"
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
