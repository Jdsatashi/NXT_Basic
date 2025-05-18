"use server";

import { getColct } from "@/lib/db";
import { RegisterFormSchema } from "@/lib/rule";
import bcrypt from "bcrypt";
import { createSession, deleteSession } from "@/lib/sessions";
import { redirect } from "next/navigation";

export async function register(state, formData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");
  const username = email.split("@")[0];

  const validatedFields = RegisterFormSchema.safeParse({
    email,
    password,
    confirmPassword,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      status: "error",
      message: "Validation error",
      email,
      password,
      confirmPassword,
    };
  }

  const userClt = await getColct("users");

  const existingUser = await userClt.findOne({ email });

  if (existingUser) {
    return {
      message: "User already exists",
      status: "error",
    };
  }

  if (userClt) {
    const hashPW = bcrypt.hashSync(password, 10);
    const result = await userClt.insertOne({
      email,
      username,

      password: hashPW,
    });
    await createSession(`${result.insertedId}`);
    redirect("/dashboard");
  } else {
    return {
      message: "Server error",
      status: "error",
    };
  }
}

export async function login(state, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  const userClt = await getColct("users");

  const existingUser = await userClt.findOne({ email });

  if (!existingUser) {
    return {
      message: "User not found",
      status: "error",
    };
  }

  const isPasswordValid = bcrypt.compareSync(password, existingUser.password);

  if (!isPasswordValid) {
    return {
      message: "Invalid password",
      status: "error",
    };
  }
  await createSession(`${existingUser._id}`);
  redirect("/dashboard");
}

export async function logout() {
  await deleteSession();
  redirect("/");
}
