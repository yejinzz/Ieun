import styled from "styled-components";

export const FormSectionContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  margin: 3rem 0;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;
export const InputSection = styled.div`
  .err-msg {
    width: fit-content;
    font-size: 0.85rem;
    color: red;
    margin-top: 0.5rem;
  }
  .input-label {
    display: block;
    font-size: 1.1rem;
    font-weight: bold;
    margin: 0.8rem 0;
    & > span {
      font-size: 18px;
      color: red;
      margin-left: 3px;
    }
  }
`;
