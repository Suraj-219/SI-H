import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { getAttendanceAnalytics, AnalyticsResponse } from "@/api/analytics";

interface Props { courseId?: string }

export default function TrendChart({ courseId }: Props) {
  const [data, setData] = useState<AnalyticsResponse | null>(null);

  useEffect(() => {
    getAttendanceAnalytics(courseId).then(setData).catch(console.error);
  }, [courseId]);

  return (
    <div className="w-full h-72">
      {data ? (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data.daily} margin={{ top: 10, right: 20, bottom: 0, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} minTickGap={24} />
            <YAxis domain={[0, 100]} tickFormatter={(v) => `${v}%`} tick={{ fontSize: 12 }} />
            <Tooltip formatter={(v: number) => `${v}%`} />
            <Line type="monotone" dataKey="rate" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div className="w-full h-full animate-pulse bg-muted rounded-md" />
      )}
    </div>
  );
}
