import { ReactNode } from "react";

export interface IColumns {
  title: string;
  dataIndex: string;
  key: string;
  width?: number;
  render?: (record: any) => ReactNode;
}

export interface ICustomTable {
  columns: IColumns[];
  data: any[];
}

export const CustomTable = ({columns, data} : ICustomTable) => {
  
  if(!data || data.length === 0){
    return (
      <div className="p-5 w-full mt-5 flex justify-center items-center shadow-md">
        <p className="text-gray-800">No data</p>
      </div>
    )
  }

  return (
    <table className="w-full flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-md my-5">
      <thead className="text-white">
        {data?.map((item, index) => (
          <tr
            key={"head" + index}
            className="bg-gray-700 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0"
          >
            {columns.map((column) => (
              <th
                key={"column-" + column.key + index}
                className="p-3 text-left"
                style={{ width: column.width || "auto" }}
              >
                {column.title}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody className="flex-1 sm:flex-none">
        {data?.map((item, index) => (
          <tr
            key={"data-" + index}
            className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0"
          >
            {columns.map((column, index) => (
              <td
                key={"data-column" + index}
                className="border-grey-light border hover:bg-gray-100 p-3"
              >
                {column.render ? column.render(item) : item[column.dataIndex]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}