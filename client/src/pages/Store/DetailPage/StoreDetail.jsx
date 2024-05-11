import React, { useState, useEffect } from "react";
import * as S from "./StoreDetail.styled";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../../../api/axiosInstance";
import Modal from "../../../components/SubPage/Store/Modal";
import { getSellData, getUserData } from "../../../api/getDatas";
import { userDataActions } from "../../../store/slice/userDataSlice";
import {
  GridWrapper,
  MaxWidthContainer,
  ThumbnailImg,
} from "../../../styles/CommonStyle";
import { deleteSell } from "../../../api/deleteApi";

const StoreDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [profile, setprofile] = useState("");
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData);

  useEffect(() => {
    getSellData(id).then((response) => {
      setData(response.data);

      getUserData(response.data.memberId).then((res) => {
        setprofile(res.data.data.thumbNailImage);
      });
    });
  }, []);

  const handleChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleOpenModal = () => {
    if (quantity) {
      setIsModalOpen(true);
      axiosInstance({
        url: `/orders`,
        method: "post",
        data: {
          memberId: userData.memberId,
          orderSells: [
            {
              sellId: data.sellId,
              quantity: quantity,
            },
          ],
        },
      }).then((response) => {
        if (userData.memberId) {
          getUserData(userData.memberId).then((res) => {
            const user = res.data.data;
            dispatch(
              userDataActions.setUserData({
                displayName: user.displayName,
              })
            );
          });
        }
      });
    }
  };

  const navigate = useNavigate();

  const deleteStore = () => {
    const shouldDelete = window.confirm("정말로 삭제하시겠습니까?");

    if (shouldDelete) {
      handleDelete();
    }
  };

  const handleDelete = () => {
    deleteSell(id).then(() => {
      navigate("/store");
      alert("삭제되었습니다.");
    });
  };

  const formatPriceWithCommas = (price) => {
    if (price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return "수량을 선택해주세요!";
  };

  return (
    <MaxWidthContainer>
      <GridWrapper>
        <div className="StoreD__left_wrap">
          <ThumbnailImg src={data.thumbNailImage} alt="img" />
          <S.MaterierBox>
            <S.Materiartext>
              판매자가 작성한 제품에 사용된 업사이클링 품목입니다.
              <br />
              <br />
              이은 스토어는 단순히 수익성 제품을 판매하는 것이 아닌 업사이클링
              제품을 판매하는 과정을 지원해요.
            </S.Materiartext>
            <S.Materialcontext>{data.material}</S.Materialcontext>
          </S.MaterierBox>
        </div>
        {/* </GridWrapper> */}
        <div className="StoreD__right_wrap">
          <S.Userbox>
            <S.Userinf>
              {profile !== null ? (
                <S.Userprofile src={profile} alt="펀딩 이미지 미리보기" />
              ) : (
                <S.Userprofile
                  src={`${process.env.PUBLIC_URL}/image/profile.webp`}
                  alt="기본 프로필"
                />
              )}
              <S.Upcycler>{data.displayName}</S.Upcycler>
            </S.Userinf>
            {userData.memberId === data.memberId ? (
              <S.ButtonContainer>
                <S.Button onClick={deleteStore}>삭제</S.Button>
                <S.LinkEdit to={`/storeedit/${data.sellId}`}>
                  <S.Button>수정</S.Button>
                </S.LinkEdit>
              </S.ButtonContainer>
            ) : null}
          </S.Userbox>
          <S.Subbox>
            <S.SubTitle>
              🛒 스토어 {">"} {data.sellCategoryName}
            </S.SubTitle>
            <S.ViewCount>조회수 {data.viewCount}</S.ViewCount>
          </S.Subbox>
          <S.ItemName>
            <h3>{data.title}</h3>
          </S.ItemName>
          <S.ItemInfo>{data.content}</S.ItemInfo>
          {localStorage.getItem("token") &&
            userData.memberId !== data.memberId && (
              <>
                <S.AmountBox>
                  <S.Text>상품 금액</S.Text>
                  <S.Text>{formatPriceWithCommas(data.price)}원</S.Text>
                </S.AmountBox>
                <S.Quantity>
                  <S.Text>수량</S.Text>
                  <div>
                    <S.Quantitybox
                      value={quantity}
                      label="quantity"
                      onChange={handleChange}
                    >
                      <S.Option>선택해주세요.</S.Option>
                      <S.Option value={1}>1개</S.Option>
                      <S.Option value={2}>2개</S.Option>
                      <S.Option value={3}>3개</S.Option>
                      <S.Option value={4}>4개</S.Option>
                      <S.Option value={5}>5개</S.Option>
                    </S.Quantitybox>
                  </div>
                </S.Quantity>
                <S.Quantity>
                  <S.SubTitle>총 결제 금액 </S.SubTitle>
                  <div>
                    {quantity ? (
                      <S.TotalAmount>
                        {formatPriceWithCommas(data.price * quantity)}원
                      </S.TotalAmount>
                    ) : (
                      <S.TotalAmount>
                        {formatPriceWithCommas(data.price * quantity)}
                      </S.TotalAmount>
                    )}
                  </div>
                </S.Quantity>

                <S.CreateButton onClick={handleOpenModal}>
                  구매하기
                </S.CreateButton>
              </>
            )}

          {!localStorage.getItem("token") && (
            <Link to="/login">
              <S.CreateButton>로그인 이후 구매 가능합니다</S.CreateButton>
            </Link>
          )}
        </div>
      </GridWrapper>
      {isModalOpen && (
        <Modal
          data={data}
          userData={userData}
          quantity={quantity}
          setQuantity={setQuantity}
          setIsModalOpen={setIsModalOpen}
        />
      )}
      <S.InfoWrapper>
        <div className="item-info">
          <h2>제품 상세 정보</h2>
          <img src={data.contentImage} alt="img" />
        </div>
        <p className="footer">IEUN CO.</p>
      </S.InfoWrapper>
    </MaxWidthContainer>
  );
};

export default StoreDetail;
