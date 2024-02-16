"use client";
import { FaRegUser } from "react-icons/fa6";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdOutlineEmail } from "react-icons/md";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { IFormData } from "@/types/types";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useState } from "react";

const AuthForm = ({ type }: { type: "register" | "login" }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>({
    defaultValues:
      type === "register"
        ? { username: "", password: "", email: "" }
        : { email: "", password: "" },
  });

  const handleOnSubmit: SubmitHandler<IFormData> = async (data) => {
    let res;
    if (type === "register") {
      res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        router.push("/login");
      } else {
        toast.error("Something went wrong");
      }
    }
    if (type === "login") {
      setIsLoading(true);
      res = await signIn("credentials", {
        ...data,
        redirect: false,
      });
      if (res && res.ok) {
        router.push("/");
      } else {
        toast.error("Invalid credentials");
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center px-4 text-white">
      <form
        onSubmit={handleSubmit(handleOnSubmit)}
        className="bg-[rgba(0,0,0,0.5 )] flex w-full flex-col items-center justify-center gap-4 rounded-lg bg-black/30 p-4 backdrop-blur-sm backdrop-filter lg:w-1/2 lg:p-10"
      >
        <div className="group w-full justify-center text-center">
          <span className="text-5xl font-bold text-red-500 duration-1000 group-hover:text-white">
            Movie
          </span>
          <span className="ml-1 text-3xl font-semibold duration-1000 group-hover:text-red-500 ">
            Hub
          </span>
        </div>

        {type === "register" && (
          <div className="group flex w-full items-center justify-between rounded-lg border border-gray-600 p-4 lg:w-3/4">
            <input
              {...register("username", {
                required: "Username is required",
                validate: (value: string | undefined) => {
                  if (!value || value.length < 3) {
                    return "Username must be more than 3 characters";
                  }
                  return true;
                },
              })}
              type="text"
              className="flex-1 bg-transparent opacity-80 outline-none duration-500 group-hover:opacity-100"
              placeholder="Username"
            />
            <FaRegUser className="scale-150 duration-500 group-hover:text-red-500" />
          </div>
        )}
        {errors.username && (
          <p className="text-center text-yellow-500">
            {errors.username.message}
          </p>
        )}
        <div className="group flex w-full items-center justify-between rounded-lg border border-gray-600 p-4 lg:w-3/4">
          <input
            {...register("email", {
              required: "Email is required",
              validate: (value: string | undefined) => {
                if (!value || value.length < 6) {
                  return "Email must be more than 6 characters";
                }
                return true;
              },
            })}
            type="email"
            className="flex-1 bg-transparent opacity-80 outline-none duration-500 group-hover:opacity-100"
            placeholder="Email"
          />
          <MdOutlineEmail className="scale-150 duration-500 group-hover:text-red-500" />
        </div>
        {errors.email && (
          <p className="text-center text-yellow-500">{errors.email.message}</p>
        )}
        <div className="group flex w-full items-center justify-between rounded-lg border border-gray-600 p-4 lg:w-3/4">
          <input
            {...register("password", {
              required: "Password is required",
              validate: (value: string | undefined) => {
                if (!value || value.length < 6) {
                  return "Password must be more than 6 characters";
                }
                return true;
              },
            })}
            type="password"
            className="flex-1 bg-transparent opacity-80 outline-none duration-500 group-hover:opacity-100"
            placeholder="Password"
          />
          <RiLockPasswordLine className="scale-150 duration-500 group-hover:text-red-500" />
        </div>
        {errors.password && (
          <p className="text-center text-yellow-500">
            {errors.password.message}
          </p>
        )}
        <button className="w-full rounded-xl border border-red-500 bg-red-500 p-4 text-xl text-white duration-500 hover:bg-transparent lg:w-3/4">
          {isLoading
            ? "Loading..."
            : type === "register"
              ? "Create One"
              : "Login"}
        </button>
        {type === "register" ? (
          <p>
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-xl font-semibold text-red-500 duration-200 hover:text-red-300"
            >
              Sign In
            </Link>
          </p>
        ) : (
          <p>
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-xl font-semibold text-red-500 duration-200 hover:text-red-300"
            >
              Register
            </Link>
          </p>
        )}
      </form>
    </div>
  );
};

export default AuthForm;
