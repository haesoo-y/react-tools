import { Box, Button, Grid2 } from "@mui/material";

import { useModal } from "@hooks/useModal";

interface ListPageProps {}

const ListPage = ({}: ListPageProps) => {
  const { openModal, closeModal, ModalContainer } = useModal();
  return (
    <Grid2 display={"flex"} flexDirection={"column"}>
      List Page
      <Button onClick={openModal}>Modal Test</Button>
      <ModalContainer>
        <Box style={{ width: "100px" }}>TEST</Box>
      </ModalContainer>
    </Grid2>
  );
};

export default ListPage;
