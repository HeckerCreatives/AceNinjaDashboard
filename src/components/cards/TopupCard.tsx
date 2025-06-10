"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import toast from "react-hot-toast"
import { useUserData } from "@/client_actions/user/dashboard/dashboard"
import useCharacterStore from "@/hooks/character"
import { useCompleteOrder, useGetTopupItems } from "@/client_actions/user/topup"
import { Wallet } from "lucide-react"

declare global {
  interface Window {
    paypal?: any
  }
}

export default function PayPalTopUpCard() {
  const [selectedAmount, setSelectedAmount] = useState<string>("")
  const [selectedItem, setSelectedItem] = useState<string>("")
  const [selectedItemName, setSelectedItemName] = useState<string>("")
  const [selectedItemDesc, setSelectedItemDesc] = useState<string>("")
  const [bonusElegible, setBunosEligible] = useState<boolean>(false)
  const [isPayPalLoaded, setIsPayPalLoaded] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const paypalRef = useRef<HTMLDivElement>(null)
  const { characterid } = useCharacterStore()
  const { data, isLoading } = useUserData(characterid)
  const { data: topupitemsData } = useGetTopupItems(characterid)
  const { mutate:completeOrder} = useCompleteOrder()

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
                    breakdown: {
                      item_total: {
                        value: selectedAmount,
                        currency_code: "USD",
                      },
                    },
                  },
                  description: `Top up ${selectedAmount} credits`,
                  items: [
                    {
                      name: selectedItemName,
                      description: selectedItemDesc,
                      unit_amount: {
                        value: selectedAmount,
                        currency_code: "USD",
                      },
                      quantity: "1",
                      category: "DIGITAL_GOODS",
                    },
                  ],
                },
              ],
            })
          },
          onApprove: async (data: any, actions: any) => {
            setIsProcessing(true)
            try {
              const order = await actions.order.capture()
              console.log("Payment successful:", order)
              // toast.success(`Payment successful! Order ID: ${order.id}`)

        
            completeOrder({ orderdata: order, characterid: characterid, itemid: selectedItem, bonusEligible: bonusElegible },
              {  onSuccess: () => {
                toast.success(`Payment successful! Order: ${selectedItemName}`)
              },})

              setSelectedAmount("")
            } catch (error) {
              console.error("Payment capture failed:", error)
              toast.error("Payment failed. Please try again.")
            } finally {
              setIsProcessing(false)
            }
          },
          onError: (err: any) => {
            console.error("PayPal error:", err)
            toast.error("An error occurred with PayPal. Please try again.")
            setIsProcessing(false)
          },
          onCancel: (data: any) => {
            console.log("Payment cancelled:", data)
            toast.error("Payment was cancelled.")
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
    <div className=" w-full flex items-center justify-center">
      <Card className="w-full  max-w-7xl shadow-lg border-[1px] border-amber-800">
        <CardHeader className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="bg-zinc-950 rounded-md">
              <img src="/paypal.png" alt="PayPal" width={180} height={180} />
            </div>
          </div>
          <CardTitle className="text-sm font-bold text-gray-400">Top Up Your Account</CardTitle>
          <p className="text-gray-300 text-xs">Select a credit pack to top up.</p>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className=" flex items-center justify-center w-full">
             <div className="flex flex-col gap-2 w-full md:w-[50%] h-auto bg-amber-950 rounded-lg text-white border-[1px] border-amber-700 p-6">
              <p className="text-xs text-amber-50">Credit Balance</p>
              <div className=" flex items-center gap-2">
                <Wallet size={30}/>
                <h2 className="text-2xl font-semibold">{(data?.wallet.find((item) => item.type === 'topupcredit')?.amount || 0).toLocaleString()}</h2>
              </div>
            </div>
          </div>
         

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
            {topupitemsData?.data.topupitems.map((item) => (
              <div key={item.id} className="relative">
                <input
                  type="radio"
                  id={item.id}
                  name="amount"
                  value={item.price}
                  checked={selectedAmount === item.price.toString()}
                  onChange={(e) => {handleAmountChange(e.target.value), setSelectedItem(item.id), setBunosEligible(item.bonusEligible), setSelectedItemName(item.name), setSelectedItemDesc(item.description)}}
                  className="sr-only"
                  disabled={isProcessing}
                />
                <label
                  htmlFor={item.id}
                  className={`flex flex-col gap-1 p-4 border rounded-lg bg-white cursor-pointer transition-all duration-200 ${
                    selectedAmount === item.price.toString()
                      ? "border-orange-600 bg-orange-50 ring-2 ring-orange-200 shadow-md"
                      : "border-gray-200 hover:border-orange-300 hover:bg-blue-25"
                  } ${isProcessing ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <span className="text-sm font-bold text-gray-800">{item.name}</span>
                  <span className="text-[.6rem] text-gray-600">{item.description}</span>
                  <div className="flex justify-between items-center text-xs text-gray-500 mt-1">
                    <span className=" ">Price: <span className=" text-sm font-bold text-black"> ${item.price.toLocaleString()}</span></span>
                    <span>Credits: {item.topupcredit.toLocaleString()}</span>
                  </div>
                  {item.bonusEligible && (
                    <span className="text-[0.6rem] font-bold text-orange-500 mt-1">Bonus Eligible</span>
                  )}
                  <div
                    className={`w-6 h-6 border-2 rounded-full flex items-center justify-center transition-all duration-200 ${
                      selectedAmount === item.price.toString() ? "border-orange-600 bg-orange-600" : "border-gray-300"
                    } absolute top-2 right-2`}
                  >
                    {selectedAmount === item.price.toString() && <div className="w-2.5 h-2.5 bg-white rounded-full"></div>}
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
              Select Pack to Continue
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
