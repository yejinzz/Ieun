import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userDataActions } from "../../../store/slice/userDataSlice";
import useInputs from "../../../hooks/useInputs";
import * as S from "./EditModal.styled";
import useErrHandler from "../../../hooks/useErrHandler";
import {
  PWD_REGEX,
  isEmpty,
  valEditProfile,
} from "../../../utils/validateInput";
import { patchInfo, verifyPwd } from "../../../api/authApi";
import ImgUploader from "../../common/imgUploader/ImgUploader";
import Input from "../../../components/common/Input";

const EditModal = ({ closeModal, isUnmount }) => {
  const dispatch = useDispatch();
  const { handleInputErr, handleValidation, errMsgObj } = useErrHandler();

  const userData = useSelector((state) => state.userData);

  const [isPasswordVerified, setIsPasswordVerified] = useState(false);
  const [editUserInfo, onChange] = useInputs({
    displayName: userData.displayName,
    password: "",
    verifyPwd: "",
    currentPwd: "",
    thumbNailImage: "",
  });

  const handleInputChange = (e) => {
    onChange(e);
    handleValidation(e, valEditProfile);
  };

  // 유효성 검사
  const IsValidPwd = (e) => {
    onChange(e);

    if (editUserInfo.password !== e.target.value) {
      handleInputErr("verifyPwd", "새 비밀번호와 일치하지 않습니다.");
    } else {
      handleInputErr("verifyPwd", "");
    }
  };

  const updateUserInfo = (e) => {
    e.preventDefault();

    const { displayName, password, thumbNailImage } = editUserInfo;

    const updateCondition = isEmpty(errMsgObj);

    if (updateCondition) {
      patchInfo(userData.memberId, {
        memberId: userData.memberId,
        displayName,
        password,
        thumbNailImage,
      }).then((res) => {
        dispatch(
          userDataActions.setUserData({
            displayName: res.data.displayName,
            thumbNailImage: res.data.thumbNailImage,
          })
        );

        closeModal();
      });
    }
  };

  const handleVerifyPwd = (e) => {
    e.preventDefault();
    verifyPwd({
      memberId: userData.memberId,
      password: editUserInfo.currentPwd,
    })
      .then((res) => {
        if (res.data === "성공") {
          handleInputErr("currentPwd", "");
          setIsPasswordVerified(true);
        }
      })
      .catch((err) => {
        if (err.response.data === "실패");
        handleInputErr("currentPwd", "비밀번호가 일치하지 않습니다.");
        setIsPasswordVerified(false);
      });
  };

  return (
    <S.ModalContainer>
      {!isPasswordVerified ? (
        <S.FirstModalWrapper isUnmount={isUnmount}>
          <S.StyledCloseIcon onClick={closeModal} />
          <S.ModalContent onSubmit={handleVerifyPwd}>
            <Input
              variant="outline"
              label="현재 비밀번호"
              type="password"
              name="currentPwd"
              placeholder="현재 비밀번호를 입력해주세요."
              onChange={handleInputChange}
              errMsg={errMsgObj.currentPwd}
            />
            <S.EditButton onClick={handleVerifyPwd}>Next</S.EditButton>
          </S.ModalContent>
        </S.FirstModalWrapper>
      ) : (
        <S.SecondModalWrapper isUnmount={isUnmount}>
          <S.StyledCloseIcon onClick={closeModal} />
          <ImgUploader
            onChange={handleInputChange}
            name="thumbNailImage"
            purpose="profile"
          />
          <S.ModalContent onSubmit={updateUserInfo}>
            <div className="Edit__email">
              <label>이메일</label>
              <p>{userData.email}</p>
            </div>
            <Input
              variant="outline"
              label={
                userData.memberRole === "MEMBER_USER" ? "닉네임" : "업사이클러"
              }
              type="text"
              name="displayName"
              defaultValue={userData.displayName}
              value={editUserInfo.displayName}
              placeholder="닉네임을 입력해주세요"
              onChange={handleInputChange}
              errMsg={errMsgObj.displayName}
            />
            <Input
              variant="outline"
              label="새 비밀번호 (선택)"
              type="password"
              name="password"
              placeholder="새 비밀번호를 입력해주세요."
              onChange={handleInputChange}
              errMsg={errMsgObj.password}
            />
            <Input
              variant="outline"
              label="새 비밀번호 확인"
              type="password"
              name="verifyPwd"
              placeholder="새 비밀번호를 한번 더 입력해주세요."
              onChange={IsValidPwd}
              errMsg={errMsgObj.verifyPwd}
            />
            <S.EditButton type="submit">Edit</S.EditButton>
          </S.ModalContent>
        </S.SecondModalWrapper>
      )}
      <S.ModalLayer onClick={closeModal}></S.ModalLayer>
    </S.ModalContainer>
  );
};

export default EditModal;
