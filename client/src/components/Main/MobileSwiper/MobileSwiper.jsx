import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Banner from "../Banner";

const MobileSwiper = () => {
  return (
    <CustomSwiper pagination={true} modules={[Pagination]} autoHeight={true}>
      <SwiperSlide>
        <Banner link="/about" img="/image/banner1.webp" order="first" />
      </SwiperSlide>
      <SwiperSlide>
        <Banner link="/funding" img="/image/banner2.webp" />
      </SwiperSlide>
      <SwiperSlide>
        <Banner link="/store" img="/image/banner3.webp" />
      </SwiperSlide>
    </CustomSwiper>
  );
};

export default MobileSwiper;

export const CustomSwiper = styled(Swiper)`
  .swiper-slide {
    margin-top: 7rem;
  }
  .swiper-pagination-bullet-active {
    background: var(--color-main);
  }
`;
