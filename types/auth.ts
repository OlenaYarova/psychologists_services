import * as yup from "yup";
import { authSchema } from "@/schema/authSchema";

export type AuthFormData = yup.InferType<typeof authSchema>;