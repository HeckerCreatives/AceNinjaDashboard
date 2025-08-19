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
  name?: string
  fname?: string
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

  const { data: weaponData } = useGetItemRewards("weapon", "unisex")
  const { data: maleItems } = useGetItemRewards("outfit", "male")
  const { data: femaleItems } = useGetItemRewards("outfit", "female")
  const { data: skillItems } = useGetItemRewards("skills", "")

  


  useEffect(() => {
    setLocalReward(reward)
  }, [reward])

  useEffect(() => {
    onChange(localReward)
  }, [localReward])



const handleChange = (field: keyof Reward, value: string | number) => {
  setLocalReward((prev) => {
    // 🟢 Skin (male & female)
    if (prev.type === "skin") {
      if (field === "id" || field === "fid") {
        const maleItem =
          field === "id"
            ? maleItems?.data.items.find((i) => i.itemid === value)
            : maleItems?.data.items.find((i) => i.itemid === prev.id)

        const femaleItem =
          field === "fid"
            ? femaleItems?.data.items.find((i) => i.itemid === value)
            : femaleItems?.data.items.find((i) => i.itemid === prev.fid)

        return {
          ...prev,
          [field]: value,
          name: maleItem?.name ?? prev.name ?? "",
          fname: femaleItem?.name ?? prev.fname ?? "",
        }
      }
    }

      // 🟢 Badge
    if (prev.type === "badge" && field === "id") {
      const item = badgeItems?.data.find((i) => String(i.index) === String(value))
      return {
        ...prev,
        id: value,
        name: item?.title ?? prev.name ?? "",
      }
    }

    // 🟢 Title
    if (prev.type === "title" && field === "id") {
      const item = titleItems?.data.find((i) => String(i.index) === String(value))
      return {
        ...prev,
        id: value,
        name: item?.title ?? prev.name ?? "",
      }
    }

    // 🟢 Weapon
    if (prev.type === "weapon" && field === "id") {
      const item = weaponData?.data.items.find((i) => i.itemid === value)
      return {
        ...prev,
        id: value,
        name: item?.name ?? prev.name ?? "",
      }
    }

    // 🟢 Skill
    if (prev.type === "skill" && field === "id") {
      const item = skillItems?.data.items.find((i) => i.itemid === value)
      return {
        ...prev,
        id: value,
        name: item?.name ?? prev.name ?? "",
      }
    }

    // 🟢 Companion
    if (prev.type === "companion" && field === "id") {
      const item = companionItems?.data.find((i) => i.id === value)
      return {
        ...prev,
        id: value,
        name: item?.name ?? prev.name ?? "",
      }
    }

    // 🟢 Exp, Coins, Crystal → always assign name = type
    if (
      prev.type === "exp" ||
      prev.type === "coins" ||
      prev.type === "crystal"
    ) {
      return {
        ...prev,
        [field]: field === "amount" ? Number(value) : value,
        name: prev.type, // name = exp / coins / crystal
      }
    }

    // 🟢 Default
    return {
      ...prev,
      [field]: field === "amount" ? Number(value) : value,
    }
  })
}




  console.log(localReward)

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
          <SelectItem value="skin">Skin</SelectItem>
          <SelectItem value="companion">Companion</SelectItem>
          <SelectItem value="weapon">Weapon</SelectItem>
          <SelectItem value="skill">Skill</SelectItem>
          <SelectItem value="coins">Coins</SelectItem>
          <SelectItem value="exp">EXP</SelectItem>
          <SelectItem value="crystal">Crystal</SelectItem>
        </SelectContent>
      </Select>

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
      ): localReward.type === "item" ? (
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
      ): localReward.type === "weapon" ? (
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
