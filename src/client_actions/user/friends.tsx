import axiosInstance from "@/lib/axiosInstance";
import { handleApiError } from "@/lib/errorHandler";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";


  interface User {
    id: string;
    username: string;
    level: number;
    badge: string;
  }
  
  interface UserListResponse {
    message: string;
    data: User[];
    page: number;
    totalPages: number;
  }


  interface Friend {
    friendId: string;
    username: string;
    level: number;
    badge: string;
    status: "accepted" | "pending" | "rejected"; // Add other possible statuses if needed
    friendSince: string; // ISO date string
  }
  
  interface FriendsResponse {
    message: string;
    count: number;
    friends: Friend[];
  }

  export type FriendRequest = {
    characterId: string;
    username: string;
    level: number;
    badge: string;
};

// Define a type for the API response
export type FriendRequestsResponse = {
    message: string;
    count: number;
    friendRequests: FriendRequest[];
};
  

export const getFriends = async (characterId: string): Promise<FriendsResponse> => { 
  const response = await axiosInstance.get(
    "/friends/getfriends",
    {params: {characterId}}
  );
  return response.data;
};


export const useGetFriends = (characterId: string) => {
  return useQuery({
    queryKey: ["friendlist", characterId ],
    queryFn: () => getFriends(characterId),
    staleTime: 5 * 60 * 1000,
    refetchOnMount: false, 
    refetchOnWindowFocus: false,
  });
};

export const getFriendsRequests = async (characterId: string): Promise<FriendRequestsResponse> => { 
  const response = await axiosInstance.get(
    "/friends/getfriendrequests",
    {params: {characterId}}
  );
  return response.data;
};


export const useGetFriendRequests = (characterId: string) => {
  return useQuery({
    queryKey: ["friendrequestlist", characterId ],
    queryFn: () => getFriendsRequests(characterId),
    staleTime: 5 * 60 * 1000,
    refetchOnMount: false, 
    refetchOnWindowFocus: false,
  });
};

export const getUser = async (characterId: string, search: string, limit: number): Promise<UserListResponse> => { 
    const response = await axiosInstance.get(
      "/friends/playerlist",
      {params: {characterId, search, limit}}
    );
    return response.data;
  };
  
  
export const useGetUser = (characterId: string, search: string, limit: number) => {
    return useQuery({
      queryKey: ["userlist", characterId , search, limit ],
      queryFn: () => getUser(characterId , search, limit),
      staleTime: 5 * 60 * 1000,
      refetchOnMount: false, 
      refetchOnWindowFocus: false,
    });
};


export const addFriend = async (characterId: string, friendId: string) => { 
    const response = await axiosInstance.post("/friends/addfriend", { characterId, friendId });
    return response.data;
  };
  
  export const useAddFriend = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({ characterId, friendId }: { characterId: string; friendId: string }) =>
        addFriend(characterId, friendId),
        onError: (error) => {
            handleApiError(error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["userlist"] });
          }
        
      
       
    });
  };


  export const acceptrejectFriend = async (characterId: string, friendId: string, status: string) => { 
    const response = await axiosInstance.post("/friends/acceptrejectfriendrequest", { characterId, friendId, status });
    return response.data;
  };
  
  export const useAcceptRejectFriend = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({ characterId, friendId, status }: { characterId: string; friendId: string, status: string }) =>
        acceptrejectFriend(characterId, friendId, status),
        onError: (error) => {
            handleApiError(error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["friendrequestlist"] });
            queryClient.invalidateQueries({ queryKey: ["friendlist"] });
          }
        
      
       
    });
  };


  















