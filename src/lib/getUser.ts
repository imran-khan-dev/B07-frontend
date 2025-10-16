"use server"

import { cookies } from "next/headers";

export async function getUser() {

  const baseUrl = process.env.NEXT_PUBLIC_BASE_API;

  const accessToken = (await cookies()).get("accessToken")?.value;


  if (!accessToken) return null;

  const res = await fetch(`${baseUrl}/user/1`, {
    headers: {
      Authorization: `${accessToken}`,
    },
    cache: "no-store",
  });

  if (!res.ok) return null;

  return res.json();
}
