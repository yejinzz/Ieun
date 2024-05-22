import { Link } from "react-router-dom";
import styled from "styled-components";

export const MaterierBox = styled.div`
  background-color: rgb(249, 250, 251);
  margin-top: 20px;
  padding: 10px, 0;
  border-radius: 5px;
`;

export const Materiartext = styled.p`
  padding: 0.5rem;
  font-size: 12px;
`;

export const Materialcontext = styled.div`
  margin-top: 10px;
  margin-left: 20px;
  margin-right: 20px;
  font-size: 15px;
`;

export const Userbox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 10px;
  border-bottom: 0.8px solid rgb(236, 236, 238);
`;

export const Userinf = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Userprofile = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;

export const Upcycler = styled.div`
  margin-left: 10px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;

export const Button = styled.button`
  background-color: #6e934d;
  border: none;
  border-radius: 10px;
  height: 30px;
  width: 50px;
  text-align: center;
  cursor: pointer;
  color: #fff;
  margin-left: 10px;
`;

export const LinkEdit = styled(Link)`
  outline: none;
  text-decoration: none;
  color: black;
`;

export const Subbox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const SubTitle = styled.div`
  margin-top: 10px;
  margin-bottom: 15px;
  font-size: 14px;
  font-weight: 600;
`;

export const ViewCount = styled.div`
  font-size: 13px;
`;

export const ItemName = styled.div`
  width: 100%;
  height: 50px;
  font-size: 17px;
  resize: none;
  font-family: Arial, Helvetica, sans-serif;
  white-space: pre-line;
  word-break: break-all;
  margin-bottom: 10px;
`;

export const ItemInfo = styled.div`
  width: 100%;
  height: 300px;
  font-size: 14px;
  margin-top: 5px;
  margin-bottom: 25px;
  font-family: Arial, Helvetica, sans-serif;
  resize: none;
  white-space: pre-line;
  word-break: break-all;
`;

export const AmountBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-top: 15px;
  margin-bottom: 10px;
  border-top: 0.8px solid rgb(236, 236, 238);
`;

export const Text = styled.div`
  font-size: 14px;
  margin-right: 5px;
`;

export const Quantity = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const Quantitybox = styled.select`
  width: 90px;
  height: 20px;
  &:focus {
    outline: none;
  }
`;

export const Option = styled.option`
  font-size: 14px;
  margin-right: 5px;
`;

export const TotalAmount = styled.div`
  margin-top: 10px;
  margin-bottom: 15px;
  font-size: 20px;
  font-weight: 800;
  color: #6e934d;
`;

export const CreateButton = styled.button`
  width: 100%;
  height: 50px;
  font-size: 17px;
  font-weight: 400;
  border: none;
  background-color: #6e934d;
  border-radius: 10px;
  color: #fff;
  cursor: pointer;
  &:hover {
    background-color: #6e934d91;
    border-radius: 10px;
    cursor: pointer;
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
