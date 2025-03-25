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


export const getSkills = async (characterid: string, category: string, page: number, limit: number): Promise<SkillResponse> => { 
  const response = await axiosInstance.get(
    "/skills/getskillswithcharactersa",
    {params: {characterid, category, page, limit}}
  );
  return response.data;
};


export const useGetSkills = (characterid: string, category: string, page: number, limit: number) => {
  return useQuery({
    queryKey: ["userdata", characterid, category, page, limit],
    queryFn: () => getSkills(characterid, category, page, limit),
    staleTime: 5 * 60 * 1000,
    refetchOnMount: false, 
    refetchOnWindowFocus: false,
  });
};
  















