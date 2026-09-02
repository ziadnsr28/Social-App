import { ListBox, Select, Button, TextField, FieldError, Input, Spinner, Alert } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { registerSchema, type RegisterSchemaType } from "../../lib/schema/auth.schema";
import { registerUser } from "../../Services/auth.services";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
export default function Register() {
  const navigate = useNavigate();
  const [massageError, setmassageError] = useState("")
  const [massageSuccess, setmassageSuccess] = useState("")
  const { register, handleSubmit, control, formState: { errors, isSubmitting } } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    mode: "all",
    defaultValues: {
      name: "",
      username: "",
      email: "",
      dateOfBirth: "",
      gender: "",
      password: "",
      rePassword: ""
    }
  })

  async function onSubmit(fromdata: RegisterSchemaType) {
    setmassageError("")
    setmassageSuccess("")
    try {
      const response = await registerUser(fromdata);
      setmassageSuccess(response.data.message || "User registered successfully");
      toast.success("User registered in successfully");
      navigate("/auth/login");
    }

    catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMsg = error.response?.data?.message || "Registration failed. Please check your data.";
        setmassageError(errorMsg);
        toast.error(errorMsg);
      } else {
        setmassageError("An unexpected error occurred");
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
              Create a new account
            </h2>
            <p className="mt-2 text-gray-500">
              It's quick and easy.
            </p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <TextField aria-label="Full Name" isInvalid={Boolean(errors.name)}>
              <Input type="text" aria-label="Full Name" {...register("name")} placeholder="Enter your full name" className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-primary" />
              <FieldError>{errors.name?.message}</FieldError>
            </TextField>


            <TextField aria-label="Username" isInvalid={Boolean(errors.username)}>
              <Input type="text" aria-label="Username"  {...register("username")} placeholder="Enter your username" className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-primary" />
              <FieldError>{errors.username?.message}</FieldError>
            </TextField>
            <TextField aria-label="Email" isInvalid={Boolean(errors.email)}>
              <Input type="email" aria-label="Email" {...register("email")} placeholder="Enter your email" className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-primary" />
              <FieldError>{errors.email?.message}</FieldError>
            </TextField>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <Select name="gender" value={field.value} onChange={field.onChange} className="w-full" placeholder="Select Gender" aria-label="Gender">
                  <Select.Trigger
                    className="rounded-xl border border-gray-300"
                    aria-label="Gender"
                  >
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover>
                    <ListBox aria-label="Gender Options">
                      <ListBox.Item id="male" textValue="Male">
                        Male
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                      <ListBox.Item id="female" textValue="Female">
                        Female
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>
              )}
            />
            <TextField aria-label="Date of Birth" isInvalid={Boolean(errors.dateOfBirth)}>
              <Input type="date" aria-label="Date of Birth" {...register("dateOfBirth")} className="w-full rounded-xl border  border-gray-300 px-4 py-3 outline-none focus:border-primary" />
              <FieldError>{errors.dateOfBirth?.message}</FieldError>
            </TextField>
            <TextField aria-label="Password" isInvalid={Boolean(errors.password)}>
              <Input type="password" aria-label="Password" {...register("password")} placeholder="Enter your password" className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-primary" />
              <FieldError>{errors.password?.message}</FieldError>
            </TextField>
            <TextField aria-label="Confirm Password" isInvalid={Boolean(errors.rePassword)}>
              <Input type="password" aria-label="Confirm Password"  {...register("rePassword")} placeholder="Confirm your password" className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-primary" />
              <FieldError>{errors.rePassword?.message}</FieldError>
            </TextField>
            <Button type="submit" className="w-full primary" size="lg">
              {isSubmitting ? <span ><Spinner className="text-white" /> Loading... </span> : " Create New Account"}
            </Button>
          </form>
          {massageError && <Alert status="danger" className="bg-danger mt-2" >
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>{massageError}</Alert.Title>
            </Alert.Content>
          </Alert>}
          {massageSuccess && <Alert status="success" className="bg-green-200 mt-2" >
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>{massageSuccess}</Alert.Title>
            </Alert.Content>
          </Alert>}
          <Link to="/auth/login" className="ml-4 block text-center mt-3 text-blue-500 hover:underline">
            Already have an account? Log in
          </Link>
        </div>
      </div>
    </>
  );
}
