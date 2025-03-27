import axiosInstance from "@/lib/axiosInstance";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export type UserStats = {
    totalUsers: number;
    totalActiveUsers: number;
    totalInactiveUsers: number;
  };
  
  export type UserStatsResponse = {
    message: string;
    data: UserStats;
  };

interface CharacterRankResponse {
    message: string;
    data: {
        mmr: number;
        rankTier: string;
        icon: string;
    };
}

  


export const getCounts = async (): Promise<UserStatsResponse> => { 
  const response = await axiosInstance.get(
    "/user/totalregistration",
   
  );
  return response.data
};


export const useGetCounts = () => {
  return useQuery({
    queryKey: ["usercounts"],
    queryFn: () => getCounts(),
    staleTime: 5 * 60 * 1000,
    refetchOnMount: false, 
    refetchOnWindowFocus: false,
  });
  };

export const getRank = async (characterid: string): Promise<CharacterRankResponse> => { 
    const response = await axiosInstance.get(
      "/character/getcharacterrank",
      {params:{characterid}}
     
    );
    return response.data
};
  
  
  export const useGetRank = (characterid: string) => {
    return useQuery({
      queryKey: ["rank"],
      queryFn: () => getRank(characterid),
      staleTime: 5 * 60 * 1000,
      refetchOnMount: false, 
      refetchOnWindowFocus: false,
    });
    };
    
  















