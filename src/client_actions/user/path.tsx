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


export const getPath = async (characterid: string, path: string, page: number, limit: number): Promise<SkillResponse> => { 
  const response = await axiosInstance.get(
    "/skills/getskillswithcharacter",
    {params: {characterid, path, page, limit}}
  );
  return response.data;
};


export const useGetPath = (characterid: string, path: string, page: number, limit: number) => {
  return useQuery({
    queryKey: ["userdata", characterid, path, page, limit],
    queryFn: () => getPath(characterid, path, page, limit),
    staleTime: 5 * 60 * 1000,
    refetchOnMount: false, 
    refetchOnWindowFocus: false,
  });
};
  















