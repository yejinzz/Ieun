import { useCallback, useState } from "react";
import useInputs from "../../../hooks/useInputs";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../common/Button";
import Input from "../../common/Input";
import { axiosInstance } from "../../../api/axiosInstance";
import { LoadingSpiner } from "../../common/LoadingSpiner";
import useErrHandler from "../../../hooks/useErrHandler";
import { isEmpty, validationsSignup } from "../../../utils/validateInput";
import { postSignup } from "../../../api/authApi";
import * as S from "./SignupForm.styled";

const SignupForm = () => {
  const { role } = useParams();
  const navigate = useNavigate();
  const { handleValidation, handleInputErr, errMsgObj } = useErrHandler();

  /* 이메일 인증번호 전송 여부*/
  const [authCode, setAuthCode] = useState("");
  const [isAuthCodeSent, setIsAuthCodeSent] = useState(false);
  const [loading, setLoading] = useState(false);

  /* 회원가입 데이터 객체*/
  const [signupInfo, onChange] = useInputs({
    displayName: "",
    email: "",
    password: "",
    role: role,
    verifyPwd: "",
    code: "",
  });

  /* 가입 정보 유효성 검사 */
  const handleInputChange = (e) => {
    handleValidation(e, validationsSignup);
    onChange(e);
  };

  const IsValidPwd = useCallback(
    (e) => {
      onChange(e);
      if (signupInfo.password !== e.target.value) {
        handleInputErr("verifyPwd", "비밀번호가 일치하지 않습니다.");
      } else {
        handleInputErr("verifyPwd", "");
      }
    },
    [signupInfo]
  );

  /* 계정 생성 */
  const createAccount = (e) => {
    e.preventDefault();

    const { displayName, email, password, role, code } = signupInfo;

    if (!isEmpty(errMsgObj)) {
      return alert("입력락을 확인해주세요.");
    } else if (!isEmpty(signupInfo)) {
      return postSignup({ displayName, email, password, role, code })
        .then((res) => {
          if (res.status === 201) {
            alert("회원가입이 완료 되었습니다.");
            navigate("/login");
          }
        })
        .catch((err) => {
          if (err.response.data === "DisplayName exists") {
            handleInputErr("displayName", "중복된 닉네임입니다.");
          }

          if (err.response.data === "Email exists") {
            handleInputErr("email", "중복된 이메일입니다.");
          }
        });
    }
  };

  /* 이메일 인증 메일 전송*/
  const sendAuthCode = () => {
    const { email } = signupInfo;

    if (!email) {
      return handleInputErr("email", "이메일을 입력하세요.");
    } else if (!errMsgObj.email) {
      handleInputErr("email", "");
      setLoading(true);
      return axiosInstance
        .post("/members/sendmail", { email })
        .then((res) => {
          setAuthCode(res.data.message);
          setIsAuthCodeSent(true);
          setLoading(false);
        })
        .catch((err) => {
          if (err.response.data.message === "이미 존재하는 이메일입니다.") {
            handleInputErr("email", err.response.data.message);
            setLoading(false);
          }
        });
    }
  };
  /* 인증번호 확인 */
  const CheckAuthCode = () => {
    const { code } = signupInfo;

    if (code === authCode) {
      handleInputErr("code", "");

      return alert("인증이 완료되었습니다.");
    }
    if (code !== authCode) {
      return handleInputErr("code", "인증번호를 확인해주세요.");
    }
  };

  return (
    <S.SignupFormContainer onSubmit={createAccount}>
      <S.InputFieldBox>
        <div className="signup__email_field">
          <Input
            variant="primary"
            label="이메일"
            type="email"
            placeholder="이메일을 입력하세요."
            name="email"
            onChange={handleInputChange}
            // errMsg={errMsgObj.email}
            color="#fff"
          />
          <Button type="button" onClick={sendAuthCode}>
            {loading ? (
              <div className="button-loading">
                <LoadingSpiner />
                인증 요청
              </div>
            ) : (
              "인증 요청"
            )}
          </Button>
        </div>
        <p>{errMsgObj.email && errMsgObj.email}</p>
      </S.InputFieldBox>

      {isAuthCodeSent && (
        <S.InputFieldBox>
          <div className="Signup__flex-row">
            <Input
              variant="primary"
              label="인증번호"
              type="text"
              placeholder="인증번호를 입력하세요."
              name="code"
              onChange={handleInputChange}
              color="#fff"
            />
            <Button type="button" onClick={CheckAuthCode}>
              인증 확인
            </Button>
          </div>
          <p>{errMsgObj.code}</p>
        </S.InputFieldBox>
      )}
      <Input
        variant="primary"
        label={signupInfo.role === "users" ? "닉네임" : "업사이클러명"}
        type="text"
        placeholder={
          signupInfo.role === "users"
            ? "닉네임을 입력하세요."
            : "업사이클러명을 입력하세요."
        }
        name="displayName"
        onChange={handleInputChange}
        errMsg={errMsgObj.displayName}
        color="#fff"
      />

      <Input
        variant="primary"
        label="비밀번호"
        type="password"
        placeholder="비밀번호를 입력하세요."
        name="password"
        onChange={handleInputChange}
        errMsg={errMsgObj.password}
        color="#fff"
      />

      <Input
        variant="primary"
        label="비밀번호 확인"
        type="password"
        placeholder="비밀번호를 한번 더 입력하세요."
        name="verifyPwd"
        onChange={IsValidPwd}
        errMsg={errMsgObj.verifyPwd}
        color="#fff"
      />

      <Button type="submit" formFields={signupInfo}>
        sign up
      </Button>
    </S.SignupFormContainer>
  );
};

export default SignupForm;
