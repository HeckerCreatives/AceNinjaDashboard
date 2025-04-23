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
    rankname: string;
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
    "/pvp/getpvphistoryplayer",
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
      "/pvp/getcharacterpvpstatsplayer",
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
    




// export const getPvpHistory = async (page: number, limit: number, seasonid: string): Promise<ApiResponse> => { 
//   const response = await axiosInstance.get(
//     "/pvp/getpvphistorybyseason",
//     {params:{page, limit, seasonid}}
  
//   );
//   return response.data;
// };


// export const useGetPvpHistory = (page: number, limit: number, seasonid: string) => {
//   return useQuery({
//     queryKey: ["pvp",page, limit, seasonid ],
//     queryFn: () => getPvpHistory(page, limit, seasonid ),
//     staleTime: 5 * 60 * 1000,
//     refetchOnMount: false, 
//     refetchOnWindowFocus: false,
//   });
// };


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
  
  















