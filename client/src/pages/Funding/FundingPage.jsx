import * as S from "./FundingPage.styled";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetMemberId } from "../../hooks/useGetMemberId";
import { axiosInstance } from "../../api/axiosInstance";
import SideBar from "../../components/SubPage/SideBar";
import SortButton from "../../components/SubPage/SortButton";
import List from "../../components/SubPage/Funding/List";
import { getUserData } from "../../api/getDatas";
import useSmoothScroll from "../../hooks/useSmoothScroll";

const FundingPage = () => {
  const { getMemberId } = useGetMemberId();
  const userData = useSelector((state) => state.userData);

  const [sort, setSort] = useState("descending");
  const [kategorie, setKategorie] = useState(0);
  const [fundingList, setFundingList] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [role, setrole] = useState("");

  const searchParam = useSelector((state) => state.search.searchWord);

  useEffect(() => {
    if (searchParam) {
      axiosInstance({
        url: `/upcyclings/search?page=1&size=8&searchKeyword=${searchParam}`,
        method: "get",
      })
        .then((response) => {
          setFundingList(response.data.data);
          setIsLoading(true);
        })
        .catch((err) => {
          setFundingList([]);
        });
    } else {
      axiosInstance({
        url: "/upcyclings/descending?page=1&size=16",
        method: "get",
      })
        .then((response) => {
          setIsLoading(true);
        })
        .catch((err) => {
          setFundingList([]);
        });
    }

    getMemberId();

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (localStorage.getItem("login") && userData.memberId)
      getUserData(userData.memberId).then((res) => {
        setrole(res.data.data.memberRole);
      });
  }, [userData.memberId]);

  useEffect(() => {
    setIsLoading(false);
    setPage(1);
    if (searchParam) {
      if (kategorie === 0) {
        axiosInstance({
          url: `/upcyclings/search?page=1&size=8&sort=${sort}&searchKeyword=${searchParam}`,
          method: "get",
        })
          .then((response) => {
            setFundingList(response.data.data);
            setIsLoading(true);
          })
          .catch((err) => {
            setFundingList([]);
          });
      } else {
        axiosInstance({
          url: `/upcyclings/search?page=1&size=8&sort=${sort}&categoryId=${kategorie}&searchKeyword=${searchParam}`,
          method: "get",
        })
          .then((response) => {
            setFundingList(response.data.data);
            setIsLoading(true);
          })
          .catch((err) => {
            setFundingList([]);
          });
      }
    } else {
      if (kategorie === 0) {
        axiosInstance({
          url: `/upcyclings/${sort}?page=1&size=16`,
          method: "get",
        })
          .then((response) => {
            setFundingList(response.data.data);
            setIsLoading(true);
          })
          .catch((err) => {
            setFundingList([]);
          });
      } else {
        axiosInstance({
          url: `/upcyclings/${sort}/categories/${kategorie}?page=1&size=16`,
          method: "get",
        })
          .then((response) => {
            setFundingList(response.data.data);
            setIsLoading(true);
          })
          .catch((err) => {
            setFundingList([]);
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
            url: `/upcyclings/search?page=${page}&size=16&sort=${sort}&searchKeyword=${searchParam}`,
            method: "get",
          })
            .then((response) => {
              setFundingList((prev) => [...prev, ...response.data.data]);
            })
            .catch((err) => {
              setFundingList([]);
            });
        } else {
          axiosInstance({
            url: `/upcyclings/search?page=${page}&size=16&sort=${sort}&categoryId=${kategorie}&searchKeyword=${searchParam}`,
            method: "get",
          })
            .then((response) => {
              setFundingList((prev) => [...prev, ...response.data.data]);
            })
            .catch((err) => {
              setFundingList([]);
            });
        }
      } else {
        if (kategorie === 0) {
          axiosInstance({
            url: `/upcyclings/${sort}?page=${page}&size=16`,
            method: "get",
          })
            .then((response) => {
              setFundingList((prev) => [...prev, ...response.data.data]);
            })
            .catch((err) => {
              setFundingList([]);
            });
        } else {
          axiosInstance({
            url: `/upcyclings/${sort}/categories/${kategorie}?page=${page}&size=8`,
            method: "get",
          })
            .then((response) => {
              setFundingList((prev) => [...prev, ...response.data.data]);
            })
            .catch((err) => {
              setFundingList([]);
            });
        }
      }
    }
  }, [page]);

  useSmoothScroll();
  return (
    <S.Container>
      <SideBar
        kategorie={kategorie}
        setKategorie={setKategorie}
        menu={["All", "천", "목재", "플라스틱", "철제", "유리", "기타"]}
      />
      <S.ContainerBottom>
        <h1>Funding</h1>

        <SortButton
          sort={sort}
          setSort={setSort}
          role={role}
          param="/funding"
          // link="/fundingcreate"
        />
        <S.Funding>
          {isLoading
            ? fundingList.map((obj, index) => <List key={index} {...obj} />)
            : null}
        </S.Funding>
      </S.ContainerBottom>
    </S.Container>
  );
};

export default FundingPage;
