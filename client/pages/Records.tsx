import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleLeft } from "@fortawesome/free-regular-svg-icons";
export default function Records() {
  return (
    <div className="mx-auto max-w-6xl p-6">
      <a className="text-blue-700 inline-block " href="/"><FontAwesomeIcon icon={faCircleLeft} /></a>
      <h1 className="text-2xl font-semibold mb-2">Records</h1>
      <p className="text-muted-foreground">This page will show a table with filters (course/date), per-student status, and CSV export. Ask me to build it next.</p>
    </div>
  );
}
