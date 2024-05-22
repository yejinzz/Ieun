import { useState } from "react";
const useModal = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isUnmount, setIsUnmount] = useState(true);

  const openModal = () => {
    // lockScroll();
    setIsUnmount(false);
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsUnmount(true);
    setTimeout(() => {
      // activeScroll();
      setIsOpenModal(false);
    }, 1200);
  };

  return { isOpenModal, isUnmount, openModal, closeModal };
};

export default useModal;
