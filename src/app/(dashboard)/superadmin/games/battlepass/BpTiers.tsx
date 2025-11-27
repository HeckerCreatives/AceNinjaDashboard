"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Coins, Zap, Gem, Edit, Save, X, Lock, Crown, Star } from "lucide-react"
import { useUpdateBpTiers } from "@/client_actions/superadmin/battlepass"
import toast from "react-hot-toast"
import RewardSelector from "./RewardSelector"
import { useGetBadgeRewards, useGetItemRewards, useGetTitleRewards } from "@/client_actions/superadmin/itemrewards"
import { useGetChestRewards } from "@/client_actions/superadmin/chest"

interface Reward {
  type: string
  amount?: number
  id?: string
  fid?: string
  maleSkin?: string
  femaleSkin?: string
}

interface Tier {
  tierNumber: number
  freeReward: Reward
  premiumReward: Reward
  xpRequired: number
  _id: string
}

interface BattlePassTiersProps {
  tiers: Tier[]
  title: string
  currentXP?: number
  hasPremium?: boolean
  id: string
  onSave?: (tiers: Tier[]) => void
}

export default function BattlePassTiers({
  tiers,
  id,
  title,
  currentXP = 0,
  hasPremium = false,
  onSave,
}: BattlePassTiersProps) {
  const [tierData, setTierData] = useState<Tier[]>(tiers)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<Tier | null>(null)
  const {mutate: updateBpTiers} = useUpdateBpTiers()

  const { data: weaponData } = useGetItemRewards("weapon", "unisex")
const { data: skillItems } = useGetItemRewards("skills", "unisex")
const { data: maleItems } = useGetItemRewards("outfit", "male")
const { data: femaleItems } = useGetItemRewards("outfit", "female")

 const {data: titleItems} = useGetTitleRewards()
 const {data: badgeItems} = useGetBadgeRewards()
 const {data: chests} = useGetChestRewards()

  

  const handleEdit = (tier: Tier) => {
    setEditingId(tier._id)
    setEditForm({ ...tier })
  }

  const handleCancel = () => {
    setEditingId(null)
    setEditForm(null)
  }

  const updateEditForm = (field: string, value: any) => {
    if (editForm) {
      if (field.startsWith("freeReward.")) {
        const rewardField = field.split(".")[1]
        setEditForm({
          ...editForm,
          freeReward: {
            ...editForm.freeReward,
            [rewardField]: rewardField === "amount" ? Number(value) : value,
          },
        })
      } else if (field.startsWith("premiumReward.")) {
        const rewardField = field.split(".")[1]
        setEditForm({
          ...editForm,
          premiumReward: {
            ...editForm.premiumReward,
            [rewardField]: rewardField === "amount" ? Number(value) : value,
          },
        })
      } else {
        setEditForm({
          ...editForm,
          [field]: field === "xpRequired" ? Number(value) : value,
        })
      }
    }
  }

  function getRewardIcon(type: string) {
    switch (type) {
      case "coins":
        return <Coins className="w-4 h-4 text-yellow-400" />
      case "exp":
        return <Zap className="w-4 h-4 text-blue-400" />
      case "crystal":
        return <Gem className="w-4 h-4 text-purple-400" />
      default:
        return <Star className="w-4 h-4 text-gray-400" />
    }
  }

  function getRewardColor(type: string) {
    switch (type) {
      case "coins":
        return "text-yellow-400"
      case "exp":
        return "text-blue-400"
      case "crystal":
        return "text-purple-400"
      default:
        return "text-gray-400"
    }
  }

  function isUnlocked(tier: Tier) {
    return currentXP >= tier.xpRequired
  }

  function getProgressToTier(tier: Tier) {
    const prevTier = tierData.find((t) => t.tierNumber === tier.tierNumber - 1)
    const prevXP = prevTier ? prevTier.xpRequired : 0
    const tierXP = tier.xpRequired - prevXP
    const currentProgress = Math.max(0, currentXP - prevXP)
    return Math.min(100, (currentProgress / tierXP) * 100)
  }


function transformPremiumReward(reward: Reward): Reward {
  switch (reward.type) {
    case "skin":
      return {
        type: reward.type,
        id: reward.id ?? "",
        fid: reward.fid ?? "",
      }
    case "weapon":
    case "skill":
    case "badge":
    case "title":
    case "chest":
      return {
        type: reward.type,
        id: reward.id ?? "",
        amount: reward.amount ?? 0
      }
    case "coins":
    case "exp":
    case "crystal":
      return {
        type: reward.type,
        amount: reward.amount ?? 0,
      }
    default:
      return {
        type: reward.type,
        amount: reward.amount ?? 0,
      }
  }
}






    const handleSave = () => {
      if (!editForm || !editingId) return

      const transformedReward = transformPremiumReward(editForm.premiumReward)

      console.log(transformPremiumReward)

      updateBpTiers(
        {
          bpid: id,
          tierid: editForm._id,
          tier: {
            ...editForm,
            premiumReward: transformedReward,
          },
        },
        {
          onSuccess: () => {
            const updatedTiers = tierData.map((tier) =>
              tier._id === editingId ? editForm : tier
            )
            setTierData(updatedTiers)
            setEditingId(null)
            setEditForm(null)
            toast.success("Battle Pass Tier Rewards updated successfully.")
            onSave?.(updatedTiers) 
          },
          onError: () => {
            toast.error("Failed to update the tier. Please try again.")
          },
        }
      )
    }


    function getItemName(type: string, id: string | undefined, fid?: string): string {
      if (!id && !fid) return "Unknown"

      switch (type) {
        case "weapon":
          return weaponData?.data?.items?.find((item) => item.itemid === id)?.name ?? "Unknown"
        case "skill":
          return skillItems?.data?.items?.find((item) => item.itemid === id)?.name ?? "Unknown"
        case "skin": {
          const maleName = maleItems?.data?.items?.find((item) => item.itemid === id)?.name 
          const femaleName = femaleItems?.data?.items?.find((item) => item.itemid === fid)?.name
          return `${maleName} & ${femaleName}`
        }
        case "badge":
          return badgeItems?.data?.find((item) => item.id === id)?.title ?? "Unknown"
        case "title":
          return titleItems?.data?.find((item) => item.id === id)?.title ?? "Unknown"
          case "chest":
          return chests?.data?.find((item) => item.id === id)?.name ?? "Unknown"
        default:
          return "Unknown"
      }
    }


    


  return (
    <div className="bg-gradient-to-br from-amber-950 via-amber-800 to-amber-500 p-6 h-full overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-2 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            {title}
          </h1>
          <p className="text-slate-200 text-sm">Battle Pass Progression</p>
          <div className="mt-4 flex justify-center gap-4">
           
            {hasPremium && (
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full px-4 py-2">
                <Crown className="w-5 h-5 text-white" />
                <span className="text-white text-sm font-semibold">Premium Pass</span>
              </div>
            )}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
          {tierData.map((tier) => {
            const unlocked = isUnlocked(tier)
            const progress = getProgressToTier(tier)

            return (
              <Card
                key={tier._id}
                className={`relative overflow-hidden transition-all duration-300 py-4 ${
                  unlocked
                    ? "bg-gradient-to-br from-green-900/50 to-green-800/50 border-green-600 shadow-lg shadow-green-500/20"
                    : "bg-slate-800/50 border-amber-600 hover:border-slate-600"
                }`}
              >
                <div className="absolute top-2 left-2 z-10">
                  <Badge
                    variant={unlocked ? "default" : "secondary"}
                    className={`${unlocked ? "bg-green-600 text-white" : "bg-slate-700 text-slate-300"}`}
                  >
                    Tier {tier.tierNumber}
                  </Badge>
                </div>

                <div className="absolute top-2 right-2 z-10">
                  {editingId === tier._id ? (
                    <div className="flex gap-1">
                      <Button size="sm" onClick={handleSave} className="bg-amber-600 hover:bg-amber-700 h-6 w-6 p-0 text-white">
                        <Save className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleCancel}
                        className="border-slate-600 h-6 w-6 p-0"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  ) : (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleEdit(tier)}
                      className="text-slate-400 hover:text-white h-6 w-6 p-0"
                    >
                      <Edit className="w-3 h-3" />
                    </Button>
                  )}
                </div>

                <CardHeader className="pb-2 pt-8">
                  <div className="text-center">
                    {editingId === tier._id ? (
                      <Input
                        type="number"
                        value={editForm?.xpRequired || 0}
                        onChange={(e) => updateEditForm("xpRequired", e.target.value)}
                        className="text-center bg-slate-700 border-slate-600 text-white text-sm"
                        placeholder="XP Required"
                      />
                    ) : (
                      <CardTitle className="text-white text-sm">{tier.xpRequired.toLocaleString()} XP</CardTitle>
                    )}
                    {!unlocked && <Progress value={progress} className="h-1 mt-2 bg-slate-700" />}
                  </div>
                </CardHeader>

                <CardContent className="space-y-3 pt-0">
                  <div className="bg-slate-700/50 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-300 text-xs font-medium">Free</span>
                      {!unlocked && <Lock className="w-3 h-3 text-slate-500" />}
                    </div>
                    {editingId === tier._id ? (
                      // <div className="space-y-2">
                      //   <Select
                      //     value={editForm?.freeReward.type}
                      //     onValueChange={(value) => updateEditForm("freeReward.type", value)}
                      //   >
                      //     <SelectTrigger className="bg-slate-600 border-slate-500 text-white text-xs">
                      //       <SelectValue />
                      //     </SelectTrigger>
                      //     <SelectContent>
                            
                      //       <SelectItem value="coins">Coins</SelectItem>
                      //       <SelectItem value="exp">EXP</SelectItem>
                      //       <SelectItem value="crystal">Crystal</SelectItem>
                      //     </SelectContent>
                      //   </Select>
                      //   <Input
                      //     type="number"
                      //     value={editForm?.freeReward.amount || 0}
                      //     onChange={(e) => updateEditForm("freeReward.amount", e.target.value)}
                      //     className="bg-slate-600 border-slate-500 text-white text-xs"
                      //     placeholder="Amount"
                      //   />
                      // </div>

                      <>
                      {editForm && (
                        <RewardSelector
                          reward={editForm.freeReward}
                          onChange={(updated) => updateEditForm("freeReward", updated)}
                        />
                      )}
                      </>

                      

                    ) : (
                      <div className="flex items-center gap-2">
                        {getRewardIcon(tier.freeReward.type)}
                       <span className={`text-sm font-bold ${getRewardColor(tier.freeReward.type)}`}>
                          {["coins", "exp", "crystal"].includes(tier.freeReward.type)
                            ? (tier.freeReward.amount ?? 0).toLocaleString()
                            : getItemName(tier.freeReward.type, tier.freeReward.id, tier.freeReward.fid)}
                        </span>


                      </div>
                    )}
                  </div>

                  <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-lg p-3 border border-yellow-600/30">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1">
                        <Crown className="w-3 h-3 text-yellow-400" />
                        <span className="text-yellow-300 text-xs font-medium">Premium</span>
                      </div>
                      {(!unlocked || !hasPremium) && <Lock className="w-3 h-3 text-slate-500" />}
                    </div>
                    {editingId === tier._id ? (
                  

                       <>
                      {editForm && (
                        <RewardSelector
                          reward={editForm.premiumReward}
                          onChange={(updated) => updateEditForm("premiumReward", updated)}
                           isPremium
                        />
                      )}
                      </>
                    ) : (
                      <div className="flex items-center gap-2">
                        {getRewardIcon(tier.premiumReward.type)}
                       <span className={`text-sm font-bold ${getRewardColor(tier.premiumReward.type)}`}>
                          {["coins", "exp", "crystal"].includes(tier.premiumReward.type)
                            ? (tier.premiumReward.amount ?? 0).toLocaleString()
                            : getItemName(tier.premiumReward.type, tier.premiumReward.id, tier.premiumReward.fid)}
                        </span>


                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

      
      </div>
    </div>
  )
}
