import { useNavigate } from "react-router-dom";
import useModal from "../../../hooks/useModal";
import { ReactComponent as MenuIcon } from "../../../assets/icon/menu_bar_icon.svg";
import * as S from "./SideBarModal.styled";
import { SIDE_LINK } from "../../../datas/link";

const SideBarModal = () => {
  const navigate = useNavigate();
  const { isOpenModal, isUnmount, openModal, closeModal } = useModal();

  const handleMovePage = (url) => {
    closeModal();
    return navigate(url);
  };

  return (
    <>
      <S.MenuBtn aria-label="menu-button" className="SideBar__Menu-btn">
        <MenuIcon onClick={openModal} />
      </S.MenuBtn>
      {isOpenModal ? (
        <>
          <S.ModalContent isUnmount={isUnmount}>
            <img
              className="logo"
              src={process.env.PUBLIC_URL + "/image/logo1.png"}
              alt="ieun-logo"
            />
            <S.Closebutton onClick={closeModal} />
            <S.Sidelist>
              {SIDE_LINK.map((item, idx) => (
                <li
                  key={idx}
                  className="underline-effect"
                  onClick={() => handleMovePage(item.url)}
                >
                  {item.menu}
                </li>
              ))}
            </S.Sidelist>
            <S.TeamName>IEUN CO.</S.TeamName>
          </S.ModalContent>
          <S.ModalOverlay onClick={closeModal} />
        </>
      ) : null}
    </>
  );
};

export default SideBarModal;
