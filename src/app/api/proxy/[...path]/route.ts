/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

async function handleProxy(req: NextRequest, params: string[]) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_API;
    const { search } = new URL(req.url);
    const url = `${baseUrl}/${params.join("/")}${search}`;

    const accessToken = (await cookies()).get("accessToken")?.value;

    const headers = new Headers(req.headers);
    if (accessToken) headers.set("Authorization", accessToken);

    const method = req.method.toUpperCase();
    const fetchOptions: any = { method, headers };

    if (["POST", "PATCH"].includes(method)) {
        const contentType = req.headers.get("content-type") || "";
        if (contentType.includes("application/json")) {
            const json = await req.json();
            fetchOptions.body = JSON.stringify(json);
            headers.set("Content-Type", "application/json");
        } else {
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

export async function GET(req: NextRequest, context: { params: Promise<{ path: string[] }> }) {
    const { params } = await context;
    return handleProxy(req, (await params).path);
}

export async function POST(req: NextRequest, context: { params: Promise<{ path: string[] }> }) {
    const { params } = await context;
    return handleProxy(req, (await params).path);
}

export async function PATCH(req: NextRequest, context: { params: Promise<{ path: string[] }> }) {
    const { params } = await context;
    return handleProxy(req, (await params).path);
}

export async function DELETE(req: NextRequest, context: { params: Promise<{ path: string[] }> }) {
    const { params } = await context;
    return handleProxy(req, (await params).path);
}
