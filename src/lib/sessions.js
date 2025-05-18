import "server-only";

import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";

const sessionsKey = process.env.SESSIONS_KEY;
const encodedKey = new TextEncoder().encode(sessionsKey);

export async function encrypt(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(encodedKey);
}

export async function decrypt(session) {
  try {
    const payload = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (e) {
    return null;
  }
}

export async function createSession(userId) {
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
  const session = await encrypt({ userId, expiresAt });
  const cookiesStore = await cookies();

  cookiesStore.set({
    name: "session",
    value: session,
    expires: expiresAt,
    httpOnly: true,
    secure: true,
    sameSite: "lax",
  });
}

export async function deleteSession() {
  const cookiesStore = await cookies();

  cookiesStore.delete("session");
}
