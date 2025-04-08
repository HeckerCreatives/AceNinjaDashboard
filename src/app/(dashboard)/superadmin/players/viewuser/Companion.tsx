'use client'
import { useUserData } from '@/client_actions/user/dashboard/dashboard';
import useCharacterStore from '@/hooks/character';
import { companionImg } from '@/utils/findAsset';
import React from 'react'

export default function Companion() {
    const { characterid, setCharacterid, clearCharacterid } = useCharacterStore();
    const { data, isLoading } = useUserData(characterid);

    const findCompanion = data?.companions.find((item) => item.isEquipped === true);

    if (data === undefined) {
        return (
            <div className='w-full bg-light h-auto border-amber-900 border-[1px] rounded-md overflow-hidden'>
                <div className='w-full bg-dark px-4 py-2'>
                    <p className='text-sm font-semibold'>Companion</p>
                </div>
                <div className='flex items-center justify-center w-full h-full p-20'>
                    <p className='text-xs text-zinc-400'>No data available</p>
                </div>
            </div>
        );
    }

    if (data?.companions.length === 0) {
        return (
            <div className='w-full bg-light h-auto border-amber-900 border-[1px] rounded-md overflow-hidden'>
                <div className='w-full bg-dark px-4 py-2'>
                    <p className='text-sm font-semibold'>Companion</p>
                </div>
                <div className='flex items-center justify-center w-full h-full p-20'>
                    <p className='text-xs text-zinc-400'>No companion available</p>
                </div>
            </div>
        );
    }

    return (
        <div className='w-full bg-light h-auto border-amber-900 border-[1px] rounded-md overflow-hidden'>
            <div className='w-full bg-dark px-4 py-2'>
                <p className='text-sm font-semibold'>Companion {findCompanion ? `(${findCompanion?.companionname})` : ''}</p>
            </div>

            <div className='w-full h-full flex flex-wrap items-center justify-center gap-4 p-8'>
                <div className='h-full flex flex-col gap-4'>
                    <div className='flex flex-col gap-6 p-4 bg-dark max-w-[300px] w-full'>
                        <p className='text-lg font-semibold'>Passive:</p>
                        <p className='text-sm'>{findCompanion?.passivedescription || 'No passive description available.'}</p>
                    </div>

                    <div className='flex flex-col gap-6 p-4 bg-dark max-w-[300px] w-full'>
                        <p className='text-lg font-semibold'>Active:</p>
                        <p className='text-sm'>{findCompanion?.activedescription || 'No active description available.'}</p>
                    </div>
                </div>

                <div className='w-[300px] h-[320px] flex items-center justify-center'>
                    {companionImg(findCompanion?.companionname || '')}
                    
                    {/* Placeholder for companion image or other information */}
                </div>
            </div>
        </div>
    );
}
