export type Role = "Student" | "Instructor" | "Admin";
export interface User { name: string; email: string; password: string; role: Role }

const USERS_KEY = "users";
const CURRENT_USER_KEY = "currentUser";

function loadUsers(): User[] {
  try { return JSON.parse(localStorage.getItem(USERS_KEY) || "[]") as User[]; } catch { return []; }
}
function saveUsers(users: User[]) { localStorage.setItem(USERS_KEY, JSON.stringify(users)); }

export function createUser(user: User) {
  const users = loadUsers();
  if (users.some(u => u.email.toLowerCase() === user.email.toLowerCase())) {
    throw new Error("Email already registered");
  }
  users.push(user);
  saveUsers(users);
}

export function authenticate(email: string, password: string): User {
  const users = loadUsers();
  const u = users.find(x => x.email.toLowerCase() === email.toLowerCase() && x.password === password);
  if (!u) throw new Error("Invalid credentials");
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(u));
  localStorage.setItem("role", u.role);
  return u;
}

export function getCurrentUser(): User | null {
  try { return JSON.parse(localStorage.getItem(CURRENT_USER_KEY) || "null"); } catch { return null; }
}

export function signOut() {
  localStorage.removeItem(CURRENT_USER_KEY);
  localStorage.removeItem("role");
}
