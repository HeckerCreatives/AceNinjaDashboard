import { useDebounce } from "@/hooks/debounce";
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

interface Item {
  name: string;
  quantity: number;
  price: number;
  _id: string;
}

interface Transaction {
  id: string;
  transactionId: string;
  amount: number;
  method: string;
  currency: string;
  status: string;
  items: Item[];
  date: string;
  characterid: string
  characterusername: string,
}

interface TransactionResponse {
  message: string;
  data: Transaction[];
pagination: {
        currentPage: number,
        totalPages: number,
        totalItems: number
    }
}




export const getTopuphistory = async (page: number, limit: number, currency: string): Promise<PayinHistoryResponse> => { 
  const response = await axiosInstance.get(
    "/payin/getpayinhistorysuperadmin",
    {params:{page, limit, currency}}
   
  );
  return response.data
};


export const useGetTopuphistory = (page: number, limit: number, currency: string) => {
  return useQuery({
    queryKey: ["topup",page, limit, currency],
    queryFn: () => getTopuphistory(page, limit, currency),
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


  export const getTopupHistory = async (characterid: string, page: number, limit: number): Promise<TransactionResponse> => { 
  const response = await axiosInstance.get(
    "/transaction/gettopuphistorysa",
    {params: {characterid, page, limit}}
  );
  return response.data;
};


export const useGetTopupHistory = (characterid: string, page: number, limit: number) => {
  return useQuery({
    queryKey: ["topuphistory", characterid, page, limit ],
    queryFn: () => getTopupHistory(characterid, page, limit),
    // staleTime: 5 * 60 * 1000,
    // refetchOnMount: false, 
    // refetchOnWindowFocus: false,
  });
};


  export const getAllTopupHistory = async ( page: number, limit: number, search: string): Promise<TransactionResponse> => { 
  const response = await axiosInstance.get(
    "/transaction/getcharactertopuphistorysa",
    {params: {page, limit, search}}
  );
  return response.data;
};


export const useGetAllTopupHistory = ( page: number, limit: number, search: string) => {
   const debouncedQuery = useDebounce(search, 500);
  return useQuery({
    queryKey: ["topuphistoryall", page, limit, debouncedQuery ],
    queryFn: () => getAllTopupHistory(page, limit, debouncedQuery),
    // staleTime: 5 * 60 * 1000,
    // refetchOnMount: false, 
    // refetchOnWindowFocus: false,
  });
};





















