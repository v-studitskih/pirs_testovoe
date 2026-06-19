import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#f5f5f5",
        mt: 10,
        py: 4,
      }}
    >
      <Box className="w-full px-4 mx-auto max-w-135 md:max-w-180 lg:max-w-240 xl:max-w-285 2xl:max-w-400">
        <Typography
          variant="body2"
          sx={{ color: "rgba(33,37,41,0.75)", mb: 1 }}
        >
          © My Company 2026
        </Typography>
        <Typography variant="body2" sx={{ color: "rgba(33,37,41,0.75)" }}>
          Powered by{" "}
          <a
            href="https://www.yiiframework.com/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#0d6efd", textDecoration: "underline" }}
          >
            Yii Framework
          </a>
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
