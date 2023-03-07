import { debounce } from "lodash";
import { useState } from "react";

export const usePagination = () => {
  const [filters, setFilters] = useState<any>({
    page: 1,
    limit: 10,
    keyword: "",
  });

  const handlePageChange = (page: number) => {
    setFilters({...filters, page});
  };

  const handleLimitChange = (limit: number) => {
    setFilters({...filters, limit});
  };
  
  const handleSearch = debounce((e: string) => {
    setFilters({
      ...filters,
      keyword: e,
    });
  }, 500);

  return {
    filters,
    handlePageChange,
    handleLimitChange,
    handleSearch,
  };
}