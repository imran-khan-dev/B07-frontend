import { cookies } from "next/headers";

export async function getDashboardStats() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_API;
    const accessToken = (await cookies()).get("accessToken")?.value;

    if (!accessToken) {
        console.error("No access token found in cookies");
        return null;
    }

    let blogStats = null;
    let projectStats = null;

    try {
        const resBlog = await fetch(`${baseUrl}/blog/get-blog-stats`, {
            headers: { Authorization: accessToken },
            cache: "no-store",
        });

        if (!resBlog.ok) {
            const text = await resBlog.text();
            console.error("Blog stats fetch failed:", text);
        } else {
            blogStats = await resBlog.json();
        }
    } catch (err) {
        console.error("Blog stats fetch error:", err);
    }

    try {
        const resProject = await fetch(`${baseUrl}/project/get-project-stats`, {
            headers: { Authorization: accessToken },
            cache: "no-store",
        });

        if (!resProject.ok) {
            const text = await resProject.text();
            console.error("Project stats fetch failed:", text);
        } else {
            projectStats = await resProject.json();
        }
    } catch (err) {
        console.error("Project stats fetch error:", err);
    }

    if (!blogStats && !projectStats) {
        throw new Error("Failed to fetch any dashboard stats");
    }

    return { blogStats, projectStats };
}
