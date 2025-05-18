import NavLink from "./NavLink";
import getAuthUser from "@/lib/getAuthUser";
import React from "react";
import { logout } from "@/actions/auth";
async function Navbar() {
  const userAuth = await getAuthUser();
  return (
    <nav>
      <div>
        <NavLink label="Home" href="/" />
      </div>
      {userAuth ? (
        <div>
          <NavLink label="Dashboard" href="/dashboard" />
          <NavLink label="Post" href="/posts" />
          <form action={logout}>
            <button className="nav-link">Logout</button>
          </form>
        </div>
      ) : (
        <div>
          <NavLink label="Login" href="/login" />
          <NavLink label="Register" href="/register" />
        </div>
      )}
    </nav>
  );
}

export default Navbar;
