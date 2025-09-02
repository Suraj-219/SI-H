export interface StartSessionResponse {
  id: string;
  courseId: string;
  startedAt: number;
}

export interface QrTokenResponse {
  token: string;
  expSeconds: number;
}

export interface SessionSummaryResponse {
  present: number;
  late: number;
  absent: number;
  list: Array<{ studentId: string; status: "present" | "late"; recordedAt: number }>;
  active: boolean;
  startedAt: number;
  lastUpdated: number;
}

// In-memory store in the browser (for demo/frontend-only mode)
export type Session = {
  id: string;
  courseId: string;
  active: boolean;
  startedAt: number;
  endedAt?: number;
  lastToken?: { value: string; exp: number };
  attendees: Map<string, { status: "present" | "late"; recordedAt: number }>;
  scans: Array<{ studentId: string; token: string; recordedAt: number; status: "present" | "late" }>;
};

const sessions = new Map<string, Session>();
const tokenToSession = new Map<string, string>();

function randomHex(bytes = 16) {
  const arr = new Uint8Array(bytes);
  crypto.getRandomValues(arr);
  return Array.from(arr, (b) => b.toString(16).padStart(2, "0")).join("");
}

function createToken(ttlSeconds = 10) {
  const value = randomHex(16);
  const exp = Math.floor(Date.now() / 1000) + ttlSeconds;
  return { value, exp };
}

export async function startSession(courseId: string): Promise<StartSessionResponse> {
  const id = crypto.randomUUID();
  const startedAt = Date.now();
  sessions.set(id, {
    id,
    courseId,
    active: true,
    startedAt,
    attendees: new Map(),
    scans: [],
  });
  return { id, courseId, startedAt };
}

export async function endSession(id: string) {
  const s = sessions.get(id);
  if (!s) throw new Error("Session not found");
  s.active = false;
  s.endedAt = Date.now();
  return { id, endedAt: s.endedAt };
}

export async function getQrToken(id: string): Promise<QrTokenResponse> {
  const s = sessions.get(id);
  if (!s || !s.active) throw new Error("Session not active");
  const token = createToken(10);
  s.lastToken = token;
  tokenToSession.set(token.value, id);
  return { token: token.value, expSeconds: token.exp - Math.floor(Date.now() / 1000) };
}

export async function getSessionSummary(id: string): Promise<SessionSummaryResponse> {
  const s = sessions.get(id);
  if (!s) throw new Error("Session not found");
  const list = Array.from(s.attendees.entries()).map(([studentId, rec]) => ({ studentId, status: rec.status, recordedAt: rec.recordedAt }));
  const present = list.filter((r) => r.status === "present").length;
  const late = list.filter((r) => r.status === "late").length;
  const absent = 0;
  return { present, late, absent, list, active: s.active, startedAt: s.startedAt, lastUpdated: Date.now() };
}

export function resolveToken(token: string): Session | null {
  const sessionId = tokenToSession.get(token);
  if (!sessionId) return null;
  const s = sessions.get(sessionId);
  if (!s || !s.lastToken) return null;
  const isValid = s.lastToken.value === token && s.lastToken.exp > Math.floor(Date.now() / 1000);
  return isValid ? s : null;
}

export function upsertAttendance(sessionId: string, studentId: string, status: "present" | "late") {
  const s = sessions.get(sessionId);
  if (!s) return null;
  const recordedAt = Date.now();
  s.attendees.set(studentId, { status, recordedAt });
  s.scans.push({ studentId, token: s.lastToken?.value || "", recordedAt, status });
  return { recordedAt };
}

export function scanWithToken(token: string, studentId: string) {
  const session = resolveToken(token);
  if (!session) return { status: "failed" as const };
  const now = Date.now();
  const existing = session.attendees.get(studentId);
  if (existing && now - existing.recordedAt < 60_000) {
    return { status: existing.status, recordedAt: existing.recordedAt, duplicate: true } as const;
  }
  const status = now - session.startedAt > 10 * 60_000 ? "late" : "present";
  const { recordedAt } = upsertAttendance(session.id, studentId, status)!;
  return { status, recordedAt } as const;
}
