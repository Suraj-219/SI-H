import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser, Role } from "@/lib/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleLeft } from "@fortawesome/free-regular-svg-icons";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("Student");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try {
      createUser({ name, email, password, role });
      navigate("/login");
    } catch (e) {
      setError((e as Error).message);
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6">
      <form onSubmit={submit} className="w-full max-w-md bg-card border rounded-xl p-6 space-y-4">
          <a className="text-blue-700 inline-block " href="/"><FontAwesomeIcon icon={faCircleLeft} /></a>
        <h1 className="text-2xl font-semibold">Sign up</h1>
        {error && <div className="p-2 text-sm rounded-md border bg-rose-50 text-rose-700 border-rose-200">{error}</div>}
        <div>
          <label className="text-sm text-muted-foreground">Name</label>
          <input className="mt-1 w-full px-3 py-2 rounded-md border bg-background" value={name} onChange={(e)=>setName(e.target.value)} required />
        </div>
        <div>
          <label className="text-sm text-muted-foreground">Email</label>
          <input type="email" className="mt-1 w-full px-3 py-2 rounded-md border bg-background" value={email} onChange={(e)=>setEmail(e.target.value)} required />
        </div>
        <div>
          <label className="text-sm text-muted-foreground">Password</label>
          <input type="password" className="mt-1 w-full px-3 py-2 rounded-md border bg-background" value={password} onChange={(e)=>setPassword(e.target.value)} required />
        </div>
        <div>
          <label className="text-sm text-muted-foreground">Role</label>
          <select value={role} onChange={(e)=>setRole(e.target.value as Role)} className="mt-1 w-full px-3 py-2 rounded-md border bg-background">
            <option value="Student">Student</option>
            <option value="Instructor">Instructor</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <button type="submit" className="w-full px-4 py-2 rounded-md bg-primary text-primary-foreground font-medium">Create account</button>
        <div className="text-sm text-muted-foreground">Already have an account? <a className="underline" href="/login">Login</a></div>
      </form>
    </div>
  );
}
