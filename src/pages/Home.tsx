import { useEffect, useState } from "react";
import { deleteMockUser, getMockUsers, getPhotoUrl } from "../mock/users";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import type { User } from "../api";
import Select from "../components/Select";
import { DateInput } from "@mantine/dates";
import { food } from "../constants/food";
// import { api } from "../api/wrapper";

const Home = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedFood, setSelectedFood] = useState<number[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [value, setValue] = useState<string>();
  const [searchField, setSearchField] = useState<keyof User>();
  const [birthdateStart, setBirthdateStart] = useState<string>("");
  const [birthdateEnd, setBirthdateEnd] = useState<string>("");
  const [sortField, setSortField] = useState<keyof User>("id");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // const getUsers = async () => {
  //   try {
  //     const res = await api.getUsers()
  //     setUsers(res)
  //   } catch (error) {
  //     console.error("Ошибка при получении польщователей", error);
  //   }
  // }

  // удаление пользователя
  const handleDeleteUser = (id: number) => {
    deleteMockUser(id);
    const data = getMockUsers();
    setUsers(data);
  };

  // обработчик сортировки
  const handleSort = (field: keyof User) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  useEffect(() => {
    const data = getMockUsers();
    setUsers(data);
  }, []);

  // поиск и сортировка
  useEffect(() => {
    let filtered = [...users];

    // поиск по имени, почте, id
    if (value && value !== "") {
      filtered = filtered.filter((user) => {
        if (searchField) {
          return String(user[searchField])
            .toLowerCase()
            .includes(value.toLowerCase());
        }
      });
    }

    // поиск по дате
    if (birthdateStart && birthdateEnd) {
      filtered = filtered.filter((user) => {
        const userBirthDate = new Date(user.birthdate);
        const startDate = new Date(birthdateStart);
        const endDate = new Date(birthdateEnd);

        return userBirthDate >= startDate && userBirthDate <= endDate;
      });
    }

    // поиск по еде
    if (selectedFood.length > 0) {
      console.log(selectedFood);

      filtered = filtered.filter((user) =>
        user.favorite_food_ids?.some((id) => selectedFood.includes(id)),
      );
    }

    // сортировка
    filtered.sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];

      if (sortField === "birthdate") {
        aVal = new Date(aVal as string).getTime();
        bVal = new Date(bVal as string).getTime();
      }

      if (sortField === "favorite_food_ids") {
        const aLen = Array.isArray(aVal) ? aVal.length : 0;
        const bLen = Array.isArray(bVal) ? bVal.length : 0;
        if (aLen === 0) return 1;
        if (bLen === 0) return -1;
        aVal = aLen;
        bVal = bLen;
      }

      if (aVal === undefined || aVal === null) return 1;
      if (bVal === undefined || bVal === null) return -1;

      if (typeof aVal === "string" && typeof bVal === "string") {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }

      if (sortOrder === "asc") {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    setFilteredUsers(filtered);
  }, [
    users,
    value,
    searchField,
    birthdateStart,
    birthdateEnd,
    selectedFood,
    sortField,
    sortOrder,
  ]);

  return (
    <div className="pt-17.5 w-full px-4 mx-auto max-w-135 md:max-w-180 lg:max-w-240 xl:max-w-285 2xl:max-w-330">
      {/* навигационные ссылки */}
      <nav className="mb-4 flex">
        <Link to="/" className="text-[#0d6efd] underline text-base">
          Главная
        </Link>
        <Link
          to="/users"
          className='before:content-["/"] before:px-2 before:cursor-default text-[rgba(33,37,41,0.75)]'
        >
          Пользователи
        </Link>
      </nav>

      {/*кнопка добавления пользователя */}
      <div className="mb-1">
        <Button
          text="Добавить пользователя"
          to="/user/create"
          styles="bg-[#198754]"
        />
      </div>

      {/* таблица с юзерами */}
      <div className="mt-10 overflow-x-auto bg-white  w-full">
        <div className="mb-4 text-sm text-gray-500">
          Показаны записи <b>{filteredUsers.length === 0 ? 0 : 1}</b>-
          <b>{filteredUsers.length}</b> из <b>{filteredUsers.length}</b>
        </div>
        <table className="w-full text-sm text-left  text-gray-700">
          <thead className="text-xs uppercase border border-gray-200">
            <tr>
              <th className="th-primary pl-4">#</th>
              <th className="th-primary">
                <button onClick={() => handleSort("id")}>ID</button>{" "}
                {sortField === "id" && (sortOrder === "asc" ? "↑" : "↓")}
              </th>
              <th className="th-primary">Фото</th>
              <th className="th-primary">
                <button onClick={() => handleSort("username")}>Имя </button>
                {sortField === "username" && (sortOrder === "asc" ? "↑" : "↓")}
              </th>
              <th className="th-primary">
                <button onClick={() => handleSort("email")}>Email</button>
                {sortField === "email" && (sortOrder === "asc" ? "↑" : "↓")}
              </th>
              <th className="th-primary">
                <button onClick={() => handleSort("birthdate")}>
                  Дата рождения
                </button>
                {sortField === "birthdate" && (sortOrder === "asc" ? "↑" : "↓")}
              </th>
              <th className="th-primary">
                <button onClick={() => handleSort("favorite_food_ids")}>
                  Любимая еда
                </button>
                {sortField === "favorite_food_ids" &&
                  (sortOrder === "asc" ? "↑" : "↓")}
              </th>
              <th className="px-4 py-3">&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {/* Строка поиска */}
            <tr className="border-t border-gray-200">
              <td className="td-primary pl-4">&nbsp;</td>

              {/* поиск по id */}
              <td className="td-primary">
                <input
                  type="search"
                  className="input-primary"
                  onChange={(e) => {
                    setValue(e.target.value);
                    setSearchField("id");
                  }}
                />
              </td>
              <td className="td-primary">&nbsp;</td>

              {/* поиск по имени */}
              <td className="td-primary">
                <input
                  type="search"
                  className="input-primary"
                  onChange={(e) => {
                    setValue(e.target.value);
                    setSearchField("username");
                  }}
                />
              </td>

              {/* поиск по почте */}
              <td className="td-primary">
                <input
                  type="search"
                  className="input-primary"
                  onChange={(e) => {
                    setValue(e.target.value);
                    setSearchField("email");
                  }}
                />
              </td>

              {/* поиск по дате */}
              <td className="td-primary">
                <div className="flex items-center">
                  <DateInput
                    valueFormat="DD.MM.YYYY"
                    className="w-full"
                    clearable
                    clearSectionMode="rightSection"
                    onChange={(value) => setBirthdateStart(value || "")}
                    styles={{
                      input: {
                        padding: "0.375rem 0.75rem",
                        height: "38px",
                        fontSize: "16px",
                        fontWeight: "400",
                        lineHeight: "1.5",
                        borderRadius: " 0.375rem 0 0 0.375rem ",
                        border: "1px solid #dee2e6",
                      },
                    }}
                  />
                  <span className="text-black bg-gray-100 px-3 py-1.5 text-base leading-6 font-medium border border-gray-200">
                    —
                  </span>
                  <DateInput
                    valueFormat="DD.MM.YYYY"
                    className="w-full"
                    clearable
                    clearSectionMode="rightSection"
                    onChange={(value) => setBirthdateEnd(value || "")}
                    styles={{
                      input: {
                        padding: "0.375rem 0.75rem",
                        height: "38px",
                        fontSize: "16px",
                        fontWeight: "400",
                        lineHeight: "1.5",
                        borderRadius: "0 0.375rem  0.375rem 0",
                        border: "1px solid #dee2e6",
                      },
                    }}
                  />
                </div>
              </td>

              {/* поиск по еде */}
              <td className="td-primary">
                <Select selectedIds={selectedFood} onChange={setSelectedFood} />
              </td>
              <td className="td-primary">&nbsp;</td>
            </tr>

            {/* Строки с пользователями */}
            {filteredUsers.map((user, index) => (
              <tr
                key={user.id}
                className="tr-hover odd:bg-white even:bg-gray-100"
              >
                <td className="td-primary pl-4">{index + 1}</td>
                <td className="td-primary">{user.id}</td>
                <td className="td-primary flex items-center justify-center">
                  <div className="w-37.5 h-37.5">
                    {user.photo_id ? (
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
                  </div>
                </td>
                <td className="td-primary ">{user.username}</td>
                <td className="td-primary">
                  {" "}
                  <a
                    className="underline text-blue-600"
                    href={`mailto:${user.email}`}
                  >
                    {user.email}
                  </a>
                </td>

                {/* дата рождения */}
                <td className="td-primary">{user.birthdate}</td>

                {/* еда */}
                <td className="td-primary">
                  {user?.favorite_food_ids &&
                  user.favorite_food_ids.length > 0 ? (
                    user.favorite_food_ids
                      .map((id) => food[Number(id) - 1]?.name)
                      .join(", ")
                  ) : (
                    <span>Всеядный</span>
                  )}
                </td>

                {/* редактирование, удаление, просмотр */}
                <td className="td-primary">
                  <div className="flex items-center flex-col gap-3">
                    <Link
                      to={`/user/view?id=${user.id}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </Link>
                    <Link
                      to={`/user/update?id=${user.id}`}
                      className="text-green-600 hover:text-green-800"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </Link>
                    <button
                      onClick={() => user.id && handleDeleteUser(user.id)}
                      className="text-red-500 hover:text-red-800"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
