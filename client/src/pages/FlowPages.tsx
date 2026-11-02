import { FormEvent, useState } from "react";
import { ArrowRight, Check, CircleHelp, PackageCheck, Search, Truck } from "lucide-react";
import { Link, useLocation } from "wouter";
import { DemoNotice, SiteLayout } from "@/components/SiteShell";
import { addSampleBooking, getSampleShipments, type Shipment } from "@/lib/demo-data";

export function TrackingPage() {
  const [, setLocation] = useLocation();
  const startingRef = new URLSearchParams(window.location.search).get("ref") || "";
  const [reference, setReference] = useState(startingRef);
  const [result, setResult] = useState<Shipment | null>(startingRef ? getSampleShipments().find(s => s.reference.toLowerCase() === startingRef.toLowerCase()) || null : null);
  const [searched, setSearched] = useState(Boolean(startingRef));
  function search(event: FormEvent) {
    event.preventDefault();
    const cleaned = reference.trim();
    setLocation(`/tracking${cleaned ? `?ref=${encodeURIComponent(cleaned)}` : ""}`);
    setSearched(Boolean(cleaned));
    setResult(cleaned ? getSampleShipments().find(s => s.reference.toLowerCase() === cleaned.toLowerCase()) || null : null);
  }
  return <SiteLayout><div className="wrap"><DemoNotice /></div><section className="page-hero compact-page-hero wrap"><span className="eyebrow">SHIPMENT TRACKING</span><h1>A little more<br /><span>peace of mind.</span></h1><p className="hero-lede">Enter a sample reference to explore a clear, step-by-step shipment timeline.</p></section>
    <section className="wrap tracking-wrap"><form className="tracking-search" onSubmit={search}><label htmlFor="tracking-ref">Enter your tracking reference</label><div className="tracking-search-row"><Search size={20} /><input id="tracking-ref" value={reference} onChange={e => setReference(e.target.value)} placeholder="e.g. NEC-2026-00125" required /><button className="button button-primary" type="submit">Track shipment <ArrowRight size={16} /></button></div><small>Demo references: NEC-2026-00125 · NEC-2026-00126 · NEC-2026-00127</small></form>
      {result ? <TrackingResult shipment={result} /> : searched ? <div className="empty-state"><CircleHelp size={27} /><h2>No sample shipment found</h2><p>That reference is not in this demonstration. Try NEC-2026-00125, NEC-2026-00126 or NEC-2026-00127.</p></div> : <div className="tracking-hint"><span><PackageCheck size={20} /></span><p><strong>Looking for a sample update?</strong><br />Use any of the three demo references above to see how shipment progress could be displayed.</p></div>}
    </section></SiteLayout>;
}

function TrackingResult({ shipment }: { shipment: Shipment }) {
  return <article className="tracking-result"><div className="result-head"><div><span className="eyebrow">DEMO SHIPMENT · SAMPLE DATA</span><h2>{shipment.reference}</h2><p>{shipment.type} <span>·</span> Added {shipment.shipmentDate}</p></div><span className={`status-pill ${shipment.status === "Delivered" ? "status-done" : "status-active"}`}><i />{shipment.status}</span></div>
    <div className="result-route"><div><small>FROM · SAMPLE PICKUP</small><strong>{shipment.pickup}</strong></div><div className="route-rule"><span /><i /></div><div><small>TO · SAMPLE DESTINATION</small><strong>{shipment.destination}</strong></div></div>
    <div className="shipment-facts"><div><small>SENDER</small><strong>{shipment.sender}</strong></div><div><small>RECIPIENT</small><strong>{shipment.recipient}</strong></div><div><small>SHIPMENT DATE</small><strong>{shipment.shipmentDate}</strong></div><div><small>ESTIMATED DELIVERY</small><strong>{shipment.expectedDate}</strong></div></div>
    <div className="timeline-heading"><div><span className="eyebrow">DELIVERY PROGRESS</span><h3>Your parcel, step by step.</h3></div><Truck size={21} /></div>
    <ol className="shipment-timeline">{shipment.events.map((event, index) => <li key={`${event.label}-${index}`} className={event.complete ? "event-complete" : ""}><span className="timeline-dot">{event.complete && <Check size={11} />}</span><div><strong>{event.label}</strong><small>{event.location}</small></div><time>{event.date}</time></li>)}</ol>
    <p className="fine-print">Demonstration record only. Locations, names, dates and status updates are sample information and do not represent live shipment data.</p>
  </article>;
}

const prices: Record<string, number> = { "Same-Day Delivery": 48, "Express Courier": 62, "Standard Parcel": 34, "Scheduled / Bulk": 76 };

export function BookingPage() {
  const [, setLocation] = useLocation();
  const [deliveryType, setDeliveryType] = useState("Standard Parcel");
  const [size, setSize] = useState("Small");
  const [savedReference, setSavedReference] = useState("");
  const sizeExtra: Record<string, number> = { Small: 0, Medium: 12, Large: 26 };
  const estimate = (prices[deliveryType] || 34) + sizeExtra[size];
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const reference = `NEC-DEMO-${Date.now().toString().slice(-6)}`;
    const today = new Date().toISOString().slice(0, 10);
    const booking: Shipment = {
      reference,
      sender: `${form.get("senderName")} (sample)`,
      recipient: `${form.get("recipientName")} (sample)`,
      pickup: `${form.get("pickup")} (sample)`,
      destination: `${form.get("destination")} (sample)`,
      shipmentDate: String(form.get("pickupDate") || today),
      expectedDate: "Estimate only · to be confirmed",
      status: "Booking Confirmed",
      type: deliveryType,
      senderPhone: String(form.get("senderPhone")),
      recipientPhone: String(form.get("recipientPhone")),
      parcelDescription: String(form.get("description")),
      packageSize: size,
      preferredPickupDate: String(form.get("pickupDate")),
      specialInstructions: String(form.get("instructions") || ""),
      estimateGhs: estimate,
      events: [{ label: "Booking Confirmed", date: "Just now · demo", location: "Sample booking", complete: true }, { label: "Picked Up", date: "Pending", location: "Sample pickup", complete: false }, { label: "In Transit", date: "Pending", location: "Sample route", complete: false }, { label: "Delivered", date: "Pending", location: "Sample destination", complete: false }],
    };
    addSampleBooking(booking);
    setSavedReference(reference);
    event.currentTarget.reset();
  }
  return <SiteLayout><div className="wrap"><DemoNotice /></div><section className="page-hero compact-page-hero wrap"><span className="eyebrow">BOOK A DELIVERY</span><h1>Let’s get it<br /><span>moving.</span></h1><p className="hero-lede">Share a few details to create a sample booking and see an illustrative, non-official estimate.</p></section>
    <section className="wrap booking-layout"><form className="form-card booking-form" onSubmit={submit}><div className="form-card-heading"><span className="eyebrow">DELIVERY DETAILS</span><h2>Tell us what you’re sending.</h2></div><div className="form-section-title"><span>01</span> PEOPLE</div><div className="form-row"><label>Sender name<input name="senderName" required placeholder="Full name" /></label><label>Sender phone<input name="senderPhone" required type="tel" placeholder="Phone number" /></label></div><div className="form-row"><label>Recipient name<input name="recipientName" required placeholder="Full name" /></label><label>Recipient phone<input name="recipientPhone" required type="tel" placeholder="Phone number" /></label></div><div className="form-section-title"><span>02</span> ROUTE &amp; PARCEL</div><div className="form-row"><label>Pickup location<input name="pickup" required placeholder="Enter sample pickup location" /></label><label>Destination<input name="destination" required placeholder="Enter sample destination" /></label></div><label>Parcel description<input name="description" required placeholder="What are you sending?" /></label><div className="form-row"><label>Package size<select value={size} onChange={e => setSize(e.target.value)}><option>Small</option><option>Medium</option><option>Large</option></select></label><label>Delivery type<select value={deliveryType} onChange={e => setDeliveryType(e.target.value)}><option>Standard Parcel</option><option>Express Courier</option><option>Same-Day Delivery</option><option>Scheduled / Bulk</option></select></label></div><div className="form-row"><label>Preferred pickup date<input name="pickupDate" type="date" min={new Date().toISOString().slice(0, 10)} required /></label><label>Special instructions<input name="instructions" placeholder="Optional notes" /></label></div><button className="button button-primary" type="submit">Create sample booking <ArrowRight size={16} /></button><small className="form-note">Use fictional sample details only. This stays in this browser; no courier is dispatched.</small></form>
      <aside className="quote-card"><span className="quote-mark">“</span><span className="eyebrow">ILLUSTRATIVE ESTIMATE</span><h2>Know the cost<br />before you book.</h2><p>Select a delivery option and package size to see a sample estimate.</p><div className="estimate-total"><small>DEMO ESTIMATE</small><strong>GH₵ {estimate.toFixed(2)}</strong></div><div className="estimate-breakdown"><span>{deliveryType}<b>GH₵ {(prices[deliveryType] || 34).toFixed(2)}</b></span><span>{size} parcel size<b>GH₵ {sizeExtra[size].toFixed(2)}</b></span></div><p className="fine-print">Illustrative values only · Not official company rates. Final pricing and service availability are not represented.</p>{savedReference && <div className="booking-success"><span><Check size={16} /></span><div><strong>Sample booking created</strong><small>Reference: {savedReference}</small><Link href={`/tracking?ref=${savedReference}`}>View sample tracking <ArrowRight size={13} /></Link></div></div>}</aside>
    </section></SiteLayout>;
}
