import axiosInstance from "@/lib/axiosInstance";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface Skill {
    _id: string;
    name: string;
    category: string;
    path: string;
    type: string;
    levelRequirement: number;
    currency: string;
    spCost: number;
    maxLevel: number;
    effects: Record<string, any>; 
    prerequisites: string[];
    __v: number;
    acquired: boolean;
    currentLevel: number;
    description?: string; 
  }
  
  interface SkillData {
    [key: string]: Skill;
  }
  
  interface Pagination {
    total: number;
    page: number;
    limit: number;
    pages: number;
  }
  
  interface SkillResponse {
    message: string;
    data: SkillData;
    pagination: Pagination;
  }


export const getBattlePass = async (characterid: string): Promise<SkillResponse> => { 
  const response = await axiosInstance.get(
    "/battlepass/getbattlepass",
    {params: {characterid}}
  );
  return response.data;
};


export const useGetBattlepass = (characterid: string) => {
  return useQuery({
    queryKey: ["userdata", characterid ],
    queryFn: () => getBattlePass(characterid),
    staleTime: 5 * 60 * 1000,
    refetchOnMount: false, 
    refetchOnWindowFocus: false,
  });
};
  















