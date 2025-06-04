"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trophy, Target, Zap, Clock, Star, Edit, Save, X } from "lucide-react";
import { useUpdateBpMission } from "@/client_actions/superadmin/battlepass";
import toast from "react-hot-toast";

// Define all possible requirement types
const REQUIREMENT_TYPES = [
  "pvpwins",
  "enemydefeated",
  "dailyquests",
  "skillsused",
  "totaldamage",
  "pvpparticipated",
  "raidparticipated",
  "dailyspin",
  "dailyloginclaimed",
  "storychapters",
  "friendsadded",
  "selfheal",
] as const;

type RequirementType = typeof REQUIREMENT_TYPES[number];

interface Mission {
  missionName: string;
  description: string;
  xpReward: number;
  requirements: {
    [key in RequirementType]?: number;
  };
  daily: boolean;
  _id: string;
}

interface BpFreemissionProps {
  freeMission: Mission[];
  title: string;
  id: string;
  onSave?: (missions: Mission[]) => void;
}

export default function BpFreemission({
  freeMission,
  title,
  onSave,
  id,
}: BpFreemissionProps) {
  const [missions, setMissions] = useState<Mission[]>(freeMission);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Mission | null>(null);
  const { mutate: updateBpMission } = useUpdateBpMission();

  const handleEdit = (mission: Mission) => {
    setEditingId(mission._id);
    setEditForm({ ...mission });
  };

  const handleSave = () => {
    if (editForm && editingId) {
      const updatedMissions = missions.map((mission) =>
        mission._id === editingId ? editForm : mission
      );
      setMissions(updatedMissions);
      setEditingId(null);
      setEditForm(null);
      onSave?.(updatedMissions);

      updateMissionsBp(updatedMissions);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm(null);
  };

  const updateEditForm = (field: string, value: any) => {
    if (editForm) {
      if (field.startsWith("requirements.")) {
        const reqField = field.split(".")[1] as RequirementType;
        setEditForm({
          ...editForm,
          requirements: {
            ...editForm.requirements,
            [reqField]: value,
          },
        });
      } else {
        setEditForm({
          ...editForm,
          [field]: value,
        });
      }
    }
  };

  function getFirstRequirement(
    mission: Mission
  ): { type: RequirementType; value: number } | null {
    for (const reqType of REQUIREMENT_TYPES) {
      const val = mission.requirements[reqType];
      if (val && val > 0) {
        return { type: reqType, value: val };
      }
    }
    return null;
  }

  function getMissionIcon(mission: Mission) {
    const firstReq = getFirstRequirement(mission);
    if (!firstReq) return <Zap className="w-5 h-5" />;
    switch (firstReq.type) {
      case "pvpwins":
        return <Trophy className="w-5 h-5" />;
      case "enemydefeated":
        return <Target className="w-5 h-5" />;
      case "dailyquests":
        return <Star className="w-5 h-5" />;
      default:
        return <Zap className="w-5 h-5" />;
    }
  }

  function getRequirementText(mission: Mission) {
    const firstReq = getFirstRequirement(mission);
    return firstReq ? `${firstReq.value} ${firstReq.type}` : "Complete";
  }

  function getProgressValue(mission: Mission) {
    const firstReq = getFirstRequirement(mission);
    return firstReq ? Math.floor(firstReq.value / 2) : 0; // Example progress
  }

  function getMaxValue(mission: Mission) {
    const firstReq = getFirstRequirement(mission);
    return firstReq ? firstReq.value : 1;
  }

  const totalXP = missions.reduce((sum, mission) => sum + mission.xpReward, 0);

  const updateMissionsBp = async (updatedMissions: Mission[]) => {
    const isFree = title.includes("Free");
    const freeMissions = isFree ? updatedMissions : undefined;
    const premiumMissions = !isFree ? updatedMissions : undefined;

    updateBpMission(
      {
        bpid: id,
        freeMissions,
        premiumMissions,
      },
      {
        onSuccess: () => {
          toast.success(`Battle Pass Missions updated successfully.`);
        },
      }
    );
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
            <span className="text-white font-semibold">
              Total XP Available: {totalXP.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Missions Grid */}
        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
          {missions.map((mission) => {
            const progress = getProgressValue(mission);
            const maxValue = getMaxValue(mission);
            const progressPercentage = (progress / maxValue) * 100;

            return (
              <Card
                key={mission._id}
                className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      {/* {editingId === mission._id ? (
                         <div className="w-full p-2">
                            <div className="w-full flex items-center justify-end gap-2 mb-4">
                              <Button
                                size="sm"
                                onClick={handleSave}
                                className="text-white bg-amber-600 hover:bg-amber-700"
                              >
                                <Save className="w-3 h-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={handleCancel}
                                className="border-zinc-600"
                              >
                                <X className="w-3 h-3" />
                              </Button>
                            </div>

                            <div className="space-y-2">
                              <Input
                                value={editForm?.missionName || ""}
                                onChange={(e) =>
                                  updateEditForm("missionName", e.target.value)
                                }
                                className="text-white bg-amber-950 border-amber-600"
                                placeholder="Mission Name"
                              />
                              <Input
                                value={editForm?.description || ""}
                                onChange={(e) =>
                                  updateEditForm("description", e.target.value)
                                }
                                className="text-slate-200 bg-amber-950 border-amber-600 text-xs"
                                placeholder="Description"
                              />
                            </div>

                            <div className="flex items-center gap-1 mt-2">
                              <input
                                type="checkbox"
                                checked={editForm?.daily || false}
                                onChange={(e) =>
                                  updateEditForm("daily", e.target.checked)
                                }
                                className="mr-1"
                              />
                              <span className="text-xs text-slate-300">Daily</span>
                            </div>

                            <Input
                              type="number"
                              value={editForm?.xpReward || 0}
                              onChange={(e) =>
                                updateEditForm(
                                  "xpReward",
                                  Number.parseInt(e.target.value)
                                )
                              }
                              className="text-white bg-amber-950 border-amber-600 w-full"
                              placeholder="XP"
                            />

                            {(() => {
                              const presentReqType = Object.keys(editForm?.requirements || {}).find(
                                (reqType) => editForm?.requirements[reqType as RequirementType] !== undefined
                              ) as RequirementType | undefined;

                              if (!presentReqType) return null;

                              const presentReqValue = editForm?.requirements[presentReqType] || 0;

                              return (
                                <div className="flex gap-2 items-center mt-2">
                                  <select
                                    value={presentReqType}
                                    onChange={(e) => {
                                      const newType = e.target.value as RequirementType;
                                      const oldValue = editForm?.requirements[presentReqType] || 0;

                                      const newRequirements: Mission["requirements"] = {};
                                      newRequirements[newType] = oldValue;

                                      updateEditForm("requirements", newRequirements);
                                    }}
                                    className="bg-amber-950 text-white border-amber-600 rounded p-2 border-[1px] "
                                  >
                                    {REQUIREMENT_TYPES.map((type) => (
                                      <option key={type} value={type}>
                                        {type}
                                      </option>
                                    ))}
                                  </select>

                                  <Input
                                    type="number"
                                    value={presentReqValue}
                                    onChange={(e) =>
                                      updateEditForm(
                                        `requirements.${presentReqType}`,
                                        Number.parseInt(e.target.value)
                                      )
                                    }
                                    className="text-white bg-amber-950 border-amber-600"
                                    placeholder="Value"
                                  />
                                </div>
                              );
                            })()}
                          </div>
                      ) : (
                        <div className="w-full flex gap-2 items-start">
                          <div className="py-3">
                            <div className="p-2 rounded-lg bg-gradient-to-br from-amber-600 to-yellow-500 text-white h-fit ">
                              {getMissionIcon(mission)}
                            </div>
                          </div>

                          <div className="flex-1 p-2">
                            <CardTitle className="text-white text-lg">
                              {mission.missionName}
                            </CardTitle>
                            <p className="text-slate-200 text-xs mt-1">
                              {mission.description}
                            </p>
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
                              <span className="text-yellow-400 font-bold text-sm">
                                {mission.xpReward} XP
                              </span>
                            </div>
                          </div>
                        </div>
                      )} */}

                       <div className="w-full flex gap-2 items-start">
                          <div className="py-3">
                            <div className="p-2 rounded-lg bg-gradient-to-br from-amber-600 to-yellow-500 text-white h-fit ">
                              {getMissionIcon(mission)}
                            </div>
                          </div>

                          <div className="flex-1 p-2">
                            <CardTitle className="text-white text-lg">
                              {mission.missionName}
                            </CardTitle>
                            <p className="text-slate-200 text-xs mt-1">
                              {mission.description}
                            </p>
                          </div>

                          <div className="flex flex-col items-end gap-2 p-2">
                            {/* <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleEdit(mission)}
                              className="text-slate-200 hover:text-white"
                            >
                              <Edit className="w-3 h-3" />
                            </Button> */}

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
                              <span className="text-yellow-400 font-bold text-sm">
                                {mission.xpReward} XP
                              </span>
                            </div>
                          </div>
                        </div>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
