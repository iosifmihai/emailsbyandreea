/**
 * Verified client testimonials.
 *
 * `home` — the three shown on the live homepage.
 * `reviews` — the three in the live reviews archive, which carry dates.
 *
 * All six are quoted verbatim. Do not add an entry without a verified source.
 */

export const homeTestimonials = [
  {
    id: "scott-a",
    quote:
      "The new flows and automations drove a significant lift in email revenue and repeat purchase rate. She was instrumental in outlining our customer loyalty and retention program.",
    name: "Scott A.",
    industry: "U.S. Fragrance Retailer",
    rating: 5,
  },
  {
    id: "luck-b",
    quote:
      "Andreea quickly implemented a new capture strategy that grew our database by almost 8,000 highly engaged new subscribers in just two months. Her work ensures list health and future growth.",
    name: "Luck B.",
    industry: "U.K. Beauty Supplier",
    rating: 5,
  },
  {
    id: "sabina-l",
    quote:
      "Andreea's ability to merge creative insight with strong data analysis was key to shaping our customer strategy and strengthening our market position. She provided detailed reports with clear, actionable recommendations.",
    name: "Sabina L.",
    industry: "E.U. Home & Deco Retailer",
    rating: 5,
  },
];

export const reviewArchive = [
  {
    id: "richard-b",
    quote:
      "The optimization of our automation sequences was immediate and impactful, delivering a 19% revenue lift in the first 30 days. Highly recommend.",
    name: "Richard B.",
    date: "2025-09-27",
    dateLabel: "27 September 2025",
    rating: 5,
    focus: "Flow Optimization",
  },
  {
    id: "karl-d",
    quote:
      "We experienced significant, attributable revenue growth directly tied to Andreea's flow optimization work.",
    name: "Karl D.",
    date: "2025-06-06",
    dateLabel: "6 June 2025",
    rating: 5,
    focus: "Flow Optimization",
  },
  {
    id: "michelle-q",
    quote:
      "Andreea's strategic flows have significantly boosted our Customer Lifetime Value.",
    name: "Michelle Q.",
    date: "2025-03-16",
    dateLabel: "16 March 2025",
    rating: 5,
    focus: "Automation Setup",
  },
];

/** Aggregate rating shown on the live reviews page. */
export const ratingSummary = { value: "5.0", best: "5", count: 3 };

export const allTestimonials = [...homeTestimonials, ...reviewArchive];
