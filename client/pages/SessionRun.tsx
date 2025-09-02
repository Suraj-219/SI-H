import { useEffect, useMemo, useState } from "react";
import QRDisplay from "@/components/QRDisplay";
import { getSessionSummary, startSession, endSession, SessionSummaryResponse } from "@/api/sessions";

const demoCourses = [
  { id: "cs101", name: "CS101 - Intro to CS" },
  { id: "math201", name: "MATH201 - Calculus II" },
  { id: "phy150", name: "PHY150 - Mechanics" },
];

export default function SessionRun() {
  const [courseId, setCourseId] = useState(demoCourses[0].id);
  const [sessionId, setSessionId] = useState<string>("");
  const [summary, setSummary] = useState<SessionSummaryResponse | null>(null);
  const [running, setRunning] = useState(false);

  async function start() {
    const s = await startSession(courseId);
    setSessionId(s.id);
    setRunning(true);
  }

  async function end() {
    if (!sessionId) return;
    await endSession(sessionId);
    setRunning(false);
  }

  useEffect(() => {
    let t: number | null = null;
    async function poll() {
      if (sessionId) {
        try {
          const s = await getSessionSummary(sessionId);
          setSummary(s);
        } catch {}
      }
      t = window.setTimeout(poll, 2000);
    }
    poll();
    return () => {
      if (t) window.clearTimeout(t);
    };
  }, [sessionId]);

  const headcount = useMemo(() => (summary ? summary.present + summary.late : 0), [summary]);

  return (
    <div className="mx-auto max-w-6xl p-6">
      <h1 className="text-2xl font-semibold mb-4">Run Session</h1>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
        <div className="space-y-4">
          <div className="bg-card border rounded-xl p-4 flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <label className="text-sm text-muted-foreground">Course</label>
              <select
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
                className="px-3 py-2 rounded-md border bg-background w-full sm:w-64"
                disabled={running}
              >
                {demoCourses.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              {!running ? (
                <button onClick={start} className="px-4 py-2 rounded-md bg-primary text-primary-foreground font-medium w-full sm:w-auto">Start</button>
              ) : (
                <button onClick={end} className="px-4 py-2 rounded-md bg-destructive text-destructive-foreground font-medium w-full sm:w-auto">End</button>
              )}
            </div>
          </div>

          <div className="bg-card border rounded-xl p-6">
            {running && sessionId ? (
              <div className="flex flex-col items-center gap-4">
                <QRDisplay sessionId={sessionId} />
                <p className="text-sm text-muted-foreground">Session ID: {sessionId.slice(0,8)}</p>
              </div>
            ) : (
              <div className="h-[320px] flex items-center justify-center text-muted-foreground">Start a session to display the rotating QR</div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 border rounded-xl p-5">
            <div className="text-5xl font-bold">{headcount}</div>
            <div className="text-sm text-muted-foreground">Live headcount</div>
          </div>
          <div className="bg-card border rounded-xl p-4">
            <h3 className="font-medium mb-2">Recent Scans</h3>
            <div className="max-h-80 overflow-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-muted-foreground">
                    <th className="py-2">Student</th>
                    <th className="py-2">Status</th>
                    <th className="py-2">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {summary?.list.slice(-10).reverse().map((r) => (
                    <tr key={r.studentId+"-"+r.recordedAt} className="border-t">
                      <td className="py-2">{r.studentId}</td>
                      <td className="py-2 capitalize">{r.status}</td>
                      <td className="py-2">{new Date(r.recordedAt).toLocaleTimeString()}</td>
                    </tr>
                  ))}
                  {!summary?.list?.length && (
                    <tr><td colSpan={3} className="py-6 text-center text-muted-foreground">No scans yet</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
