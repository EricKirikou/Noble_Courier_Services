export type DemoRole = "client" | "admin";
export type DemoSession = { role: DemoRole; email: string; signedInAt: string };

export type ShipmentEvent = { label: string; date: string; location: string; complete: boolean };
export type Shipment = {
  reference: string;
  sender: string;
  recipient: string;
  pickup: string;
  destination: string;
  shipmentDate: string;
  expectedDate: string;
  status: string;
  events: ShipmentEvent[];
  type: string;
  senderPhone?: string;
  recipientPhone?: string;
  parcelDescription?: string;
  packageSize?: string;
  preferredPickupDate?: string;
  specialInstructions?: string;
  estimateGhs?: number;
};

export type InventoryItem = {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  location: string;
  threshold: number;
  movement: string;
};

const SESSION_KEY = "noble-demo-session";
const BOOKINGS_KEY = "noble-demo-bookings";
const INVENTORY_KEY = "noble-demo-inventory";

export function loadStored<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function saveStored<T>(key: string, value: T) {
  if (typeof window !== "undefined") window.localStorage.setItem(key, JSON.stringify(value));
}

export function getDemoSession() {
  return loadStored<DemoSession | null>(SESSION_KEY, null);
}

export function setDemoSession(session: DemoSession | null) {
  if (session) saveStored(SESSION_KEY, session);
  else if (typeof window !== "undefined") window.localStorage.removeItem(SESSION_KEY);
}

export const sampleShipments: Shipment[] = [
  {
    reference: "NEC-2026-00125",
    sender: "Ama Mensah (sample)",
    recipient: "Kojo Owusu (sample)",
    pickup: "Accra · East Legon (sample)",
    destination: "Kumasi · Adum (sample)",
    shipmentDate: "2026-10-29",
    expectedDate: "2026-11-03",
    status: "In Transit",
    type: "Express Courier",
    events: [
      { label: "Booking Confirmed", date: "29 Oct · 09:12", location: "Accra (sample)", complete: true },
      { label: "Picked Up", date: "29 Oct · 11:40", location: "East Legon (sample)", complete: true },
      { label: "Arrived at Sorting Centre", date: "29 Oct · 16:05", location: "Accra (sample)", complete: true },
      { label: "In Transit", date: "30 Oct · 08:20", location: "On route (sample)", complete: true },
      { label: "Out for Delivery", date: "Est. 03 Nov", location: "Kumasi (sample)", complete: false },
      { label: "Delivered", date: "Pending", location: "Sample destination", complete: false },
    ],
  },
  {
    reference: "NEC-2026-00126",
    sender: "Kofi Boateng (sample)",
    recipient: "Esi Addo (sample)",
    pickup: "Tema · Community 1 (sample)",
    destination: "Accra · Osu (sample)",
    shipmentDate: "2026-10-31",
    expectedDate: "2026-11-02",
    status: "Out for Delivery",
    type: "Same-Day Delivery",
    events: [
      { label: "Booking Confirmed", date: "31 Oct · 08:35", location: "Tema (sample)", complete: true },
      { label: "Picked Up", date: "31 Oct · 09:16", location: "Community 1 (sample)", complete: true },
      { label: "Arrived at Sorting Centre", date: "31 Oct · 10:22", location: "Accra (sample)", complete: true },
      { label: "In Transit", date: "31 Oct · 11:05", location: "Accra (sample)", complete: true },
      { label: "Out for Delivery", date: "02 Nov · 10:12", location: "Osu (sample)", complete: true },
      { label: "Delivered", date: "Pending", location: "Sample destination", complete: false },
    ],
  },
  {
    reference: "NEC-2026-00127",
    sender: "Nana Asare (sample)",
    recipient: "Akua Tetteh (sample)",
    pickup: "Accra · Airport Residential (sample)",
    destination: "Cape Coast · Central (sample)",
    shipmentDate: "2026-10-26",
    expectedDate: "2026-10-28",
    status: "Delivered",
    type: "Standard Parcel",
    events: [
      { label: "Booking Confirmed", date: "26 Oct · 14:18", location: "Accra (sample)", complete: true },
      { label: "Picked Up", date: "26 Oct · 15:10", location: "Airport Residential (sample)", complete: true },
      { label: "Arrived at Sorting Centre", date: "26 Oct · 18:36", location: "Accra (sample)", complete: true },
      { label: "In Transit", date: "27 Oct · 07:50", location: "On route (sample)", complete: true },
      { label: "Out for Delivery", date: "28 Oct · 10:04", location: "Cape Coast (sample)", complete: true },
      { label: "Delivered", date: "28 Oct · 13:42", location: "Sample destination", complete: true },
    ],
  },
];

export function getSampleShipments(): Shipment[] {
  const bookings = loadStored<Shipment[]>(BOOKINGS_KEY, []);
  return [...bookings, ...sampleShipments];
}

export function addSampleBooking(booking: Shipment) {
  const bookings = loadStored<Shipment[]>(BOOKINGS_KEY, []);
  saveStored(BOOKINGS_KEY, [booking, ...bookings]);
}

export const initialInventory: InventoryItem[] = [
  { id: "inv-1", name: "Small kraft mailer", sku: "PKG-KR-S", quantity: 84, location: "Zone A · Rack 04", threshold: 25, movement: "Received · 31 Oct" },
  { id: "inv-2", name: "Medium corrugated box", sku: "PKG-BOX-M", quantity: 36, location: "Zone A · Rack 06", threshold: 20, movement: "Issued · 01 Nov" },
  { id: "inv-3", name: "Document pouch", sku: "PKG-DOC-01", quantity: 12, location: "Zone B · Shelf 02", threshold: 15, movement: "Issued · 02 Nov" },
  { id: "inv-4", name: "Fragile handling label", sku: "SUP-LBL-FR", quantity: 240, location: "Zone B · Bin 11", threshold: 60, movement: "Received · 30 Oct" },
  { id: "inv-5", name: "Parcel stretch wrap", sku: "SUP-WRP-02", quantity: 8, location: "Zone C · Rack 01", threshold: 12, movement: "Issued · 02 Nov" },
];

export function getInventory() {
  return loadStored<InventoryItem[]>(INVENTORY_KEY, initialInventory);
}

export function saveInventory(items: InventoryItem[]) {
  saveStored(INVENTORY_KEY, items);
}

export const sampleCustomers = [
  { name: "Akosua Retail Co. (sample)", type: "Online shop", shipments: 18, status: "Active" },
  { name: "North Star Supplies (sample)", type: "Business", shipments: 12, status: "Active" },
  { name: "Kwame Asiedu (sample)", type: "Individual", shipments: 4, status: "New" },
];

export const sampleDrivers = [
  { name: "Yaw A. (sample)", area: "Accra route (sample)", status: "Available" },
  { name: "Esi B. (sample)", area: "Tema route (sample)", status: "On delivery" },
  { name: "Kojo C. (sample)", area: "Kumasi route (sample)", status: "Available" },
];
