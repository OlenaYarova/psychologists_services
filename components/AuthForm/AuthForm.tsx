"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { signIn, signUp } from "../../lib/auth";
import { getAuthErrorMessage } from "../../lib/authErrors";
import { authSchema } from "../../schema/authSchema";
import { AuthFormData } from "../../types/auth";

type AuthFormProps = {
  onSuccess?: () => void;
};

export default function AuthForm({ onSuccess }: AuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormData>({
    resolver: yupResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleSignUpSubmit(data: AuthFormData) {
    try {
      await signUp(data.email, data.password);
      onSuccess?.();
    } catch (error) {
      alert(getAuthErrorMessage(error));
      console.error(error);
    }
  }

  async function handleSignInSubmit(data: AuthFormData) {
    try {
      await signIn(data.email, data.password);
      onSuccess?.();
    } catch (error) {
      alert(getAuthErrorMessage(error));
      console.error(error);
    }
  }

  return (
    <form>
      <input type="email" placeholder="Enter email" {...register("email")} />
      {errors.email && <p>{errors.email.message}</p>}

      <input
        type="password"
        placeholder="Enter password"
        {...register("password")}
      />
      {errors.password && <p>{errors.password.message}</p>}

      <button type="button" onClick={handleSubmit(handleSignUpSubmit)}>
        Sign up
      </button>

      <button type="button" onClick={handleSubmit(handleSignInSubmit)}>
        Sign in
      </button>
    </form>
  );
}
