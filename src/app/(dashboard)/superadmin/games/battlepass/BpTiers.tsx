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

interface Reward {
  type: "coins" | "exp" | "crystal" | string
  amount: number
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

  const handleEdit = (tier: Tier) => {
    setEditingId(tier._id)
    setEditForm({ ...tier })
  }

  const handleSave = () => {
    if (editForm && editingId) {
      const updatedTiers = tierData.map((tier) => (tier._id === editingId ? editForm : tier))
      setTierData(updatedTiers)
      setEditingId(null)
      setEditForm(null)
      onSave?.(updatedTiers)
      updateBpTiersData()
    }
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

  const updateBpTiersData = async () => {
  updateBpTiers({
    bpid: id,
    tierid: editForm?._id,
    tier: editForm
   
  }, {
    onSuccess: () => {
      toast.success(`Battle Pass Tier Rewards updated successfully.`);
    }
  });
};

  return (
    <div className="bg-gradient-to-br from-amber-950 via-amber-800 to-amber-500 p-6 h-full overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-2 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            {title}
          </h1>
          <p className="text-slate-200 text-sm">Battle Pass Progression</p>
          <div className="mt-4 flex justify-center gap-4">
            {/* <div className="inline-flex items-center gap-2 bg-slate-800/50 rounded-full px-4 py-2 border border-slate-700">
              <Zap className="w-5 h-5 text-blue-400" />
              <span className="text-white text-sm font-semibold">Current XP: {currentXP.toLocaleString()}</span>
            </div> */}
            {hasPremium && (
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full px-4 py-2">
                <Crown className="w-5 h-5 text-white" />
                <span className="text-white text-sm font-semibold">Premium Pass</span>
              </div>
            )}
          </div>
        </div>

        {/* Tiers Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {tierData.map((tier) => {
            const unlocked = isUnlocked(tier)
            const progress = getProgressToTier(tier)

            return (
              <Card
                key={tier._id}
                className={`relative overflow-hidden transition-all duration-300 ${
                  unlocked
                    ? "bg-gradient-to-br from-green-900/50 to-green-800/50 border-green-600 shadow-lg shadow-green-500/20"
                    : "bg-slate-800/50 border-amber-600 hover:border-slate-600"
                }`}
              >
                {/* Tier Number Badge */}
                <div className="absolute top-2 left-2 z-10">
                  <Badge
                    variant={unlocked ? "default" : "secondary"}
                    className={`${unlocked ? "bg-green-600 text-white" : "bg-slate-700 text-slate-300"}`}
                  >
                    Tier {tier.tierNumber}
                  </Badge>
                </div>

                {/* Edit Button */}
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
                  {/* Free Reward */}
                  <div className="bg-slate-700/50 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-300 text-xs font-medium">Free</span>
                      {!unlocked && <Lock className="w-3 h-3 text-slate-500" />}
                    </div>
                    {editingId === tier._id ? (
                      <div className="space-y-2">
                        <Select
                          value={editForm?.freeReward.type}
                          onValueChange={(value) => updateEditForm("freeReward.type", value)}
                        >
                          <SelectTrigger className="bg-slate-600 border-slate-500 text-white text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="coins">Coins</SelectItem>
                            <SelectItem value="exp">EXP</SelectItem>
                            <SelectItem value="crystal">Crystal</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input
                          type="number"
                          value={editForm?.freeReward.amount || 0}
                          onChange={(e) => updateEditForm("freeReward.amount", e.target.value)}
                          className="bg-slate-600 border-slate-500 text-white text-xs"
                          placeholder="Amount"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        {getRewardIcon(tier.freeReward.type)}
                        <span className={`text-sm font-bold ${getRewardColor(tier.freeReward.type)}`}>
                          {tier.freeReward.amount.toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Premium Reward */}
                  <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-lg p-3 border border-yellow-600/30">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1">
                        <Crown className="w-3 h-3 text-yellow-400" />
                        <span className="text-yellow-300 text-xs font-medium">Premium</span>
                      </div>
                      {(!unlocked || !hasPremium) && <Lock className="w-3 h-3 text-slate-500" />}
                    </div>
                    {editingId === tier._id ? (
                      <div className="space-y-2">
                        <Select
                          value={editForm?.premiumReward.type}
                          onValueChange={(value) => updateEditForm("premiumReward.type", value)}
                        >
                          <SelectTrigger className="bg-slate-600 border-slate-500 text-white text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="coins">Coins</SelectItem>
                            <SelectItem value="exp">EXP</SelectItem>
                            <SelectItem value="crystal">Crystal</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input
                          type="number"
                          value={editForm?.premiumReward.amount || 0}
                          onChange={(e) => updateEditForm("premiumReward.amount", e.target.value)}
                          className="bg-slate-600 border-slate-500 text-white text-xs"
                          placeholder="Amount"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        {getRewardIcon(tier.premiumReward.type)}
                        <span className={`text-sm font-bold ${getRewardColor(tier.premiumReward.type)}`}>
                          {tier.premiumReward.amount.toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Summary Stats */}
        {/* <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-slate-800/50 border-slate-700 text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-white">{tierData.length}</div>
              <div className="text-slate-400 text-sm">Total Tiers</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700 text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-400">
                {tierData.filter((tier) => isUnlocked(tier)).length}
              </div>
              <div className="text-slate-400 text-sm">Unlocked</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700 text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-yellow-400">
                {tierData[tierData.length - 1]?.xpRequired.toLocaleString() || 0}
              </div>
              <div className="text-slate-400 text-sm">Max XP</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700 text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-blue-400">
                {Math.round((tierData.filter((tier) => isUnlocked(tier)).length / tierData.length) * 100)}%
              </div>
              <div className="text-slate-400 text-sm">Progress</div>
            </CardContent>
          </Card>
        </div> */}
      </div>
    </div>
  )
}
