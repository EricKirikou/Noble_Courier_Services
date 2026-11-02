import { FormEvent, useState } from "react";
import { ArrowLeft, ArrowRight, LockKeyhole, ShieldCheck } from "lucide-react";
import { Link, Redirect, useLocation } from "wouter";
import { DemoNotice, SiteLayout } from "@/components/SiteShell";
import { getDemoSession, setDemoSession, type DemoRole } from "@/lib/demo-data";

const credentials: Record<DemoRole, { email: string; password: string; destination: string; name: string }> = {
  client: { email: "demo@nobleexpress.com", password: "NobleDemo2026!", destination: "/dashboard", name: "Client" },
  admin: { email: "admin@nobleexpress.com", password: "AdminDemo2026!", destination: "/admin/dashboard", name: "Admin" },
};

export function LoginPage({ role = "client" }: { role?: DemoRole }) {
  const [location, setLocation] = useLocation();
  const user = credentials[role];
  const session = getDemoSession();
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const [error, setError] = useState("");
  if (session?.role === role) return <Redirect to={user.destination} />;
  function submit(event: FormEvent) {
    event.preventDefault();
    if (email.trim().toLowerCase() !== user.email || password !== user.password) {
      setError("Those details don’t match the displayed demo credentials. Please try again.");
      return;
    }
    setDemoSession({ role, email: user.email, signedInAt: new Date().toISOString() });
    setLocation(user.destination);
  }
  const admin = role === "admin";
  return <SiteLayout><div className="wrap"><DemoNotice /></div><section className="login-layout wrap"><div className="login-message"><span className="eyebrow">{admin ? "ADMIN DEMONSTRATION" : "CLIENT DEMONSTRATION"}</span><h1>{admin ? <>One view of<br /><span>the operation.</span></> : <>Your deliveries,<br /><span>in one place.</span></>}</h1><p>{admin ? "Explore a separate sample workspace for shipments, customers and delivery operations." : "Review sample shipments, create a delivery request and explore the client workspace."}</p><Link href={admin ? "/login" : "/admin/login"} className="text-link">{admin ? "Go to client demo login" : "Admin demo login"} <ArrowRight size={15} /></Link></div>
      <form className="form-card login-card" onSubmit={submit}><span className="login-icon"><LockKeyhole size={20} /></span><span className="eyebrow">{admin ? "ADMIN ACCESS" : "CLIENT ACCESS"}</span><h2>Sign in to the demo.</h2><p>Use the demonstration credentials below. This is not production authentication.</p><label>Email address<input type="email" autoComplete="username" value={email} onChange={e => setEmail(e.target.value)} required /></label><label>Password<input type="password" autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} required /></label>{error && <p className="form-error" role="alert">{error}</p>}<button className="button button-primary button-full" type="submit">Enter {admin ? "admin" : "client"} demo <ArrowRight size={16} /></button><div className="credential-box"><div><small>DEMO EMAIL</small><strong>{user.email}</strong></div><div><small>DEMO PASSWORD</small><strong>{user.password}</strong></div></div><div className="security-note"><ShieldCheck size={15} /><small>Demo access is stored only in this browser. Do not enter real or sensitive information.</small></div><Link href="/" className="back-home"><ArrowLeft size={14} /> Back to home</Link></form>
    </section></SiteLayout>;
}
