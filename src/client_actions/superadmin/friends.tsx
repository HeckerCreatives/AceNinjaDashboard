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
  

export const getFriends = async (characterId: string, userid: string): Promise<FriendsResponse> => { 
  const response = await axiosInstance.get(
    "/friends/getfriendssa",
    {params: {characterId, userid}}
  );
  return response.data;
};


export const useGetFriends = (characterId: string, userid: string) => {
  return useQuery({
    queryKey: ["friendlist", characterId, userid ],
    queryFn: () => getFriends(characterId, userid),
    staleTime: 5 * 60 * 1000,
    refetchOnMount: false, 
    refetchOnWindowFocus: false,
  });
};

export const getFriendsRequests = async (characterId: string, userid: string): Promise<FriendRequestsResponse> => { 
  const response = await axiosInstance.get(
    "/friends/getfriendrequestssa",
    {params: {characterId, userid}}
  );
  return response.data;
};


export const useGetFriendRequests = (characterId: string, userid: string) => {
  return useQuery({
    queryKey: ["friendrequestlist", characterId,userid ],
    queryFn: () => getFriendsRequests(characterId, userid),
    staleTime: 5 * 60 * 1000,
    refetchOnMount: false, 
    refetchOnWindowFocus: false,
  });
};
  















