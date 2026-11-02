import { FormEvent, useState } from "react";
import { ArrowDownRight, ArrowRight, ArrowUpRight, Box, Building2, Check, ChevronRight, Clock3, Layers3, MapPin, PackageCheck, PackageOpen, ShieldCheck, Store, Truck, Warehouse, Zap } from "lucide-react";
import { Link, useLocation } from "wouter";
import { DemoNotice, SiteLayout } from "@/components/SiteShell";

const services = [
  { icon: Zap, title: "Same-Day Delivery", text: "A convenient option for time-sensitive local parcels, with clear updates throughout the sample delivery journey." },
  { icon: Truck, title: "Express Courier Services", text: "A faster delivery choice for important documents and packages that need prompt handling." },
  { icon: PackageOpen, title: "Standard Parcel Delivery", text: "A straightforward way to send everyday parcels with an easy-to-follow status timeline." },
  { icon: Building2, title: "Corporate & Business Deliveries", text: "A considered delivery workflow for recurring business needs, teams and office consignments." },
  { icon: Store, title: "E-commerce Fulfilment", text: "A concept for online shops looking to connect order preparation with parcel delivery." },
  { icon: Layers3, title: "Bulk & Scheduled Deliveries", text: "Organize multiple parcels or planned dispatches through one clear request." },
  { icon: MapPin, title: "Pickup & Drop-off", text: "Plan a sample pickup or delivery request with the key details in one place." },
  { icon: Warehouse, title: "Warehousing Support", text: "Explore an inventory view for sample packaging materials and warehouse supplies." },
];

const flow = [
  { number: "01", title: "Share the details", body: "Tell us where your parcel is going, what it contains and how soon it should arrive." },
  { number: "02", title: "Choose a delivery", body: "Compare illustrative options and request the delivery service that suits your needs." },
  { number: "03", title: "Follow the journey", body: "Use a sample reference to view a clear, step-by-step demonstration of parcel progress." },
];

export function HomePage() {
  const [, setLocation] = useLocation();
  const [tracking, setTracking] = useState("");
  const submitTracking = (event: FormEvent) => {
    event.preventDefault();
    setLocation(`/tracking${tracking.trim() ? `?ref=${encodeURIComponent(tracking.trim())}` : ""}`);
  };
  return <SiteLayout>
    <div className="wrap"><DemoNotice /></div>
    <section className="hero wrap">
      <div className="hero-copy">
        <span className="eyebrow"><span className="eyebrow-line" /> COURIER, MADE CLEAR</span>
        <h1>Your Deliveries.<br /><span>Our Priority.</span></h1>
        <p className="hero-lede">Reliable courier and logistics solutions designed to keep your business moving. From urgent parcels to business deliveries, Noble Express makes sending and receiving easier.</p>
        <div className="hero-actions"><Link className="button button-primary" href="/booking">Book a Delivery <ArrowUpRight size={17} /></Link><Link className="button button-quiet" href="/tracking">Track a Shipment <ArrowRight size={16} /></Link></div>
        <form className="hero-track" onSubmit={submitTracking}>
          <label htmlFor="hero-track">Have a tracking number?</label>
          <div className="track-input-row"><input id="hero-track" placeholder="e.g. NEC-2026-00125" value={tracking} onChange={e => setTracking(e.target.value)} /><button aria-label="Look up sample shipment" type="submit"><ArrowRight size={19} /></button></div>
          <small>Try one of the sample references to explore the demo.</small>
        </form>
      </div>
      <div className="hero-visual">
        <img src="/manus-storage/async-images/RDdqGy1FjpWVHAT0kFwoPx/image-1.webp" alt="Sample courier holding a parcel beside a delivery vehicle" />
        <div className="image-index"><span>01</span><i /> DELIVERY, IN FOCUS</div>
        <div className="floating-route"><span className="route-icon"><PackageCheck size={18} /></span><span><strong>Every parcel, one clear view</strong><small>Sample tracking experience</small></span><ChevronRight size={16} /></div>
      </div>
    </section>

    <section className="benefit-band">
      <div className="wrap benefits"><div className="benefit-intro"><span className="eyebrow">THE NOBLE DIFFERENCE</span><p>Designed around what matters<br />most when you send.</p></div>
        <div className="benefit"><span className="benefit-icon"><ShieldCheck size={19} /></span><div><strong>Reliable Deliveries</strong><small>Thoughtful handling from request to arrival.</small></div></div>
        <div className="benefit"><span className="benefit-icon"><Clock3 size={19} /></span><div><strong>Real-Time Shipment Updates</strong><small>Clear sample milestones, easy to follow.</small></div></div>
        <div className="benefit"><span className="benefit-icon"><Building2 size={19} /></span><div><strong>Business Delivery Solutions</strong><small>Flexible concepts for growing teams.</small></div></div>
      </div>
    </section>

    <section className="section wrap services-preview">
      <div className="section-heading"><div><span className="eyebrow">DELIVERY, YOUR WAY</span><h2>Services for every<br />kind of send.</h2></div><Link className="text-link" href="/services">Explore all services <ArrowRight size={16} /></Link></div>
      <div className="service-grid preview-grid">{services.slice(0, 4).map((service, i) => <article className="service-card" key={service.title}><span className="service-number">0{i + 1}</span><span className="service-icon"><service.icon size={22} strokeWidth={1.7} /></span><h3>{service.title}</h3><p>{service.text}</p><Link aria-label={`Enquire about ${service.title}`} href={`/contact?service=${encodeURIComponent(service.title)}`} className="service-arrow"><ArrowUpRight size={17} /></Link></article>)}</div>
    </section>

    <section className="journey-section"><div className="wrap journey-layout"><div><span className="eyebrow">A CLEARER JOURNEY</span><h2>From the first click<br />to the final handoff.</h2><p className="muted-lede">A simple demonstration of how delivery can feel: clear steps, thoughtful updates and less guesswork.</p><Link href="/tracking" className="button button-outline">Explore sample tracking <ArrowRight size={16} /></Link></div><div className="journey-list">{flow.map(step => <div className="journey-step" key={step.number}><span>{step.number}</span><div><h3>{step.title}</h3><p>{step.body}</p></div><ArrowDownRight size={19} /></div>)}</div></div></section>

    <section className="cta-strip wrap"><div><span className="eyebrow">READY WHEN YOU ARE</span><h2>Make your next delivery<br />the easy part.</h2></div><Link href="/booking" className="button button-primary">Get a delivery estimate <ArrowUpRight size={17} /></Link></section>
  </SiteLayout>;
}

export function AboutPage() {
  return <SiteLayout><div className="wrap"><DemoNotice /></div><section className="page-hero wrap"><span className="eyebrow">ABOUT NOBLE EXPRESS</span><h1>Good delivery is<br /><span>built on trust.</span></h1><p className="hero-lede">This demonstration introduces a courier experience shaped around dependable service, thoughtful delivery operations and customer satisfaction.</p></section>
    <section className="about-feature"><div className="wrap about-grid"><div className="about-stamp"><span>NE</span><i /> A DELIVERY<br />PLATFORM CONCEPT</div><div><span className="eyebrow">A PURPOSEFUL APPROACH</span><h2>Make sending feel<br />a little more certain.</h2><p>For individuals and businesses alike, a dependable courier experience begins with clear choices and careful communication. Noble Express is presented here as a digital concept that brings those moments together—from sharing a delivery request to following a sample shipment update.</p><p>This demonstration contains illustrative information only. It does not describe verified company history, locations, certifications, customers or live services.</p><Link className="text-link" href="/services">See the service concepts <ArrowRight size={16} /></Link></div></div></section>
    <section className="section wrap values-section"><span className="eyebrow">WHAT GUIDES THE EXPERIENCE</span><div className="value-grid"><article><span>01</span><h3>Dependable by design</h3><p>Clear steps help set expectations at each moment in a delivery request.</p></article><article><span>02</span><h3>Efficient in practice</h3><p>Useful information stays close, from parcel details to shipment milestones.</p></article><article><span>03</span><h3>People at the centre</h3><p>A straightforward experience respects the time and attention of every sender.</p></article></div></section></SiteLayout>;
}

export function ServicesPage() {
  return <SiteLayout><div className="wrap"><DemoNotice /></div><section className="page-hero wrap"><span className="eyebrow">OUR SERVICES</span><h1>One thoughtful way<br />to <span>move things forward.</span></h1><p className="hero-lede">Explore service concepts designed for individual parcels, busy teams and online orders. All options on this demonstration site are illustrative.</p></section>
    <section className="section wrap"><div className="service-grid service-grid-all">{services.map((service, i) => <article className="service-card" key={service.title}><span className="service-number">0{i + 1}</span><span className="service-icon"><service.icon size={22} strokeWidth={1.7} /></span><h3>{service.title}</h3><p>{service.text}</p><Link className="text-link" href={`/contact?service=${encodeURIComponent(service.title)}`}>Enquire about this service <ArrowRight size={15} /></Link></article>)}</div><p className="fine-print">Service descriptions are demonstration content, not confirmation of current operational availability.</p></section></SiteLayout>;
}

export function BusinessPage() {
  return <SiteLayout><div className="wrap"><DemoNotice /></div><section className="page-hero wrap"><span className="eyebrow">BUSINESS SOLUTIONS</span><h1>Better delivery flow<br />for <span>busy businesses.</span></h1><p className="hero-lede">A digital concept for businesses looking to bring parcel requests, repeat deliveries and fulfilment conversations into one clear workflow.</p></section>
    <section className="business-panel"><div className="wrap business-grid"><article className="business-card business-card-dark"><span className="business-icon"><Store size={23} /></span><span className="eyebrow">FOR ONLINE SHOPS</span><h2>Orders move.<br />Customers know.</h2><p>Explore a sample flow that connects a parcel request with an easy-to-follow shipment update.</p><Link href="/booking" className="button button-light">Create a sample booking <ArrowRight size={16} /></Link></article><article className="business-card"><span className="business-icon"><Building2 size={23} /></span><span className="eyebrow">FOR CORPORATE TEAMS</span><h2>Keep delivery details<br />in one place.</h2><p>A client workspace concept for reviewing shipment history, placing new requests and organizing sample inventory.</p><Link href="/login" className="button button-outline">Explore the client demo <ArrowRight size={16} /></Link></article></div></section>
    <section className="section wrap business-process"><div><span className="eyebrow">BUILT AROUND YOUR WORKFLOW</span><h2>Useful from the<br />very first request.</h2></div><div className="business-points"><p><Check size={17} /> Request a pickup with the details that matter.</p><p><Check size={17} /> Keep sample parcel activity easy to scan.</p><p><Check size={17} /> View delivery concepts alongside inventory tools.</p><small>Illustrative platform features only. No operational service level or customer relationship is represented.</small></div></section></SiteLayout>;
}

export function ContactPage() {
  const initialService = new URLSearchParams(window.location.search).get("service") || "General enquiry";
  const [submitted, setSubmitted] = useState(false);
  const [subject, setSubject] = useState(initialService);
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setSubmitted(true); }
  return <SiteLayout><div className="wrap"><DemoNotice /></div><section className="page-hero compact-page-hero wrap"><span className="eyebrow">CONTACT</span><h1>Let’s start a<br /><span>conversation.</span></h1><p className="hero-lede">Send a sample enquiry using the form below. The contact details shown here are placeholders for this demonstration.</p></section>
    <section className="section wrap contact-layout"><form className="form-card contact-form" onSubmit={submit}><div className="form-card-heading"><span className="eyebrow">SEND AN ENQUIRY</span><h2>How can we help?</h2></div>{submitted ? <div className="success-panel"><span className="success-icon"><Check size={20} /></span><h3>Enquiry received in this demo</h3><p>Your sample message has been acknowledged on screen. No message was sent to the company.</p><button type="button" className="text-link" onClick={() => setSubmitted(false)}>Send another enquiry <ArrowRight size={15} /></button></div> : <><label>Your name<input required placeholder="Enter your name" /></label><label>Email address<input type="email" required placeholder="you@example.com" /></label><label>Enquiry type<select value={subject} onChange={e => setSubject(e.target.value)}><option>General enquiry</option>{services.map(s => <option key={s.title}>{s.title}</option>)}<option>Business partnership</option></select></label><label>Message<textarea required rows={4} placeholder="Tell us a little about your enquiry" /></label><button className="button button-primary" type="submit">Send sample enquiry <ArrowRight size={16} /></button><small className="form-note">Demo only · No message is transmitted or stored.</small></>}</form>
      <aside className="contact-aside"><span className="eyebrow">CONTACT DETAILS</span><h2>Placeholder details,<br />not company contacts.</h2><p>The items below are placeholders to show where Noble Express could share verified contact information.</p><div className="contact-detail"><span className="contact-detail-icon"><ArrowRight size={17} /></span><div><small>PHONE</small><strong>[Company phone number]</strong></div></div><div className="contact-detail"><span className="contact-detail-icon"><ArrowRight size={17} /></span><div><small>EMAIL</small><strong>[Company email address]</strong></div></div><div className="contact-detail"><span className="contact-detail-icon"><MapPin size={17} /></span><div><small>OFFICE</small><strong>[Company office address]</strong></div></div><button type="button" className="button button-whatsapp" onClick={() => window.alert("WhatsApp contact is a placeholder in this demonstration.")}>WhatsApp contact placeholder <ArrowUpRight size={15} /></button><div className="map-placeholder"><MapPin size={21} /><strong>Map integration placeholder</strong><small>A verified office location can appear here.</small></div></aside>
    </section></SiteLayout>;
}

function LegalPage({ title, label }: { title: string; label: string }) {
  return <SiteLayout><div className="wrap"><DemoNotice /></div><section className="page-hero compact-page-hero wrap"><span className="eyebrow">{label}</span><h1>{title}</h1><p className="hero-lede">This page is placeholder demonstration copy. It is not legal advice or a published company policy.</p></section><section className="section wrap legal-copy"><h2>About this demonstration</h2><p>This website concept uses sample shipment, inventory, customer and contact information. Demo account sessions and edits may be stored in this browser. Do not enter sensitive personal, payment or business information.</p><h2>Before production use</h2><p>Company management and legal counsel should replace this placeholder with approved terms and privacy disclosures before any real customer information is collected or services are offered.</p></section></SiteLayout>;
}
export function PrivacyPage() { return <LegalPage title="Privacy Policy" label="INFORMATION" />; }
export function TermsPage() { return <LegalPage title="Terms & Conditions" label="INFORMATION" />; }
