import React, { useState, useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../api/axiosInstance";
import SideBar from "../../components/SubPage/SideBar";
import SortButton from "../../components/SubPage/SortButton";
import Item from "../../components/SubPage/Store/Item";
import { getUserData } from "../../api/getDatas";
import * as S from "./StorePage.styled";

const StorePage = () => {
  const userData = useSelector((state) => state.userData);
  const [sort, setSort] = useState("descending");
  const [kategorie, setKategorie] = useState(0);
  const [stoerList, setStoreList] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [role, setrole] = useState("");

  const searchParam = useSelector((state) => state.search.searchWord);

  useEffect(() => {
    if (searchParam) {
      axiosInstance({
        url: `/sells/search?page=1&size=16&searchKeyword=${searchParam}`,
        method: "get",
      }).then((response) => {
        setStoreList(response.data.data);
        setIsLoading(true);
      });
    } else {
      axiosInstance({
        url: "/sells/descending?page=1&size=16",
        method: "get",
      }).then((response) => {
        setStoreList(response.data.data);
        setIsLoading(true);
      });
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (localStorage.getItem("login") && userData.memberId) {
      getUserData(userData.memberId).then((res) => {
        setrole(res.data.data.memberRole);
      });
    }
  }, [userData.memberId]);

  useEffect(() => {
    setIsLoading(false);
    setPage(1);
    if (searchParam) {
      if (kategorie === 0) {
        axiosInstance({
          url: `/sells/search?page=1&size=16&sort=${sort}&searchKeyword=${searchParam}`,
          method: "get",
        }).then((response) => {
          setStoreList(response.data.data);
          setIsLoading(true);
        });
      } else {
        axiosInstance({
          url: `/sells/search?page=1&size=16&sort=${sort}&sellCategoryId=${kategorie}&searchKeyword=${searchParam}`,
          method: "get",
        }).then((response) => {
          setStoreList(response.data.data);
          setIsLoading(true);
        });
      }
    } else {
      if (kategorie === 0) {
        axiosInstance({
          url: `/sells/${sort}?page=1&size=16`,
          method: "get",
        }).then((response) => {
          setStoreList(response.data.data);
          setIsLoading(true);
        });
      } else {
        axiosInstance({
          url: `/sells/${sort}/sellcategories/${kategorie}?page=1&size=16`,
          method: "get",
        }).then((response) => {
          setStoreList(response.data.data);
          setIsLoading(true);
        });
      }
    }
  }, [sort, kategorie, searchParam]);

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

    if (scrollHeight - scrollTop === clientHeight) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    if (page > 1) {
      if (searchParam) {
        if (kategorie === 0) {
          axiosInstance({
            url: `/sells/search?page=${page}&size=16&sort=${sort}&searchKeyword=${searchParam}`,
            method: "get",
          }).then((response) => {
            setStoreList((prev) => [...prev, ...response.data.data]);
          });
        } else {
          axiosInstance({
            url: `/sells/search?page=${page}&size=16&sort=${sort}&sellCategoryId=${kategorie}&searchKeyword=${searchParam}`,
            method: "get",
          }).then((response) => {
            setStoreList((prev) => [...prev, ...response.data.data]);
          });
        }
      } else {
        if (kategorie === 0) {
          axiosInstance({
            url: `/sells/${sort}?page=${page}&size=16`,
            method: "get",
          }).then((response) => {
            setStoreList((prev) => [...prev, ...response.data.data]);
          });
        } else {
          axiosInstance({
            url: `/sells/${sort}/sellcategories/${kategorie}?page=${page}&size=16`,
            method: "get",
          }).then((response) => {
            setStoreList((prev) => [...prev, ...response.data.data]);
          });
        }
      }
    }
  }, [page]);

  const lenis = new Lenis();
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  return (
    <S.Container>
      <SideBar
        kategorie={kategorie}
        setKategorie={setKategorie}
        menu={["All", "의류", "가구", "인테리어", "소품", "기타"]}
      />
      <S.ContainerBottom>
        <h1>Store</h1>
        <SortButton
          sort={sort}
          setSort={setSort}
          role={role}
          link="/storecreate"
        />
        <S.SellItem>
          {isLoading
            ? stoerList.map((obj, index) => <Item key={index} {...obj} />)
            : null}
        </S.SellItem>
      </S.ContainerBottom>
    </S.Container>
  );
};

export default StorePage;
