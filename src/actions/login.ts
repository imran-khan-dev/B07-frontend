"use server";

import { cookies } from "next/headers";

export async function login(formData: { email: string; password: string }) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
    });

    if (!res.ok) return { success: false };

    const data = await res.json();

    const { accessToken, refreshToken } = data.data || {};

    if (!accessToken || !refreshToken) {
        console.error("Missing tokens in response");
        return { success: false };
    }

    const cookieStore = await cookies();

    cookieStore.set("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "lax",
    });

    cookieStore.set("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "lax",
    });

    return { success: true };
}
