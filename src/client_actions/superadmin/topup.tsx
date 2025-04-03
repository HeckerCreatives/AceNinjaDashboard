import axiosInstance from "@/lib/axiosInstance";
import axiosInstanceFormData from "@/lib/axiosInstanceFormData";
import { handleApiError } from "@/lib/errorHandler";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface PayinHistoryItem {
    id: string;
    username: string;
    userid: string | null;
    characterUsername: string;
    characterId: string | null;
    value: number;
    status: string;
    createdAt: string; // ISO date string
    canbedeleted: boolean;
    currency: string
}

interface PayinHistoryResponse {
    success: boolean;
    message: string;
    data: {
        payinhistory: PayinHistoryItem[];
        totalPages: number
    };
}



export const getTopuphistory = async (page: number, limit: number): Promise<PayinHistoryResponse> => { 
  const response = await axiosInstance.get(
    "/payin/getpayinhistorysuperadmin",
    {params:{page, limit}}
   
  );
  return response.data
};


export const useGetTopuphistory = (page: number, limit: number) => {
  return useQuery({
    queryKey: ["topup",page, limit],
    queryFn: () => getTopuphistory(page, limit),
    staleTime: 5 * 60 * 1000,
    refetchOnMount: false, 
    refetchOnWindowFocus: false,
  });
};

export const sendAmount = async (playerusername: string, type: string , amount: number) => { 
     const response = await axiosInstance.post("/payin/sendtopupplayer", { playerusername, type, amount});
     return response.data;
};
  
export const useSendAmount = () => {
     const queryClient = useQueryClient();
     return useMutation({
       mutationFn: ({ playerusername, type, amount }: { playerusername: string, type: string , amount: number}) =>
        sendAmount( playerusername, type, amount),
         onError: (error) => {
             handleApiError(error);
         },
         onSuccess: () => {
             queryClient.invalidateQueries({ queryKey: ["topup"] });
         }
     });
};


















