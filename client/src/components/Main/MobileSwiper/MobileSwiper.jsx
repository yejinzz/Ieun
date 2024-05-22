import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Banner from "../Banner";
import "swiper/css";
import "swiper/css/pagination";

const MobileSwiper = () => {
  return (
    <CustomSwiper pagination={true} modules={[Pagination]} autoHeight={true}>
      <SwiperSlide>
        <Banner link="/about" img="/image/default_banner.webp" order="first" />
      </SwiperSlide>
      <SwiperSlide>
        <Banner link="/funding" img="/image/funding_banner.webp" />
      </SwiperSlide>
      <SwiperSlide>
        <Banner link="/store" img="/image/store_banner.webp" />
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
