import React from "react";
import * as S from "./Details.styled";
import { useParams } from "react-router-dom";

const Details = ({ details, currentPage, setCurrentPage }) => {
  const { path } = useParams();
  const totalCategoryData = details?.[path];
  const { detail } = totalCategoryData;

  const LAST_PAGE = Math.ceil(detail.length / 10);

  const handlePageChange = (e) => {
    setCurrentPage(Number(e.target.outerText));
  };

  return (
    <S.DetailsContainer>
      <S.DetailsTitle>
        <S.DetailsTitleIcon
          src={`${process.env.PUBLIC_URL}/image/logo1.png`}
          alt="cartegory-title-icon"
        />
        <S.DetailsTitleText>{totalCategoryData.title}</S.DetailsTitleText>
      </S.DetailsTitle>

      <S.DetailsTable>
        <thead>
          <tr>
            {totalCategoryData.tableHeader.map((text, idx) => (
              <th key={idx}>{text}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {detail.length > 0 ? (
            detail
              .slice(10 * (currentPage - 1), 10 * currentPage)
              .map((data, idx) => (
                <tr key={idx}>
                  {Object.keys(data).map((key, keyIdx) => (
                    <td key={keyIdx}>{data[key]}</td>
                  ))}
                </tr>
              ))
          ) : (
            <tr>
              <td colSpan={totalCategoryData.tableHeader.length}>
                내역이 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </S.DetailsTable>

      {detail.length > 0 && (
        <S.CustomPagination
          page={currentPage}
          count={LAST_PAGE}
          onChange={handlePageChange}
          shape="rounded"
        />
      )}
    </S.DetailsContainer>
  );
};

export default Details;
