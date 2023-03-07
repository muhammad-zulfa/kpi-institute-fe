import { CustomTable, IColumns } from "@components/data-list/custom-table";
import { FilterTable } from "@components/data-list/filter-table";
import { usePagination } from "@components/hooks/usePagination";
import { withAuth } from "@components/__hocs/with-auth";
import { withAuthSSR } from "@components/__hocs/with-auth-ssr";
import withLayouts from "@components/__hocs/with-layouts";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { FaCogs, FaEdit, FaPlus, FaTrashAlt } from "react-icons/fa";
import { useQuery } from "react-query";
import { ApiContext } from "src/providers/api-provider";
import { GeneralContext } from "src/providers/general-provider";

const Courses = withAuth(() => {
  const columns: IColumns[] = [
    {
      key: "name",
      dataIndex: "name",
      title: "Name",
      render: (item: any) => <span>{item.name || "-"}</span>,
    },
    {
      key: "keywords",
      dataIndex: "keywords",
      title: "KEYWORDS",
      render: (item: any) => <span>{item.keywords.join(", ") || "-"}</span>,
    },
    {
      key: "action",
      dataIndex: "action",
      title: "Action",
      width: 150,
      render: (item: any) => (
        <div className="flex space-x-6 justify-center py-1">
          <Link href={`/admin/courses/${item.id}/modules`}>
            <FaCogs className="text-blue-500" />
          </Link>
          <Link href={`/admin/courses/${item.id}/update`}>
            <FaEdit className="text-blue-500" />
          </Link>
          <Link href={'#'} onClick={() => deleteCourse(item.id)}>
            <FaTrashAlt className="text-red-500" />
          </Link>
        </div>
      ),
    },
  ];

  const router = useRouter();
  const { loading, get, ready, del } = useContext(ApiContext);
  const [courses, setCourses] = useState<any[]>([]);
  const pagination = usePagination();
  const { setHistories }  = useContext(GeneralContext);

  const {
    status,
    isLoading,
    data,
    refetch: getCourses,
  } = useQuery(
    "fetch-courses",
    async () => {
      const data = await get("/courses", pagination.filters);

      return data;
    },
    { refetchOnMount: false, enabled: false }
  );

  useEffect(() => {
    if (data && !isLoading) {
      setCourses(data.data);
    }
  }, [isLoading, data]);

  useEffect(() => {
    if (!loading && ready) {
      getCourses();
    }
  }, [pagination.filters, ready]);

  
  useEffect(() => {
    setHistories([{ title: "Courses", path: "/admin/courses" }]);
  }, []);

  const deleteCourse = async (id: string) => {
    try {
      await del(`/courses/${id}`);

      getCourses();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <FilterTable
        onSearch={pagination.handleSearch}
        onLimitChange={pagination.handleLimitChange}
      />
      <CustomTable columns={columns} data={courses} />
      <button
        onClick={() => {router.push('/admin/courses/add')}}
        type="button"
        className="hover:bg-blue-500 fixed flex p-4 items-center justify-center right-7 bottom-14 rounded-full w-14 h-14 bg-blue-700 shadow-lg"
      >
        <FaPlus className="text-white text-xl" />
      </button>
    </>
  );
}, ["provider", "admin"])

Courses.getLayout = (page: any) =>
  withLayouts(page, { withFooter: true, withHeader: true, withSidebar: true });

export const getServerSideProps = withAuthSSR(
  async (context: any, user: any) => {
    return user;
  }
);

export default Courses;
