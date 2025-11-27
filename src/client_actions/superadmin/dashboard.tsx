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

interface Character {
  id: string;
  username: string;
}

interface GetCharactersResponse {
  message: string;
  data: Character[];
}

interface SalesData {
  websales: number;
  payinsales: number;
  totalsales: number;
}

interface SalesApiResponse {
  success: boolean;
  data: SalesData;
}


const getCharacters = async (id: string): Promise<Character[]> => {
  const response = await axiosInstance.get<GetCharactersResponse>("/character/getplayercharactersadmin",
    {params: {id}}
  );
  return response.data.data; 
};

export const useGetCharacters = (id: string) => {
  return useQuery<Character[], Error>({
    queryKey: ["characters"],
    queryFn: () => getCharacters(id),
    staleTime: 60000, 
  });
};


  


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
   
    initialData:{
        "message": "success",
        "data": {
            "totalUsers": 0,
            "totalActiveUsers": 0,
            "totalInactiveUsers": 0
        }
    },
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
      // staleTime: 5 * 60 * 1000,
      // refetchOnMount: false, 
      // refetchOnWindowFocus: false,
    });
    };

export const getGraph = async (charttype: string) => { 
      const response = await axiosInstance.get(
        "/user/getregistrationgraph",
       {params: {charttype}}
      );
      return response.data
  };
    
    
    export const useGetGraph = (charttype: string) => {
      return useQuery({
        queryKey: ["graph",charttype],
        queryFn: () => getGraph(charttype),
        staleTime: 5 * 60 * 1000,
        refetchOnMount: false, 
        refetchOnWindowFocus: false,
      });
  };


  export const getSales = async (): Promise<SalesApiResponse> => { 
      const response = await axiosInstance.get(
        "/dashboard/gettotalsales",
      );
      return response.data
  };
    
    
    export const useGetSales = () => {
      return useQuery({
        queryKey: ["sales"],
        queryFn: () => getSales(),
        staleTime: 5 * 60 * 1000,
        refetchOnMount: false, 
        refetchOnWindowFocus: false,
      });
  };
    
  















