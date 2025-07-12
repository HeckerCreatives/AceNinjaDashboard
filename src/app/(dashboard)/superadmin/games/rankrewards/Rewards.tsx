"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Plus } from "lucide-react"
import { useGetBadgeRewards, useGetItemRewards, useGetTitleRewards } from "@/client_actions/superadmin/itemrewards"
import { useEditRankRewards, useGetRankingRewards } from "@/client_actions/superadmin/rankrewards"
import Image from "next/image"
import toast from "react-hot-toast"

// Component's internal RewardType
type RewardType = "badge" | "title" | "weapon" | "skin" | "coins" | "exp" | "crystal" | "skill"

// Component's internal Reward structure
type Reward = {
  rewardtype: RewardType
  id?: string // For badge, title, weapon, skill, male skin (stores option.index as string for badge/title)
  fid?: string // For female skin (skin type only)
  amount?: number // For coins, exp, crystal
}

// API's expected Reward type (corrected based on your provided API definition and the error)
type ApiReward =
  | {
      rewardtype: "coins" | "exp" | "crystal" // Changed to rewardtype
      amount: number
    }
  | {
      rewardtype: "title" | "badge" | "weapon" | "skill" // Changed to rewardtype
      reward: {
        id: number | string // Can be number for badge/title, string for weapon/skill
        name: string
      }
    }
  | {
      rewardtype: "outfit" // Changed to rewardtype
      reward: {
        id: string
        name?: string
        fid: string
        fname?: string
      }
    }

interface RankRewards {
  rank: string
  rewards: Reward[]
  rankid?: string
}

const ranks = ["Rookie", "Veteran", "Shogun", "Ronin", "Elder", "Ace"]
const rewardTypes = ["badge", "title", "weapon", "skin", "coins", "exp", "crystal", "skill"]

const ranktierImg = (rank: string) => {
  const src = `/manage/Rank-${rank.toUpperCase()} icon.png`
  return <Image src={src || "/placeholder.svg"} alt={rank} width={32} height={32} className="w-8 h-8 object-contain" />
}

export default function RankRewardCards() {
  const [rankRewards, setRankRewards] = useState<RankRewards[]>(ranks.map((rank) => ({ rank, rewards: [] })))
  const { data: weaponItems } = useGetItemRewards("weapon", "unisex")
  const { data: maleItems } = useGetItemRewards("outfit", "male")
  const { data: femaleItems } = useGetItemRewards("outfit", "female")
  const { data: skillItems } = useGetItemRewards("skills", "")
  const { data: titleItems } = useGetTitleRewards()
  const { data: badgeItems } = useGetBadgeRewards()
  const { data: fetchedRewardsData } = useGetRankingRewards()
  const { mutate: editRankRewards } = useEditRankRewards()

  useEffect(() => {
    if (fetchedRewardsData?.data) {
      const transformedData: RankRewards[] = ranks.map((rankName) => {
        const foundRankData = fetchedRewardsData.data.find((r: any) => r.rank === rankName)
        if (foundRankData) {
          const transformedRewards: Reward[] = foundRankData.rewards.map((r: any) => {
            const commonFields = { rewardtype: r.rewardType?.toLowerCase() as RewardType } // Normalize type
            if (["coins", "exp", "crystal"].includes(r.rewardType?.toLowerCase())) {
              return { ...commonFields, amount: r.amount }
            } else if (r.rewardType?.toLowerCase() === "outfit") {
              return { ...commonFields, id: r.reward.id, fid: r.reward.fid }
            } else {
              return { ...commonFields, id: r.reward?.id?.toString() }
            }
          })
          return { rank: rankName, rewards: transformedRewards, rankid: foundRankData.rankid } // Include rankid here
        }
        return { rank: rankName, rewards: [] } // If no data for rank, keep empty
      })
      setRankRewards(transformedData)
    }
  }, [fetchedRewardsData?.data])

  const handleAddReward = (rank: string) => {
    setRankRewards((prev) =>
      prev.map((r) => {
        if (r.rank !== rank) return r
        if (r.rewards.length >= 6) {
          console.warn(`Maximum 6 rewards allowed per rank`)
          return r
        }
        return {
          ...r,
          rewards: [...r.rewards, { rewardtype: "badge", id: "" }], // Default to badge
        }
      }),
    )
  }

  const handleRewardChange = (rank: string, rewardIndex: number, updatedReward: Partial<Reward>) => {
    setRankRewards((prev) =>
      prev.map((r) => {
        if (r.rank !== rank) return r
        const updatedRewards = [...r.rewards]
        updatedRewards[rewardIndex] = {
          ...updatedRewards[rewardIndex],
          ...updatedReward,
        }
        return { ...r, rewards: updatedRewards }
      }),
    )
  }

  const handleDeleteReward = (rank: string, rewardIndex: number) => {
    setRankRewards((prev) =>
      prev.map((r) => {
        if (r.rank !== rank) return r
        const updatedRewards = r.rewards.filter((_, i) => i !== rewardIndex)
        return { ...r, rewards: updatedRewards }
      }),
    )
  }

  const handleSubmitRank = (rank: string) => {
    const rankData = rankRewards.find((r) => r.rank === rank)
    if (!rankData || rankData.rewards.length === 0) {
      console.warn(`No rewards to submit for rank: ${rank}`)
      toast.error(`No rewards to submit for rank: ${rank}`)
      return
    }
    if (!rankData.rankid) {
      console.error(`Rank ID not found for rank: ${rank}`)
      toast.error(`Rank ID not found for rank: ${rank}`)
      return
    }

    const formattedRewards: ApiReward[] = rankData.rewards.map((reward) => {
      if (["coins", "exp", "crystal"].includes(reward.rewardtype)) {
        return {
          rewardtype: reward.rewardtype as "coins" | "exp" | "crystal", // Changed to rewardtype
          amount: reward.amount as number, // Assert as number after validation
        }
      } else if (reward.rewardtype === "skin") {
        // Map 'skin' to 'outfit' for API
        const foundMaleSkin = maleItems?.data.items.find((item) => item.itemid === reward.id)
        const foundFemaleSkin = femaleItems?.data.items.find((item) => item.itemid === reward.fid)
        return {
          rewardtype: "outfit", // Changed to rewardtype
          reward: {
            id: reward.id as string, // Assert as string after validation
            name: foundMaleSkin?.name || "", // Include male name if found
            fid: reward.fid as string, // Assert as string after validation
            fname: foundFemaleSkin?.name || "", // Include female name if found
          },
        }
      } else {
        // badge, title, weapon, skill
        let rewardName = ""
        let rewardId: string | number = reward.id || ""
        if (reward.rewardtype === "badge") {
          const foundBadge = badgeItems?.data.find((item) => item.index.toString() === reward.id)
          rewardName = foundBadge?.title || ""
          rewardId = foundBadge?.index || "" // Use the numeric index for badge
        } else if (reward.rewardtype === "title") {
          const foundTitle = titleItems?.data.find((item) => item.index.toString() === reward.id)
          rewardName = foundTitle?.title || ""
          rewardId = foundTitle?.index || "" // Use the numeric index for title
        } else if (reward.rewardtype === "weapon") {
          const foundWeapon = weaponItems?.data.items.find((item) => item.itemid === reward.id)
          rewardName = foundWeapon?.name || ""
          rewardId = foundWeapon?.itemid || ""
        } else if (reward.rewardtype === "skill") {
          const foundSkill = skillItems?.data.items.find((item) => item.itemid === reward.id)
          rewardName = foundSkill?.name || ""
          rewardId = foundSkill?.itemid || ""
        }
        return {
          rewardtype: reward.rewardtype as "title" | "badge" | "weapon" | "skill", // Changed to rewardtype
          reward: {
            id: rewardId, // This will be number for badge/title, string for weapon/skill
            name: rewardName,
          },
        }
      }
    })

    // Validate rewards before submitting
    const invalidRewards = formattedRewards.filter((reward) => {
      // Type narrowing for amount-based rewards
      if (reward.rewardtype === "coins" || reward.rewardtype === "exp" || reward.rewardtype === "crystal") {
        return !reward.amount || reward.amount <= 0
      }
      // Type narrowing for outfit reward
      if (reward.rewardtype === "outfit") {
        return !reward.reward?.id || !reward.reward?.fid
      }
      // Type narrowing for other rewards (title, badge, weapon, skill)
      if (
        reward.rewardtype === "title" ||
        reward.rewardtype === "badge" ||
        reward.rewardtype === "weapon" ||
        reward.rewardtype === "skill"
      ) {
        return !reward.reward?.id
      }
      return false // Should not reach here if all types are covered
    })

    if (invalidRewards.length > 0) {
      console.warn(`Invalid rewards found for rank: ${rank}`, invalidRewards)
      toast.error(`Invalid rewards found for rank: ${rank}`)
      return
    }

    console.log("Submitting rewards for", rank, formattedRewards)
    editRankRewards(
      { rankid: rankData.rankid, rewards: formattedRewards },
      {
        onSuccess: () => {
          toast.success(`Rank rewards for ${rank} updated successfully.`)
        },
        onError: (error) => {
          console.error("Failed to update rank rewards:", error)
          toast.error(`Failed to update rank rewards for ${rank}.`)
        },
      },
    )
  }

  const renderRewardInputs = (reward: Reward, rank: string, index: number) => {
    const isAmountType = ["coins", "exp", "crystal"].includes(reward.rewardtype)
    const isSkinType = reward.rewardtype === "skin"

    if (isAmountType) {
      return (
        <div className="space-y-2">
          <Label htmlFor={`amount-${rank}-${index}`}>Amount</Label>
          <Input
            id={`amount-${rank}-${index}`}
            placeholder="Enter amount"
            type="number"
            min="1"
            className="bg-[#4C4106] border-[1px] border-yellow-500"
            value={reward.amount?.toString() || ""}
            onChange={(e) =>
              handleRewardChange(rank, index, {
                amount: Number(e.target.value),
              })
            }
          />
        </div>
      )
    }

    if (reward.rewardtype === "badge") {
      return (
        <div className="space-y-2">
          <Label htmlFor={`select-${rank}-${index}`}>
            {reward.rewardtype.charAt(0).toUpperCase() + reward.rewardtype.slice(1)}
          </Label>
          <Select value={reward.id || ""} onValueChange={(val) => handleRewardChange(rank, index, { id: val })}>
            <SelectTrigger id={`select-${rank}-${index}`}>
              <SelectValue placeholder={`Select ${reward.rewardtype}`} />
            </SelectTrigger>
            <SelectContent>
              {badgeItems?.data.map((option) => (
                <SelectItem key={option.id} value={`${option.index}`}>
                  {option.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )
    }

    if (reward.rewardtype === "title") {
      return (
        <div className="space-y-2">
          <Label htmlFor={`select-${rank}-${index}`}>
            {reward.rewardtype.charAt(0).toUpperCase() + reward.rewardtype.slice(1)}
          </Label>
          <Select value={reward.id || ""} onValueChange={(val) => handleRewardChange(rank, index, { id: val })}>
            <SelectTrigger id={`select-${rank}-${index}`}>
              <SelectValue placeholder={`Select ${reward.rewardtype}`} />
            </SelectTrigger>
            <SelectContent>
              {titleItems?.data.map((option) => (
                <SelectItem key={option.id} value={`${option.index}`}>
                  {option.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )
    }

    if (reward.rewardtype === "weapon") {
      return (
        <div className="space-y-2">
          <Label htmlFor={`select-${rank}-${index}`}>
            {reward.rewardtype.charAt(0).toUpperCase() + reward.rewardtype.slice(1)}
          </Label>
          <Select value={reward.id || ""} onValueChange={(val) => handleRewardChange(rank, index, { id: val })}>
            <SelectTrigger id={`select-${rank}-${index}`}>
              <SelectValue placeholder={`Select ${reward.rewardtype}`} />
            </SelectTrigger>
            <SelectContent>
              {weaponItems?.data.items.map((option) => (
                <SelectItem key={option.itemid} value={option.itemid}>
                  {option.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )
    }

    if (reward.rewardtype === "skill") {
      return (
        <div className="space-y-2">
          <Label htmlFor={`select-${rank}-${index}`}>
            {reward.rewardtype.charAt(0).toUpperCase() + reward.rewardtype.slice(1)}
          </Label>
          <Select value={reward.id || ""} onValueChange={(val) => handleRewardChange(rank, index, { id: val })}>
            <SelectTrigger id={`select-${rank}-${index}`}>
              <SelectValue placeholder={`Select ${reward.rewardtype}`} />
            </SelectTrigger>
            <SelectContent>
              {skillItems?.data.items.map((option) => (
                <SelectItem key={option.itemid} value={option.itemid}>
                  {option.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )
    }

    if (isSkinType) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor={`male-skin-${rank}-${index}`}>Male Skin</Label>
            <Select value={reward.id || ""} onValueChange={(val) => handleRewardChange(rank, index, { id: val })}>
              <SelectTrigger id={`male-skin-${rank}-${index}`}>
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
            <Label htmlFor={`female-skin-${rank}-${index}`}>Female Skin</Label>
            <Select value={reward.fid || ""} onValueChange={(val) => handleRewardChange(rank, index, { fid: val })}>
              <SelectTrigger id={`female-skin-${rank}-${index}`}>
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
        </div>
      )
    }
    return null
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-center mb-2">Rank Rewards</h1>
        <p className="text-muted-foreground text-center">Configure rewards for each rank tier</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {rankRewards.map(
          (
            { rank, rewards, rankid }, // Add rankid here
          ) => (
            <Card
              key={rank}
              className="shadow-lg rounded-xl border-muted hover:shadow-xl transition-shadow bg-amber-950 border-2 border-amber-800"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {ranktierImg(rank)}
                    <CardTitle className="text-xl font-bold">{rank}</CardTitle>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => handleAddReward(rank)}
                    className="flex items-center gap-2"
                    disabled={rewards.length >= 6}
                  >
                    <Plus className="w-4 h-4" />
                    Add
                  </Button>
                </div>
                <div className="text-sm text-muted-foreground">
                  {rewards.length}/6 reward{rewards.length !== 1 ? "s" : ""} configured
                </div>
              </CardHeader>
              <CardContent className="space-y-4 ">
                {rewards.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>No rewards configured</p>
                    <p className="text-sm">Click "Add Reward" to get started (Max: 6 rewards)</p>
                  </div>
                ) : rewards.length >= 6 ? (
                  <div className="text-center py-2 text-red-500 text-sm">Maximum rewards limit reached (6/6)</div>
                ) : null}
                <div className=" w-full grid grid-cols-2 gap-2">
                  {rewards.map((reward, i) => (
                    <div key={i} className="relative p-4 rounded-lg border space-y-4 transition-colors bg-zinc-950">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="absolute top-2 right-2 hover:bg-destructive/10"
                        onClick={() => handleDeleteReward(rank, i)}
                      >
                        <X className="w-6 h-6 text-red-600" />
                      </Button>
                      <div className="space-y-4 ">
                        <div className="space-y-2">
                          <Label htmlFor={`reward-type-${rank}-${i}`}>Reward Type</Label>
                          <Select
                            value={reward.rewardtype}
                            onValueChange={(val: RewardType) =>
                              handleRewardChange(rank, i, {
                                rewardtype: val,
                                // Reset other fields when changing type
                                id: "",
                                fid: "",
                                amount: undefined,
                              })
                            }
                          >
                            <SelectTrigger id={`reward-type-${rank}-${i}`}>
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
                        {renderRewardInputs(reward, rank, i)}
                      </div>
                    </div>
                  ))}
                </div>
                {rewards.length > 0 && (
                  <div className="flex justify-end pt-4 border-t">
                    <Button onClick={() => handleSubmitRank(rank)} className="w-full sm:w-auto">
                      Submit
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ),
        )}
      </div>
    </div>
  )
}
