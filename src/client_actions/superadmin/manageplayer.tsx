import { useDebounce } from "@/hooks/debounce";
import axiosInstance from "@/lib/axiosInstance";
import { handleApiError } from "@/lib/errorHandler";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export type WalletItem = {
    type: string
    ammount: number;
  };
  
  export type Character = {
    id: string;
    username: string;
    gender: number | "male" | "female";
    outfit: number | string;
    hair: string;
    eyes: number | string;
    facedetails: number | string;
    color: number | string;
    title: number | string;
    level: number;
    badge: string;
    wallet: WalletItem[];
  };
  
  export type Player = {
    id: string;
    username: string;
    email: string;
    status: "active" | "inactive";
    auth: "player";
    character: Character[];
  };
  
  export type PlayerListData = {
    playerListData: Player[];
    totalPages: number;
  };
  
  export type PlayerListResponse = {
    message: string;
    data: PlayerListData;
  };
  
  


export const getUserList = async (page: number, limit: number, filter: string, search: string): Promise<PlayerListResponse> => { 
  const response = await axiosInstance.get(
    "/user/userlist",
   {params: {page, limit, filter, search}}
  );
  return response.data
};


export const useGetUserList = (page: number, limit: number, filter: string, search: string) => {
    const debouncedQuery = useDebounce(search, 500);

  return useQuery({
    queryKey: ["userlist", page, limit, filter, debouncedQuery],
    queryFn: () => getUserList(page, limit, filter, debouncedQuery),
    enabled: debouncedQuery !== undefined,
    staleTime: 5 * 60 * 1000,
    refetchOnMount: false, 
    refetchOnWindowFocus: false,
  });
};


export const banunbanPlayer = async (userid: string, status: string) => { 
    const response = await axiosInstance.post("/user/banunbanuser", { userid, status });
    return response.data;
  };
  
  export const useBanUnbanPlayer = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({ userid, status }: { userid: string, status: string }) =>
        banunbanPlayer(userid,status),
        onError: (error) => {
            handleApiError(error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["userlist"] });
          }
        
      
       
    });
  };

  















