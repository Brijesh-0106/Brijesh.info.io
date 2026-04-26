import { NextResponse } from "next/server";

const USERNAME = "phenomenal123";

const CALENDAR_QUERY = `
  query userProfileCalendar($username: String!, $year: Int) {
    matchedUser(username: $username) {
      userCalendar(year: $year) {
        submissionCalendar
        totalActiveDays
        streak
      }
    }
  }
`;

async function fetchCalendar(year: number) {
    const res = await fetch("https://leetcode.com/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Referer": "https://leetcode.com",
        },
        body: JSON.stringify({
            query: CALENDAR_QUERY,
            variables: { username: USERNAME, year },
        }),
        next: { revalidate: 3600 },
    });

    const json = await res.json();
    return json.data?.matchedUser?.userCalendar;
}

export async function GET() {
    try {
        const [cal2025, cal2026] = await Promise.all([
            fetchCalendar(2025),
            fetchCalendar(2026),
        ]);

        const raw2025 = JSON.parse(cal2025?.submissionCalendar || "{}");
        const raw2026 = JSON.parse(cal2026?.submissionCalendar || "{}");
        const merged = { ...raw2025, ...raw2026 };

        return NextResponse.json({
            submissionCalendar: JSON.stringify(merged),
            activeDays: (cal2025?.totalActiveDays || 0) + (cal2026?.totalActiveDays || 0),
            streak: cal2026?.streak || cal2025?.streak || 0,
        });
    } catch (e) {
        return NextResponse.json({ error: "Failed to fetch LeetCode data" }, { status: 500 });
    }
}