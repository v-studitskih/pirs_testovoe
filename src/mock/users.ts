export interface MockUser {
  id: number;
  username: string;
  email: string;
  birthdate: string;
  favorite_food_ids: number[];
  photo_id: number ;
  photo_url?: string;
}

const mockUsers: MockUser[] = [
  {
    id: 1,
    username: "кирилл",
    email: "kirill@example.com",
    birthdate: "25.08.2001",
    favorite_food_ids: [4, 5, 6],
    photo_id: 1,
    photo_url: "https://randomuser.me/api/portraits/men/1.jpg"
  },
  {
    id: 2,
    username: "иван",
    email: "ivan@example.com",
    birthdate: "12.06.2026",
    favorite_food_ids: [2, 6],
    photo_id: 2,
    photo_url: "https://randomuser.me/api/portraits/men/2.jpg"
  }
];
const photos = [
  "https://img.freepik.com/premium-psd/cartoon-character-with-tattoo-his-face-sunglasses_975163-723.jpg?semt=ais_hybrid&w=740&q=80",
  "https://img.freepik.com/premium-psd/3d-render-avatar-character_23-2150611743.jpg?semt=ais_hybrid&w=740&q=80",
  "https://i.pinimg.com/736x/82/3c/2f/823c2fba22ce3b6a0263058eee1b9b60.jpg",
  "https://i.pinimg.com/736x/e0/0e/c7/e00ec7ef1122fd54444cf2dfe35e9910.jpg",
  "https://i.pinimg.com/originals/52/b9/2d/52b92decbb66425bd2abf0d0e6a46994.png",
  "https://i.pinimg.com/736x/88/d7/51/88d751d7378b539b836aade97c1b559f.jpg",
];

export const getPhotoUrl = (photoId: number | null | undefined): string => {
  if (!photoId) return "http://tasks.tizh.ru/images/user-placeholder.png";
  return photos[photoId - 1] || photos[0];
};


// загрузка из localStorage 
export const getMockUsers = (): MockUser[] => {
  const saved = localStorage.getItem("mockUsers");
  if (saved) {
    return JSON.parse(saved);
  }
  return mockUsers;
};

// сохрагение в localStorage
export const saveMockUsers = (users: MockUser[]) => {
  localStorage.setItem("mockUsers", JSON.stringify(users));
};

// добавление пользователя
export const addMockUser = (user: MockUser) => {
  const users = getMockUsers();
  users.push(user);
  saveMockUsers(users);
};

// обновление пользователя
export const updateMockUser = (id: number, data: Partial<MockUser>) => {
  const users = getMockUsers();
  const index = users.findIndex(u => u.id === id);
  if (index !== -1) {
    users[index] = { ...users[index], ...data };
    saveMockUsers(users);
  }
};

// удаление пользователя
export const deleteMockUser = (id: number) => {
  const users = getMockUsers();
  const filtered = users.filter(u => u.id !== id);
  saveMockUsers(filtered);
};