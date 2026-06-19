
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Button from '@mui/material/Button';
import { useUser } from "../services/queries";
import UserInfoTable from "../components/UserInfoTable";
import { useDeleteUser } from "../services/mutations";
import BreadcrumbsNav from "../components/Breadcrumbs";


const UserInfo = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("id");
  const { data: user } = useUser(Number(userId));

  const deleteUserMutation = useDeleteUser();

  const handleDeleteUser = () => {
    deleteUserMutation.mutate(Number(userId), {
        onSuccess: () => {
          navigate('/user');
        }
      });

  }

 if (!user) return <div>Пользователь не найден</div>;


  return (
    <div className="pt-17.5 w-full px-4 mx-auto max-w-135 md:max-w-180 lg:max-w-240 xl:max-w-285 2xl:max-w-330">
      <BreadcrumbsNav/>
      <div className="mb-4 flex gap-1">
        <Button to={`/user/update?id=${user.id}`} variant="contained" component={Link}>Изменить</Button>
        <Button variant="contained" sx={{backgroundColor: 'red'}} onClick={handleDeleteUser}>Удалить</Button>
      </div>
      <UserInfoTable user={user}/>
      </div>
  );
};

export default UserInfo;
