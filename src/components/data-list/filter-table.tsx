import InputBox from "@components/forms/input-box";
import SelectBox from "@components/forms/select-box";
import React, { useState } from "react";
import { FaList, FaSearch } from "react-icons/fa";

export interface IFilterProps {
  onSearch: (search: string) => void;
  onLimitChange: (limit: number) => void;
}

export const FilterTable: React.FC<IFilterProps> = ({onSearch, onLimitChange}) => {
  const [keyword, setKeyword] = useState<string>("");
  const [limit, setLimit] = useState<number>(10);

  const handleSearch = (e: any) => {
    setKeyword(e.target.value)
    onSearch(e.target.value);
  }

  const handleLimitChange = (e: any) => {
    setLimit(Number(e.target.value))
    onLimitChange(Number(e.target.value));
  }

  return (
    <div className="w-full flex justify-between flex-wrap">
      <SelectBox
        className="w-full sm:w-auto"
        Icon={FaList}
        placeholder="Limit"
        options={[
          { value: "10", label: "10" },
          { value: "25", label: "25" },
        ]}
        onChange={(e) => handleLimitChange(e)}
      />
      <InputBox
        className="mt-3 sm:mt-0 w-full sm:w-auto"
        Icon={FaSearch}
        type="text"
        placeholder="Search"
        onChange={(e) => handleSearch(e)}
      />
    </div>
  );
}