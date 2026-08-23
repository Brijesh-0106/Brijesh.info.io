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
        const currentYear = new Date().getFullYear();
        const [calPrev, calCurr] = await Promise.all([
            fetchCalendar(currentYear - 1),
            fetchCalendar(currentYear),
        ]);

        const rawPrev = JSON.parse(calPrev?.submissionCalendar || "{}");
        const rawCurr = JSON.parse(calCurr?.submissionCalendar || "{}");
        const merged = { ...rawPrev, ...rawCurr };

        const totalActiveDays = (calPrev?.totalActiveDays || 0) + (calCurr?.totalActiveDays || 0);

        return NextResponse.json({
            submissionCalendar: JSON.stringify(merged),
            activeDays: totalActiveDays || Object.keys(merged).length,
            streak: calCurr?.streak || calPrev?.streak || 0,
        });
    } catch (e) {
        return NextResponse.json({ error: "Failed to fetch LeetCode data" }, { status: 500 });
    }
}