import styled, { css } from "styled-components";

// History
export const CategoryContainer = styled.div`
  margin: 0 auto;

  hr {
    margin: 2rem 0 1.5rem 0;
    border: none;
    border-top: 1px solid #d1d1d1;
  }
  ul {
    display: flex;
    align-items: start;
    flex-direction: column;
    gap: 1rem;
  }

  @media (max-width: 768px) {
    margin-top: 1rem;
    hr {
      display: none;
    }
    ul {
      flex-direction: row;
    }
  }
`;

export const CategoryList = styled.li`
  ${(props) =>
    props.className === "selected" &&
    css`
      text-decoration: underline;
      text-underline-offset: 0.5rem;
      text-decoration-color: #c0d6b1;
      text-decoration-thickness: 3px;
    `}

  @media (max-width: 768px) {
    margin: 0.4rem auto;
    font-size: 0.7rem;
  }
`;
