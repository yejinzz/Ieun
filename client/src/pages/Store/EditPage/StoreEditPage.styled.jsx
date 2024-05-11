import styled from "styled-components";

export const LeftArea = styled.div`
  & > p {
    margin: 1rem 0;
    font-size: 0.875rem;
  }
`;

export const RightArea = styled.div`
  & > button {
    width: 100%;
  }

  .Edit__errMsg {
    margin-top: 5px;
    font-size: 14px;
    color: rgb(221, 106, 106);
  }
`;
export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .item-info {
    width: 100%;
    display: flex;
    flex-direction: column;
    text-align: center;
    margin-top: 50px;
    h2 {
      color: #6e934d;
      margin: 10px 0 50px 0;
      font-size: 22px;
      font-weight: bold;
      border-bottom: 1px solid rgb(243, 244, 246);
      padding-bottom: 20px;
    }
  }
  .footer {
    width: 100vw;
    margin-top: 20px;
    background-color: #6e934d;
    text-align: center;
    padding: 1rem;
    color: #fff;
    font-size: 20px;
  }
`;

export const MaterierBox = styled.div`
  background-color: rgb(249, 250, 251);
  border-radius: 5px;
  padding: 1rem;
  & > p {
    font-size: 12px;
  }
`;

export const InfoText = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  margin: 10px 0;
  & > span {
    font-size: 1.3rem;
    font-weight: 600;
    color: #6e934d;
    margin: 0 2px;
  }
`;
