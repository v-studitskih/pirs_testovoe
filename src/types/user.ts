export type User = {
  id: number;
  username: string;
  email: string;
  birthdate: string;
  favorite_food_ids?: number[];
  photo_id?: number;
}

export type UseUsersParams = {
  sort?: string;
  searchId?: string;
  searchUsername?: string;
  searchEmail?: string;
  searchBirthdateStart?: string;
  searchBirthdateEnd?: string;
};