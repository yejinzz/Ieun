import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Loading from "../../Loading";
import ProfileDropdown from "../../components/Header/DropDown/ProfileDropdown";
import List from "../../components/Main/List";
import Banner from "../../components/Main/Banner";
import Footer from "../../components/Main/Footer";
import * as S from "./MainPage.styled";
import SideBarModal from "../../components/Header/SideBar/SideBarModal";
import { MAIN_MAGAZINE_LIST_ATT } from "../../datas/attribute";
import Logo from "../../components/common/Logo";
import MobileSwiper from "../../components/Main/MobileSwiper/MobileSwiper";
import useSmoothScroll from "../../hooks/useSmoothScroll";
import { axiosInstance } from "../../api/axiosInstance";

gsap.registerPlugin(ScrollTrigger);

const MainPage = () => {
  const [nowLoading, setNowLoading] = useState(false);
  const [data, setData] = useState([]);
  const horwrapRef = useRef(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("access_token");
    if (accessToken) {
      localStorage.setItem("token", accessToken);
    }

    axiosInstance({
      url: "/upcyclings/descending?page=1&size=4",
      method: "get",
    })
      .then((response) => {
        setData(response.data.data);
      })
      .catch((err) => {
        setData([]);
      });

    setNowLoading(true);
  }, []);

  useEffect(() => {
    if (horwrapRef.current) {
      const horwrapWidth = horwrapRef.current.offsetWidth;

      requestAnimationFrame(() => {
        gsap.to(horwrapRef.current, {
          xPercent: -100,
          duration: 3,
          scrollTrigger: {
            trigger: horwrapRef.current,
            start: "top top",
            end: `+=${horwrapWidth}`,
            scrub: window.innerWidth > 768 ? 0.5 : 0,
            pin: window.innerWidth > 768 ? horwrapRef.current : false,
          },
        });
      });
    }
    setNowLoading(true);
  }, [nowLoading, horwrapRef.current]);

  useSmoothScroll();

  return (
    <>
      {nowLoading ? (
        <div>
          <S.MainHeader>
            <SideBarModal />
            <S.LogoWrap>
              <S.LogoImg
                src={process.env.PUBLIC_URL + "/image/logo3.png"}
                alt="로고"
              />
              <Logo
                src={process.env.PUBLIC_URL + "/image/logo2.png"}
                alt="로고"
              />
            </S.LogoWrap>
            <ProfileDropdown />
          </S.MainHeader>

          <S.Main>
            {/* 반응형 배너 캐러셀 적용 */}
            {window.innerWidth > 768 ? (
              <S.Horwrap className="horwrap" ref={horwrapRef}>
                <Banner
                  link="/about"
                  img="/image/default_banner.webp"
                  order="first"
                />
                <Banner link="/funding" img="/image/funding_banner.webp" />
                <Banner link="/store" img="/image/store_banner.webp" />
              </S.Horwrap>
            ) : (
              <MobileSwiper />
            )}
            <S.ContentsFrame>
              <h1>Magazine</h1>
              <S.Contentslist>
                {MAIN_MAGAZINE_LIST_ATT.map((list, index) => (
                  <List
                    key={index}
                    href={list.href}
                    src={list.src}
                    title={list.title}
                    text={list.text}
                    footer={list.footer}
                  />
                ))}
              </S.Contentslist>
              <h1>Funding</h1>
              {data.length > 3 ? (
                <S.Contentslist>
                  {data.slice(0, 4).map((item, index) => (
                    <div key={index}>
                      <List {...item} />
                    </div>
                  ))}
                </S.Contentslist>
              ) : null}
            </S.ContentsFrame>
          </S.Main>
          <Footer />
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default MainPage;
