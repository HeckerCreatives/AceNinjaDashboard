import axiosInstance from "@/lib/axiosInstance";
import { handleApiError } from "@/lib/errorHandler";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export interface LeaderboardResponse {
  message: string;
  data: LeaderboardEntry[];
  pagination: {
        currentPage: number,
        totalPages: number,
       
    }
}

export interface LeaderboardEntry {
  rank: number;
  characterId: string;
  username: string;
  level: number;
  mmr: number;
  rankName: string;
  lastActive: string; 
}

interface ResetData {
  message: string;
  data: {
    name: string;
    index: number;
  }[];
}



  


export const getSeasonsLeaderboard = async ( page: number, limit: number): Promise<LeaderboardResponse> => { 
  const response = await axiosInstance.get(
    "/ranking/getleaderboardssuperadmin",
    {params:{page, limit}}
  );
  return response.data
};


export const useGetSeasonsLeaderboard = (page: number, limit: number) => {
  return useQuery({
    queryKey: ["seasonleaderboard", page, limit],
    queryFn: () => getSeasonsLeaderboard(page, limit),
    staleTime: 5 * 60 * 1000,
    refetchOnMount: false, 
    refetchOnWindowFocus: false,
  });
};



export const resetRankings= async (resettype: string,seasonid: string) => { 
    const response = await axiosInstance.post("/reset/resetpvpranking", { resettype, seasonid});
    return response.data;
};
  
export const useResetRankings = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({resettype, seasonid }: { resettype: string,seasonid: string}) =>
        resetRankings(resettype, seasonid),
        onError: (error) => {
            handleApiError(error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["seasonleaderboard"] });
            queryClient.invalidateQueries({ queryKey: ["resetlist"] });
        }
    });
};



export const getLeaderboardHsitory = async ( page: number, limit: number, index: number): Promise<LeaderboardResponse> => { 
  const response = await axiosInstance.get(
    "/ranking/getrankinghistory",
    {params:{page, limit, index}}
  );
  return response.data
};


export const useGetLeaderboardHsitory = (page: number, limit: number, index: number) => {
  return useQuery({
    queryKey: ["seasonleaderboard", page, limit, index],
    queryFn: () => getLeaderboardHsitory(page, limit, index),
    staleTime: 5 * 60 * 1000,
    refetchOnMount: false, 
    refetchOnWindowFocus: false,
  });
};

export const getResetList = async (): Promise<ResetData> => { 
  const response = await axiosInstance.get(
    "/ranking/selectrankinghistory",
  );
  return response.data
};


export const useGetResetList = () => {
  return useQuery({
    queryKey: ["resetlist",],
    queryFn: () => getResetList(),
    staleTime: 5 * 60 * 1000,
    refetchOnMount: false, 
    refetchOnWindowFocus: false,
  });
};




















