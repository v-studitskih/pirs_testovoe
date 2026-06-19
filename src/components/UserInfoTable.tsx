import type { User } from "../types/user";
import { TableContainer } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { useFoodList } from "../services/queries";
import { getFoodNames } from "../utils/foodUtils";
import Avatar from "@mui/material/Avatar";

type Props = {
  user: User;
};

const UserInfoTable = ({ user }: Props) => {
  const foodList = useFoodList();

  const favoriteFoods: string = getFoodNames(
    user.favorite_food_ids,
    foodList.data,
  );

  return (
    <TableContainer
      component={Paper}
      sx={{
        "& td, & th": {
          border: "1px solid #dee2e6",
          padding: "8px 16px",
          fontSize: "1rem",
        },
        "& tr:nth-of-type(odd)": {
          backgroundColor: "#f9f9f9",
        },
      }}
    >
      <Table>
        <TableBody>
          <TableRow>
            <TableCell component="th">ID</TableCell>
            <TableCell>{user.id}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th">Имя</TableCell>
            <TableCell>{user.username}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th">Почта</TableCell>
            <TableCell>
              <a
                className="text-blue-500 underline"
                href={`mailto:${user.email}`}
              >
                {user.email}
              </a>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th">Дата рождения</TableCell>
            <TableCell>{user.birthdate}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th">Любимая еда</TableCell>
            <TableCell>{favoriteFoods}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th">Фото</TableCell>
            <TableCell>
              <Avatar
                alt="аватарка"
                sx={{ margin: "0 auto", width: "150px", height: "150px" }}
                src={`${user.photo_id ? `http://tasks.tizh.ru/file/get?id=${user.photo_id}` : "http://tasks.tizh.ru/images/user-placeholder.png"}`}
              ></Avatar>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserInfoTable;
