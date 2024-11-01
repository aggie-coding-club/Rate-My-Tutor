import { NextResponse } from "next/server";

export async function POST(req) {
    const data = await req.text()

    return NextResponse.json({ message: "Data received successfully", data: data }, { status: 200 });
}

