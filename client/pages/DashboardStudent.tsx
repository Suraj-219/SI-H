export default function DashboardStudent() {
  return (
    <div className="mx-auto max-w-6xl p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Student Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border rounded-xl p-5">
          <div className="text-sm text-muted-foreground">Today</div>
          <div className="mt-2 text-3xl font-bold">2 sessions</div>
        </div>
        <div className="bg-card border rounded-xl p-5">
          <div className="text-sm text-muted-foreground">Attendance rate</div>
          <div className="mt-2 text-3xl font-bold">92%</div>
        </div>
        <div className="bg-card border rounded-xl p-5">
          <div className="text-sm text-muted-foreground">Status</div>
          <div className="mt-2 text-3xl font-bold">On time</div>
        </div>
      </div>

      <div className="bg-card border rounded-xl p-6">
        <h2 className="font-semibold mb-3">Actions</h2>
        <div className="flex flex-wrap gap-2">
          <a href="/scan" className="px-4 py-2 rounded-md bg-primary text-primary-foreground">Scan now</a>
          <a href="/records" className="px-4 py-2 rounded-md border">My records</a>
        </div>
      </div>
    </div>
  );
}
