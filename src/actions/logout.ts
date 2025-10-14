"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout(formData: FormData) {
    const cookieStore = await cookies();

    cookieStore.delete({ name: "accessToken", path: "/" });
    cookieStore.delete({ name: "refreshToken", path: "/" });

    redirect("/login");
}
