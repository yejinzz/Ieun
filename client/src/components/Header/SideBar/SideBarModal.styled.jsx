import styled, { keyframes } from "styled-components";
import { ReactComponent as CloseIcon } from "../../../assets/icon/close_icon.svg";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  overflow-y: hidden;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const openModal = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0px);
  }
`;

export const closeModal = keyframes`
  100% {
    transform: translateX(-100%);
  }
`;

export const ModalContent = styled.aside`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f5f5f5;
  top: 0;
  left: 0;
  height: 100vh;
  width: 50vh;
  z-index: 2;
  animation: ${({ isUnmount }) => {
      if (isUnmount === true) {
        return closeModal;
      } else {
        return openModal;
      }
    }}
    1.2s forwards;
  > .logo {
    margin-top: 10px;
    width: 60px;
    height: 60px;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const Closebutton = styled(CloseIcon)`
  cursor: pointer;
  position: absolute;
  top: 15px;
  right: 15px;
`;

export const Sidelist = styled.nav`
  display: flex;
  gap: 2rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  li {
    font-size: 1.3rem;
  }
`;

export const TeamName = styled.p`
  position: absolute;
  bottom: 50px;
  font-size: 1.5rem;
  color: #353535;
  font-weight: 700;
  letter-spacing: 10px;
  &::first-letter {
    color: var(--color-main);
  }
`;

export const MenuBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  /* padding: 1rem; */
  svg {
    color: var(--color-main);
    font-size: 1.8rem;
  }
`;
