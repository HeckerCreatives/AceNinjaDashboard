"use client"
import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Edit3, Check, X } from "lucide-react"
import { useGetGameVersion, useUpdateGameVersion } from "@/client_actions/superadmin/general"
import toast from "react-hot-toast"

export default function GameVersionComponent() {
  const [version, setVersion] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [tempVersion, setTempVersion] = useState(version)
  const {data} = useGetGameVersion()
  const {mutate: updateGameVersion} = useUpdateGameVersion()

   const updateVersionData = async () => {
        updateGameVersion({id: data?.data.id, version: tempVersion, description: '', isActive: true},{
          onSuccess: () => {
            toast.success(`Game version updated successfully`);
          },
        })
       
      }

  const handleEdit = () => {
    setTempVersion(version)
    setIsEditing(true)
  }

  const handleSave = () => {
    setVersion(tempVersion)
    setIsEditing(false)
    updateVersionData()
  }

  const handleCancel = () => {
    setTempVersion(version)
    setIsEditing(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave()
    } else if (e.key === "Escape") {
      handleCancel()
    }
  }

  useEffect(() => {
    setVersion(data?.data.version || '') 
  })

  console.log(data)

  return (
    <Card className="w-full max-w-lg bg-amber-950">
      <CardHeader className="text-center pb-2 flex items-center justify-center">
        <img src="/dashboard/small LOGO.png" alt="user" width={200} height={200} />
      </CardHeader>

      <CardContent>
        <div className="flex items-center justify-center gap-3 p-4 bg-amber-900 rounded-lg">
          <span className="text-lg font-medium">Version:</span>

          {isEditing ? (
            <div className="flex items-center gap-2">
              <Input
                value={tempVersion}
                onChange={(e) => setTempVersion(e.target.value)}
                onKeyDown={handleKeyPress}
                className="h-9 w-20 text-center font-mono"
                autoFocus
              />
              <Button size="sm" variant="ghost" onClick={handleSave} className="h-8 w-8 p-0 bg-amber-950">
                <Check className="h-4 w-4 text-green-600" />
              </Button>
              <Button size="sm" variant="ghost" onClick={handleCancel} className="h-8 w-8 p-0 bg-amber-950">
                <X className="h-4 w-4 text-red-600" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-lg font-mono bg-primary/10 px-3 py-1 rounded">v{version}</span>
              <Button size="sm" variant="ghost" onClick={handleEdit} className="h-8 w-8 p-0">
                <Edit3 className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
