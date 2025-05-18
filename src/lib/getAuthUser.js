import { cookies } from "next/headers";
import { decrypt } from "./sessions";

export default async function getAuthUser() {
  const cookieStore = await cookies();

  const session = cookieStore.get("session");

  if (!session) return null;

  const user = await decrypt(session.value);

  return user;
}
