"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Reward {
  rewardType: string
  amount?: number
  reward?: {
    id?: string
    name?: string
    fid?: string
    fname?: string
  }
  probability?: number
}

interface StoreItem {
  id: string
  name: string
  amount: number
  currency: string
  rewards: Reward[]
  createdAt: string
}

interface RewardsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  item: StoreItem
}

const rewardTypeColors: Record<string, { bg: string; text: string }> = {
  coins: { bg: "bg-yellow-500/20", text: "text-yellow-400" },
  exp: { bg: "bg-green-500/20", text: "text-green-400" },
  crystal: { bg: "bg-purple-500/20", text: "text-purple-400" },
  weapon: { bg: "bg-red-500/20", text: "text-red-400" },
  badge: { bg: "bg-blue-500/20", text: "text-blue-400" },
  title: { bg: "bg-indigo-500/20", text: "text-indigo-400" },
  outfit: { bg: "bg-pink-500/20", text: "text-pink-400" },
}

export function RewardsDialog({ open, onOpenChange, item }: RewardsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl p-6 max-h-[90%] overflow-y-auto h-fit ">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {item.name} - Rewards
          </DialogTitle>
        </DialogHeader>

          <div className="grid grid-cols-2 gap-2">
            {item.rewards.map((reward, idx) => {
              const colors = rewardTypeColors[reward.rewardType] || rewardTypeColors.coins

              return (
                <div
                  key={idx}
                  className={`p-4 rounded-lg border bg-zinc-900 transition-colors`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className={`${colors.text} bg-transparent ${colors.text} capitalize mb-2 border-none`}>
                        {reward.rewardType}
                      </p>

                      {reward.reward?.name && <p className="font-semibold text-white mt-1">{reward.reward.name}</p>}

                      {reward.reward?.fname && <p className="font-semibold text-white mt-1">{reward.reward.fname}</p>}

                      {reward.probability !== undefined && reward.probability > 0 && (
                        <p className="text-xs text-slate-400 mt-2">Probability: {reward.probability}%</p>
                      )}

                      {reward.amount && (
                      <div className="text-left">
                        <p className="text-lg font-bold text-white">x{reward.amount}</p>
                        <p className="text-xs text-slate-400">Quantity</p>
                      </div>
                    )}
                    </div>

                    
                  </div>
                </div>
              )
            })}
          </div>

        <div className="pt-4 border-t border-slate-700 text-sm text-slate-400">
          <p>Total Rewards: {item.rewards.length}</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
