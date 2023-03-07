import { CourseList } from '@components/data-list/course-list'
import { Pagination } from '@components/data-list/pagination'
import InputBox from '@components/forms/input-box'
import { withAuthSSR } from '@components/__hocs/with-auth-ssr'
import withLayouts from '@components/__hocs/with-layouts'
import { getTotalPages } from '@utils/helper'
import { debounce } from 'lodash'
import { Inter } from 'next/font/google'
import { useContext, useEffect, useState } from 'react'
import { FaSearch } from "react-icons/fa"
import { useQuery } from 'react-query'
import { ApiContext } from 'src/providers/api-provider'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const {get, ready, loading} = useContext(ApiContext)
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [course,  setCourse] = useState<any>([])
  const { data, refetch: getCourse} = useQuery('courses', async () => await get('/courses', {keyword: search, page, limit: 12}), { enabled: false })

  const handleSearch = debounce((e) => {
    setSearch(e.target.value);
  }, 500)

  useEffect(() => {
    if(!loading && ready) {
      getCourse()
    }
  }, [ready])

  useEffect(() => {
    if(!loading && ready) {
      getCourse()
    }
  }, [search, page])

  useEffect(() => {
    if(data && data.data){
      setCourse([...course, ...data.data])
    }
  }, [data]);

  return (
    <div className="flex flex-grow flex-col w-full mt-3">
      <InputBox
        className="lg:w-1/3 w-full lg:self-end"
        placeholder="Search Course"
        onChange={handleSearch}
        Icon={FaSearch}
      />
      <CourseList
        courses={data?.data}
        className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 justify-center "
      />
      <Pagination
        className="mt-6"
        currentPage={page}
        onPageChange={setPage}
        totalPages={getTotalPages(data?.total, 12)}
      />
    </div>
  );
}

export const getServerSideProps = withAuthSSR(
  async (context: any, user: any) => {
    if (user.role == "admin" || user.role == "provider") {
      context.res.writeHead(302, {
        // or 301
        Location: "/admin/dashboard",
      });
      context.res.end();
    }
    return user;
  }
);

Home.getLayout = (page: any) => withLayouts(page, { withFooter: true, withHeader: true, withSidebar: false })
