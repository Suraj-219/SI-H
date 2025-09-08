import { useState } from "react";
import QRScanner from "@/components/QRScanner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleLeft } from "@fortawesome/free-regular-svg-icons";

export default function Scan() {
  const [message, setMessage] = useState<string>("");
  const [statusColor, setStatusColor] = useState<string>("bg-muted");

  return (
    <div className="mx-auto max-w-4xl p-6">
       <a className="text-blue-700 inline-block " href="/"><FontAwesomeIcon icon={faCircleLeft} /></a>
      <h1 className="text-2xl font-semibold mb-4">Scan Attendance</h1>
      <QRScanner
        onResult={(r) => {
          const when = r.recordedAt ? new Date(r.recordedAt).toLocaleTimeString() : "";
          const msg = r.status === "failed" ? "Scan failed" : `${r.status.toUpperCase()} ${when}`;
          setMessage(msg);
          setStatusColor(r.status === "present" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : r.status === "late" ? "bg-amber-50 text-amber-700 border-amber-200" : "bg-rose-50 text-rose-700 border-rose-200");
        }}
      />
      {message && (
        <div className={`mt-4 p-3 rounded-md border ${statusColor}`}>{message}</div>
      )}
      <p className="mt-2 text-sm text-muted-foreground">Grant camera permission if prompted. Your Student ID is only used locally in this demo.</p>
    </div>
  );
}
