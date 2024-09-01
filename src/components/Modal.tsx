import { PropsWithChildren } from "react";

import { Box, Modal as MuiModal } from "@mui/material";

interface ModalProps extends PropsWithChildren {
  open: boolean;
  onClose: () => void;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "8px",
  p: 4,
};

const Modal = ({ onClose, open, children }: ModalProps) => {
  return (
    <MuiModal open={open} onClose={onClose}>
      <Box sx={style}>{children}</Box>
    </MuiModal>
  );
};

export default Modal;
