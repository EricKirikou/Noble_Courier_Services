import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

const HomePage = lazy(() => import("@/pages/MarketingPages").then(module => ({ default: module.HomePage })));
const AboutPage = lazy(() => import("@/pages/MarketingPages").then(module => ({ default: module.AboutPage })));
const ServicesPage = lazy(() => import("@/pages/MarketingPages").then(module => ({ default: module.ServicesPage })));
const BusinessPage = lazy(() => import("@/pages/MarketingPages").then(module => ({ default: module.BusinessPage })));
const ContactPage = lazy(() => import("@/pages/MarketingPages").then(module => ({ default: module.ContactPage })));
const PrivacyPage = lazy(() => import("@/pages/MarketingPages").then(module => ({ default: module.PrivacyPage })));
const TermsPage = lazy(() => import("@/pages/MarketingPages").then(module => ({ default: module.TermsPage })));
const TrackingPage = lazy(() => import("@/pages/FlowPages").then(module => ({ default: module.TrackingPage })));
const BookingPage = lazy(() => import("@/pages/FlowPages").then(module => ({ default: module.BookingPage })));
const LoginPage = lazy(() => import("@/pages/AuthPages").then(module => ({ default: module.LoginPage })));
const ProtectedDashboard = lazy(() => import("@/pages/Dashboards").then(module => ({ default: module.ProtectedDashboard })));

function Router() {
  return <Suspense fallback={<div className="route-loading" role="status"><span className="route-loading-mark">NE</span><span>Loading the demo…</span></div>}><Switch>
    <Route path="/" component={HomePage} />
    <Route path="/about" component={AboutPage} />
    <Route path="/services" component={ServicesPage} />
    <Route path="/business" component={BusinessPage} />
    <Route path="/tracking" component={TrackingPage} />
    <Route path="/booking" component={BookingPage} />
    <Route path="/contact" component={ContactPage} />
    <Route path="/login">{() => <LoginPage role="client" />}</Route>
    <Route path="/admin/login">{() => <LoginPage role="admin" />}</Route>
    <Route path="/dashboard">{() => <ProtectedDashboard role="client" />}</Route>
    <Route path="/admin/dashboard">{() => <ProtectedDashboard role="admin" />}</Route>
    <Route path="/privacy" component={PrivacyPage} />
    <Route path="/terms" component={TermsPage} />
    <Route path="/404" component={NotFound} />
    <Route component={NotFound} />
  </Switch></Suspense>;
}

function App() {
  return <ErrorBoundary><ThemeProvider defaultTheme="light"><TooltipProvider><Toaster /><Router /></TooltipProvider></ThemeProvider></ErrorBoundary>;
}
export default App;
