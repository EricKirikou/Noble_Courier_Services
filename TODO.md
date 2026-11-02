# TODO — Noble Express Courier Services demo website

> Status: Visitor pages, tracking, bookings, demo logins, dashboards and inventory interactions are implemented. The requested homepage delivery imagery is wired to its managed-storage URL, but the generated visual is still processing.

## Responsive identity, navigation and core site shell
- [x] Create a clean, modern and memorable visual identity with a minimalistic layout, generous white space, premium corporate appearance, strong typography and clear visual hierarchy, professional logistics-inspired graphics, subtle animations and smooth transitions, and a consistent professional courier/logistics palette.
- [ ] Make the website fully responsive on mobile, tablet and desktop. Avoid excessive gradients, unnecessary shadows and generic AI-looking designs. Make it feel like a trustworthy Ghanaian courier-company concept without inventing official registration details, addresses, awards, testimonials, company history, founders, certifications or verified operational claims.
- [x] Ensure all navigation works, major buttons lead to a functioning destination or action, and there are no empty sections, broken links or unfinished features. Use maintainable components, realistic loading states, success messages and validation.
- [x] Clearly identify the website and all operational examples as a demonstration using dummy/sample information; never imply that demo authentication is production security or that sample operations are verified live company services.

## Homepage and visitor-facing information pages
- [x] Provide navigation for Home, About Us, Our Services, Track Shipment, Business Solutions, Contact, Client Login and Get a Quote.
- [x] Homepage hero must use headline “Your Deliveries. Our Priority.” and supporting text “Reliable courier and logistics solutions designed to keep your business moving. From urgent parcels to business deliveries, Noble Express makes sending and receiving easier.” Include Book a Delivery and Track a Shipment buttons, an attractive delivery-themed visual, and a prominent shipment tracking field.
- [x] Homepage trust section must show Reliable Deliveries, Real-Time Shipment Updates and Business Delivery Solutions, without fabricated customer counts or delivery statistics.
- [x] About Us must professionally introduce the importance of dependable courier services, efficient delivery operations and customer satisfaction, without inventing company history, founders, certifications or operational locations.
- [x] Contact must include a contact form, phone number placeholder, email placeholder, office address placeholder, WhatsApp contact button and Google Maps integration placeholder. Do not fabricate company contact details.
- [x] Footer must include company overview, quick links, services, contact-information placeholders, Privacy Policy, Terms and Conditions and a copyright notice.

## Services and business solutions
- [x] Provide individual service cards for Same-Day Delivery; Express Courier Services; Standard Parcel Delivery; Corporate and Business Deliveries; E-commerce Delivery Fulfilment; Bulk and Scheduled Deliveries; Pickup and Drop-off Services; Warehousing and Inventory Support. Every card has a short description, relevant icon and working enquiry button.
- [x] Provide a Business Solutions page/section that demonstrates relevant business-delivery use cases without presenting unverified customer relationships, operating capabilities or performance claims as facts.

## Demonstration shipment tracking
- [x] Customers can enter a tracking number and see shipment reference, sender and recipient, pickup location, destination, shipment date, expected delivery date, current delivery status and a delivery-progress timeline.
- [x] Include dummy records NEC-2026-00125, NEC-2026-00126 and NEC-2026-00127. Example statuses are Booking Confirmed, Picked Up, In Transit, Arrived at Sorting Centre, Out for Delivery and Delivered.
- [x] Clearly label tracking as a demonstration using sample shipment information; unknown references produce a useful not-found state and are not represented as live lookup results.

## Client demo login and client dashboard
- [x] Create a functional login page showing demonstration credentials Email: demo@nobleexpress.com and Password: NobleDemo2026!. Demo login works without a real backend and is explicitly labeled demonstration-only, not production-secure.
- [x] After client demo login, redirect to a professional client dashboard. Protect its routes in the demo experience and keep client and admin demo roles distinct.
- [x] Client dashboard includes Overview, Total Shipments, Pending Deliveries, Delivered Shipments, Active Shipments, Book a Shipment, Track Packages, Shipment History, Notifications, My Profile and Logout.
- [x] Use realistic dummy data; clearly identify all sample information as demo data. Let users view shipment details, filter shipment history and create sample shipment bookings.

## Inventory module and browser-persisted sample operations
- [x] Include an inventory module inside the demo dashboard with inventory overview, total items, items in stock, low-stock alerts, inventory movement, product name, SKU, quantity, storage location and stock status.
- [x] Use realistic sample inventory including packaging materials, parcels and warehouse supplies. Provide search and filtering, and allow users to add, edit and delete sample inventory items.
- [x] All inventory changes work in the frontend demo, use local sample data or browser storage, persist for the demonstration and remain clearly identified as sample data.

## Separate admin demo login and admin dashboard
- [x] Provide a separate demonstration admin login showing Email: admin@nobleexpress.com and Password: AdminDemo2026!. Demo login works without a real backend and is explicitly labeled demonstration-only, not production-secure.
- [x] Admin and client dashboards have different permissions and interfaces, and protected demo routes enforce the corresponding role in the frontend demonstration.
- [x] Admin demo interface includes dashboard analytics, shipment management, customer management, delivery assignments, driver management, inventory management, service management, booking management, reports and system settings.
- [x] Include sample customers, delivery personnel, shipments and operational records; clearly identify them as demonstration data. Do not imply the records represent actual company operations.

## Booking, quotation and sample confirmation
- [x] Interactive booking form includes sender name, sender phone, recipient name, recipient phone, pickup location, destination, parcel description, package size, delivery type, preferred pickup date and special instructions.
- [x] Include a quotation interface with illustrative sample prices clearly labeled as estimates, not official company rates. Validate inputs and provide loading/success/error feedback.
- [x] After submission, display a confirmation with a generated demo booking reference; save bookings as sample data in browser storage for the client demonstration.

## Delivery boundaries and technical constraints
- [x] Use clean maintainable frontend components; make responsive behavior and navigation work; make tracking, forms, demo authentication, route guards and inventory CRUD functional. Use browser storage/local sample data for the requested demonstration.
- [x] No payment integration. Do not require a real backend for the client or admin demo login. Keep sample data and login implementation inside the frontend demonstration; do not claim real authentication, authorization, data security, live tracking, live contact or verified delivery operations.
- [x] Do not fabricate company contact details, customer counts, delivery statistics, customer testimonials, company registration details, awards, history, founders, certifications or operational locations. Contact and maps entries remain placeholders. Clearly label estimates and sample data.
