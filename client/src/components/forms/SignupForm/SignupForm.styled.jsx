import styled from "styled-components";

export const SignupFormContainer = styled.form`
  display: grid;
  grid-gap: 1.5rem;
`;
export const InputFieldBox = styled.div`
  /* display: flex;
  flex-direction: row;
  align-items: center; */
  button {
    height: fit-content;
  }
  .signup__email_field {
    display: flex;
    align-items: flex-end;
    gap: 1rem;

    .button-loading {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    & > div {
      flex-grow: 1;
    }
  }
  & p {
    margin-top: 5px;
    font-size: 14px;
    color: rgb(221, 106, 106);
  }
`;
