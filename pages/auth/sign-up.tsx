import InputBox from "@components/forms/input-box";
import withLayouts from "@components/__hocs/with-layouts";
import { API } from "@configs/api";
import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { useMutation } from "react-query";
import * as yup from "yup";

const schema = yup.object().shape({
  fullname: yup.string().required("Fullname is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

export const SignUp = ({showAlert}: any)  => {
  const registerUser = useMutation(async (data: any) => {
    const api = new API()
    return await api.post("auth/register").payload(data)
    .fetch()
  })
  
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    const {data: response} = await registerUser.mutateAsync(data)
    
    if (response) {
      showAlert({
        open: true,
        severity: "success",
        message: response.message,
      });
      signIn("credentials", {redirect: true, callbackUrl: "/", username: data.username, password: data.password})
    }else{
      showAlert({
        open: true,
        severity: "error",
        message: "Something went wrong",
      });
    }
  };

  return (
    <div className="flex-1 w-full md:w-1/2 lg:w-1/3 flex flex-col justify-center items-center">
      <h2 className="text-xl font-bold">Start Learning in KPI Institute</h2>
      <form
        className="bg-white w-full md:w-1/2 lg:w-1/3 shadow-md rounded-md px-8 pt-6 pb-8 mb-4 flex flex-col space-y-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          name="fullname"
          control={control}
          render={({ field }) => (
            <InputBox
              type="text"
              Icon={FaUser}
              placeholder="Full Name"
              error={errors.email?.message?.toString() || ""}
              {...field}
            />
          )}
        />
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <InputBox
              type="text"
              Icon={FaUser}
              placeholder="Username"
              error={errors.email?.message?.toString() || ""}
              {...field}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <InputBox
              type="text"
              Icon={FaEnvelope}
              placeholder="Email"
              error={errors.email?.message?.toString() || ""}
              {...field}
            />
          )}
        />
        <div className="mt-4"></div>
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
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <InputBox
              Icon={FaLock}
              type="password"
              placeholder="Confirm Password"
              error={errors.confirmPassword?.message?.toString() || ""}
              {...field}
            />
          )}
        />
        <div className="flex items-center mt-3 justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign Up
          </button>
          <Link
            href="/auth/sign-in"
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          >
            Sign In
          </Link>
        </div>
      </form>
    </div>
  );
}

SignUp.getLayout = (page: any) =>
  withLayouts(page, { withFooter: false, withHeader: false });

export default SignUp;
