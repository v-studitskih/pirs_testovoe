import { useState } from "react";
import { TableContainer, Tooltip, IconButton } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { getFoodNames } from "../utils/foodUtils";
import { useFoodList, useUsers } from "../services/queries";
import Avatar from "@mui/material/Avatar";
import {
  Delete,
  Edit,
  Preview,
  ArrowUpward,
  ArrowDownward,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useDeleteUser } from "../services/mutations";
import SearchTextField from "../components/SearchTextField";
import SearchDatePicker from "../components/SearchDatePicker";
import SearchAutocomplete from "../components/SearchAutocomplete";

const UsersTable = () => {
  const [sortField, setSortField] = useState<string>("id");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const [search, setSearch] = useState({
    id: "",
    username: "",
    email: "",
    birthdateStart: "",
    birthdateEnd: "",
    food: [] as string[],
  });

  const [querySearch, setQuerySearch] = useState({
    id: "",
    username: "",
    email: "",
    birthdateStart: "",
    birthdateEnd: "",
    food: [] as string[],
  });

  const getSortParam = () => {
    if (sortOrder === "asc") {
      return sortField;
    } else {
      return `-${sortField}`;
    }
  };

  const {
    data: users,
    isLoading,
    error,
  } = useUsers({
    sort: getSortParam(),
    searchId: querySearch.id || undefined,
    searchUsername: querySearch.username || undefined,
    searchEmail: querySearch.email || undefined,
    searchBirthdateStart: querySearch.birthdateStart || undefined,
    searchBirthdateEnd: querySearch.birthdateEnd || undefined,
  });

  const filteredUsers = users?.filter((user) => {
    if (querySearch.food.length === 0) return true;
    if (!user.favorite_food_ids) return false;
    return user.favorite_food_ids.some((id) =>
      querySearch.food.includes(String(id)),
    );
  });

  const foodList = useFoodList();
  const deleteUserMutation = useDeleteUser();

  const handleDeleteUser = (id: number) => {
    deleteUserMutation.mutate(id);
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const getSortIcon = (field: string) => {
    if (sortField !== field) return null;
    return sortOrder === "asc" ? (
      <ArrowUpward fontSize="small" sx={{ ml: 0.5 }} />
    ) : (
      <ArrowDownward fontSize="small" sx={{ ml: 0.5 }} />
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      setQuerySearch({ ...search });
    }
  };

  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error.message}</div>;

  return (
    <>
      <div className="mb-4 text-sm text-gray-900">
        Показаны записи <b>{filteredUsers?.length || 0}</b> из{" "}
        <b>{filteredUsers?.length || 0}</b>.
      </div>
      <TableContainer
        component={Paper}
        sx={{
          "& td, & th": {
            border: "1px solid #dee2e6",
            padding: "8px 16px",
          },
          "& tr:nth-of-type(odd)": {
            backgroundColor: "#f9f9f9",
          },
          "& th": {
            fontWeight: "700",
          },
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ cursor: "pointer", "&:hover": { color: "#1976d2" } }}
                onClick={() => handleSort("id")}
              >
                ID
                {getSortIcon("id")}
              </TableCell>
              <TableCell>Фото</TableCell>
              <TableCell
                sx={{ cursor: "pointer", "&:hover": { color: "#1976d2" } }}
                onClick={() => handleSort("username")}
              >
                Имя
                {getSortIcon("username")}
              </TableCell>
              <TableCell
                sx={{ cursor: "pointer", "&:hover": { color: "#1976d2" } }}
                onClick={() => handleSort("email")}
              >
                Email
                {getSortIcon("email")}
              </TableCell>
              <TableCell
                sx={{ cursor: "pointer", "&:hover": { color: "#1976d2" } }}
                onClick={() => handleSort("birthdate")}
              >
                Дата рождения
                {getSortIcon("birthdate")}
              </TableCell>
              <TableCell
                sx={{ cursor: "pointer", "&:hover": { color: "#1976d2" } }}
                onClick={() => handleSort("favorite_food_ids")}
              >
                Любимая еда
                {getSortIcon("favorite_food_ids")}
              </TableCell>
              <TableCell>Действия</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>
                <SearchTextField
                  value={search.id}
                  onChange={(value) =>
                    setSearch((prev) => ({ ...prev, id: value }))
                  }
                  onKeyDown={handleKeyDown}
                  placeholder="Поиск по ID"
                />
              </TableCell>
              <TableCell>&nbsp;</TableCell>
              <TableCell>
                <SearchTextField
                  value={search.username}
                  onChange={(value) =>
                    setSearch((prev) => ({ ...prev, username: value }))
                  }
                  onKeyDown={handleKeyDown}
                  placeholder="Поиск по имени"
                />
              </TableCell>
              <TableCell>
                <SearchTextField
                  value={search.email}
                  onChange={(value) =>
                    setSearch((prev) => ({ ...prev, email: value }))
                  }
                  onKeyDown={handleKeyDown}
                  placeholder="Поиск по email"
                />
              </TableCell>
              <TableCell
                sx={{ display: "flex", justifyContent: "center", gap: 1 }}
              >
                <SearchDatePicker
                  value={search.birthdateStart}
                  onChange={(value) => {
                    setSearch((prev) => ({ ...prev, birthdateStart: value }));
                    setQuerySearch((prev) => ({
                      ...prev,
                      birthdateStart: value,
                    }));
                  }}
                  label="От"
                />
                <span className="text-gray-400 inline-flex items-center align-middle p-2">
                  —
                </span>
                <SearchDatePicker
                  value={search.birthdateEnd}
                  onChange={(value) => {
                    setSearch((prev) => ({ ...prev, birthdateEnd: value }));
                    setQuerySearch((prev) => ({
                      ...prev,
                      birthdateEnd: value,
                    }));
                  }}
                  label="До"
                />
              </TableCell>
              <TableCell>
                <SearchAutocomplete
                  value={search.food}
                  onChange={(value) => {
                    setSearch((prev) => ({ ...prev, food: value }));
                    setQuerySearch((prev) => ({ ...prev, food: value }));
                  }}
                  options={foodList.data}
                  onKeyDown={handleKeyDown}
                  placeholder="Поиск по еде"
                />
              </TableCell>
              <TableCell>&nbsp;</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredUsers && filteredUsers.length === 0 ? (
              <TableCell colSpan={7} align="center" >
                Ничего не найдено
              </TableCell>
            ) : (
              filteredUsers?.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>
                    <Avatar
                      alt="аватарка"
                      sx={{ margin: "0 auto", width: "150px", height: "150px" }}
                      src={`${user.photo_id ? `http://tasks.tizh.ru/file/get?id=${user.photo_id}` : "http://tasks.tizh.ru/images/user-placeholder.png"}`}
                    />
                  </TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.birthdate}</TableCell>
                  <TableCell>
                    {getFoodNames(user.favorite_food_ids, foodList.data)}
                  </TableCell>
                  <TableCell>
                    <Tooltip title="Просмотр">
                      <IconButton
                        color="primary"
                        component={Link}
                        to={`/user/view?id=${user.id}`}
                      >
                        <Preview />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Редактировать">
                      <IconButton
                        color="secondary"
                        component={Link}
                        to={`/user/update?id=${user.id}`}
                      >
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Удалить">
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default UsersTable;
