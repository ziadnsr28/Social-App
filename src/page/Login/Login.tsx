import { Button, TextField, FieldError, Input, Spinner, Alert } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema, type loginSchemaType } from "../../lib/schema/auth.schema";
import { loginUser } from "../../Services/auth.services";
import {  useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { authContext } from "../../components/Context/AuthContext";
export default function Login() {
  const [massageError, setmessageError] = useState("");
  const [massageSuccess, setmessageSuccess] = useState("");
  const Navigate = useNavigate();
  const { setToken } = useContext(authContext)!;
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<loginSchemaType>({
    resolver: zodResolver(loginSchema),
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    }
  })
  async function onSubmit(formdata: loginSchemaType) {
    setmessageError("");
    setmessageSuccess("");
    try {
      const response = await loginUser(formdata);
      const token = response.data?.data?.token || response.data?.token;
      setmessageSuccess("User logged in successfully");
      toast.success("User logged in successfully");
      if (token) {
        localStorage.setItem("userToken", token);
        setToken(token);
        Navigate("/");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMsg = error.response?.data?.message || "Invalid credentials or network error";
        setmessageError(errorMsg);
        toast.error(errorMsg);
      } else {
        setmessageError("An unexpected error occurred");
        toast.error("An unexpected error occurred");
      }
    }
  }
  return (
    <>
      <div className="w-full flex items-center justify-center p-2 sm:p-6">
        <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-2xl">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900">
              Log in to Route Posts
            </h2>
            <p className="mt-2 text-gray-500">
              Log in and continue your social journey.
            </p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <TextField aria-label="Email" isInvalid={Boolean(errors.email)}>
              <Input type="email" aria-label="Email" {...register("email")} placeholder="Enter your email" className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-primary" />
              <FieldError>{errors.email?.message}</FieldError>
            </TextField>
            <TextField aria-label="Password" isInvalid={Boolean(errors.password)}>
              <Input type="password" aria-label="Password" {...register("password")} placeholder="Enter your password" className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-primary" />
              <FieldError>{errors.password?.message}</FieldError>
            </TextField>
            <Button type="submit" className="w-full primary" size="lg">
              {isSubmitting ? <span className="flex items-center justify-center" ><Spinner className="text-white" /> Loading... </span> : "Log in"}
            </Button>
          </form>
          {massageError && <Alert status="danger" className="bg-red-200 mt-2">
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>{massageError}</Alert.Title>
            </Alert.Content>
          </Alert>}
          {massageSuccess && <Alert status="success" className="bg-green-200">
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>{massageSuccess}</Alert.Title>
            </Alert.Content>
          </Alert>}
       <div className="flex flex-col items-center justify-center mt-4">
         <Link to="/auth/register" className="ml-4 block text-center mt-3 text-blue-500 hover:underline">
          Don't have an account? Sign up
        </Link>
         <Link to="" className="ml-4 block text-center mt-3 text-blue-500 hover:underline">
         change password
        </Link>
       </div>
        </div>
      </div>
    </>
  );
} 
