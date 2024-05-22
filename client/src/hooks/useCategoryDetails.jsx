import { useCallback, useState } from "react";
import { detailsInfo } from "../datas/detailsInfo";

const useCategoryDetails = () => {
  const [details, setDetails] = useState(detailsInfo);

  const setCategoryDetails = useCallback((category, data) => {
    setDetails((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        detail: [...prev[category].mapFunction(data)],
      },
    }));
  }, []);

  return { details, setCategoryDetails };
};

export default useCategoryDetails;
