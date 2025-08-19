"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import RewardListManager from "./RewardsList"

interface Reward {
  type: string
  amount?: number
  id?: string
  fid?: string
  maleSkin?: string
  femaleSkin?: string
}

interface RaidRewardsDialogProps {
  isOpen: boolean
  id: string
  onClose: () => void
  rewards: Reward[]
  onRewardsChange: (rewards: Reward[]) => void
}

export function RaidRewardsDialog({ isOpen, onClose, rewards, onRewardsChange, id }: RaidRewardsDialogProps) {

    console.log(id)
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] bg-gradient-to-br from-amber-950 via-amber-800 to-amber-600 p-6 h-fit">
        <DialogHeader className="text-center pb-4">
          <DialogTitle className="text-xl text-white">
            🏆 Manage Raid Boss Rewards
          </DialogTitle>
          <p className="text-xs text-muted-foreground">Add, edit, or delete rewards</p>
        </DialogHeader>

        <RewardListManager
            id={id}
          initialRewards={rewards}
          onChange={onRewardsChange}
          onClose={onClose}
        />

        {/* <div className="pt-4 text-center">
          <p className="text-sm text-white">Total rewards: {rewards.length} items</p>
        </div> */}
      </DialogContent>
    </Dialog>
  )
}
