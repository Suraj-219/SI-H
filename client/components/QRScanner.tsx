import { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";
import { postScan } from "@/api/attendance";

interface Props {
  onResult?: (result: { status: string; recordedAt?: number; duplicate?: boolean }) => void;
}

export default function QRScanner({ onResult }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [token, setToken] = useState<string>("");
  const [studentId, setStudentId] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();
    let stopped = false;

    async function start() {
      try {
        const controls = await codeReader.decodeFromVideoDevice(undefined, videoRef.current!, (result, err) => {
          if (stopped) return;
          if (result) {
            const text = result.getText();
            setToken(text);
          }
        });
        return () => controls.stop();
      } catch (e) {
        console.error(e);
      }
    }

    const stop = start();
    return () => {
      stopped = true;
      if (typeof stop === "function") stop();
    };
  }, []);

  async function submit() {
    if (!token || !studentId) {
      setStatus("Please scan the QR and enter your Student ID");
      return;
    }
    try {
      const res = await postScan(token, studentId);
      setStatus(res.status);
      onResult?.(res);
    } catch (e) {
      setStatus("failed");
    }
  }

  return (
    <div className="w-full flex flex-col items-center gap-3">
      <div className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-lg ring-1 ring-black/5">
        <video ref={videoRef} className="w-full h-auto bg-black" muted playsInline />
      </div>
      <div className="w-full max-w-md grid grid-cols-1 md:grid-cols-[1fr_auto] gap-2">
        <input
          type="text"
          placeholder="Enter Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          className="px-3 py-2 rounded-md border bg-background"
        />
        <button onClick={submit} className="px-4 py-2 rounded-md bg-primary text-primary-foreground font-medium">
          Submit
        </button>
      </div>
      <p className="text-sm text-muted-foreground">{status || (token ? "QR scanned. Enter ID and submit." : "Point camera at QR code.")}</p>
    </div>
  );
}
