"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const amounts = [
  { value: "10", label: "$10", description: "For 10 credits" },
  { value: "20", label: "$20", description: "For 20 credits" },
  { value: "50", label: "$50", description: "For 50 credits" },
  { value: "100", label: "$100", description: "For 100 credits" },
]

export default function PayPalTopUpCard() {
  const [selectedAmount, setSelectedAmount] = useState<string>("")

  const handleTopUp = () => {
    if (!selectedAmount) {
      alert("Please select an amount to top up")
      return
    }

    // Here you would integrate with PayPal SDK
    console.log(`Processing PayPal top-up for $${selectedAmount}`)
    alert(`Redirecting to PayPal for $${selectedAmount} top-up...`)
  }

  return (
    <div className="flex items-center justify-center">
      <Card className="w-full max-w-md shadow-lg border-[1px] border-amber-800">
        <CardHeader className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="  rounded flex items-center justify-center">
              {/* <span className="text-white font-bold text-sm">P</span> */}
              <div className=' bg-zinc-950 rounded-md'>
                  <img src="/paypal.png" alt="" width={180} height={180} />
                </div>
            </div>
            {/* <span className="text-xl font-bold text-blue-600">PayPal</span> */}
          </div>
          <CardTitle className="text-sm font-bold text-gray-400">Top Up Your Account</CardTitle>
          <p className="text-gray-300 text-xs">Select an amount to topup.</p>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-3">
            {amounts.map((amount) => (
              <div key={amount.value} className="relative">
                <input
                  type="radio"
                  id={amount.value}
                  name="amount"
                  value={amount.value}
                  checked={selectedAmount === amount.value}
                  onChange={(e) => setSelectedAmount(e.target.value)}
                  className="sr-only"
                />
                <label
                  htmlFor={amount.value}
                  className={`flex items-center justify-between p-4 border-1 rounded-lg bg-white cursor-pointer transition-all duration-200 ${
                    selectedAmount === amount.value
                      ? "border-orange-600 bg-orange-50 ring-2 ring-orange-200 shadow-md"
                      : "border-gray-200 hover:border-orange-300 hover:bg-blue-25"
                  }`}
                >
                  <div className="flex flex-col">
                    <span
                      className={`text-lg font-bold ${
                        selectedAmount === amount.value ? "text-orange-700" : "text-gray-800"
                      }`}
                    >
                      {amount.label}
                    </span>
                    <span
                      className={`text-xs ${selectedAmount === amount.value ? "text-orange-600" : "text-gray-500"}`}
                    >
                      {amount.description}
                    </span>
                  </div>
                  <div
                    className={`w-6 h-6 border-2 rounded-full flex items-center justify-center transition-all duration-200 ${
                      selectedAmount === amount.value ? "border-orange-600 bg-orange-600" : "border-gray-300"
                    }`}
                  >
                    {selectedAmount === amount.value && <div className="w-2.5 h-2.5 bg-white rounded-full"></div>}
                  </div>
                </label>
              </div>
            ))}
          </div>

          {selectedAmount && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700 font-medium text-xs">Selected Amount:</span>
                <span className="text-lg font-bold text-orange-800">${selectedAmount}</span>
              </div>
              <p className="text-xs text-gray-600 mt-1">You will be redirected to PayPal to complete the payment</p>
            </div>
          )}
        </CardContent>

        <CardFooter className="space-y-4">
          <Button
            onClick={handleTopUp}
            disabled={!selectedAmount}
            className="w-full bg-orange-600 h-[40px] hover:bg-orange-700 text-white font-semibold py-3 text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {selectedAmount ? `Top Up $${selectedAmount}` : "Select Amount"}
          </Button>

       
        </CardFooter>
      </Card>
    </div>
  )
}
