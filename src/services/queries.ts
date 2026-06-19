import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import type { User, UseUsersParams } from "../types/user";
import type { foodItem } from "../types/food";

const BASE_URL = import.meta.env.VITE_API_URL;

export const useUsers = (params?: UseUsersParams) => {
  return useQuery({
    queryKey: ["users", params],
    queryFn: async (): Promise<User[]> => {
      const { data } = await axios.get<User[]>(`${BASE_URL}/v1/user/index`, {
        params: {
          sort: params?.sort,
          "UserSearch[id]": params?.searchId,
          "UserSearch[username]": params?.searchUsername,
          "UserSearch[email]": params?.searchEmail,
          "UserSearch[birthdateStart]": params?.searchBirthdateStart,
          "UserSearch[birthdateEnd]": params?.searchBirthdateEnd,
        },
      });
      return data;
    },
  });
};

export const useFoodList = () => {
  return useQuery({
    queryKey: ["foodlist"],
    queryFn: () =>
      axios
        .get<foodItem>("http://tasks.tizh.ru/v1/user/get-food-list")
        .then((res) => res.data),
    select: (data) => {
      return Object.entries(data).map(([id, name]) => ({
        id,
        name,
      }));
    },
  });
};

export const useUser = (id: number) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      const { data } = await axios.get<User>(
        `${BASE_URL}/v1/user/view?id=${id}`,
      );
      return data;
    },
    enabled: !!id,
  });
};
