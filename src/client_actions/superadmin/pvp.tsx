import axiosInstance from "@/lib/axiosInstance";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

type Match = {
    _id: string;
    player1: string;
    player2: string;
    status: number;
    createdAt: string;
    winner: string;
};

type ApiResponse = {
    message: string;
    data: Match[];
    totalPages: number;
};

interface LeaderboardEntry {
    rank: number;
    username: string;
    mmr: number;
    rankName: string;
    icon: string
}

interface PaginationInfo {
    currentPage: number;
    totalPages: number;
    totalPlayers: number;
}

interface SelectedSeason {
    _id: string;
    title: string;
}

interface LeaderboardResponse {
    message: string;
    data: LeaderboardEntry[];
    pagination: PaginationInfo;
    selectedSeason: SelectedSeason;
}





export const getPvpHistory = async (page: number, limit: number, seasonid: string): Promise<ApiResponse> => { 
  const response = await axiosInstance.get(
    "/pvp/getpvphistorybyseason",
    {params:{page, limit, seasonid}}
  
  );
  return response.data;
};


export const useGetPvpHistory = (page: number, limit: number, seasonid: string) => {
  return useQuery({
    queryKey: ["pvp",page, limit, seasonid ],
    queryFn: () => getPvpHistory(page, limit, seasonid ),
    staleTime: 5 * 60 * 1000,
    refetchOnMount: false, 
    refetchOnWindowFocus: false,
  });
};


export const getPvpRankings = async (page: number, limit: number, seasonid: string, username: string): Promise<LeaderboardResponse> => { 
    const response = await axiosInstance.get(
      "/ranking/getpvpleaderboards",
      {params:{page, limit, seasonid, username}}
    
    );
    return response.data;
  };
  
  
  export const useGetPvpRankings = (page: number, limit: number, seasonid: string, username: string) => {
    return useQuery({
      queryKey: ["pvp",page, limit, seasonid, username ],
      queryFn: () => getPvpRankings(page, limit, seasonid, username ),
      staleTime: 5 * 60 * 1000,
      refetchOnMount: false, 
      refetchOnWindowFocus: false,
    });
  };
  
  















