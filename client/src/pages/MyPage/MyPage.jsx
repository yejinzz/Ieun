import React, { useEffect, useState } from "react";
import EditModal from "../../components/Mypage/EditModal/EditModal";
import Details from "../../components/Mypage/Details/Details";
import UserProfile from "../../components/Mypage/UserProfile/UserProfile";
import { useSelector, useDispatch } from "react-redux";
import { getDetailDatas, getUserData } from "../../api/getDatas";
import { useParams } from "react-router-dom";
import { userDataActions } from "../../store/slice/userDataSlice";
import styled from "styled-components";
import useModal from "../../hooks/useModal";
import useCategoryDetails from "../../hooks/useCategoryDetails";
import Category from "../../components/Mypage/Category/Category";
import { userDetailsActions } from "../../store/slice/userDetailsSlice";
import { useGetMemberId } from "../../hooks/useGetMemberId";

const MyPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { path } = useParams();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData);

  const { getMemberId } = useGetMemberId();
  const { isOpenModal, isUnmount, openModal, closeModal } = useModal();
  const { details, setCategoryDetails } = useCategoryDetails();

  useEffect(() => {
    getMemberId();

    if (userData.memberId) {
      getUserData(userData.memberId).then((res) => {
        const user = res.data.data;
        dispatch(
          userDataActions.setUserData({
            email: user.email,
            displayName: user.displayName,
            memberRole: user.memberRole,
            thumbNailImage: user.thumbNailImage,
          })
        );
      });

      dispatch(userDetailsActions.setTitle(details[path].title));
      getDetailDatas(userData.memberId, path).then((res) => {
        setCategoryDetails(path, res.data.data);
      });
    }
  }, [userData.memberId]);

  return (
    <>
      <MyPageContainer>
        <div>
          <UserProfile openModal={openModal} />
          <Category
            userData={userData}
            setCategoryDetails={setCategoryDetails}
            currentCategory={path}
            setCurrentPage={setCurrentPage}
          />
        </div>
        <Details
          details={details}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </MyPageContainer>
      {isOpenModal && (
        <EditModal closeModal={closeModal} isUnmount={isUnmount} />
      )}
    </>
  );
};

export default MyPage;

const MyPageContainer = styled.main`
  display: flex;
  max-width: 1000px;
  margin: auto;
  padding: 2rem 0;
  color: #3a3a3a;
  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`;
