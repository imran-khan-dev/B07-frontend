/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

async function handleProxy(req: Request, context: { params: Promise<{ path: string[] }> }) {
    const { params } = await context;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_API;
    const url = `${baseUrl}/${(await params).path.join("/")}`;

    const accessToken = (await cookies()).get("accessToken")?.value;

    console.log("here is AT", accessToken)

    const headers = new Headers(req.headers);
    if (accessToken) headers.set("Authorization", accessToken);

    console.log(headers)

    const method = req.method.toUpperCase();
    const fetchOptions: any = { method, headers };

    // Just POST and PATCH need a body
    if (["POST", "PATCH"].includes(method)) {
        const contentType = req.headers.get("content-type") || "";
        if (contentType.includes("application/json")) {
            const json = await req.json();
            fetchOptions.body = JSON.stringify(json);
            headers.set("Content-Type", "application/json");
        } else {
            // FormData as raw stream forward to backend
            fetchOptions.body = req.body;
            fetchOptions.duplex = "half";
        }
    }

    const res = await fetch(url, fetchOptions);

    let data;
    try {
        data = await res.json();
    } catch {
        data = null;
    }

    return NextResponse.json(data, { status: res.status });
}


export async function GET(req: Request, context: { params: { path: string[] } }) {
    return handleProxy(req, context as any);
}

export async function POST(req: Request, context: { params: Promise<{ path: string[] }> }) {
    return handleProxy(req, context);
}

export async function PATCH(req: Request, context: { params: Promise<{ path: string[] }> }) {
    return handleProxy(req, context);
}

export async function DELETE(req: Request, context: { params: { path: string[] } }) {
    return handleProxy(req, context as any);
}
