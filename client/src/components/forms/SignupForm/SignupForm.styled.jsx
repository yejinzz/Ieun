import styled from "styled-components";

export const SignupFormContainer = styled.form`
  display: grid;
  grid-gap: 1.5rem;
`;
export const InputFieldBox = styled.div`
  .Signup__email_field {
    display: flex;
    align-items: center;
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
`;
