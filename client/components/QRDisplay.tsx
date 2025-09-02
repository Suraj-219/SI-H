import { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { getQrToken } from "@/api/sessions";
import { useSessionTimer } from "@/hooks/useSessionTimer";

interface Props {
  sessionId: string;
}

export default function QRDisplay({ sessionId }: Props) {
  const [token, setToken] = useState<string>("");
  const [exp, setExp] = useState<number>(10);
  const { secondsLeft } = useSessionTimer(10);

  async function refresh() {
    const t = await getQrToken(sessionId);
    setToken(t.token);
    setExp(t.expSeconds);
  }

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId]);

  useEffect(() => {
    if (secondsLeft === 10) {
      refresh();
    }
  }, [secondsLeft]);

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className="rounded-2xl p-3 bg-white shadow-lg ring-1 ring-black/5">
        {token ? (
          <QRCodeCanvas value={token} size={240} includeMargin={false} level="M" />
        ) : (
          <div className="h-[240px] w-[240px] animate-pulse bg-gray-100 rounded" />
        )}
      </div>
      <p className="text-sm text-muted-foreground">Refreshing in {secondsLeft}s</p>
    </div>
  );
}
