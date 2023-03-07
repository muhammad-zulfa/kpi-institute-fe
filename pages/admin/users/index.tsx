import { CustomTable, IColumns } from "@components/data-list/custom-table";
import { FilterTable } from "@components/data-list/filter-table";
import { usePagination } from "@components/hooks/usePagination";
import { withAuth } from "@components/__hocs/with-auth";
import { withAuthSSR } from "@components/__hocs/with-auth-ssr";
import withLayouts from "@components/__hocs/with-layouts";
import { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { ApiContext } from "src/providers/api-provider";
import { GeneralContext } from "src/providers/general-provider";

const columns: IColumns[] = [
  {
    key: "name",
    dataIndex: "name",
    title: "Name",
    width: 130,
    render: (item: any) => <span>{item.fullname || '-'}</span>,
  },
  {
    key: "email",
    dataIndex: "email",
    title: "EMAIL",
    width: 130,
    render: (item: any) => <span>{item.email || '-'}</span>,
  },
  {
    key: "action",
    dataIndex: "action",
    title: "Action",
    width: 130,
    render: (item: any) => <span>Update</span>,
  },
];

export const Users = withAuth(() => {
  const { loading, get, ready } = useContext(ApiContext);
  const { setHistories } = useContext(GeneralContext);
  const [users, setUsers] = useState<any[]>([]);
  const pagination = usePagination()

  const { status, isLoading, data, refetch: getUser } = useQuery(
    "fetch-users",
    async () => {
      const data = await get("/users", pagination.filters);

      return data;
    },
    { refetchOnMount: false, enabled: false }
  );

  useEffect(() => {
    if(data && !isLoading){
      setUsers(data.data)
    }

  }, [isLoading, data]);

  useEffect(() => {
    if (!loading && ready) {
      getUser()
    }
  }, [pagination.filters]);

  useEffect(() => {
    setHistories([{ title: 'Users', path: '/admin/users'}])
  },[])

  return (
    <>
      <FilterTable
        onSearch={pagination.handleSearch}
        onLimitChange={pagination.handleLimitChange}
      />
      <CustomTable columns={columns} data={users} />
    </>
  );
}, ['admin', 'provider'])


Users.getLayout = (page: any) =>
  withLayouts(page, { withFooter: true, withHeader: true, withSidebar: true });

export const getServerSideProps = withAuthSSR(
  async (context: any, user: any) => {
    return user;
  }
)

export default Users;