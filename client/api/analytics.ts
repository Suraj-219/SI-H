export interface AnalyticsResponse {
  daily: Array<{ date: string; rate: number }>;
  rate: number;
}

export async function getAttendanceAnalytics(_courseId?: string, range: string = "4w") {
  const days = range === "4w" ? 28 : 14;
  const today = new Date();
  const daily = Array.from({ length: days }).map((_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - (days - 1 - i));
    const rate = Math.round(70 + Math.random() * 30);
    return { date: d.toISOString().slice(0, 10), rate };
  });
  const avg = Math.round(daily.reduce((a, b) => a + b.rate, 0) / daily.length);
  return { daily, rate: avg } as AnalyticsResponse;
}
