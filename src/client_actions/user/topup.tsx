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


  
export const completeOrder = async (orderdata: any, characterid: string, itemid: string) => { 
    const response = await axiosInstance.post("/transaction/completeorder", { orderdata, characterid, itemid });
    return response.data;
  };
  
  export const useCompleteOrder = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({ orderdata, characterid, itemid }: {orderdata: any, characterid: string, itemid: string }) =>
        completeOrder(orderdata, characterid, itemid),
        onError: (error) => {
            handleApiError(error);
        },
           onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["userdata"] });
        }
      
       
    });
  };

















