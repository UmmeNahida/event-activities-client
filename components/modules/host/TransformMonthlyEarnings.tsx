export const transformMonthlyEarnings = (data: any[]) => {
  const monthMap: Record<string, number> = {};

  data?.forEach((item) => {
    const date = new Date(item.createAt);
    const monthName = date.toLocaleString("en-US", { month: "short" }); 
    // Jan, Feb, Mar ...

    if (!monthMap[monthName]) {
      monthMap[monthName] = 0;
    }

    monthMap[monthName] += item._sum.amount || 0;
  });

  return Object.keys(monthMap).map((month) => ({
    name: month,
    earnings: monthMap[month],
  }));
};
