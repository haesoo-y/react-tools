import { Box, Button, Grid2 } from "@mui/material";

import AnimationTest from "@components/AnimationTest";
import CopyExample from "@components/CopyExample";
import { useModal } from "@hooks/useModal";

interface ListPageProps {}

const ListPage = ({}: ListPageProps) => {
  const { openModal, closeModal, ModalContainer } = useModal();
  return (
    <Grid2 display={"flex"} flexDirection={"column"} gap={"32px"}>
      List Page
      <Button onClick={openModal}>Modal Test</Button>
      <ModalContainer>
        <Box style={{ width: "100px" }}>TEST</Box>
      </ModalContainer>
      <AnimationTest />
      <CopyExample />
    </Grid2>
  );
};

export default ListPage;
