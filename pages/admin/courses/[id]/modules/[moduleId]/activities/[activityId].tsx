import FileInputBox from "@components/forms/file-input-box";
import InputBox from "@components/forms/input-box";
import SelectBox from "@components/forms/select-box";
import { withAuth } from "@components/__hocs/with-auth";
import { withAuthSSR } from "@components/__hocs/with-auth-ssr";
import withLayouts from "@components/__hocs/with-layouts";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { ApiContext } from "src/providers/api-provider";
import { GeneralContext } from "src/providers/general-provider";
import * as yup from "yup";
import { ACCEPT } from "@configs/constants";

const schema = yup.object().shape({
  name: yup.string().required("Course Name is required"),
  description: yup.string(),
  type: yup.string().required("Activity Type is required"),
  attachment: yup.string(),
});

const UpdateActivity = withAuth(() => {
  const router = useRouter();
  const [type, setType] = useState();
  const { loading, post, put, get, ready } = useContext(ApiContext);
  const { setHistories } = useContext(GeneralContext);
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const { data, refetch: getModuleById } = useQuery('getActivityById', async () => {
    const data = await get(`/activities/${router.query.activityId}`);

    return data;
  }, {
    enabled: false,
  });

  const { mutateAsync: updateActivity } = useMutation(async (payload: any) => {
    const data = await put(`/activities/${router.query.activityId}`, payload);

    return data;
  });

  useEffect(() => {
    setHistories([
      { title: "Courses", path: "/admin/courses" },
      {
        title: `Course Modules ${(router.query.id as string).substring(0, 4)}`,
        path: `/admin/courses/${router.query.id}/modules`,
      },
      {
        title: `Module Activities ${(router.query.moduleId as string).substring(
          0,
          4
        )}`,
        path: `/admin/courses/${router.query.id}/modules/${router.query.moduleId}/activities`,
      },
      {
        title: `Update Activity ${(router.query.activityId as string).substring(0,4)}`,
        path: `/admin/courses/${router.query.id}/modules/${router.query.moduleId}/activities/${router.query.activityId}`,
      },
    ]);
  }, []);

  const onSubmit = async (data: any) => {
    data.moduleId = router.query.moduleId;
    const updated = await updateActivity(data);
    if (updated) {
      router.push(
        `/admin/courses/${router.query.id}/modules/${router.query.moduleId}/activities`
      );
    }
  };

  const uploadFile = async (files: FileList) => {
    if (!files || files.length === 0) return;
    const file = files.item(0);
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    const data = await post(`/files/upload`, formData, true, true);
    if (data) {
      setValue("attachment", data.name);
    }
  };

  useEffect(() => {
    if (ready) {
      getModuleById();
    }
  }, [ready]);

  useEffect(() => {
    if(data){
      setType(data.type);
    }
  }, [data]);
  
  return (
    <>
      {data && (
        <form
          className="bg-white w-full shadow-md rounded-md px-8 pt-6 pb-8 mb-4 flex flex-col space-y-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            name="name"
            control={control}
            defaultValue={data.name}
            render={({ field }) => (
              <InputBox
                type="text"
                placeholder="Activity Name"
                error={errors.name?.message?.toString() || ""}
                {...field}
              />
            )}
          />

          <Controller
            name="description"
            control={control}
            defaultValue={data.description}
            render={({ field }) => (
              <InputBox
                type="text"
                placeholder="Activity Description"
                error={errors.description?.message?.toString() || ""}
                {...field}
              />
            )}
          />

          <Controller
            name="type"
            control={control}
            defaultValue={data.type}
            render={({ field }) => (
              <SelectBox
                options={[
                  { label: "Select Activity Type", value: "" },
                  {
                    label: "Video",
                    value: "video",
                  },
                  {
                    label: "Presentation",
                    value: "presentation",
                  },
                ]}
                placeholder="Activity Type"
                error={errors.type?.message?.toString() || ""}
                {...field}
                onChange={(e: any) => {
                  setType(e.target.value);
                  field.onChange(e);
                }}
              />
            )}
          />
          {type && (
            <FileInputBox
              name="attachment"
              error={errors.description?.message?.toString() || ""}
              accept={ACCEPT[type as "video" | "presentation"].join(",")}
              placeholder="Cover Image"
              onChange={(e: any) => {
                uploadFile(e);
              }}
            />
          )}

          <Controller
            name="attachment"
            control={control}
            defaultValue={data.attachment}
            render={({ field }) => (
              <input
                type="hidden"
                placeholder="Activity Description"
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
      )}
    </>
  );
}, ["provider"]);

UpdateActivity.getLayout = (page: any) =>
  withLayouts(page, { withFooter: true, withHeader: true, withSidebar: true });

export const getServerSideProps = withAuthSSR(
  async (context: any, user: any) => {
    return user;
  }
);

export default UpdateActivity;
