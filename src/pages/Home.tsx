import { Link  } from "react-router-dom";
import Button from "@mui/material/Button";
import UsersTable from "../components/UsersTable";
import BreadcrumbsNav from "../components/Breadcrumbs";

const Home = () => {
  return (
    <div className="pt-17.5 w-full px-4 mx-auto max-w-135 md:max-w-180 lg:max-w-240 xl:max-w-285 2xl:max-w-400">
      <BreadcrumbsNav />

      <div className="mb-10">
        <Button
          to={`/user/create`}
          sx={{ backgroundColor: "green", padding: "10px 18px" }}
          variant="contained"
          component={Link}
        >
          Добавить пользователя
        </Button>
      </div>

      <UsersTable />
    </div>
  );
};

export default Home;
