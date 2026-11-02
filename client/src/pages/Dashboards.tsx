import { FormEvent, useMemo, useState, type ReactNode } from "react";
import { ArrowRight, ArrowUpRight, Boxes, BriefcaseBusiness, CalendarClock, ChartNoAxesColumnIncreasing, Check, ChevronDown, CircleUserRound, ClipboardList, Download, FileText, LayoutDashboard, LogOut, Menu, Package, PackageCheck, Plus, Search, Settings, ShieldCheck, Truck, Users, Warehouse, X } from "lucide-react";
import { Link, Redirect, useLocation } from "wouter";
import { Brand, DemoNotice } from "@/components/SiteShell";
import { getDemoSession, getInventory, getSampleShipments, initialInventory, saveInventory, setDemoSession, sampleCustomers, sampleDrivers, type DemoRole, type InventoryItem, type Shipment } from "@/lib/demo-data";

const clientNav = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "shipments", label: "Shipment history", icon: Package },
  { id: "inventory", label: "Inventory demo", icon: Warehouse },
  { id: "notifications", label: "Notifications", icon: CalendarClock },
  { id: "profile", label: "My profile", icon: CircleUserRound },
];
const adminNav = [
  { id: "overview", label: "Dashboard", icon: LayoutDashboard },
  { id: "shipments", label: "Shipments", icon: Package },
  { id: "customers", label: "Customers", icon: Users },
  { id: "assignments", label: "Delivery assignments", icon: Truck },
  { id: "drivers", label: "Drivers", icon: BriefcaseBusiness },
  { id: "inventory", label: "Inventory", icon: Warehouse },
  { id: "services", label: "Services", icon: Boxes },
  { id: "bookings", label: "Bookings", icon: ClipboardList },
  { id: "reports", label: "Reports", icon: ChartNoAxesColumnIncreasing },
  { id: "settings", label: "System settings", icon: Settings },
];

function DashboardFrame({ role, active, onActive, children }: { role: DemoRole; active: string; onActive: (id: string) => void; children: ReactNode }) {
  const [, setLocation] = useLocation();
  const [mobileNav, setMobileNav] = useState(false);
  const session = getDemoSession();
  const isAdmin = role === "admin";
  const nav = isAdmin ? adminNav : clientNav;
  function logout() { setDemoSession(null); setLocation("/"); }
  return <div className="dashboard-root"><aside className={`dashboard-sidebar ${mobileNav ? "dashboard-sidebar-open" : ""}`}><Brand light /><div className="sidebar-demo-tag"><span className="demo-dot" /> DEMO WORKSPACE</div><div className="sidebar-label">{isAdmin ? "ADMINISTRATION" : "YOUR ACCOUNT"}</div><nav className="dashboard-nav">{nav.map(item => <button className={active === item.id ? "dash-nav-active" : ""} key={item.id} onClick={() => { onActive(item.id); setMobileNav(false); }}><item.icon size={17} />{item.label}{active === item.id && <ChevronDown size={14} className="nav-indicator" />}</button>)}</nav><div className="sidebar-spacer" /><div className="sidebar-help"><span className="help-icon"><ShieldCheck size={16} /></span><div><strong>Demo environment</strong><small>Sample records only</small></div></div><button className="logout-button" onClick={logout}><LogOut size={16} /> Log out</button></aside><button className={`dashboard-sidebar-backdrop ${mobileNav ? "visible" : ""}`} aria-label="Close dashboard navigation" onClick={() => setMobileNav(false)} /><div className="dashboard-main"><header className="dashboard-topbar"><div className="topbar-left"><button className="dash-menu-toggle" aria-label={mobileNav ? "Close navigation" : "Open navigation"} aria-expanded={mobileNav} onClick={() => setMobileNav(!mobileNav)}>{mobileNav ? <X size={19} /> : <Menu size={19} />}</button><span className="breadcrumb">{isAdmin ? "Admin" : "Client portal"} <i>/</i> {nav.find(n => n.id === active)?.label}</span><div className="dash-mobile-brand"><Brand /></div></div><div className="topbar-user"><span className="avatar-circle">{isAdmin ? "A" : "N"}</span><div><strong>{isAdmin ? "Demo Admin" : "Noble Client"}</strong><small>{session?.email || "demo user"}</small></div></div></header><main className="dashboard-content"><div className="dash-demo-banner"><DemoNotice compact /><span>All figures and records shown here are sample data.</span></div>{children}</main></div></div>;
}

function DashboardTitle({ eyebrow, title, subtitle, action }: { eyebrow: string; title: string; subtitle: string; action?: React.ReactNode }) {
  return <div className="dashboard-title"><div><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{subtitle}</p></div>{action}</div>;
}

function MetricCard({ label, value, icon: Icon, tone = "" }: { label: string; value: string | number; icon: typeof Package; tone?: string }) {
  return <article className={`metric-card ${tone}`}><span className="metric-icon"><Icon size={18} /></span><small>{label}</small><strong>{value}</strong><span className="metric-caption">Sample demo metric</span></article>;
}

function ShipmentList({ shipments, detail }: { shipments: Shipment[]; detail?: boolean }) {
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Shipment | null>(null);
  const filtered = useMemo(() => shipments.filter(s => (filter === "All" || s.status === filter) && `${s.reference} ${s.sender} ${s.recipient} ${s.destination}`.toLowerCase().includes(query.toLowerCase())), [shipments, filter, query]);
  return <div className="table-card"><div className="table-tools"><div className="filter-pills">{["All", "In Transit", "Out for Delivery", "Delivered", "Booking Confirmed"].map(f => <button key={f} className={filter === f ? "filter-active" : ""} onClick={() => setFilter(f)}>{f}</button>)}</div><label className="table-search"><Search size={15} /><input aria-label="Search shipment history" placeholder="Search reference" value={query} onChange={e => setQuery(e.target.value)} /></label></div><div className="table-scroll"><table><thead><tr><th>REFERENCE</th><th>RECIPIENT</th><th>DESTINATION</th><th>STATUS</th><th>EXPECTED</th><th /></tr></thead><tbody>{filtered.map(s => <tr key={s.reference}><td><strong className="ref-cell">{s.reference}</strong><small>{s.type} · sample</small></td><td>{s.recipient}</td><td>{s.destination}</td><td><span className={`status-pill ${s.status === "Delivered" ? "status-done" : "status-active"}`}><i />{s.status}</span></td><td>{s.expectedDate}</td><td><button className="table-detail-button" onClick={() => setSelected(selected?.reference === s.reference ? null : s)}>{selected?.reference === s.reference ? "Close" : "Details"}</button></td></tr>)}</tbody></table>{filtered.length === 0 && <div className="table-empty">No sample shipments match these filters.</div>}</div>{selected && <div className="shipment-detail"><div><span className="eyebrow">SAMPLE SHIPMENT DETAIL</span><h3>{selected.reference}</h3></div><Link className="text-link" href={`/tracking?ref=${selected.reference}`}>Open tracking <ArrowRight size={14} /></Link><p>{selected.sender} <ArrowRight size={14} /> {selected.recipient} · {selected.pickup} to {selected.destination}</p><small>Shipment date {selected.shipmentDate} · expected {selected.expectedDate} · {detail ? "Demo record" : "Sample data"}</small></div>}</div>;
}

function InventoryPanel({ items, onChange }: { items: InventoryItem[]; onChange: (items: InventoryItem[]) => void }) {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<InventoryItem | null>(null);
  const [formError, setFormError] = useState("");
  const filtered = items.filter(item => { const matchesText = `${item.name} ${item.sku} ${item.location} ${item.movement}`.toLowerCase().includes(query.toLowerCase()); const low = item.quantity <= item.threshold; const matchesStatus = statusFilter === "all" || (statusFilter === "low" ? low : !low); return matchesText && matchesStatus; });
  function openEdit(item?: InventoryItem) { setEditing(item || null); setFormError(""); setShowForm(true); }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const quantity = Number(data.get("quantity"));
    const threshold = Number(data.get("threshold"));
    if (!Number.isFinite(quantity) || quantity < 0 || !Number.isFinite(threshold) || threshold < 0) { setFormError("Enter a valid non-negative quantity and low-stock threshold."); return; }
    const item: InventoryItem = { id: editing?.id || `inv-${Date.now()}`, name: String(data.get("name")).trim(), sku: String(data.get("sku")).trim(), quantity, threshold, location: String(data.get("location")).trim(), movement: editing ? "Updated · demo" : "Added · demo" };
    if (!item.name || !item.sku || !item.location) { setFormError("Complete the product name, SKU and storage location."); return; }
    const updated = editing ? items.map(old => old.id === editing.id ? item : old) : [item, ...items];
    onChange(updated); saveInventory(updated); setShowForm(false); setEditing(null);
  }
  function remove(item: InventoryItem) { if (!window.confirm(`Delete sample item “${item.name}”?`)) return; const updated = items.filter(old => old.id !== item.id); onChange(updated); saveInventory(updated); }
  const lowStock = items.filter(item => item.quantity <= item.threshold).length;
  return <div className="inventory-panel"><div className="metric-row inventory-metrics"><MetricCard label="Total items" value={items.length} icon={Boxes} /><MetricCard label="Items in stock" value={items.filter(i => i.quantity > 0).length} icon={PackageCheck} tone="metric-green" /><MetricCard label="Low-stock alerts" value={lowStock} icon={Package} tone="metric-amber" /></div><div className="table-card"><div className="inventory-toolbar"><div><h2>Sample inventory</h2><p>Browser-stored demonstration records · Sample movement shown</p></div><button className="button button-primary button-small" onClick={() => openEdit()}><Plus size={15} /> Add item</button></div><div className="inventory-search-row"><label className="table-search"><Search size={15} /><input placeholder="Search name, SKU or location" aria-label="Search inventory" value={query} onChange={e => setQuery(e.target.value)} /></label><div className="inventory-filter-controls"><select aria-label="Filter by stock status" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}><option value="all">All stock statuses</option><option value="low">Low stock</option><option value="ok">In stock</option></select><span>{filtered.length} of {items.length} items</span></div></div><div className="table-scroll"><table><thead><tr><th>PRODUCT</th><th>SKU</th><th>QTY</th><th>STORAGE LOCATION</th><th>STATUS</th><th>MOVEMENT</th><th>ACTIONS</th></tr></thead><tbody>{filtered.map(item => <tr key={item.id}><td><strong>{item.name}</strong><small>Sample inventory</small></td><td className="sku-cell">{item.sku}</td><td><strong>{item.quantity}</strong></td><td>{item.location}</td><td><span className={`status-pill ${item.quantity <= item.threshold ? "status-low" : "status-done"}`}><i />{item.quantity <= item.threshold ? "Low stock" : "In stock"}</span></td><td>{item.movement}</td><td className="inventory-actions"><button onClick={() => openEdit(item)}>Edit</button><button onClick={() => remove(item)} aria-label={`Delete ${item.name}`}>Delete</button></td></tr>)}</tbody></table>{filtered.length === 0 && <div className="table-empty">No sample items match your search.</div>}</div></div>
      {showForm && <div className="modal-scrim" role="presentation" onMouseDown={e => { if (e.target === e.currentTarget) setShowForm(false); }}><form className="inventory-modal" onSubmit={submit}><button type="button" className="modal-close" onClick={() => setShowForm(false)} aria-label="Close"><X size={18} /></button><span className="eyebrow">DEMO INVENTORY</span><h2>{editing ? "Edit sample item" : "Add a sample item"}</h2><p>Changes are stored in this browser only.</p><label>Product name<input name="name" required defaultValue={editing?.name || ""} placeholder="e.g. Packing tape" /></label><div className="form-row"><label>SKU<input name="sku" required defaultValue={editing?.sku || ""} placeholder="SUP-TAPE-01" /></label><label>Quantity<input name="quantity" required type="number" min="0" defaultValue={editing?.quantity ?? 0} /></label></div><div className="form-row"><label>Storage location<input name="location" required defaultValue={editing?.location || ""} placeholder="Zone A · Rack 02" /></label><label>Low-stock threshold<input name="threshold" required type="number" min="0" defaultValue={editing?.threshold ?? 10} /></label></div>{formError && <p className="form-error" role="alert">{formError}</p>}<div className="modal-actions"><button className="button button-outline" type="button" onClick={() => setShowForm(false)}>Cancel</button><button className="button button-primary" type="submit">{editing ? "Save changes" : "Add sample item"}</button></div></form></div>}
    </div>;
}

export function ClientDashboard() {
  const [active, setActive] = useState("overview");
  const [, setLocation] = useLocation();
  const [inventory, setInventory] = useState(getInventory());
  const shipments = getSampleShipments();
  return <DashboardFrame role="client" active={active} onActive={setActive}>{active === "overview" && <><DashboardTitle eyebrow="CLIENT WORKSPACE · DEMO" title="A clearer view of your deliveries." subtitle="Your sample activity, gathered in one place." action={<Link className="button button-primary button-small" href="/booking"><Plus size={15} /> Book a shipment</Link>} /><div className="metric-row"><MetricCard label="Total shipments" value={shipments.length} icon={Package} /><MetricCard label="Pending deliveries" value={shipments.filter(s => s.status !== "Delivered").length} icon={CalendarClock} tone="metric-amber" /><MetricCard label="Delivered shipments" value={shipments.filter(s => s.status === "Delivered").length} icon={PackageCheck} tone="metric-green" /><MetricCard label="Active shipments" value={shipments.filter(s => s.status === "In Transit" || s.status === "Out for Delivery").length} icon={Truck} /></div><div className="dash-section-heading"><div><span className="eyebrow">LATEST ACTIVITY</span><h2>Recent sample shipments</h2></div><button className="text-link" onClick={() => setActive("shipments")}>View shipment history <ArrowRight size={15} /></button></div><ShipmentList shipments={shipments.slice(0, 3)} /><div className="shortcut-row"><button onClick={() => setLocation("/tracking")}><span><PackageCheck size={18} /></span><div><strong>Track a package</strong><small>Look up a sample tracking reference</small></div><ArrowUpRight size={16} /></button><button onClick={() => setActive("inventory")}><span><Warehouse size={18} /></span><div><strong>Open inventory demo</strong><small>Search and manage sample items</small></div><ArrowUpRight size={16} /></button></div></>}
      {active === "shipments" && <><DashboardTitle eyebrow="SHIPMENT HISTORY · DEMO" title="Every sample journey." subtitle="Search, filter and open sample shipment details." /><ShipmentList shipments={shipments} detail /></>}
      {active === "inventory" && <><DashboardTitle eyebrow="INVENTORY MANAGEMENT · DEMO" title="Know what’s on the shelf." subtitle="Edit sample packaging and warehouse-supply records stored in this browser." /><InventoryPanel items={inventory} onChange={setInventory} /></>}
      {active === "notifications" && <><DashboardTitle eyebrow="NOTIFICATIONS · DEMO" title="Updates worth a look." subtitle="Illustrative sample notifications; no messages are sent." /><div className="notification-list">{[{title:"Sample parcel out for delivery", body:"NEC-2026-00126 is marked Out for Delivery in the demo record.", time:"Today · sample"},{title:"Sample shipment in transit", body:"NEC-2026-00125 has a sample transit update.", time:"30 Oct · sample"},{title:"Welcome to the demo workspace", body:"Explore booking, shipment history and sample inventory tools.", time:"Just now · demo"}].map((n,i)=><article key={i}><span className="notification-dot" /><div><strong>{n.title}</strong><p>{n.body}</p><small>{n.time}</small></div><span className="demo-tag">DEMO</span></article>)}</div></>}
      {active === "profile" && <><DashboardTitle eyebrow="MY PROFILE · DEMO" title="Your sample account." subtitle="This profile is local demonstration content, not a company customer record." /><div className="profile-card"><span className="profile-avatar">N</span><div><span className="eyebrow">CLIENT DEMONSTRATION USER</span><h2>Noble Client</h2><p>demo@nobleexpress.com</p><span className="status-pill status-done"><i /> Demo account</span></div><p className="profile-note">Personal, business and contact details are intentionally not collected in this demonstration.</p></div></>}
    </DashboardFrame>;
}

function AdminRecords({ title, rows, columns }: { title: string; rows: Record<string, string>[]; columns: string[] }) {
  const [selected, setSelected] = useState<Record<string, string> | null>(null);
  return <div className="table-card"><div className="inventory-toolbar"><div><h2>{title}</h2><p>Illustrative administration records · Demo data only</p></div></div><div className="table-scroll"><table><thead><tr>{columns.map(c=><th key={c}>{c.toUpperCase()}</th>)}<th /></tr></thead><tbody>{rows.map((row,i)=><tr key={i}>{columns.map(c=><td key={c}>{row[c] || "—"}</td>)}<td><button className="table-detail-button" onClick={()=>setSelected(selected === row ? null : row)}>{selected === row ? "Close" : "View"}</button></td></tr>)}</tbody></table></div>{selected && <div className="shipment-detail"><span className="eyebrow">SAMPLE RECORD DETAIL</span><h3>{columns.map(c=>selected[c]).filter(Boolean).join(" · ")}</h3><p>This is a fictional operational record provided to demonstrate the admin interface.</p></div>}</div>;
}

export function AdminDashboard() {
  const [active, setActive] = useState("overview");
  const [inventory, setInventory] = useState(getInventory());
  const shipments = getSampleShipments();
  const adminTitle: Record<string, [string,string]> = {
    overview:["Operations at a glance.","Sample analytics for the separate Noble Express admin workspace."], shipments:["Shipment management.","Review and open illustrative sample shipment records."], customers:["Customer management.","Fictional customer records for the management concept."], assignments:["Delivery assignments.","Sample shipment-to-driver assignment overview."], drivers:["Driver management.","Illustrative delivery-personnel records, not real staff information."], inventory:["Inventory management.","Manage the browser-stored sample inventory items."], services:["Service management.","Review the service concepts presented on this demonstration site."], bookings:["Booking management.","Sample booking requests created in this browser demonstration."], reports:["Reports & summaries.","Export the visible sample shipment data as a demonstration CSV."], settings:["System settings.","Configuration overview for the demonstration environment."],
  };
  const [title, subtitle] = adminTitle[active];
  function downloadReport() {
    const rows = [["Reference","Sender","Recipient","Status","Destination"], ...shipments.map(s=>[s.reference,s.sender,s.recipient,s.status,s.destination])];
    const csv = rows.map(row=>row.map(cell=>`"${cell.replaceAll('"','""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type:"text/csv" }); const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = "noble-express-demo-shipments.csv"; a.click(); URL.revokeObjectURL(url);
  }
  return <DashboardFrame role="admin" active={active} onActive={setActive}><DashboardTitle eyebrow={`ADMIN WORKSPACE · ${active.toUpperCase()}`} title={title} subtitle={subtitle} action={active === "reports" ? <button className="button button-primary button-small" onClick={downloadReport}><Download size={15} /> Export demo CSV</button> : undefined} />
    {active === "overview" && <><div className="metric-row"><MetricCard label="Sample shipments" value={shipments.length} icon={Package} /><MetricCard label="Pending deliveries" value={shipments.filter(s=>s.status!=="Delivered").length} icon={CalendarClock} tone="metric-amber" /><MetricCard label="Sample customers" value={sampleCustomers.length} icon={Users} tone="metric-green" /><MetricCard label="Inventory items" value={inventory.length} icon={Warehouse} /></div><div className="admin-overview-grid"><div className="table-card"><div className="inventory-toolbar"><div><h2>Sample shipment activity</h2><p>Illustrative records · no live operations data</p></div><button className="text-link" onClick={()=>setActive("shipments")}>View all <ArrowRight size={14} /></button></div>{shipments.slice(0,3).map(s=><div className="admin-activity" key={s.reference}><span className="activity-symbol"><Package size={16} /></span><div><strong>{s.reference}</strong><small>{s.pickup} to {s.destination}</small></div><span className="status-pill status-active"><i />{s.status}</span></div>)}</div><div className="admin-side-note"><span className="eyebrow">SYSTEM NOTE</span><h3>Demonstration mode</h3><p>Customer records, delivery assignments and activity metrics are sample data. No actual dispatch, messaging or customer account changes occur.</p><span><ShieldCheck size={15} /> Client and admin access are separate demo roles.</span></div></div></>}
    {active === "shipments" && <ShipmentList shipments={shipments} detail />}
    {active === "customers" && <AdminRecords title="Sample customers" columns={["name","type","shipments","status"]} rows={sampleCustomers.map(c=>({name:c.name,type:c.type,shipments:String(c.shipments),status:c.status}))} />}
    {active === "assignments" && <AdminRecords title="Sample delivery assignments" columns={["reference","route","driver","status"]} rows={shipments.slice(0,3).map((s,i)=>({reference:s.reference,route:`${s.pickup} → ${s.destination}`,driver:sampleDrivers[i%sampleDrivers.length].name,status:s.status}))} />}
    {active === "drivers" && <AdminRecords title="Sample delivery personnel" columns={["name","area","status"]} rows={sampleDrivers.map(d=>({name:d.name,area:d.area,status:d.status}))} />}
    {active === "inventory" && <InventoryPanel items={inventory} onChange={setInventory} />}
    {active === "services" && <AdminRecords title="Service catalogue concepts" columns={["name","group","availability"]} rows={["Same-Day Delivery","Express Courier Services","Standard Parcel Delivery","Corporate & Business Deliveries","E-commerce Delivery Fulfilment","Bulk & Scheduled Deliveries","Pickup & Drop-off Services","Warehousing & Inventory Support"].map((name,i)=>({name,group:i<3?"Parcel delivery":"Business solutions",availability:"Demo concept"}))} />}
    {active === "bookings" && <AdminRecords title="Sample booking requests" columns={["reference","sender","recipient","type","status"]} rows={shipments.map(s=>({reference:s.reference,sender:s.sender,recipient:s.recipient,type:s.type,status:s.status}))} />}
    {active === "reports" && <div className="report-card"><span className="report-icon"><FileText size={23} /></span><div><h2>Sample shipment report</h2><p>Export the current demonstration shipment records as a CSV file for this browser session.</p><small>{shipments.length} sample records · Fictional information</small></div><button className="button button-outline" onClick={downloadReport}><Download size={15} /> Download CSV</button></div>}
    {active === "settings" && <div className="settings-card"><div><span className="settings-icon"><ShieldCheck size={19} /></span><div><strong>Environment</strong><small>Frontend-only demonstration</small></div><span className="status-pill status-low"><i /> Demo</span></div><div><span className="settings-icon"><Users size={19} /></span><div><strong>Role access</strong><small>Separate client and admin demo accounts</small></div><span className="status-pill status-done"><i /> Enabled</span></div><div><span className="settings-icon"><Warehouse size={19} /></span><div><strong>Sample storage</strong><small>Browser local storage · this device only</small></div><span className="status-pill status-done"><i /> Local</span></div><div><span className="settings-icon"><Settings size={19} /></span><div><strong>Production security</strong><small>Not configured · demonstration access only</small></div><span className="status-pill status-low"><i /> Not live</span></div><p className="fine-print">This interface does not configure company systems or actual operational policies.</p></div>}
  </DashboardFrame>;
}

export function ProtectedDashboard({ role }: { role: DemoRole }) {
  const session = getDemoSession();
  const target = role === "admin" ? "/admin/dashboard" : "/dashboard";
  if (!session || session.role !== role) return <DashboardRedirect to={role === "admin" ? "/admin/login" : "/login"} />;
  return role === "admin" ? <AdminDashboard key={target} /> : <ClientDashboard key={target} />;
}
function DashboardRedirect({ to }: { to: string }) { return <Redirect to={to} />; }
