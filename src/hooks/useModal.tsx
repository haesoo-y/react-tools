import { ReactElement, useCallback, useState } from "react";

import Modal from "@components/Modal";
import { Portal } from "@stores/context/Portal";

/**
 * 모달을 관리하기 위한 커스텀 훅입니다.
 *
 * @description
 * - ModalContainer 컴포넌트를 사용하여 모달을 렌더링할 수 있습니다.
 * - ModalContainer 컴포넌트는 Portal 컴포넌트를 사용하여 모달을 렌더링합니다.
 *
 * @returns {Object} 모달을 관리하기 위한 함수와 래퍼를 포함한 객체를 반환합니다.
 * @example
 * const { openModal, closeModal, ModalContainer } = useModal();
 *
 * openModal(); // 모달을 엽니다.
 * closeModal(); // 모달을 닫습니다.
 *
 * return (
 *   <MyComponent>
 *     <button onClick={openModal}>Open Modal</button>
 *     <ModalContainer>
 *       <ModalContent />
 *     </ModalContainer>
 *  </MyComponent>
 * );
 */
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
