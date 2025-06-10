import axiosInstance from "@/lib/axiosInstance";
import { handleApiError } from "@/lib/errorHandler";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface TopUpItem {
  id: string;
  name: string;
  description: string;
  price: number;
  topupcredit: number;
  bonusEligible: boolean;
}

interface TopUpItemsResponse {
  message: string;
  data: {
    topupitems: TopUpItem[];
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




export const getTopupItems = async (characterid: string): Promise<TopUpItemsResponse> => { 
  const response = await axiosInstance.get(
    "/transaction/gettopupmarketcredits",
    {params: {characterid}}
  );
  return response.data;
};


export const useGetTopupItems = (characterid: string) => {
  return useQuery({
    queryKey: ["battlepass", characterid ],
    queryFn: () => getTopupItems(characterid),
    // staleTime: 5 * 60 * 1000,
    // refetchOnMount: false, 
    // refetchOnWindowFocus: false,
  });
};


  
export const completeOrder = async (orderdata: any, characterid: string, itemid: string, bonusEligible: boolean) => { 
    const response = await axiosInstance.post("/transaction/completeorder", { orderdata, characterid, itemid , bonusEligible});
    return response.data;
  };
  
  export const useCompleteOrder = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({ orderdata, characterid, itemid, bonusEligible }: {orderdata: any, characterid: string, itemid: string, bonusEligible: boolean }) =>
        completeOrder(orderdata, characterid, itemid, bonusEligible),
        onError: (error) => {
            handleApiError(error);
        },
           onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["userdata"] });
          queryClient.invalidateQueries({ queryKey: ["topuphistory"] });
        }
      
       
    });
  };


  export const getTopupHistory = async (characterid: string, page: number, limit: number): Promise<TransactionResponse> => { 
  const response = await axiosInstance.get(
    "/transaction/gettopuphistory",
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

















