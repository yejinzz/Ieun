import { Link } from "react-router-dom";
import * as S from "./AuthFormWrap.styled";
import GoBack from "../../common/GoBack";

const CommonAuthForm = ({ children }) => {
  return (
    <S.FormContainer>
      <S.BackgroundCover />
      <GoBack />
      <S.FormLogo>
        숨어있는 것들로 세상을 이롭게,
        <Link to="/">
          <S.Logo
            alt="ieun-logo"
            src={`${process.env.PUBLIC_URL}/image/logo6.png`}
          />
        </Link>
      </S.FormLogo>

      <S.Form>{children}</S.Form>
    </S.FormContainer>
  );
};

export default CommonAuthForm;
