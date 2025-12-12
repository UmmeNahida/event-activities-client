export const fakeReports = [
  {
    id: "r1",
    reason: "Host behaviour was inappropriate.",
    status: "PENDING",
    reporter: { email: "user1@gmail.com" },
    targetUser: { email: "host1@gmail.com" },
    targetEvent: { title: "Sunset Hiking" },
  },
  {
    id: "r2",
    reason: "Event location was misleading.",
    status: "PENDING",
    reporter: { email: "user2@gmail.com" },
    targetUser: { email: "host2@gmail.com" },
    targetEvent: { title: "Art Workshop" },
  },
  {
    id: "r3",
    reason: "Fraud activity suspected.",
    status: "PENDING",
    reporter: { email: "user3@gmail.com" },
    targetUser: { email: "host3@gmail.com" },
    targetEvent: { title: "Music Night" },
  },
];
