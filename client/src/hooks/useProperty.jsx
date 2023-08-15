import React from "react";
import { useQuery } from "react-query";
import { getResidency } from "../utils/api.js";

const useProperty = (id) => {

  const { data, isLoading, isError, refetch } = useQuery(
    ["residency", id],
    () => getResidency(id),
    { refetchOnWindowFocus: false }
  );
  return { data, isError, isLoading, refetch };
};

export default useProperty;
