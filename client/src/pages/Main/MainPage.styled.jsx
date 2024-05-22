import styled from "styled-components";
import { Swiper } from "swiper/react";

export const CustomSwiper = styled(Swiper)`
  .swiper-slide {
    margin-top: 7rem;
  }
  .swiper-pagination-bullet-active {
    background: var(--color-main);
  }
`;

export const MainHeader = styled.header`
  position: fixed;
  top: 0;
  width: 100vw;
  height: 70px;
  z-index: 90;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: transparent;
  padding: 0 30px;
  padding-top: 30px;
`;

export const LogoWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LogoImg = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 20px;
`;

export const Main = styled.main`
  background-color: #f5f5f5;
  margin-bottom: 100vh;
  overflow: hidden;
`;

export const Horwrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 200vw;

  background-color: #f5f5f5;
  height: 100%;
  @media (max-width: 768px) {
    width: 100vw;
  }
`;

export const ContentsFrame = styled.div`
  padding: 5rem;
  & > h1 {
    margin-top: 3rem;
    margin-bottom: 1.5rem;
    font-size: 2rem;
    font-weight: 700;
    color: #639443;
  }
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const Contentslist = styled.div`
  display: grid;
  width: 100%;
  gap: 3rem;
  grid-template-columns: repeat(4, 1fr);
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
  @media (max-width: 425px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;
