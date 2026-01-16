"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { RewardsDialog } from "./rewards-dailog"

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

interface StoreCardProps {
  item: StoreItem
}

export function StoreCard({ item }: StoreCardProps) {
  const [showRewards, setShowRewards] = useState(false)
  const isVIP = item.name.includes("VIP")

  return (
    <>
      <Card className="relative overflow-hidden bg-zinc-900 border-zinc-700 transition-colors h-full flex flex-col">
          <div className="absolute top-3 right-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
            VIP
          </div>

        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-xl font-bold text-white mb-2">{item.name}</h3>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-400">
              {item.amount}
            </span>
            {/* <span className="text-sm text-slate-400 capitalize">{item.currency}</span> */}
          </div>

          <div className="mb-6">
            <p className="text-xs text-slate-400 uppercase tracking-wider mb-3">Contains</p>
            <div className="space-y-2">
              {item.rewards.slice(0, 3).map((reward, idx) => (
                <div key={idx} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-400" />
                    <span className="text-slate-300 capitalize">{reward.rewardType}</span>
                  </div>
                  {reward.amount && <span className="text-slate-400 text-xs">x{reward.amount}</span>}
                </div>
              ))}
              {item.rewards.length > 3 && (
                <p className="text-xs text-slate-500 mt-2 pl-4">+{item.rewards.length - 3} more rewards</p>
              )}
            </div>
          </div>

          <div className="flex gap-2 mt-auto pt-4">
            <Button
              onClick={() => setShowRewards(true)}
              variant="outline"
              className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              View Rewards
            </Button>
            {/* <Button className="flex-1">
              Buy Now
            </Button> */}
          </div>
        </div>
      </Card>

      <RewardsDialog open={showRewards} onOpenChange={setShowRewards} item={item} />
    </>
  )
}
