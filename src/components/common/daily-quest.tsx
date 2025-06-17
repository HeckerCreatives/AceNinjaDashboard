"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sword, Clock, Trophy, Edit, Save, X } from "lucide-react";
import { useUpdateDailyQuest } from "@/client_actions/superadmin/battlepass"; // ⚡ Use your API hook!

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

interface QuestProps {
  id: string;
  missionName: string;
  description: string;
  type: string;
  xpReward: number;
  requirements: Record<string, number>;
  currentPoints?: number;
  refreshTime?: string;
  missiontype: string;
  isEditable?: boolean;
  rewardtype?: string
}

export default function DailyQuestCard({
  id,
  missionName,
  description,
  type,
  xpReward,
  missiontype,
  requirements,
  currentPoints = 0,
  refreshTime = new Date(new Date().setHours(24, 0, 0, 0)).toISOString(),
  isEditable = false,
  rewardtype
}: QuestProps) {
  const [timeRemaining, setTimeRemaining] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedExp, setEditedExp] = useState<string>(xpReward.toString());
  const [editedRequirements, setEditedRequirements] = useState<Record<string, string>>(
    Object.fromEntries(Object.entries(requirements).map(([k, v]) => [k, v.toString()]))
  );
  const [editedRewardType, setEditedRewardType] = useState<string>(rewardtype || "exp");
  

  const { mutate: updateDailyQuest, isPending: isUpdating } = useUpdateDailyQuest();

  const totalRequiredPoints = Object.values(requirements).reduce((a, b) => a + b, 0);
  const progress = Math.min((currentPoints / totalRequiredPoints) * 100, 100);

  const getLabelForRequirement = (key: string) => {
    switch (key) {
      case "pvpwins":
        return "PvP Wins";
      case "enemiesdefeated":
        return "Defeat Enemies";
      case "dailyquests":
        return "Daily Quests";
      case "skillsused":
        return "Skills Used";
      case "totaldamage":
        return "Total Damage";
      case "pvpparticipated":
        return "PvP Participation";
      case "raidparticipated":
        return "Raids Participated";
      case "dailyspin":
        return "Daily Spin";
      case "dailyloginclaimed":
        return "Daily Login";
      case "storychapters":
        return "Story Chapters";
      case "friendsadded":
        return "Friends Added";
      case "selfheal":
        return "Self Heal";
      default:
        return key;
    }
  };

 useEffect(() => {
  const calculateTimeRemaining = () => {
    const now = new Date();

    // Set refresh time to 8:00 AM today
    const refreshDate = new Date();
    refreshDate.setHours(8, 0, 0, 0); // 8:00:00 AM

    // If it's already past 8 AM, move to tomorrow
    if (now >= refreshDate) {
      refreshDate.setDate(refreshDate.getDate() + 1);
    }

    const diffMs = refreshDate.getTime() - now.getTime();

    if (diffMs <= 0) return "Refreshing...";

    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  setTimeRemaining(calculateTimeRemaining());

  const timer = setInterval(() => {
    setTimeRemaining(calculateTimeRemaining());
  }, 1000);

  return () => clearInterval(timer);
}, [refreshTime]);

  // const handleEditClick = () => {
  //   setIsEditing(true);
  //   setEditedExp(xpReward.toString());
  //   setEditedRequirements(
  //     Object.fromEntries(Object.entries(requirements).map(([k, v]) => [k, v.toString()]))
  //   );
  // };

  const handleSaveClick = () => {
    const newExp = parseInt(editedExp) || 0;
    const newRequirements: Record<string, number> = {};
    for (const [key, val] of Object.entries(editedRequirements)) {
      newRequirements[key] = parseInt(val) || 0;
    }

    console.log(newRequirements)

    // 🔥 Use the mutation to update on the server
    updateDailyQuest({
      id,
      xpReward: Math.max(0, newExp),
      requirements: newRequirements,
      rewardtype: editedRewardType || "exp",
    });

    setIsEditing(false);
  };

  // const handleCancelClick = () => {
  //   setEditedExp(xpReward.toString());
  //   setEditedRequirements(
  //     Object.fromEntries(Object.entries(requirements).map(([k, v]) => [k, v.toString()]))
  //   );
  //   setIsEditing(false);
  // };

  const handleExpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedExp(e.target.value);
  };

  const handleRequirementChange = (key: string, value: string) => {
    setEditedRequirements((prev) => ({ ...prev, [key]: value }));
  };

  const handleEditClick = () => {
  setIsEditing(true);
  setEditedExp(xpReward.toString());
  setEditedRewardType(rewardtype || "exp");
  setEditedRequirements(
    Object.fromEntries(Object.entries(requirements).map(([k, v]) => [k, v.toString()]))
  );
};

const handleCancelClick = () => {
  setEditedExp(xpReward.toString());
  setEditedRewardType(rewardtype || "exp");
  setEditedRequirements(
    Object.fromEntries(Object.entries(requirements).map(([k, v]) => [k, v.toString()]))
  );
  setIsEditing(false);
};

 useEffect(() => {
  setEditedRewardType(rewardtype ?? "exp");
}, []);




  return (
    <Card className="w-full max-w-md border-2 hover:shadow-lg bg-amber-950 border-amber-900 transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl flex items-center gap-2">
            <Sword className="h-5 w-5 text-primary" />
            {missionName} <span className=" text-xs text-amber-600">({missiontype})</span>
          </CardTitle>
          {isEditable && !isEditing && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleEditClick}
              className="h-8 w-8 p-0"
            >
              <Edit className="h-4 w-4" />
            </Button>
          )}
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Trophy className="h-4 w-4 text-amber-500" />
              {isEditing ? (
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="reward-select" className="text-sm font-medium">Reward</Label>
                    <select
                      id="reward-select"
                      value={editedRewardType}
                      onChange={(e) => setEditedRewardType(e.target.value)}
                      className="bg-amber-900 border border-amber-700 text-white text-sm rounded-md px-2 py-1 h-8"
                    >
                      <option value="exp">EXP</option>
                      <option value="coins">Coins</option>
                      <option value="crystal">Crystal</option>
                    </select>
                  </div>

                  <Input
                    id="exp-input"
                    type="number"
                    value={editedExp}
                    onChange={handleExpChange}
                    className="w-20 h-8"
                    min="0"
                  />
                </div>
              ) : (
                <span className="font-medium uppercase">{xpReward} {editedRewardType}</span>
              )}
            </div>
            {isEditing && (
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSaveClick}
                  className="h-8 w-8 p-0 text-green-600 hover:text-green-700"
                  disabled={isUpdating}
                >
                  <Save className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCancelClick}
                  className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          {Object.entries(requirements).map(([key, requiredPoints]) => (
            <div
              key={key}
              className="flex justify-between items-center text-sm"
            >
              <div className="flex items-center gap-2 text-muted-foreground">
                <span>{getLabelForRequirement(key)}:</span>
                {isEditing ? (
                  <Input
                    type="number"
                    value={editedRequirements[key] ?? ""}
                    onChange={(e) =>
                      handleRequirementChange(key, e.target.value)
                    }
                    className="w-20 h-8"
                    min="0"
                  />
                ) : (
                  <span className="font-medium text-white">{requiredPoints}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between text-sm mt-6">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-blue-500" />
            <span>Refreshes in:</span>
          </div>
          <div className="font-mono">{timeRemaining}</div>
        </div>
      </CardContent>
    </Card>
  );
}
