import { NextResponse } from "next/server";

export async function GET() {
    try {
        const res = await fetch(
            "https://alfa-leetcode-api.onrender.com/phenomenal123/calendar",
            { next: { revalidate: 3600 } } // cache 1 hour
        );
        const data = await res.json();
        return NextResponse.json(data);
    } catch {
        return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
    }
}