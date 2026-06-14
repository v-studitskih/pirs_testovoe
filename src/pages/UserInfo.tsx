import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Button from "../components/Button";
import { deleteMockUser, getMockUsers, getPhotoUrl } from "../mock/users";
import type { User } from "../api";
import { food } from "../constants/food";
// import { api } from "../api/wrapper";

const UserInfo = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>();

  const [searchParams] = useSearchParams();
  const userId = searchParams.get("id");

  // const getUser =async (id: number) => {
  //   try {
  //     const res = await api.getUserById(id)
  //     setUser(res[0])
  //   } catch (error) {
  //     console.error("Ошибка при получении  пользователя", error);
  //   }
  // }

  // получение юзера
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

  // const handleDelete = async () => {
  //   await deleteUser(Number(userId));
  //   navigate("/users");
  // };

  // удаление
  const handleDelete = () => {
    deleteMockUser(Number(userId));
    navigate("/users");
  };
  return (
    <div className="pt-17.5 w-full px-4 mx-auto max-w-135 md:max-w-180 lg:max-w-240 xl:max-w-285 2xl:max-w-330">

      {/* Хлебные крошки */}
      <nav className="mb-4 flex">
        <Link to="/" className="text-[#0d6efd] underline text-base">
          Главная
        </Link>
        <Link
          to="/users"
          className='text-[#0d6efd] before:cursor-default text-base before:content-["/"] before:px-2 before:text-[rgba(33,37,41,0.75)]'
        >
          <span className="underline">Пользователи</span>
        </Link>
        <span className='before:content-["/"] before:px-2 before:cursor-default text-[rgba(33,37,41,0.75)]'>
          {userId}
        </span>
      </nav>

      {/* кнопочки */}
      <div className="mb-4 flex gap-1">
        <Button
          text="Изменить"
          to={`/user/update?id=${userId}`}
          styles="bg-[#0d6efd]"
        />
        <Button text="Удалить" onClick={handleDelete} styles="bg-[#dc3545]" />
      </div>

      {/* Таблица с информацией о юзере */}
      <table className="w-full text-sm text-left text-gray-700">
        <tbody>
          <tr className="even:bg-white odd:bg-gray-100 border border-gray-200">
            <th className="th-primary w-32">ID</th>
            <td className="td-primary">{userId}</td>
          </tr>
          <tr className="even:bg-white odd:bg-gray-100 border border-gray-200">
            <th className="th-primary">Имя</th>
            <td className="td-primary">{user?.username}</td>
          </tr>
          <tr className="even:bg-white odd:bg-gray-100 border border-gray-200">
            <th className="th-primary">Email</th>
            <td className="td-primary">{user?.email}</td>
          </tr>
          <tr className="even:bg-white odd:bg-gray-100 border border-gray-200">
            <th className="th-primary">Дата рождения</th>
            <td className="td-primary">{user?.birthdate}</td>
          </tr>
          <tr className="even:bg-white odd:bg-gray-100 border border-gray-200">
            <th className="th-primary">Любимая еда</th>
            <td className="td-primary w-[60%]">
              {user?.favorite_food_ids && user.favorite_food_ids.length > 0 ? (
                user.favorite_food_ids
                  .map((id) => food[Number(id) - 1]?.name)
                  .join(", ")
              ) : (
                <span>Всеядный</span>  
              )}
            </td>
          </tr>
          <tr className="even:bg-white odd:bg-gray-100 border border-gray-200">
            <th className="th-primary">Фото</th>
            <td className="td-primary flex items-center justify-center">
              {user?.photo_id ? (
                <img
                  // src={`/file/get?id=${user.photo_id}`}
                  src={`${getPhotoUrl(user.photo_id)}`}
                  className="w-[150px] h-[150px] rounded-full object-cover"
                  alt="аватарка"
                />
              ) : (
                <img
                  className="w-[150px] h-[150px] rounded-full object-cover"
                  src="http://tasks.tizh.ru/images/user-placeholder.png"
                  alt="аватарка"
                />
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserInfo;
