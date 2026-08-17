import { Suspense, lazy, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
// Only the four paths are needed to declare routes — importing the full policy
// text here would drag every word of it into the initial bundle.
import { legalNav } from "./data/site";

// Home ships in the initial bundle; every other route — and the long policy
// text that comes with it — loads on demand.
const ServicesIndex = lazy(() => import("./pages/ServicesIndex"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const About = lazy(() => import("./pages/About"));
const Reviews = lazy(() => import("./pages/Reviews"));
const Contact = lazy(() => import("./pages/Contact"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Legal = lazy(() => import("./pages/Legal"));
const NotFound = lazy(() => import("./pages/NotFound"));

/** Sends every navigation back to the top, unless it targets an anchor. */
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <ScrollToTop />
      <Header />

      <main id="main">
        {/* Holds roughly a viewport of height while a route chunk arrives, so
            the header and footer don't jump together. */}
        <Suspense fallback={<div className="route-pending" aria-busy="true" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<ServicesIndex />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            {legalNav.map((p) => (
              <Route
                key={p.to}
                path={p.to}
                element={<Legal slug={p.to.replace(/^\//, "")} />}
              />
            ))}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </>
  );
}
