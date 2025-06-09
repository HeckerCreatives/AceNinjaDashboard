"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

declare global {
  interface Window {
    paypal?: any
  }
}

const amounts = [
  { value: "10", label: "$10", description: "For 10 credits" },
  { value: "20", label: "$20", description: "For 20 credits" },
  { value: "50", label: "$50", description: "For 50 credits" },
  { value: "100", label: "$100", description: "For 100 credits" },
]

export default function PayPalTopUpCard() {
  const [selectedAmount, setSelectedAmount] = useState<string>("")
  const [isPayPalLoaded, setIsPayPalLoaded] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const paypalRef = useRef<HTMLDivElement>(null)

  // Load PayPal SDK
  useEffect(() => {
    const loadPayPalScript = () => {
      if (window.paypal) {
        setIsPayPalLoaded(true)
        return
      }

      const script = document.createElement("script")
      script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&currency=USD`
      script.async = true
      script.onload = () => setIsPayPalLoaded(true)
      script.onerror = () => console.error("PayPal SDK failed to load")
      document.body.appendChild(script)
    }

    loadPayPalScript()
  }, [])

  // Render PayPal buttons when amount is selected and SDK is loaded
  useEffect(() => {
    if (isPayPalLoaded && selectedAmount && paypalRef.current && window.paypal) {
      // Clear previous buttons
      paypalRef.current.innerHTML = ""

      window.paypal
        .Buttons({
          createOrder: (data: any, actions: any) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: selectedAmount,
                    currency_code: "USD",
                  },
                  description: `Top up ${selectedAmount === "10" ? "10" : selectedAmount === "20" ? "20" : selectedAmount === "50" ? "50" : "100"} credits`,
                },
              ],
            })
          },
          onApprove: async (data: any, actions: any) => {
            setIsProcessing(true)
            try {
              const order = await actions.order.capture()
              console.log("Payment successful:", order)

              // Here you would typically:
              // 1. Send the order details to your backend
              // 2. Update user's credit balance
              // 3. Show success message

              alert(`Payment successful! Order ID: ${order.id}`)

              // Reset the form
              setSelectedAmount("")
            } catch (error) {
              console.error("Payment capture failed:", error)
              alert("Payment failed. Please try again.")
            } finally {
              setIsProcessing(false)
            }
          },
          onError: (err: any) => {
            console.error("PayPal error:", err)
            alert("An error occurred with PayPal. Please try again.")
            setIsProcessing(false)
          },
          onCancel: (data: any) => {
            console.log("Payment cancelled:", data)
            alert("Payment was cancelled.")
            setIsProcessing(false)
          },
          style: {
            layout: "vertical",
            color: "gold",
            shape: "rect",
            label: "paypal",
            height: 40,
          },
        })
        .render(paypalRef.current)
    }
  }, [isPayPalLoaded, selectedAmount])

  const handleAmountChange = (value: string) => {
    setSelectedAmount(value)
    setIsProcessing(false)
  }

  return (
    <div className="flex items-center justify-center">
      <Card className="w-full max-w-md shadow-lg border-[1px] border-amber-800">
        <CardHeader className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="bg-zinc-950 rounded-md">
              <img src="/paypal.png" alt="PayPal" width={180} height={180} />
            </div>
          </div>
          <CardTitle className="text-sm font-bold text-gray-400">Top Up Your Account</CardTitle>
          <p className="text-gray-300 text-xs">Select an amount to topup.</p>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-2">
            {amounts.map((amount) => (
              <div key={amount.value} className="relative">
                <input
                  type="radio"
                  id={amount.value}
                  name="amount"
                  value={amount.value}
                  checked={selectedAmount === amount.value}
                  onChange={(e) => handleAmountChange(e.target.value)}
                  className="sr-only"
                  disabled={isProcessing}
                />
                <label
                  htmlFor={amount.value}
                  className={`flex items-center justify-between p-4 border-1 rounded-lg bg-white cursor-pointer transition-all duration-200 ${
                    selectedAmount === amount.value
                      ? "border-orange-600 bg-orange-50 ring-2 ring-orange-200 shadow-md"
                      : "border-gray-200 hover:border-orange-300 hover:bg-blue-25"
                  } ${isProcessing ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <div className="flex flex-col">
                    <span
                      className={`text-sm font-bold ${
                        selectedAmount === amount.value ? "text-orange-700" : "text-gray-800"
                      }`}
                    >
                      {amount.label}
                    </span>
                    <span
                      className={`text-[.6rem] ${selectedAmount === amount.value ? "text-orange-600" : "text-gray-500"}`}
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
              <p className="text-xs text-gray-600 mt-1">Click the PayPal button below to complete the payment</p>
            </div>
          )}

          {/* PayPal Buttons Container */}
          {selectedAmount && isPayPalLoaded && (
            <div className="space-y-2">
              <div ref={paypalRef} className="paypal-buttons-container"></div>
              {isProcessing && <div className="text-center text-sm text-gray-600">Processing payment...</div>}
            </div>
          )}

          {selectedAmount && !isPayPalLoaded && (
            <div className="text-center text-sm text-gray-600">Loading PayPal...</div>
          )}
        </CardContent>

        <CardFooter className="space-y-4">
          {!selectedAmount && (
            <Button
              disabled
              className="w-full bg-gray-400 h-[40px] text-white font-semibold py-3 text-sm cursor-not-allowed"
            >
              Select Amount to Continue
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
