"use client";

import { useState } from "react";
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AuthFormData>({
    resolver: yupResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleSignUpSubmit(data: AuthFormData) {
    setAuthError("");
    setIsSubmitting(true);

    try {
      await signUp(data.email, data.password);
      reset();
      onSuccess?.();
    } catch (error) {
      console.error(error);
      setAuthError(getAuthErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleSignInSubmit(data: AuthFormData) {
    setAuthError("");
    setIsSubmitting(true);

    try {
      await signIn(data.email, data.password);
      reset();
      onSuccess?.();
    } catch (error) {
      console.error(error);
      setAuthError(getAuthErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form>
      <input
        type="email"
        placeholder="Enter email"
        disabled={isSubmitting}
        {...register("email")}
      />
      {errors.email && <p>{errors.email.message}</p>}

      <input
        type="password"
        placeholder="Enter password"
        disabled={isSubmitting}
        {...register("password")}
      />
      {errors.password && <p>{errors.password.message}</p>}
      {authError && <p>{authError}</p>}

      <button
        type="button"
        disabled={isSubmitting}
        onClick={handleSubmit(handleSignUpSubmit)}
      >
        {isSubmitting ? "Processing..." : "Sign up"}
      </button>

      <button
        type="button"
        disabled={isSubmitting}
        onClick={handleSubmit(handleSignInSubmit)}
      >
        {isSubmitting ? "Processing..." : "Sign in"}
      </button>
    </form>
  );
}
