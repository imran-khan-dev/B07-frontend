/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { cookies } from "next/headers";


export async function GET(req: Request, { params }: { params: { path: string[] } }) {
    const token = (await cookies()).get("token")?.value;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_API;
    const url = `${baseUrl}/${params.path.join("/")}`;

    const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
}

export async function POST(req: Request, context: { params: Promise<{ path: string[] }> }) {
    const { params } = await context;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_API;
    const url = `${baseUrl}/${(await params).path.join("/")}`;

   
    const token = (await cookies()).get("token")?.value;


    const headers = new Headers(req.headers);
    if (token) {
        headers.set("Authorization", `Bearer ${token}`);
    }

    const res = await fetch(url, {
        method: req.method,
        headers,  
        body: req.body,   
        duplex: "half",   
    } as any);

    let data;
    try {
        data = await res.json();
    } catch {
        data = null;
    }

    return NextResponse.json(data, { status: res.status });
}
