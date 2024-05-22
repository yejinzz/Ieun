import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-columns: 15% 85%;
  max-width: 1000px;
  margin: auto;
  @media (max-width: 768px) {
    grid-template-columns: 1fr 3fr;
  }
`;

export const ContainerBottom = styled.div`
  border-left: 1px solid var(--color-gray-30);
  padding-left: 3rem;
  height: 100%;
  margin-bottom: calc(90vh - 400px);
  & > h1 {
    font-size: 2rem;
    font-weight: 700;
    color: var(--color-main);
    margin: 1rem 0;
  }
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const Funding = styled.div`
  /* float: right; */
  display: grid;
  width: 100%;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
