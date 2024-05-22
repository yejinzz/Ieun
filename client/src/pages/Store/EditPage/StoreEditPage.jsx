import React, { useCallback } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as S from "./StoreEditPage.styled";
import useErrHandler from "../../../hooks/useErrHandler";
import useInputs from "../../../hooks/useInputs";
import { validationsPost } from "../../../utils/validateInput";
import { patchEditSell } from "../../../api/editApi";
import { getSellData } from "../../../api/getDatas";
import {
  GridWrapper,
  MaxWidthContainer,
  ThumbnailImg,
} from "../../../styles/CommonStyle";
import TextArea from "../../../components/common/TextArea";
import Input from "../../../components/common/Input";
import Button from "../../../components/common/Button";

const StoreEditPage = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { handleValidation, errMsgObj } = useErrHandler();

  const sellId = pathname.split("/").pop();

  const [editData, onChange, setEditData] = useInputs({});

  const handleInputChange = useCallback((e) => {
    handleValidation(e, validationsPost);
    onChange(e);
  }, []);

  useEffect(() => {
    getSellData(sellId).then((response) => {
      setEditData((prevData) => ({ ...prevData, ...response.data }));
    });
  }, []);

  const handleSavaEdit = () => {
    const { title, content, totalQuantity } = editData;
    patchEditSell(sellId, {
      upcyclingId: sellId,
      title: title,
      content: content,
      totalQuantity: totalQuantity,
    }).then(() => {
      navigate(`/storedetail/${sellId}`);
    });
  };

  return (
    <MaxWidthContainer>
      <GridWrapper>
        <S.LeftArea>
          <ThumbnailImg
            src={editData.thumbNailImage}
            alt="제품 대표 이미지 미리보기"
          />

          <S.MaterierBox>
            <p>판매자가 작성한 제품에 사용된 업사이클링 품목입니다.</p>
            <p>{editData.material}</p>
          </S.MaterierBox>
        </S.LeftArea>
        <S.RightArea>
          <Input
            variant="outline"
            name="title"
            placeholder="40자 이내로 입력해주세요."
            defaultValue={editData.title}
            maxLength="40"
            onChange={handleInputChange}
          />
          <p className="Edit__errMsg">{errMsgObj.title}</p>

          <TextArea
            boxSize="25rem"
            placeholder="500자 이내로 입력해주세요."
            name="content"
            defaultValue={editData.content}
            maxLength="500"
            onChange={handleInputChange}
          />
          <p className="Edit__errMsg">{errMsgObj.content}</p>

          <S.InfoText>
            카테고리는 <span>{editData.sellCategoryName}</span>로
            선택하셨습니다.
          </S.InfoText>
          <S.InfoText>
            가격은 <span>{editData.price}</span>원으로 선택하셨습니다.
          </S.InfoText>
          <Button onClick={handleSavaEdit}>수정하기</Button>
        </S.RightArea>
      </GridWrapper>

      <S.InfoWrapper>
        <div className="item-info">
          <h2>제품 상세 정보</h2>
          <img src={editData.contentImage} alt="img" />
        </div>
        <p className="footer">IEUN CO.</p>
      </S.InfoWrapper>
    </MaxWidthContainer>
  );
};

export default StoreEditPage;
