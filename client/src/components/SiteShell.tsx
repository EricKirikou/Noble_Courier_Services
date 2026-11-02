import { useState, type ReactNode } from "react";
import { Link } from "wouter";
import { ArrowUpRight, Menu, X } from "lucide-react";

export function Brand({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className={`brand ${light ? "brand-light" : ""}`} aria-label="Noble Express home">
      <svg className="brand-mark" viewBox="0 0 40 40" aria-hidden="true">
        <path d="M5 9h13l9 11-9 11H5l9-11L5 9Z" fill="currentColor" opacity=".48" />
        <path d="M17 9h13l9 11-9 11H17l9-11-9-11Z" fill="currentColor" />
      </svg>
      <span className="brand-words"><strong>NOBLE</strong><small>EXPRESS</small></span>
    </Link>
  );
}

const navItems = [
  ["About Us", "/about"],
  ["Our Services", "/services"],
  ["Business Solutions", "/business"],
  ["Track Shipment", "/tracking"],
  ["Contact", "/contact"],
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="header-inner wrap">
        <Brand />
        <button className="mobile-menu" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
        <nav className={`main-nav ${open ? "nav-open" : ""}`} aria-label="Main navigation">
          <Link href="/" onClick={() => setOpen(false)}>Home</Link>
          {navItems.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}
          <Link className="nav-login" href="/login" onClick={() => setOpen(false)}>Client Login</Link>
          <Link className="button button-small button-primary" href="/booking" onClick={() => setOpen(false)}>Get a Quote <ArrowUpRight size={15} /></Link>
        </nav>
      </div>
    </header>
  );
}

export function DemoNotice({ compact = false }: { compact?: boolean }) {
  return <div className={`demo-notice ${compact ? "demo-notice-compact" : ""}`}><span className="demo-dot" /> DEMONSTRATION WEBSITE <span className="demo-notice-divider">·</span> Sample information only</div>;
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div className="footer-brand-col">
          <Brand light />
          <p>A delivery platform concept built to make sending, receiving and managing parcels feel clear and considered.</p>
          <DemoNotice compact />
        </div>
        <div><h3>Explore</h3><Link href="/about">About Us</Link><Link href="/services">Our Services</Link><Link href="/business">Business Solutions</Link><Link href="/tracking">Track Shipment</Link></div>
        <div><h3>Get in touch</h3><Link href="/contact">Contact us</Link><Link href="/booking">Request a quote</Link><Link href="/login">Client Login</Link><span className="footer-placeholder">Phone: [company number]</span></div>
        <div><h3>Information</h3><Link href="/privacy">Privacy Policy</Link><Link href="/terms">Terms &amp; Conditions</Link><span className="footer-placeholder">Email: [company email]</span><span className="footer-placeholder">Address: [office address]</span></div>
      </div>
      <div className="wrap footer-bottom"><span>© {new Date().getFullYear()} Noble Express Courier Services · Demonstration concept</span><span>Designed for clarity at every step.</span></div>
    </footer>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  return <><SiteHeader /><main>{children}</main><SiteFooter /></>;
}
