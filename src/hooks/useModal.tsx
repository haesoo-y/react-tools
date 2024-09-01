import { ReactElement, useCallback, useState } from "react";

import Modal from "@components/Modal";
import { Portal } from "@stores/context/Portal";

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = useCallback(() => setIsOpen(false), []);

  const ModalContainer = ({ children }: { children: ReactElement }) => {
    return (
      <Portal.Consumer>
        <Modal
          open={isOpen}
          onClose={() => {
            setIsOpen(false);
          }}
        >
          {children}
        </Modal>
      </Portal.Consumer>
    );
  };

  return { openModal, closeModal, ModalContainer };
};
