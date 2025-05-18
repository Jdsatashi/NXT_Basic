"use client";
import { login } from "@/actions/auth";
import Link from "next/link";
import React, { useActionState, useEffect } from "react";

function Login() {
  const [state, action, isPending] = useActionState(login, undefined);

  useEffect(() => {
    if (state?.status) {
      alert(state.message);
    }
  }, [state]);

  return (
    <>
      <div className="container w-1/2">
        <h1 className="title">Login</h1>
        <form action={action} className="space-y-4">
          <div>
            <label htmlFor="email">Email</label>
            <input type="text" name="email" defaultValue={state?.email} />
            {state?.errors?.email && (
              <p className="error">{state?.errors?.email}</p>
            )}
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="text" name="password" />
            {state?.errors?.password && (
              <p className="error">{state?.errors?.password}</p>
            )}
          </div>

          <div className="flex justify-center items-end gap-4">
            <button disabled={isPending} type="submit" className="btn-primary">
              {isPending ? "Loading..." : "Login"}
            </button>
            <Link href="/register" className="text-link">
              or Register here
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
