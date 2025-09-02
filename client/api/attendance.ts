export interface ScanResponse {
  status: "present" | "late" | "failed";
  recordedAt?: number;
  duplicate?: boolean;
  reason?: string;
}

import { scanWithToken } from "./sessions";

export async function postScan(token: string, studentId: string) {
  return scanWithToken(token, studentId) as ScanResponse;
}
