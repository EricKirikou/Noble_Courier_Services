# Noble Express Courier Services — implementation and design plan

## Product and implementation approach

Build the requested courier-services concept as a polished, responsive React website using the initialized Vite + React + TypeScript starter, its existing Tailwind setup, Wouter routing, Lucide icons and installed UI dependencies. Keep the application static and client-side: the project is initialized without a managed server or database, and the requested login, sample bookings, shipment lookups, dashboard and inventory operations will use clearly labeled browser-local demo data. Client-side demo login is not real authentication or production security. Provide the visible client and admin demo credentials exactly as specified in the brief, keep their session roles distinct, and protect their respective demo routes with frontend role checks.

Implement shared marketing-site navigation and footer, responsive page layouts, accessible form validation, loading/success/error feedback, and route-aware active navigation. Give the key journeys real interactions: track the three requested sample reference numbers and show shipment facts and status timelines; calculate clearly non-official illustrative estimates in the delivery form and issue generated sample booking references; allow logged-in demo users to filter shipment history, inspect shipment details, and create bookings; allow inventory search/filter and add/edit/delete in browser storage; and present separate client and admin workspaces, navigation and sample records. Unknown tracking references should return a clear helpful not-found message rather than a false live lookup. Sample locations, people, inventory, status events and prices must remain identified as demonstration information and must not be presented as verified company operations.

Use distinct route pages for Home, About, Services, Business Solutions, Track Shipment, Booking/Quote, Contact, Client Login, Client Dashboard, Admin Login, Admin Dashboard, Privacy Policy, Terms and the starter-compatible `/404`. Keep the route manifest aligned with the routes actually implemented. Contact and maps details remain placeholders; WhatsApp must not imply a real company number. Use a custom, purpose-built logistics hero visual generated for the homepage and do not use generic placeholder imagery. Use a hand-authored compact brand mark/wordmark concept rather than relying on generated typography.

No payment integration, real backend, real customer communications, live maps, or production authentication are in scope. The finished experience should be ready to demonstrate in the project's Preview. Public publication is not assumed by this plan.

## Proposed design direction

The brief establishes a premium, spacious, minimal logistics aesthetic but leaves the exact visual language open. Three low-probability alternatives considered: Swiss editorial courier system (0.036); warm human-centered parcel craft (0.081); high-contrast industrial dispatch console (0.047). Proposed direction: **Swiss editorial courier system**, softened with warm paper neutrals and an energetic vermilion-orange accent.

- **Design Movement:** Contemporary Swiss editorial design, translated into a modern courier brand rather than a fashion or technology template.
- **Core Principles:** Make delivery actions immediately legible; balance quiet whitespace with decisive hierarchy; use functional detail as visual texture; distinguish sample/demo data wherever it appears.
- **Color Philosophy:** Deep ink/navy communicates composure and accountability; warm off-white keeps the page approachable; a distinctive signal-orange provides an unmistakable action and wayfinding color; muted sage/gray is reserved for secondary or completed states. Avoid relying on color alone for shipment status.
- **Layout Paradigm:** A broad, asymmetric editorial homepage with a left-aligned message and tracking action, a custom image anchored on the right, a compact horizontal proof/benefit strip, and alternating full-width service and workflow bands. Dashboard screens shift to a calm, information-dense sidebar-and-content layout.
- **Signature Elements:** A two-chevron “forward route” brand mark; thin route-line dividers with small origin/destination nodes; orange reference chips and status markers.
- **Interaction Philosophy:** Every primary action leads to a working form or page. Tracking and booking respond with concise inline states; admin/client workspace boundaries stay explicit; hover and focus states are clear, calm and accessible.
- **Animation:** Short, restrained opacity/translate entrances for major page sections; subtle button and status transitions; respect reduced-motion preferences. No looping decorative movement that competes with tracking or forms.
- **Typography System:** Manrope for strong, clean display and interface headings; Inter for compact, legible body and data text. Use responsive display sizing, medium-weight section titles, restrained uppercase micro-labels and tabular numerals for references and dashboard figures.
- **Brand Essence:** A composed, service-first courier concept for individuals and businesses who need delivery choices and shipment information in one clear place. Personality: dependable, direct, considered.
- **Brand Voice:** Specific and reassuring, without unsupported operational promises. Example lines: “Your Deliveries. Our Priority.” and “One clear view from booking to arrival.”
- **Wordmark & Logo:** A custom small route-chevron monogram paired with a carefully spaced Noble Express wordmark, drawn as a project-owned SVG/CSS treatment; no official corporate logo is implied.
- **Signature Brand Color:** Signal vermilion-orange, proposed as `#E65A32`, used sparingly for primary actions, route nodes and key emphasis.

## Project structure

- `client/src/App.tsx`: page-route declarations and client/admin route guards.
- `client/src/pages/`: separate Home, About, Services, Business Solutions, Tracking, Booking/Quote, Contact, Login, Client Dashboard, Admin Login, Admin Dashboard, Privacy, Terms and NotFound pages.
- `client/src/components/`: shared site header/footer, brand mark, form controls, status/timeline components, reusable service and dashboard components.
- `client/src/lib/demo-data.ts`: typed sample shipments, customers, service options, inventory and operational records; demo-only defaults.
- `client/src/lib/demo-storage.ts`: typed browser-storage load/save helpers and state updates for demo session, bookings and inventory.
- `client/src/index.css`: design tokens, responsive foundations, shared visual patterns, focus/reduced-motion rules.
- `client/public/`: generated homepage hero image, favicon/static assets and `manus-routes.json`.
- `client/index.html`: page title, description and font loading metadata.

## Build workflow

After approval, translate the brief into outcome-based project `TODO.md` criteria, then implement the shared design system and the priority visitor journeys before the dashboard modules. Generate and install the planned hero artwork in the project before using it in the UI. Use host-managed TypeScript diagnostics already registered for this project, run the starter's type check and static production build, inspect route-manifest responses, and fix confirmed issues. Start the configured Preview service on port 3000 using the starter's static Vite command, then prepare a clean checkpoint through the project's canonical repository workflow. The work remains a demonstration; do not enable backend services or claim public deployment without a separate authorization.