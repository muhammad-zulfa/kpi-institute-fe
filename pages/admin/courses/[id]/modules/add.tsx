import InputBox from "@components/forms/input-box";
import { withAuth } from "@components/__hocs/with-auth";
import { withAuthSSR } from "@components/__hocs/with-auth-ssr";
import withLayouts from "@components/__hocs/with-layouts";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { ApiContext } from "src/providers/api-provider";
import { GeneralContext } from "src/providers/general-provider";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Course Name is required"),
  description: yup.string()
});

const UpdateCourse = withAuth(() => {
  const router = useRouter();
  const { loading, post } = useContext(ApiContext);
  const { setHistories } = useContext(GeneralContext);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const {
    mutateAsync: createModules,
  } = useMutation(async (payload: any) => {
    const data = await post(`/modules`, payload);

    return data;
  });

  useEffect(() => {
    setHistories([
      { title: "Courses", path: "/admin/courses" },
      {
        title: `Course Modules ${(router.query.id as string).substring(0,4)}`,
        path: `/admin/courses/${router.query.id}/modules`,
      },
      {
        title: `Add Course Module ${(router.query.id as string).substring(0,4)}`,
        path: `/admin/courses/${router.query.id}/modules/add`,
      },
    ]);
  }, []);

  const onSubmit = async (data: any) => {
    data.courseId = router.query.id;
    const updated = await createModules(data);
    if(updated) {
      router.push(`/admin/courses/${router.query.id}/modules`);
    }
  }

  return (
    <>
      <form
        className="bg-white w-full shadow-md rounded-md px-8 pt-6 pb-8 mb-4 flex flex-col space-y-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <InputBox
              type="text"
              placeholder="Module Name"
              error={errors.name?.message?.toString() || ""}
              {...field}
            />
          )}
        />

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <InputBox
              type="text"
              placeholder="Module Description"
              error={errors.description?.message?.toString() || ""}
              {...field}
            />
          )}
        />

        <div className="flex items-center justify-between">
          <button
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
}, ["provider"]);

UpdateCourse.getLayout = (page: any) =>
  withLayouts(page, { withFooter: true, withHeader: true, withSidebar: true });

export const getServerSideProps = withAuthSSR(
  async (context: any, user: any) => {
    return user;
  }
);

export default UpdateCourse;
