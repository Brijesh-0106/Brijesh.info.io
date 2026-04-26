export async function GET() {
    const res = await fetch("https://leetcode.com/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Referer: "https://leetcode.com",
        },
        body: JSON.stringify({
            query: `
        query getUserProfile($username: String!) {
          matchedUser(username: $username) {
            submitStats {
              acSubmissionNum {
                difficulty
                count
              }
            }
          }
        }
      `,
            variables: {
                username: "phenomenal123",
            },
        }),
    });

    const data = await res.json();

    return Response.json(data);
}