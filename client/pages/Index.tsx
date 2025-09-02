import TrendChart from "@/components/TrendChart";

export default function Index() {
  return (
    <div className="mx-auto max-w-7xl p-6 space-y-6">
      <div className="rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">AttenDance</h1>
          <p className="text-muted-foreground mt-1">Start a session, show a rotating QR, students scan to mark attendance. Live dashboards and analytics out of the box.</p>
        </div>
        <div className="flex gap-2">
          <a href="/session" className="px-4 py-2 rounded-md bg-primary text-primary-foreground font-medium">Run Session</a>
          <a href="/scan" className="px-4 py-2 rounded-md border">Open Scanner</a>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border rounded-xl p-5">
          <div className="text-sm text-muted-foreground">Today\'s Sessions</div>
          <div className="mt-2 text-4xl font-bold">3</div>
        </div>
        <div className="bg-card border rounded-xl p-5">
          <div className="text-sm text-muted-foreground">Present</div>
          <div className="mt-2 text-4xl font-bold">128</div>
        </div>
        <div className="bg-card border rounded-xl p-5">
          <div className="text-sm text-muted-foreground">Late</div>
          <div className="mt-2 text-4xl font-bold">12</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-card border rounded-xl p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold">Attendance Trend (4 weeks)</h2>
            <div className="text-sm text-muted-foreground">Avg rate</div>
          </div>
          <TrendChart />
        </div>
        <div className="bg-card border rounded-xl p-6">
          <h2 className="font-semibold mb-3">Quick Actions</h2>
          <ul className="space-y-2 text-sm">
            <li><a href="/session" className="underline">Start a new session</a></li>
            <li><a href="/records" className="underline">Export CSV</a></li>
            <li><a href="/login" className="underline">Sign in</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
