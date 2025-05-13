"use client";
import { register } from "@/app/actions/auth";
import Link from "next/link";
import React, { useActionState, useEffect } from "react";

function page() {
  const [state, action, isPending] = useActionState(register, undefined);

  useEffect(() => {
    if (state?.status) {
      alert(state.message);
    }
  }, [state]);

  return (
    <>
      <div className="container w-1/2">
        <h1 className="title">Register</h1>
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
            <input type="text" name="password" defaultValue={state?.password} />
            {state?.errors?.password && (
              <p className="error">{state?.errors?.password}</p>
            )}
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm password</label>
            <input
              type="text"
              name="confirmPassword"
              defaultValue={state?.confirmPassword}
            />
            {state?.errors?.confirmPassword && (
              <p className="error">{state?.errors?.confirmPassword}</p>
            )}
          </div>
          <div className="flex justify-center items-end gap-4">
            <button disabled={isPending} type="submit" className="btn-primary">
              {isPending ? "Loading..." : "Register"}
            </button>
            <Link href="/login" className="text-link">
              or Login here
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default page;
