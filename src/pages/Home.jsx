import PaperPlaneScroll from "../components/motion/PaperPlaneScroll";
import Hero from "../components/home/Hero";
import Metrics from "../components/home/Metrics";
import Marquee from "../components/home/Marquee";
import MeetMe from "../components/home/MeetMe";
import Platforms from "../components/home/Platforms";
import Services from "../components/home/Services";
import Brands from "../components/home/Brands";
import Testimonials from "../components/home/Testimonials";
import Newsletter from "../components/home/Newsletter";
import Outcomes from "../components/home/Outcomes";
import Strategic from "../components/home/Strategic";
import FinalCTA from "../components/home/FinalCTA";
import { Seo, professionalService, websiteSchema } from "../lib/seo";

// The email card rests in the hero; the first scroll folds it into a plane and
// flies it to Meet Me. After that it hops one section per scroll, all the way
// down the page, leaving its dashed trail behind it. Stops alternate across the
// page width so the flight reads as a route rather than a straight drop.
// Module-level so the array identity stays stable across renders.
const PLANE_DROP = "#plane-meet";
const PLANE_ROUTE = [
  "#plane-platforms",
  "#plane-services",
  "#plane-brands",
  "#plane-testimonials",
  "#plane-newsletter",
  "#plane-outcomes",
  "#plane-strategic",
  "#plane-cta",
];

export default function Home() {
  return (
    <>
      <Seo
        title="Expert E-commerce Email Marketing"
        description="High-performance email and SMS lifecycle systems for established e-commerce brands. Strategy, automation, deliverability and reporting that turn retention into predictable revenue."
        path="/"
        jsonLd={[professionalService, websiteSchema]}
      />

      {/* Fixed overlay that owns the email → paper-plane journey. It locates
          every stop by selector, so it can live once here regardless of how
          deep in the tree those sections render. */}
      <PaperPlaneScroll
        dropSelector={PLANE_DROP}
        waypointSelectors={PLANE_ROUTE}
      />

      <Hero />
      <Metrics />
      <Marquee />
      <MeetMe />
      <Platforms />
      <Services />
      <Brands />
      <Testimonials />
      <Newsletter />
      <Outcomes />
      <Strategic />
      <FinalCTA />
    </>
  );
}
