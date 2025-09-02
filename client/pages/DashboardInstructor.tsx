import TrendChart from "@/components/TrendChart";

export default function DashboardInstructor() {
  return (
    <div className="mx-auto max-w-7xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Instructor Dashboard</h1>
        <a href="/session" className="px-4 py-2 rounded-md bg-primary text-primary-foreground">Start session</a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border rounded-xl p-5"><div className="text-sm text-muted-foreground">Active courses</div><div className="mt-2 text-3xl font-bold">3</div></div>
        <div className="bg-card border rounded-xl p-5"><div className="text-sm text-muted-foreground">Today headcount</div><div className="mt-2 text-3xl font-bold">140</div></div>
        <div className="bg-card border rounded-xl p-5"><div className="text-sm text-muted-foreground">Late</div><div className="mt-2 text-3xl font-bold">9</div></div>
      </div>

      <div className="bg-card border rounded-xl p-6">
        <h2 className="font-semibold mb-2">Attendance trend</h2>
        <TrendChart />
      </div>
    </div>
  );
}
