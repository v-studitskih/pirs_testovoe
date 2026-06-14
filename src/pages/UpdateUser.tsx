import React, { useContext, useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import UserForm from "../components/UserForm";
import { getMockUsers, updateMockUser } from "../mock/users";
import type { User } from "../api";
// import { api } from "../api/wrapper";

const UpdateUser = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const userId = searchParams.get("id");
  const [user, setUser] = useState<User>();


  // const editUser = async (id: number, formData: FormData) => {
  //   try {
  //     const res = await api.updateUser(id, formData)
  //   } catch (error) {
  //     console.error("Ошибка при обновлении польщователей", error);
  //   }
  // }

  // получение юзерва
  useEffect(() => {
    if (userId) {
      const users = getMockUsers();
      const user = users.find((u) => u.id === Number(userId));
      if (user) {
        setUser({
          username: user.username,
          email: user.email,
          birthdate: user.birthdate,
          favorite_food_ids: user.favorite_food_ids,
          photo_id: user.photo_id,
        });
      }
    }
  }, [userId]);

  // отправка формы
  const handleSubmit = (formData: FormData) => {

    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const birthdate = formData.get("birthdate") as string;
    const favoriteFoodIds =
      (formData.get("favorite_food_ids[]") as string)?.split(",").map(Number) ||
      [];

    updateMockUser(Number(userId), {
      username,
      email,
      birthdate,
      favorite_food_ids: favoriteFoodIds,
    });

    navigate(`/user/view?id=${userId}`);
  };

  return (
    <div className="pt-17.5 py-4 w-full px-4 mx-auto max-w-135 md:max-w-180 lg:max-w-240 xl:max-w-285 2xl:max-w-330">
      <UserForm
        initialUsername={user?.username}
        initialEmail={user?.email}
        initialBirthdate={user?.birthdate}
        initialFavoriteFoodIds={user?.favorite_food_ids}
        initialPhotoId={user?.photo_id}
        onSubmit={handleSubmit}
        submitButtonText="Сохранить"
      />
    </div>
  );
};

export default UpdateUser;
