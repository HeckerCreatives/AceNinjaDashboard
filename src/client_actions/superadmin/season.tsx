import axiosInstance from "@/lib/axiosInstance";
import { handleApiError } from "@/lib/errorHandler";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export type Season = {
    _id: string;
    title: string;
    duration: number;
    isActive: string
    createdAt: string;  
    updatedAt: string; 

    __v: number;
};

export type ApiResponse = {
    message: string;
    data: Season[];
    totalPages: number
};

export type CurrentSeasonResponse = {
    message: string;
    data: {
        title: string;
        timeleft: number
        id: string
    };
};

type SeasonResponse = {
  message: "success";
  data: [{
      title: string;
      id: string;
  }]
};


  


export const getSeasons = async ( page: number, limit: number, filter: string): Promise<ApiResponse> => { 
  const response = await axiosInstance.get(
    "/seasons/getseasons",
    {params:{page, limit, filter}}
  );
  return response.data
};


export const useGetSeasons = (page: number, limit: number, filter: string) => {
  return useQuery({
    queryKey: ["season", page, limit, filter],
    queryFn: () => getSeasons(page, limit, filter),
    staleTime: 5 * 60 * 1000,
    refetchOnMount: false, 
    refetchOnWindowFocus: false,
  });
};

export const createSeason= async (title: string, duration: number) => { 
    const response = await axiosInstance.post("/seasons/createseasons", { title, duration });
    return response.data;
};
  
export const useCreateSeason = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({ title, duration }: { title: string, duration: number}) =>
        createSeason(title, duration),
        onError: (error) => {
            handleApiError(error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["season"] });
        }
    });
};


export const deleteSeasons = async (id: string) => { 
    const response = await axiosInstance.post("/seasons/deleteseasons", { id });
    return response.data;
};
  
export const useDeleteSeasons = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({ id }: { id: string }) =>
        deleteSeasons(id),
        onError: (error) => {
            handleApiError(error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["season"] });
          }
        
      
       
    });
};


export const updateSeason= async (id: string,title: string, duration: number, isActive: string) => { 
    const response = await axiosInstance.post("/seasons/updateseasons", { id,title, duration, isActive});
    return response.data;
};
  
export const useUpdateSeason = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({ id,title, duration, isActive }: { id: string, title: string, duration: number,isActive: string}) =>
        updateSeason(id,title, duration, isActive),
        onError: (error) => {
            handleApiError(error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["season"] });
        }
    });
};

export const getCurrentSeason = async (): Promise<CurrentSeasonResponse> => { 
    const response = await axiosInstance.get(
      "/seasons/getcurrentseason",
   
    );
    return response.data
  };
  
  
export const useGetCurrentSeason = () => {
    return useQuery({
      queryKey: ["season"],
      queryFn: () => getCurrentSeason(),
      initialData:{
        "message": "success",
        "data": {
            "title": "Season 1",
            "timeleft": 3041912011,
            "id": "68df7c8dbb75514a1986d24c"
        }
    }
    });
};


export const getSeasonLeaderboard = async (): Promise<SeasonResponse> => { 
  const response = await axiosInstance.get(
    "/seasons/getseasonforleaderboards",
 
  );
  return response.data
};


export const useGetSeasonLeaderboard = () => {
  return useQuery({
    queryKey: ["season"],
    queryFn: () => getSeasonLeaderboard(),
    refetchOnWindowFocus: false,
  });
};


  















