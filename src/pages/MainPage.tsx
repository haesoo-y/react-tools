import { Button, Grid2 } from "@mui/material";

import { useRouter } from "@hooks/useRouter";

interface MainPageProps {}

const MainPage = ({}: MainPageProps) => {
  const router = useRouter();
  const handleGoToTodos = () => {
    router.push("/todos");
  };
  return (
    <Grid2 display={"flex"} flexDirection={"column"}>
      MAIN PAGE
      <Button onClick={handleGoToTodos}>Go To Todos</Button>
    </Grid2>
  );
};

export default MainPage;
