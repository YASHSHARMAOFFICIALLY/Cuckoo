import {z} from "zod"

export const signupSchema = z.object({
    name:z.string().min(2,"Name must be atleast 2 characters"),
    email:z.string().email("Invalid email"),
    password:z.string().min(8,"password must be atleast 8 character ")
    .regex(/[A-Z]/, "Must contain uppercase")
    .regex(/[a-z]/, "Must contain lowercase")
    .regex(/[0-9]/, "Must contain number")
})