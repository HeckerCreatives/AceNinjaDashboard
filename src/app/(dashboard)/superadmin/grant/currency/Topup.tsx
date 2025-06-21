'use client'
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SendCurrency, sendCurrencySchema } from '@/validation/schema';
import { useSendAmount } from '@/client_actions/superadmin/topup'
import toast from 'react-hot-toast'
import Loader from '@/components/common/Loader'

export default function Topup() {
    const {mutate: sendAmount, isPending} = useSendAmount()
    const [formattedValue, setFormattedValue] = useState('0')

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        watch,
        trigger,
        formState: { errors },
    } = useForm<SendCurrency>({
        resolver: zodResolver(sendCurrencySchema),
    });

    const onSubmit = async (data: SendCurrency) => {
        sendAmount({playerusername: data.username, type: data.currency, amount: data.amount}, {
            onSuccess: () => {
                toast.success("Sent successfully");
                 reset({
                    username: '',
                    amount: 0,
                    currency: ''
                    });

                    setFormattedValue('0')
    
              },
           })
    };

    const currency = watch("currency")
    const amount = watch('amount');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value.replace(/,/g, '')
        let numberValue = parseInt(rawValue, 10)

        if (!isNaN(numberValue)) {
        setFormattedValue(numberValue.toLocaleString())
        setValue('amount', numberValue)
        } else {
        setFormattedValue('')
        setValue('amount', 0)
        }
    }

    return (
        <div className='w-full h-full flex items-center justify-center mt-8'>
            <form onSubmit={handleSubmit(onSubmit)} className='w-full max-w-[400px] h-auto bg-dark border-t-2 border-amber-900 p-6 rounded-md text-white flex flex-col gap-1'>
                <h1>Send</h1>

                {/* Username Input */}
                <label className='text-xs mt-4'>Character Name</label>
                <Input 
                    placeholder='Character name' 
                    type='text' 
                    className='border-amber-400 bg-[#4C4106] text-white' 
                    {...register('username')} 
                />
                {errors.username && <p className="text-red-500 text-xs">{errors.username.message}</p>}

                {/* Currency Select */}
                <label className='text-xs mt-2'>Currency</label>
                <Select 
                     value={currency} 
                    onValueChange={(value) => {
                        setValue("currency", value);
                    }}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="coins">Coins</SelectItem>
                        <SelectItem value="crystal">Crystal</SelectItem>
                        <SelectItem value="topupcredit">Credit</SelectItem>
                    </SelectContent>
                </Select>
                {errors.currency && <p className="text-red-500 text-xs">{errors.currency.message}</p>}

                {/* Amount Input */}
                <label className='text-xs mt-2'>Amount</label>
                <Input 
                    placeholder='Amount' 
                    type='text' 
                    className='border-amber-400 bg-[#4C4106] text-white'  
                    value={formattedValue}
                    onChange={handleInputChange}
                />
                {errors.amount && <p className="text-red-500 text-xs">{errors.amount.message}</p>}

                {/* Submit Button */}
                <Button disabled={isPending} className='mt-6 flex items-center justify-center gap-2'>
                    {isPending && <Loader/>}
                    Send</Button>
            </form>
        </div>
    )
}
