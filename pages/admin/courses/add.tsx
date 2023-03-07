import FileInputBox from "@components/forms/file-input-box";
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
  description: yup.string(),
  keywords: yup.string(),
  coverImage: yup.string().required("Cover Image is required"),
});

const UpdateCourse = withAuth(() => {
  const router = useRouter();
  const { loading, post } = useContext(ApiContext);
  const { setHistories } = useContext(GeneralContext);
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const {
    mutateAsync: createCourse,
  } = useMutation(async (payload: any) => {
    const data = await post(`/courses`, payload);

    return data;
  });

  useEffect(() => {
    setHistories([
      { title: "Courses", path: "/admin/courses" },
      {
        title: `Update Course ${router.query.id}`,
        path: `/admin/courses/${router.query.id}`,
      },
    ]);
  }, []);

  const onSubmit = async (data: any) => {
    data.keywords = data.keywords.split(",").map((keyword: string) => keyword.trim());
    const updated = await createCourse(data);
    if(updated) {
      router.push("/admin/courses");
    }
  }

  const uploadFile = async (files: FileList) => {
    if(!files || files.length === 0) return;
    const file = files.item(0);
    if(!file) return;
    const formData = new FormData();
    formData.append("file", file);
    const data = await post(`/files/upload`, formData, true, true);
    if(data) {
      setValue("coverImage", data.name)
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
              placeholder="Course Name"
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
              placeholder="Course Description"
              error={errors.description?.message?.toString() || ""}
              {...field}
            />
          )}
        />

        <Controller
          name="keywords"
          control={control}
          render={({ field }) => (
            <InputBox
              type="text"
              placeholder="Keywords (pisahkan dengan `,` koma)"
              error={errors.keywords?.message?.toString() || ""}
              {...field}
            />
          )}
        />

        <FileInputBox
          name="coverImage"
          accept="image/*"
          placeholder="Cover Image"
          onChange={(e: any) => {
            uploadFile(e);
          }}
          error={errors.coverImage?.message?.toString() || ""}
        />

        <Controller
          name="coverImage"
          control={control}
          render={({ field }) => (
            <input type="hidden" placeholder="coverImage" {...field} />
          )}
        />
        <div className="flex items-center justify-between">
          <button
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Update
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
