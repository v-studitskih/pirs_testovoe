import { Breadcrumbs, Link, Typography } from "@mui/material";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const BreadcrumbsNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const userId = searchParams.get("id");

  const getLabel = (path: string) => {
    const labels: Record<string, string> = {
      "": "Главная",
      users: "Пользователи",
      user: "Пользователи",
    };
    return labels[path] || path;
  };

  const getLastLabel = (path: string) => {
    if (userId && path === "view") {
      return `${userId}`;
    }
    return getLabel(path);
  };

  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
      sx={{ mb: 4 }}
    >
      {pathnames.length > 0 ? (
        <Link
          component="button"
          onClick={() => navigate("/")}
          sx={{
            color: "#0d6efd",
            textDecoration: "underline",
            fontSize: "1rem",
            cursor: "pointer",
          }}
        >
          Главная
        </Link>
      ) : (
        <Typography sx={{ fontSize: "1rem" }}>Главная</Typography>
      )}

      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;
        const label = isLast ? getLastLabel(name) : getLabel(name);

        return isLast ? (
          <Typography
            key={name}
            sx={{ fontSize: "1rem", color: "rgba(33,37,41,0.75)" }}
          >
            {label}
          </Typography>
        ) : (
          <Link
            key={name}
            component="button"
            onClick={() => navigate(routeTo)}
            sx={{
              color: "#0d6efd",
              textDecoration: "underline",
              fontSize: "1rem",
              cursor: "pointer",
            }}
          >
            {label}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default BreadcrumbsNav;
