import { NextResponse } from "next/server";
import getAuthUser from "./lib/getAuthUser";

const protectedRoutes = ["/posts", "/dashboard"];
const publicRoutes = ["/login", "/register"];

export default async function middleware(req) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const userAuth = await getAuthUser();
  if (isProtectedRoute && !userAuth) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  if (isPublicRoute && userAuth) {
    return NextResponse.redirect(new URL("/posts", req.url));
  }
  return NextResponse.next();
}
