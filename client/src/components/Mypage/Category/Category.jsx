import * as S from "./Category.styled";
import { useNavigate } from "react-router-dom";
import { detailsInfo } from "../../../datas/detailsInfo";
import { useDispatch, useSelector } from "react-redux";
import { setCategory, setTitle } from "../../../store/slice/detailsSlice";

const Category = ({ userData, setCurrentPage }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentCategory = useSelector((state) => state.details.currentCategory);

  const handleCategoryClick = (data) => {
    setCurrentPage(1);
    dispatch(setCategory(data.category));
    dispatch(setTitle(data.title));
    navigate(`/mypage/${data.category}`);
  };

  // MEMBER 유형별 detailsInfo 필터링
  const detailData = Object.keys(detailsInfo).map((key) => detailsInfo[key]);
  const filteredDetailData =
    userData.memberRole === "MEMBER_UPCYCLER"
      ? detailData
      : detailData.slice(0, 2);

  return (
    <S.CategoryContainer>
      <ul>
        {filteredDetailData.map((data, index) => (
          <S.CategoryList
            key={index}
            className={
              currentCategory === data.category
                ? "selected"
                : "underline-effect"
            }
            onClick={() => handleCategoryClick(data)}
          >
            {data.title}
          </S.CategoryList>
        ))}
      </ul>
    </S.CategoryContainer>
  );
};

export default Category;
