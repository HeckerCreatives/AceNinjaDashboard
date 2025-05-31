"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Trophy, Target, Zap, Clock, Star, Edit, Save, X } from "lucide-react"
import { useUpdateBpMission } from "@/client_actions/superadmin/battlepass"
import toast from "react-hot-toast"

interface Mission {
  missionName: string
  description: string
  xpReward: number
  requirements: {
    wins?: number
    dailyQuests?: number
    enemiesDefeated?: number
  }
  daily: boolean
  _id: string
}

interface BpFreemissionProps {
  freeMission: Mission[]
  title: string,
  id: string,
  onSave?: (missions: Mission[]) => void
}

export default function BpFreemission({ freeMission, title, onSave, id }: BpFreemissionProps) {
  const [missions, setMissions] = useState<Mission[]>(freeMission)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<Mission | null>(null)
  const {mutate: updateBpMission} = useUpdateBpMission()


  const handleEdit = (mission: Mission) => {
    setEditingId(mission._id)
    setEditForm({ ...mission })
  }

  const handleSave = () => {
    if (editForm && editingId) {
      const updatedMissions = missions.map((mission) => (mission._id === editingId ? editForm : mission))
      setMissions(updatedMissions)
      setEditingId(null)
      setEditForm(null)
      onSave?.(updatedMissions)
      updateMissionsBp()
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setEditForm(null)
  }

  const updateEditForm = (field: string, value: any) => {
    if (editForm) {
      if (field.startsWith("requirements.")) {
        const reqField = field.split(".")[1]
        setEditForm({
          ...editForm,
          requirements: {
            ...editForm.requirements,
            [reqField]: value,
          },
        })
      } else {
        setEditForm({
          ...editForm,
          [field]: value,
        })
      }
    }
  }


  function getMissionIcon(mission: Mission) {
    if (mission.requirements.wins) return <Trophy className="w-5 h-5" />
    if (mission.requirements.dailyQuests) return <Star className="w-5 h-5" />
    if (mission.requirements.enemiesDefeated) return <Target className="w-5 h-5" />
    return <Zap className="w-5 h-5" />
  }

  function getRequirementText(requirements: Mission["requirements"]) {
    if (requirements.wins) return `${requirements.wins} PvP Wins`
    if (requirements.dailyQuests) return `${requirements.dailyQuests} Daily Quests`
    if (requirements.enemiesDefeated) return `${requirements.enemiesDefeated} Enemies`
    return "Complete"
  }

  function getProgressValue(mission: Mission) {
    // Simulating some progress for demo purposes
    if (mission.requirements.wins) return 1 // 1 out of 3 wins
    if (mission.requirements.dailyQuests) return 3 // 3 out of 5 quests
    if (mission.requirements.enemiesDefeated) return 7 // 7 out of 10 enemies
    return 0
  }

  function getMaxValue(requirements: Mission["requirements"]) {
    return requirements.wins || requirements.dailyQuests || requirements.enemiesDefeated || 1
  }

  const totalXP = missions.reduce((sum, mission) => sum + mission.xpReward, 0)

  const isFree = title.includes("Free");
  const freeMissions = isFree ? editForm : undefined;
  const premiumMissions = !isFree ? editForm : undefined;

const updateMissionsBp = async () => {
  const isFree = title.includes("Free");
  const freeMissions = isFree ? missions : undefined;
  const premiumMissions = !isFree ? missions : undefined;

  updateBpMission({
    bpid: id,
    freeMissions,
    premiumMissions
  }, {
    onSuccess: () => {
      toast.success(`Battle Pass Missions updated successfully.`);
    }
  });
};

  return (
    <div className="f-fit bg-gradient-to-br from-amber-950 via-amber-700 to-yellow-600 p-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-2 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            {title}
          </h1>
          <p className="text-slate-200 text-sm">Mission Challenges</p>
          <div className="mt-4 inline-flex items-center gap-2 bg-slate-800/50 rounded-full px-4 py-2 border border-slate-700">
            <Zap className="w-5 h-5 text-yellow-400" />
            <span className="text-white font-semibold">Total XP Available: {totalXP.toLocaleString()}</span>
          </div>
        </div>

        {/* Missions Grid */}
        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
          {missions.map((mission, index) => {
            const progress = getProgressValue(mission)
            const maxValue = getMaxValue(mission.requirements)
            const progressPercentage = (progress / maxValue) * 100

            return (
              <Card
                key={mission._id}
                className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
              >
                <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3 flex-1">
                   

                      {editingId === mission._id ? (
                        <div className=" w-full p-2">
                            <div className=" w-full flex items-center justify-end gap-2 mb-4">
                                <Button  size="sm" onClick={handleSave} className="text-white bg-amber-600 hover:bg-amber-700">
                                    <Save className="w-3 h-3" />
                                </Button>
                                <Button size="sm" variant="outline" onClick={handleCancel} className="border-zinc-600">
                                    <X className="w-3 h-3" />
                                </Button>
                            </div>

                            <div className="space-y-2">
                            <Input
                              value={editForm?.missionName || ""}
                              onChange={(e) => updateEditForm("missionName", e.target.value)}
                              className="text-white bg-amber-950 border-amber-600"
                              placeholder="Mission Name"
                            />
                            <Input
                              value={editForm?.description || ""}
                              onChange={(e) => updateEditForm("description", e.target.value)}
                              className="text-slate-200 bg-amber-950 border-amber-600 text-xs"
                              placeholder="Description"
                            />
                            </div>

                            <div className="space-y-2 w-full">
                            <div className="flex items-center gap-1 mt-2">
                                <input
                                type="checkbox"
                                checked={editForm?.daily || false}
                                onChange={(e) => updateEditForm("daily", e.target.checked)}
                                className="mr-1"
                                />
                                <span className="text-xs text-slate-300">Daily</span>
                            </div>
                            <Input
                                type="number"
                                value={editForm?.xpReward || 0}
                                onChange={(e) => updateEditForm("xpReward", Number.parseInt(e.target.value))}
                                className=" text-white bg-amber-950 border-amber-600 w-full "
                                placeholder="XP"
                            />
                            {editForm?.requirements.wins !== undefined && (
                                <Input
                                type="number"
                                value={editForm.requirements.wins || 0}
                                onChange={(e) => updateEditForm("requirements.wins", Number.parseInt(e.target.value))}
                                className=" text-white bg-amber-950 border-amber-600 w-full "
                                placeholder="Wins"
                                />
                            )}
                            {editForm?.requirements.dailyQuests !== undefined && (
                                <Input
                                type="number"
                                value={editForm.requirements.dailyQuests || 0}
                                onChange={(e) =>
                                    updateEditForm("requirements.dailyQuests", Number.parseInt(e.target.value))
                                }
                                className=" text-white bg-amber-950 border-amber-600 w-full"
                                placeholder="Quests"
                                />
                            )}
                            {editForm?.requirements.enemiesDefeated !== undefined && (
                                <Input
                                type="number"
                                value={editForm.requirements.enemiesDefeated || 0}
                                onChange={(e) =>
                                    updateEditForm("requirements.enemiesDefeated", Number.parseInt(e.target.value))
                                }
                                className=" text-white bg-amber-950 border-amber-600 w-full"
                                placeholder="Enemies"
                                />
                            )}
                            </div>
                        </div>
                      ): (
                        <div className=" w-full flex gap-2 items-start">

                            <div className=" py-3">
                                <div className="p-2 rounded-lg bg-gradient-to-br from-amber-600 to-yellow-500 text-white h-fit ">
                                    {getMissionIcon(mission)}
                                </div>
                            </div>
                             
                             <div className="flex-1 p-2">
                       
                                    <CardTitle className="text-white text-lg">{mission.missionName}</CardTitle>
                                    <p className="text-slate-200 text-xs mt-1">{mission.description}</p>
                                
                            </div>
                            <div className="flex flex-col items-end gap-2 p-2">
                        
                                <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleEdit(mission)}
                                className="text-slate-200 hover:text-white"
                                >
                                <Edit className="w-3 h-3" />
                                </Button>
                            
                        
                                {mission.daily && (
                                    <Badge
                                    variant="secondary"
                                    className="bg-orange-500/20 text-orange-400 border-orange-500/30"
                                    >
                                    <Clock className="w-3 h-3 mr-1" />
                                    Daily
                                    </Badge>
                                )}
                                <div className="flex items-center gap-1 bg-yellow-500/20 rounded-full px-3 py-1 border border-yellow-500/30">
                                    <Zap className="w-4 h-4 text-yellow-400" />
                                    <span className="text-yellow-400 font-bold text-sm">{mission.xpReward} XP</span>
                                </div>
                        
                            </div>
                        </div>
                      )}
                     
                    </div>
                </div>
                </CardHeader>
                {/* <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-300">Progress: {getRequirementText(mission.requirements)}</span>
                      <span className="text-slate-400">
                        {progress}/{maxValue}
                      </span>
                    </div>
                    <Progress value={progressPercentage} className="h-2 bg-slate-700" />
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500">Mission ID: {mission._id.slice(-6)}</span>
                      <span
                        className={`text-xs font-medium ${
                          progressPercentage === 100
                            ? "text-green-400"
                            : progressPercentage > 0
                              ? "text-yellow-400"
                              : "text-slate-400"
                        }`}
                      >
                        {progressPercentage === 100
                          ? "Completed"
                          : progressPercentage > 0
                            ? "In Progress"
                            : "Not Started"}
                      </span>
                    </div>
                  </div>
                </CardContent> */}
              </Card>
            )
          })}
        </div>

        {/* Summary Stats */}
        {/* <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-slate-800/50 border-slate-700 text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-white">{missions.length}</div>
              <div className="text-slate-400 text-sm">Total Missions</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700 text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-orange-400">{missions.filter((m) => m.daily).length}</div>
              <div className="text-slate-400 text-sm">Daily Missions</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700 text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-yellow-400">{totalXP.toLocaleString()}</div>
              <div className="text-slate-400 text-sm">Total XP</div>
            </CardContent>
          </Card>
        </div> */}
      </div>
    </div>
  )
}
