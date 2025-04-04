import axiosInstance from "@/lib/axiosInstance";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

type PvPMatch = {
    _id: string;
    opponent: string;  
    status: 0 | 1;     
    owner: string;    
    createdAt: string;
};

type PvPResponse = {
    message: "success" | "failed";
    data: PvPMatch[]; 
    totalPages: number;
};

type RankingResponse = {
    message: "success";
    data: RankingData;
};

type RankingData = {
    _id: string;
    owner: {
        _id: string;
    };
    mmr: number;
    createdAt: string; 
    updatedAt: string;
    __v: number;
    lost: number;
    totalMatches: number;
    win: number;
    winRate: number;
    rank: number
};




export const getPvpHistory = async (page: number, limit: number, characterid: string, datefilter: string): Promise<PvPResponse> => { 
  const response = await axiosInstance.get(
    "/pvp/getpvphistory",
    {params:{page, limit,characterid, datefilter}}
  
  );
  return response.data;
};


export const useGetPvpHistory = (page: number, limit: number, characterid: string, datefilter: string) => {
  return useQuery({
    queryKey: ["pvp",page, limit, characterid, datefilter ],
    queryFn: () => getPvpHistory(page, limit, characterid, datefilter),
    staleTime: 5 * 60 * 1000,
    refetchOnMount: false, 
    refetchOnWindowFocus: false,
  });
};

export const getRankingStats = async (characterid: string): Promise<RankingResponse> => { 
    const response = await axiosInstance.get(
      "/pvp/getcharacterpvpstats",
      {params:{characterid}}
    
    );
    return response.data;
  };
  
  
  export const useGetRankStats = (characterid: string) => {
    return useQuery({
      queryKey: ["pvp", characterid],
      queryFn: () => getRankingStats(characterid),
      staleTime: 5 * 60 * 1000,
      refetchOnMount: false, 
      refetchOnWindowFocus: false,
    });
  };
    
  















