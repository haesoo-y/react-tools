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

/**
 * 모달 컴포넌트입니다. 단순 스타일된 모달을 표시할 때 사용합니다.
 *
 * @description
 * - useModal 훅 내부에서 Container 로 사용됩니다.
 * - Mui Modal 컴포넌트를 래핑하고 있습니다.
 *
 * @param onClose - 모달이 닫힐 때 호출되는 콜백 함수입니다.
 * @param open - 모달의 열림 여부를 나타내는 불리언 값입니다.
 * @param children - 모달 내부에 표시될 자식 요소입니다.
 * @returns 모달 컴포넌트를 반환합니다.
 *
 * @example
 * ```tsx
 * <Modal onClose={handleClose} open={isOpen}>
 *   <div>모달 내용</div>
 * </Modal>
 * ```
 */
const Modal = ({ onClose, open, children }: ModalProps) => {
  return (
    <MuiModal open={open} onClose={onClose}>
      <Box sx={style}>{children}</Box>
    </MuiModal>
  );
};

export default Modal;
