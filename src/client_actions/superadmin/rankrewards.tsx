import axiosInstance from "@/lib/axiosInstance";
import { handleApiError } from "@/lib/errorHandler";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface RankRewardResponse {
  message: string;
  data: RankReward[];
}

export interface RankReward {
  id: string;
  rankid: string;
  rank: string;
  rewards: Reward[];
  createdAt: string; // ISO date
}

type Reward =
  | {
      rewardType: "coins" | "exp" | "crystal";
      amount: number;
    }
  | {
      rewardType: "title" | "badge" | "weapon" | "skill"
      reward: {
        id: number | string;
        name: string;
      };
    }
  | {
      rewardType: "outfit";
      reward: {
        id: string;
        name?: string;
        fid: string;
        fname?: string;
      };
    };


type RewardEdit =
  | {
      rewardtype: "coins" | "exp" | "crystal";
      amount: number;
    }
  | {
      rewardtype: "title" | "badge" | "weapon" | "skill"
      reward: {
        id: number | string;
        name: string;
      };
    }
  | {
      rewardtype: "outfit";
      reward: {
        id: string;
        name?: string;
        fid: string;
        fname?: string;
      };
    };



  


export const getRankingRewards = async (): Promise<RankRewardResponse> => { 
  const response = await axiosInstance.get(
    "/rankreward/getrankrewards",
  );
  return response.data
};


export const useGetRankingRewards = () => {
  return useQuery({
    queryKey: ["rankrewards"],
    queryFn: () => getRankingRewards(),
    staleTime: 5 * 60 * 1000,
    refetchOnMount: false, 
    refetchOnWindowFocus: false,
  });
};



export const editRankRewards= async (rankid: string,rewards: RewardEdit[]) => { 
    const response = await axiosInstance.post("/rankreward/editrankreward", { rankid, rewards});
    return response.data;
};
  
export const useEditRankRewards = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({rankid, rewards  }: { rankid: string,rewards: RewardEdit[]}) =>
        editRankRewards(rankid, rewards),
        onError: (error) => {
            handleApiError(error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["rankrewards"] });
        }
    });
};






















