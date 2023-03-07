import InputBox from "@components/forms/input-box";
import withLayouts from "@components/__hocs/with-layouts";
import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import { FaLock, FaUser } from "react-icons/fa";
import * as yup from "yup";

const schema = yup.object().shape({
  username: yup
    .string()
    .required("Email is required"),
  password: yup.string().required("Password is required")
});

export const SignIn = ({ showAlert }: any) => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    await signIn(
      "credentials",
      {
        redirect: true,
        callbackUrl: "/",
        username: data.username,
        password: data.password,
      }
    );
  };

  return (
    <div className="flex-1 w-full md:w-1/2 lg:w-1/3 flex flex-col justify-center items-center">
      <h1 className="text-xl font-bold">Sign In to KPI Institute</h1>
      <form
        className="bg-white w-full shadow-md rounded-md px-8 pt-6 pb-8 mb-4 flex flex-col space-y-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <InputBox
              Icon={FaUser}
              type="text"
              placeholder="Email or Username"
              error={errors.email?.message?.toString() || ""}
              {...field}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <InputBox
              Icon={FaLock}
              type="password"
              placeholder="Password"
              error={errors.password?.message?.toString() || ""}
              {...field}
            />
          )}
        />
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
          <Link
            href="/auth/sign-up"
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          >
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
};

SignIn.getLayout = (page: any) =>
  withLayouts(page, {
    withFooter: false,
    withHeader: false,
    withSidebar: false,
  });

export default SignIn;
