import * as z from "zod";

export const registerSchema = z.object({
    name: z.string().min(1, "Name is required").max(50, "Name must be less than 50 characters"),
    username: z.string().min(1, "Username is required").max(50, "Username must be less than 50 characters"),
    email: z.string().email("Invalid email address").nonempty("Email is required"),
    dateOfBirth: z.string().min(1, "Date of birth is required").refine((value) => {
        const now = new Date().getFullYear();
        const date = new Date(value).getFullYear();
        const age = now - date;
        return age >= 18;
    }, "Date of birth must be in the past"),
    gender: z.string().nonempty("Gender is required"),
    password: z.string().min(8, "Password must be at least 8 characters long").max(50, "Password must be less than 50 characters").regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#!@$%^&*-]).{8,}$/, "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"),
    rePassword: z.string().min(8, "Password must be at least 8 characters long").max(50, "Password must be less than 50 characters"),
}).refine((data) => data.password === data.rePassword, {
    path: ["rePassword"],
    message: "Passwords do not match",
});
export type RegisterSchemaType = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long").max(50, "Password must be less than 50 characters").regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#!@$%^&*-]).{8,}$/, "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"),

})
export type loginSchemaType = z.infer<typeof loginSchema>;