import axiosInstance from "@/lib/axiosInstance";
import { handleApiError } from "@/lib/errorHandler";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export interface Companionsponse {
  message: string;
  data: Skill[];
  totalpages: number;
}

export interface Skill {
  id: string;
  name: string;
  activedescription: string;
  passivedescription: string;
  passiveeffects: PassiveEffects;
  activeeffects: ActiveEffects;
  levelrequirement: number;
  price: number;
  currency: string;
}

export interface PassiveEffects {
  health?: number;
  energy?: number;
  poisonimmunity?: number;
  armor?: number;
  magicresist?: number;
  critchance?: number;
  critdamage?: number;
  conditionaldamage?: number;
  healththreshold?: number;
  damagereduction?: number;
  speed?: number;
  maxhealthreduction?: number;
}

export interface ActiveEffects {
  maxhealthreduce?: number;
  stun?: number;
  healpercentage?: number;
  damage?: number;
  cannotdodge?: number;
  cannotblock?: number;
  targetall?: number;
  cleanse?: number;
  energy?: number;
  immunity?: number;
  immunityturns?: number;
}



export const getCompanion = async (page: number, limit: number): Promise<Companionsponse> => { 
  const response = await axiosInstance.get(
    "/companion/companionlistsa",
    {params: {page, limit}}
  );
  return response.data;
};


export const useGetCompanion = (page: number, limit: number) => {
  return useQuery({
    queryKey: ["companion", page, limit ],
    queryFn: () => getCompanion( page, limit),
    staleTime: 5 * 60 * 1000,
    refetchOnMount: false, 
    refetchOnWindowFocus: false,
  });
};



  















