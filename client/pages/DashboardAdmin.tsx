import TrendChart from "@/components/TrendChart";

export default function DashboardAdmin() {
  return (
    <div className="mx-auto max-w-7xl p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border rounded-xl p-5"><div className="text-sm text-muted-foreground">Total courses</div><div className="mt-2 text-3xl font-bold">24</div></div>
        <div className="bg-card border rounded-xl p-5"><div className="text-sm text-muted-foreground">Users</div><div className="mt-2 text-3xl font-bold">1,245</div></div>
        <div className="bg-card border rounded-xl p-5"><div className="text-sm text-muted-foreground">Today sessions</div><div className="mt-2 text-3xl font-bold">11</div></div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-card border rounded-xl p-6 lg:col-span-2">
          <h2 className="font-semibold mb-2">Overall attendance</h2>
          <TrendChart />
        </div>
        <div className="bg-card border rounded-xl p-6">
          <h2 className="font-semibold mb-2">Management</h2>
          <ul className="space-y-2 text-sm">
            <li><a href="/records" className="underline">Records & CSV export</a></li>
            <li><a href="/session" className="underline">Run/monitor sessions</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
