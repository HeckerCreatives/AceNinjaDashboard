"use client"

import type React from "react"

import { useState } from "react"
import { Trash2, Edit } from "lucide-react"

export default function QuestItems() {
  const [formData, setFormData] = useState({
    questName: "",
    questType: "",
    rewardType: "",
    goal: "",
    quantity: "",
    description: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className=" p-4 rounded-md shadow-lg w-full mx-auto text-xs">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* First column */}
        <div className="space-y-4">
          <div className="space-y-1">
            <label htmlFor="questName" className="block text-white font-medium">
              Quest Name:
            </label>
            <input
              type="text"
              id="questName"
              name="questName"
              value={formData.questName}
              onChange={handleChange}
              className="w-full bg-[#121212] text-white border-none rounded p-2 focus:ring-2 focus:ring-gray-600 focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="questType" className="block text-white font-medium">
              Quest Type:
            </label>
            <input
              type="text"
              id="questType"
              name="questType"
              value={formData.questType}
              onChange={handleChange}
              className="w-full bg-[#121212] text-white border-none rounded p-2 focus:ring-2 focus:ring-gray-600 focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="rewardType" className="block text-white font-medium">
              Reward Type:
            </label>
            <input
              type="text"
              id="rewardType"
              name="rewardType"
              value={formData.rewardType}
              onChange={handleChange}
              className="w-full bg-[#121212] text-white border-none rounded p-2 focus:ring-2 focus:ring-gray-600 focus:outline-none"
            />
          </div>
        </div>

        {/* Second column */}
        <div className="space-y-4">
          <div className="space-y-1">
            <label htmlFor="goal" className="block text-white font-medium">
              Goal:
            </label>
            <textarea
              id="goal"
              name="goal"
              value={formData.goal}
              onChange={handleChange}
              rows={3}
              className="w-full bg-[#121212] text-white border-none rounded p-2 focus:ring-2 focus:ring-gray-600 focus:outline-none resize-none"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="quantity" className="block text-white font-medium">
              Quantity:
            </label>
            <input
              type="text"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full bg-[#121212] text-white border-none rounded p-2 focus:ring-2 focus:ring-gray-600 focus:outline-none"
            />
          </div>
        </div>

        {/* Third column */}
        <div className="space-y-4">
          <div className="space-y-1">
            <label htmlFor="description" className="block text-white font-medium">
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={6}
              className="w-full bg-[#121212] text-white border-none rounded p-2 focus:ring-2 focus:ring-gray-600 focus:outline-none resize-none"
            />
          </div>

          <div className="flex justify-end space-x-2 mt-2">
            <button
              className=" bg-zinc-900 text-white px-3 py-2 rounded flex items-center"
              aria-label="Delete"
            >
              <Trash2 className="w-4 h-4 mr-1 text-red-500" />
              Delete
            </button>
            <button
              className=" bg-zinc-900 text-white px-3 py-1 rounded flex items-center"
              aria-label="Edit"
            >
              <Edit className="w-4 h-4 mr-1 text-yellow-500" />
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

