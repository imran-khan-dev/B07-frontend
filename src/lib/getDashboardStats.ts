import { cookies } from "next/headers";

export async function getDashboardStats() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_API;
    const accessToken = (await cookies()).get("accessToken")?.value;

    if (!accessToken) return null;

    const [resBlog, resProject] = await Promise.all([
        fetch(`${baseUrl}/blog/get-blog-stats`, {
            headers: { Authorization: `${accessToken}` },
            cache: "no-store",
        }),
        fetch(`${baseUrl}/project/get-project-stats`, {
            headers: { Authorization: `${accessToken}` },
            cache: "no-store",
        }),
    ]);

    if (!resBlog.ok || !resProject.ok) {
        throw new Error("Failed to fetch dashboard stats");
    }

    const [blogStats, projectStats] = await Promise.all([
        resBlog.json(),
        resProject.json(),
    ]);

    return { blogStats, projectStats };
}
