/**
 * The nine services, with copy taken verbatim from the corresponding pages on
 * emailsbyandreea.com. Slugs match the live URLs so existing inbound links and
 * search results keep resolving.
 *
 * Each entry carries its own shape — some pages lead with an inclusion list,
 * some with deliverables, some with a rationale block. Pages render only the
 * blocks that exist, which is what keeps the nine from reading as one template.
 */

export const pillars = [
  {
    n: "01",
    title: "Strategic Foundation and Data Integrity",
    copy: "Aligning the technical and strategic blueprint. This phase removes data silos, authenticates sending domains for maximum deliverability, and turns fragmented communication into a cohesive, predictive strategy that guides all future growth.",
    core: "Program Audit, Strategy Development, Account Setup, Platform Integration.",
    slugs: ["audit", "strategy", "account-setup"],
  },
  {
    n: "02",
    title: "High-Yield Automation Architecture",
    copy: "Engineering 24/7 revenue streams. Automated flows are designed to target high-intent behaviors, recovering lost revenue and accelerating repeat purchase cycles through sophisticated, multi-step sequences.",
    core: "Core Automation Setup, Continuous Flow Optimization, Advanced A/B/N Testing.",
    slugs: ["automation-setup", "flow-optimization"],
  },
  {
    n: "03",
    title: "Integrated Multi-Channel Execution",
    copy: "Coordinating audience growth. High-performing on-site capture turns visitors into subscribers, while time-sensitive email and SMS campaigns are synchronized across channels for maximum promotional impact.",
    core: "Promotional Newsletters, Pop-Up Implementation, Strategic SMS Marketing Integration.",
    slugs: ["newsletters", "pop-up-implementation", "sms-marketing"],
  },
  {
    n: "04",
    title: "Accountability and Performance Reporting",
    copy: "Translating engagement into financial outcomes. Transparent reporting eliminates vanity metrics, providing clear readouts on revenue attribution, LTV trends, and conversion insights needed to validate and guide every investment.",
    core: "Focused Reporting and Strategic Recommendations.",
    slugs: ["reporting"],
  },
];

export const services = [
  /* ------------------------------------------------------------ audit -- */
  {
    slug: "audit",
    name: "Audit",
    n: "01",
    pillar: "01",
    summary:
      "A full-spectrum diagnostic of deliverability, flows, segmentation and content that pinpoints exactly where revenue is leaking.",
    metaTitle: "Email Marketing Performance Audit",
    metaDescription:
      "A full-spectrum email performance audit for established e-commerce brands: deliverability, flows, segmentation and content analysed to find revenue leaks, with a prioritised 90-day roadmap.",
    headline: "Full-Spectrum Performance Email Audit",
    intro:
      "Most brands lose revenue through hidden inefficiencies. This audit identifies those leaks and provides a clear strategic roadmap to stabilize and scale your performance.",
    highlightsLabel: "How it works",
    highlights: [
      {
        title: "Performance Deep-Dive",
        copy: "I analyze your email marketing account to pinpoint exactly where potential revenue is dropping off.",
      },
      {
        title: "Actionable Roadmap",
        copy: "You receive a prioritized plan with data-backed recommendations to guide your team's optimization and technical execution.",
      },
    ],
    deliverablesLabel: "What you receive",
    deliverables: [
      "A detailed account report summarizing current state, risks, opportunities, and baseline KPIs with relevant benchmarks.",
      "Strategic recommendations for the next 3–6 months — a prioritized roadmap with effort-vs-impact, sequencing, test hypotheses, and clear measurement guardrails.",
    ],
    ctaLabel: "Request an Audit",
    faqs: [
      {
        q: "What is the Email Performance Audit?",
        a: "The Full-Spectrum Audit is a comprehensive, data-driven analysis of your entire email program—including deliverability, automated flows, segmentation, and content strategy. It functions as a precise diagnostic to identify revenue leaks and growth bottlenecks.",
      },
      {
        q: "Why is the Audit important for established brands?",
        a: "It's vital because it provides an objective, external perspective on performance that internal teams often miss. The audit ensures that you stop spending time on low-impact tasks and start executing a clear, prioritized roadmap that guarantees the highest possible ROI.",
      },
      {
        q: "Who needs the Email Performance Audit?",
        a: "This service is designed for established e-commerce companies that are experiencing plateauing growth, declining campaign performance, or high cost-per-acquisition (CPA). It's for businesses ready to invest in a clear, data-driven strategy.",
      },
      {
        q: "What specific problems does the Audit solve?",
        a: "The Audit diagnoses three core issues: (1) Revenue Leaks (poorly optimized automated flows), (2) Deliverability Issues (emails landing in spam, hurting sender reputation), and (3) Strategic Gaps (inefficient segmentation or lack of a clear customer journey map).",
      },
      {
        q: "How long does the audit process take?",
        a: "The comprehensive audit process typically takes 2 to 3 weeks from the moment I receive necessary account access. This timeline ensures sufficient time for deep data analysis, technical review, and crafting the detailed strategic roadmap.",
      },
      {
        q: "What is the most valuable part of the Audit Deliverable?",
        a: "The most valuable asset is the Prioritized 90-Day Roadmap. This isn't just a list of problems; it is a sequential, actionable plan detailing the exact flows, tests, and technical fixes required to execute for maximum, measurable ROI in the short term.",
      },
      {
        q: "Does the Audit include implementing the fixes?",
        a: "The Audit provides the detailed diagnosis and the strategic roadmap for implementation. It is a separate service from ongoing management. However, the roadmap serves as the foundational agreement for any future engagement for full-service implementation and management.",
      },
      {
        q: "What data access is required for the Audit?",
        a: "I require read-only access to your primary Email Service Provider (ESP) (e.g., Klaviyo) and high-level performance data from your e-commerce platform (e.g., Shopify) to map customer behavior and revenue attribution accurately. All data is handled with strict professional confidentiality.",
      },
    ],
    closing: {
      title: "Not sure where to start?",
      copy: "If you already have an active account but aren't seeing the results you expect, a strategic audit is the best first step. Let's identify your revenue leaks before we build your new foundation.",
    },
    related: ["strategy", "flow-optimization", "reporting"],
  },

  /* --------------------------------------------------------- strategy -- */
  {
    slug: "strategy",
    name: "Strategy",
    n: "02",
    pillar: "01",
    summary:
      "An executive-level roadmap that governs your retention ecosystem for the next 6–12 months, tied directly to your business KPIs.",
    metaTitle: "Strategic Email Growth Roadmap",
    metaDescription:
      "A custom 6–12 month email strategy roadmap for e-commerce brands — segmentation, attribution and automation architecture aligned to your core business KPIs.",
    headline: "Strategic Email Growth Roadmap",
    intro:
      "Email remains the highest-yielding ROI channel in e-commerce, consistently outperforming paid media. By applying a system-first methodology, I transform your subscriber list into a predictable profit center through intelligent segmentation, precise attribution, and automation built to scale.",
    rationale: {
      title: "Translating Data into Actionable Growth",
      copy: "Every brand is unique, so generic recommendations have no place here. I architect proprietary Strategic Roadmaps that align your email ecosystem directly with your core business KPIs. This ensures every campaign and automated sequence serves a defined, profitable objective, tailored specifically to your brand's scale and trajectory.",
    },
    ctaLabel: "Request an Audit",
    faqs: [
      {
        q: "What is the Email Strategy Roadmap?",
        a: "This is a custom, executive-level blueprint that governs your entire retention ecosystem for the next 6–12 months. Built on rigorous historical data and behavioral analysis, it provides a sequential, high-impact execution plan designed to hit specific revenue milestones and secure long-term channel profitability.",
      },
      {
        q: "Why is strategy important if I already have flows set up?",
        a: "Isolated flows often result in a disjointed customer journey and stagnating ROI. A strategy transforms these individual automations into a high-performance ecosystem where every campaign and sequence works in synergy toward the same business KPIs. This architectural approach prevents audience fatigue and provides the clear, data-backed maneuvers needed to break through revenue plateaus and scale efficiently.",
      },
      {
        q: "Who needs the Email Strategy Roadmap service?",
        a: "This service is designed for established e-commerce brands that have outgrown basic setups and require a sophisticated framework to scale. It is ideal for those feeling stagnant or lacking a clear roadmap for their next growth phase. I provide the strategic oversight needed to transition from fragmented automations to a cohesive, high-yielding ecosystem that maximizes every marketing dollar spent.",
      },
      {
        q: "How is this different from an Audit?",
        a: "An Audit is a diagnostic that uncovers immediate technical and strategic leaks. The Strategy Roadmap is a prescriptive blueprint: it takes those findings and architects a long-term growth engine. While the Audit identifies current gaps, the Roadmap defines exactly how and when to execute your maneuvers to hit your revenue targets over the next 12 months.",
      },
      {
        q: "How long does it take to develop the Strategy Roadmap?",
        a: "Developing a comprehensive Strategy Roadmap requires deep technical and behavioral analysis, typically taking up to one month. This timeframe ensures I have the necessary time to thoroughly synthesize your historical data, benchmark performance, and architect a realistic, high-impact plan that is fully customized to your brand's specific growth trajectory and revenue goals.",
      },
      {
        q: "What happens after the Strategy Roadmap is delivered?",
        a: "Upon delivery, you receive comprehensive strategic documentation and a formal debriefing session to ensure complete clarity. You can then use the Roadmap as a blueprint for your internal team to execute, or we can discuss a long-term partnership where I provide the ongoing strategic oversight and optimization needed to ensure your systems reach their full revenue potential.",
      },
    ],
    closing: {
      title: "Ready for strategic clarity?",
      copy: "Let's discuss your brand's trajectory. I'll help you chart a path to sustainable, automated profitability through a custom Strategic Roadmap.",
    },
    related: ["audit", "automation-setup", "reporting"],
  },

  /* ---------------------------------------------------- account-setup -- */
  {
    slug: "account-setup",
    name: "Account Setup",
    n: "03",
    pillar: "01",
    summary:
      "The technical architecture for your ESP — configured for peak deliverability and data fidelity from the first send.",
    metaTitle: "Professional Email Account Setup",
    metaDescription:
      "Strategic Email Service Provider setup and integration for e-commerce brands. Technical architecture configured for deliverability, data fidelity and revenue automation from day one.",
    headline: "Email Marketing Account Setup",
    intro:
      "Secure a high-performing foundation for your e-commerce brand. I provide the strategic architecture for your Email Service Provider (ESP), eliminating technical risks and ensuring your system is configured for peak deliverability and data fidelity from day one.",
    body: [
      "Don't let technical debt undermine your growth. I design the high-integrity framework your brand needs to ensure every automated message reaches its destination with surgical precision. By establishing rigorous sending protocols and data standards, I provide your team with the technical blueprint required to transform your ESP into a secure, revenue-generating powerhouse.",
    ],
    ctaLabel: "Set up my email account",
    faqs: [
      {
        q: "What is the Email Marketing Account Setup service?",
        a: "This service provides the professional architectural framework and configuration for your Email Service Provider (ESP). I oversee the essential technical alignment and foundational strategy required to ensure your account is primed for maximum deliverability, data fidelity, and seamless revenue automation right from your very first send.",
      },
      {
        q: "Why is a professional setup important for established brands?",
        a: "A professional setup is the only way to safeguard your brand against costly technical debt and deliverability failures. I ensure your infrastructure is built on a reliable technical base, preventing critical errors like spam placement or flawed data triggers. This architectural precision guarantees that your email channel yields an immediate, measurable ROI from a perfectly optimized starting point.",
      },
      {
        q: "Who needs the Email Marketing Account Setup service?",
        a: "This service is tailored for scaling e-commerce brands that require a high-integrity technical foundation to support their growth. It is essential for businesses migrating to a more robust ESP, those implementing a sophisticated platform for the first time, or brands with an existing setup that is technically compromised and hindering their ability to reach peak performance.",
      },
      {
        q: "How long does the Account Setup process take?",
        a: "Establishing a secure and fully optimized infrastructure typically requires 1 to 2 weeks. This timeframe allows for meticulous technical configuration, verification of data integrity, and the deployment of your foundational flows. The exact duration depends on the complexity of your current data and the speed of platform integration, ensuring every protocol is flawlessly set before your first send.",
      },
      {
        q: "What specific platforms do you cover for setup and integration?",
        a: "While I specialize primarily in Klaviyo for advanced e-commerce ecosystems, I provide expert configuration across all major platforms, including theMarketer, Omnisend, Sendy, AWeber, Beehiiv, HubSpot, and Mailchimp. My focus remains on ensuring optimal technical architecture and data integrity, regardless of the specific technology your brand chooses to utilize.",
      },
      {
        q: "What data access is required for the setup?",
        a: "To architect a seamless integration, I require administrative access to your Email Service Provider (ESP) and the necessary API credentials for your e-commerce platform (e.g., Shopify, WooCommerce). This allows me to verify data synchronization and technical protocols, ensuring all proprietary information is handled with the highest standards of security and strict confidentiality.",
      },
      {
        q: "What happens after the Account Setup is complete?",
        a: "Upon completion, I hand over a fully tested, ready-to-use account, complete with your strategic technical documentation and the Automated Flow Framework. We will hold a debriefing session to walk through the configuration, leaving your team ready to add content or allowing us to transition into a long-term Flow Optimization partnership.",
      },
    ],
    closing: {
      title: "Not sure if your current foundation is holding you back?",
      copy: "A high-performing email engine requires more than just a basic login; it needs a technically sound architecture to scale without friction. If you're unsure whether your current setup is optimized for growth, let's connect. I'll help you determine if you need a fresh, strategic configuration or if a diagnostic audit is the right first step to reclaim your lost revenue.",
    },
    related: ["audit", "automation-setup", "pop-up-implementation"],
  },

  /* ------------------------------------------------- automation-setup -- */
  {
    slug: "automation-setup",
    name: "Automation Setup",
    n: "04",
    pillar: "02",
    summary:
      "System-first flow architecture across the lifecycle — Welcome, Abandoned Cart, Post-Purchase and Winback, engineered to compound retention.",
    metaTitle: "Email & SMS Automation Setup",
    metaDescription:
      "High-impact email and SMS automation architecture for e-commerce: Welcome, Abandoned Cart, Browse, Post-Purchase and Winback flows built to compound retention and protect deliverability.",
    headline: "High-Impact Email & SMS Automations",
    intro:
      "Automations are the backbone of a high-growth e-commerce brand, typically driving 30–60% of total email revenue. I design a system-first architecture that covers the essential lifecycle stages—from Welcome and Abandoned Cart to Post-Purchase and Winback—engineered specifically to compound retention and protect your deliverability.",
    rationale: {
      title: "Why this works",
      copy: "Multi-step sequences target high-intent behaviors with surgical precision, operating 24/7 to capture revenue that would otherwise be lost. By architecting these flows to be continuously optimized, I ensure your brand achieves a higher Customer Lifetime Value (CLV) and a faster payback on acquisition costs. The result is a dependable, automated share of revenue that stabilizes your retention channel.",
    },
    ctaLabel: "Automate my email & SMS",
    faqs: [
      {
        q: "What is email marketing automation?",
        a: "Email marketing automation is the strategic implementation of behavior-triggered logic that sends personalized messages based on specific customer actions—such as browsing a product, abandoning a cart, or completing a purchase. It establishes a 24/7 revenue engine that operates autonomously, ensuring your brand delivers the right message at the perfect moment without manual intervention.",
      },
      {
        q: "What does the Email Automation service include?",
        a: "This service covers the end-to-end strategic architecture, technical build, and logic integration for your essential email and SMS flows. I oversee the entire deployment process—from mapping customer journeys to rigorous quality assurance (QA)—ensuring your automated ecosystem is engineered to maximize conversion rates and customer lifetime value.",
      },
      {
        q: "Which automated flows are considered “high-yield” for e-commerce?",
        a: "The core pillars of a high-yield system include the Welcome Series for initial conversion, Abandoned Cart for immediate revenue recovery, and Post-Purchase sequences to drive retention. I also architect advanced Browse Abandonment and Win-back frameworks, using platform data to ensure every stage of your customer lifecycle is engineered for maximum profit.",
      },
      {
        q: "How is this different from simply setting up flows myself?",
        a: "My service replaces basic platform templates with a sophisticated, custom-engineered framework. I build flows using advanced filtering, dynamic content logic, and integrated A/B testing protocols that go far beyond standard setups. This technical precision ensures your automations are resilient, free from common logic errors, and fully optimized to scale alongside your brand's growing complexity.",
      },
      {
        q: "What specific platforms do you build and optimize flows on?",
        a: "I build and optimize flows across all major platforms, including Klaviyo, Mailchimp, theMarketer, Omnisend, AWeber, Beehiiv and HubSpot, specializing in leveraging their most advanced features for e-commerce.",
      },
      {
        q: "Do you write the content and design the emails within the flows?",
        a: "Yes, I deliver an end-to-end automated solution. I handle the strategic copywriting engineered to drive conversions, while integrating brand-aligned, mobile-responsive creative templates directly into your flow logic. This ensures that your brand's voice and visual identity are seamlessly unified with the technical triggers of your customer journey.",
      },
      {
        q: "How long does it take to deploy a complete set of automated flows?",
        a: "Deployment timing varies based on flow complexity, but a strategic set of 3-5 high-priority flows typically takes 3 to 4 weeks. This duration ensures enough time for precise behavioral mapping, creative development, and rigorous technical testing, moving from final strategy sign-off to a full launch with active A/B testing protocols in place.",
      },
      {
        q: "What happens after the automated flows are launched?",
        a: "Post-launch, I monitor performance during an initial stabilization period and deliver the Flow Performance Documentation. From there, you can manage refinements internally or transition into a Continuous Management Retainer, where I take full ownership of ongoing A/B testing and behavioral logic updates to sustain long-term growth.",
      },
    ],
    closing: {
      title: "Is your automation engine built to sell?",
      copy: "A basic setup is a leaky bucket. I build high-integrity automation engines designed to capture every conversion opportunity and compound your profit margins 24/7. Let's architect a framework that turns your retention channel into your most predictable asset.",
    },
    related: ["flow-optimization", "sms-marketing", "strategy"],
  },

  /* ------------------------------------------------- flow-optimization -- */
  {
    slug: "flow-optimization",
    name: "Flow Optimization",
    n: "05",
    pillar: "02",
    summary:
      "Re-engineering live sequences — timing, logic filters and high-intent copy — to lift Revenue Per Recipient and conversion rate.",
    metaTitle: "Advanced Email Flow Optimization",
    metaDescription:
      "Data-driven optimization of existing email flows: behavioural analysis, filter logic, timing and copy testing to increase Revenue Per Recipient and accelerate Customer Lifetime Value.",
    headline: "Advanced Email Flow Optimization",
    intro:
      "A basic automation setup is just the starting point; strategic optimization is what separates surviving brands from those that scale. I systematically audit and re-engineer your existing flows to eliminate performance bottlenecks, transforming your automated sequences into hyper-efficient, 24/7 profit drivers that capture a significantly higher percentage of passive revenue.",
    body: [
      "Whether I built your automation engine from scratch or you're looking to upgrade an existing setup, my optimization service is designed to bridge the gap between “functional” and “high-performance.”",
      "I specialize in the rigorous, data-driven refinement of your flows to maximize Revenue Per Recipient, boost conversion rates, and accelerate Customer Lifetime Value.",
    ],
    ctaLabel: "Optimize my email flows",
    faqs: [
      {
        q: "What is Email Flow Optimization?",
        a: "Email Flow Optimization is the rigorous process of re-engineering your existing automated sequences to extract maximum performance. It involves deep behavioral analysis and the testing of strategic hypotheses—adjusting timing, logic filters, and high-intent copy—to systematically increase your Revenue Per Recipient (RPR) and overall retention efficiency.",
      },
      {
        q: "Who needs the Email Flow Optimization service?",
        a: "This service is engineered for established e-commerce brands that have outgrown their initial “set-and-forget” sequences. If you have core automations running—like Welcome and Abandoned Cart—but recognize that your conversion rates and Revenue Per Recipient have plateaued, optimization is the key to unlocking your next level of profitability and scaling your Customer Lifetime Value.",
      },
      {
        q: "How does this differ from the Automation Setup service?",
        a: "Automation Setup is about engineering the infrastructure—building the core logic and technical foundation from the ground up. Optimization assumes the flows are active and focuses on performance tuning. It's the shift from construction to high-performance management, where I use live data to refine triggers and content, ensuring your existing sequences consistently scale their revenue contribution.",
      },
      {
        q: "Can you optimize flows built on any of the platforms I use?",
        a: "Yes. I specialize in applying advanced optimization frameworks across all major retention ecosystems, including Klaviyo, Mailchimp, theMarketer, Omnisend, AWeber, Beehiiv, HubSpot. My focus is on the underlying behavioral logic and strategic triggers, ensuring peak performance regardless of the specific technical stack you currently employ.",
      },
      {
        q: "What are the key results I should expect from optimization?",
        a: "Optimization is designed to deliver a measurable uplift in your Conversion Rate and a significant increase in Revenue Per Recipient. By implementing more precise filtering and behavioral segmentation, I reduce wasted sends and fatigue, ensuring your email channel operates at a higher profit margin with every automated touchpoint.",
      },
    ],
    closing: {
      title: "Don't let revenue stall on stagnant logic",
      copy: "I'll help you bridge the gap between “functional” and “high-performance” by re-engineering your flows into a high-yield asset. Let's audit your infrastructure and secure your next phase of growth.",
    },
    related: ["automation-setup", "audit", "reporting"],
  },

  /* ------------------------------------------------------ newsletters -- */
  {
    slug: "newsletters",
    name: "Newsletters",
    n: "06",
    pillar: "03",
    summary:
      "The editorial engine — calendar, segmentation, copy, testing and QA for 4–8 high-impact sends a month.",
    metaTitle: "Strategic Newsletter Management",
    metaDescription:
      "End-to-end newsletter and campaign management for e-commerce brands: editorial calendar, segmentation, copywriting, A/B testing and deployment QA that build authority without list fatigue.",
    headline: "Strategic Newsletter & Campaign Management",
    intro:
      "While automations run 24/7, high-impact campaigns are the pulse of your brand's revenue, typically driving 40–70% of total email income. I manage your entire editorial ecosystem—from segmentation and disciplined testing to full calendar execution—ensuring every send is a strategic touchpoint that builds long-term authority and delivers consistent, measurable growth without list fatigue.",
    highlightsLabel: "What's included",
    highlights: [
      {
        title: "Strategic Editorial Calendar",
        copy: "Comprehensive planning of 4–8 high-impact sends per month, mapped to seasonal themes, exclusive offers, and high-intent segments.",
      },
      {
        title: "Full-Service Campaign Execution",
        copy: "End-to-end management including strategic copywriting, precise audience targeting, and advanced suppression logic.",
      },
      {
        title: "Scientific A/B Testing Protocols",
        copy: "Structured testing of subject lines, hooks, angles, and timing with strict “stop rules” to ensure data integrity.",
      },
      {
        title: "Behavioral Send-Time Optimization",
        copy: "Dynamic scheduling synchronized with individual subscriber activity patterns to maximize open rates.",
      },
      {
        title: "Rigorous Deployment & QA",
        copy: "Multi-point quality checks covering link integrity, tracking accuracy, and cross-device inbox rendering.",
      },
      {
        title: "Executive Performance Reporting",
        copy: "End-of-month synthesis of KPIs, behavioral insights, and strategic next actions to compound growth.",
      },
    ],
    ctaLabel: "Ask for a newsletter campaign",
    faqs: [
      {
        q: "What are newsletters?",
        a: "In a professional retention ecosystem, newsletters (or manual campaigns) are the “revenue pulse” of your brand. While automated flows run 24/7 in the background, newsletters are strategic, timed sends that allow you to engage your entire audience with product launches, seasonal offers, and brand stories. They are the most powerful tool for building long-term authority and typically drive between 40–70% of a brand's total email income.",
      },
      {
        q: "How often should newsletters be sent to avoid list burnout?",
        a: "The frequency is engineered based on audience engagement levels and business objectives. Rather than a one-size-fits-all approach, a custom sending schedule is established to balance consistent brand presence with list health, ensuring high open rates are maintained over time.",
      },
      {
        q: "Can newsletters be personalized for different customer segments?",
        a: "Yes. Campaigns are not sent as “blasts” to the entire database. Instead, they are deployed using advanced segmentation based on purchase history, browsing behavior, and engagement levels. This ensures that every subscriber receives content that is relevant to their specific interests.",
      },
      {
        q: "Who is responsible for the design and copy of the campaigns?",
        a: "The service covers the full execution of the campaign. This includes strategic planning and professional copywriting. Every element is built to drive a specific action, from clicks to direct revenue.",
      },
      {
        q: "How is the performance of each manual campaign tracked?",
        a: "Every campaign is integrated with standardized UTM tracking to measure its direct impact on revenue and conversion rates. These metrics are analyzed in real-time and consolidated into monthly reports to refine the ongoing strategy and optimize future content.",
      },
      {
        q: "Is it possible to A/B test different elements within a newsletter?",
        a: "A/B testing is a core component of the campaign infrastructure. Subject lines, layouts, and Call-to-Action buttons are rigorously tested to identify what resonates best with the audience, allowing for data-backed optimizations that increase overall ROI.",
      },
      {
        q: "I don't have any discounts this month. What will you even send?",
        a: "A newsletter isn't just a digital flyer for sales. I focus on a content strategy that builds a relationship with your subscribers. We use behavioral insights to send educational content, social proof, or brand stories. This builds trust so that when you do have a sale, your audience is already primed to buy.",
      },
    ],
    closing: {
      title: "From simple updates to strategic revenue drivers",
      copy: "Consistency is the foundation of retention. A well-engineered newsletter strategy does more than keep your brand top-of-mind; it creates a predictable cycle of engagement and profit. Transition from sending “blasts” to deploying targeted, high-conversion campaigns that resonate with your audience and compound your growth.",
    },
    related: ["sms-marketing", "pop-up-implementation", "reporting"],
  },

  /* --------------------------------------------- pop-up-implementation -- */
  {
    slug: "pop-up-implementation",
    name: "Pop-Up Setup",
    n: "07",
    pillar: "03",
    summary:
      "Behavioural capture engineered past the 3–8% baseline toward 10–15%, wired straight into onboarding flows.",
    metaTitle: "High-Conversion Pop-Up Setup",
    metaDescription:
      "On-site pop-up and flyout implementation for e-commerce: behavioural triggers, audience segmentation, multi-variant testing and clean data mapping into your onboarding flows.",
    headline: "High-Conversion Pop-Up Implementation",
    intro:
      "On established e-commerce sites, on-site pop-ups and flyouts typically convert ~3–8% view-to-submit, while best-in-class variants reach 10–15%+ depending on offer and timing. When paired with immediate onboarding flows, new-subscriber cohorts often drive meaningful first-purchase revenue within 60–90 days, improving list growth and payback.",
    highlightsLabel: "What's included",
    highlights: [
      {
        title: "Behavioral Trigger Engineering",
        copy: "Mapping out the precise moment a pop-up appears based on scroll depth, time on page, or exit intent to minimize friction.",
      },
      {
        title: "Advanced Audience Segmentation",
        copy: "Displaying specific offers based on traffic source, device type (mobile vs. desktop), or whether a visitor is new or returning.",
      },
      {
        title: "Multi-Variant A/B Testing",
        copy: "Continuous testing of headlines, incentive types (discount vs. value-add), and visual layouts to hit that 10%+ conversion benchmark.",
      },
      {
        title: "Seamless Flow Integration",
        copy: "Ensuring every lead is instantly synchronized with the correct automated onboarding sequence for immediate revenue capture.",
      },
      {
        title: "Compliance & Deliverability Guarding",
        copy: "Setting up rigorous frequency caps so visitors aren't overwhelmed, protecting both the user experience and the brand's reputation.",
      },
    ],
    body: [
      "Pop-up infrastructure is engineered for seamless integration with the email marketing platform through clean data mapping. This ensures subscribers flow instantly into the correct lists and high-intent segments. Consent is recorded with technical accuracy—including optional double opt-in protocols—while tracking is standardized to provide reliable, data-driven reporting.",
    ],
    ctaLabel: "Engineer the capture strategy",
    faqs: [
      {
        q: "Where is the pop-up hosted and managed?",
        a: "The lead capture system is engineered directly within the email marketing platform or through specialized external applications, depending on the required complexity. The entire technical configuration—from design and behavioral triggers to data mapping and integration—is handled as part of the implementation service to ensure a turnkey solution.",
      },
      {
        q: "Which is recommended: Single Opt-In or Double Opt-In?",
        a: "The choice depends on the brand's primary objective. Double Opt-In is recommended for maintaining maximum list health and high deliverability, as it verifies every email address. Conversely, Single Opt-In is utilized for accelerated list growth and friction-free conversions. The infrastructure is configured to support the method that best aligns with the current growth strategy.",
      },
      {
        q: "Can different offers be shown to different types of visitors?",
        a: "Yes. Through advanced source-triggering, the system displays unique incentives based on whether a visitor arrives from a specific social media campaign, a Google search, or a direct link. This level of personalization significantly increases the view-to-submit rate.",
      },
      {
        q: "What types of pop-ups can be implemented?",
        a: "Technically, any format can be deployed depending on the specific offer and brand objective. This ranges from standard subscription forms to interactive elements like “spin-to-win” games or multi-step quizzes. The entire setup—from selecting the most effective format to its full technical configuration—is managed to ensure it aligns with the overall strategy.",
      },
      {
        q: "Won't pop-ups annoy my customers and hurt the user experience?",
        a: "Only if they are poorly engineered. The goal isn't to interrupt the shopping experience, but to enhance it with a timely, relevant incentive. By using advanced behavioral triggers and frequency caps, the pop-up only appears when a visitor shows high intent or is about to leave, turning a potential exit into a long-term subscriber relationship.",
      },
      {
        q: "How is the conversion rate of a pop-up actually measured?",
        a: "Success is measured through the view-to-submit rate, which tracks the percentage of visitors who see the pop-up and successfully complete the form. While a standard rate is around 3–8%, the goal of high-performance engineering is to reach benchmarks of 10–15% or higher by optimizing the incentive, the timing, and the visual hierarchy.",
      },
    ],
    closing: {
      title: "Ready to convert traffic into revenue?",
      copy: "Don't let potential customers leave without a trace. Transition from basic forms to a high-performance capture system that builds your list 24/7. Let's deploy the infrastructure needed to secure immediate growth.",
    },
    related: ["newsletters", "automation-setup", "account-setup"],
  },

  /* ----------------------------------------------------- sms-marketing -- */
  {
    slug: "sms-marketing",
    name: "SMS Marketing",
    n: "08",
    pillar: "03",
    summary:
      "A compliant, revenue-positive SMS layer orchestrated with email — often ~10–20% of total lifecycle revenue.",
    metaTitle: "Revenue-Positive SMS Marketing",
    metaDescription:
      "Compliant SMS lifecycle marketing for e-commerce: consent and keyword flows, automations, campaigns, deliverability safeguards and cross-channel attribution alongside email.",
    headline: "Revenue-Positive SMS Marketing",
    intro:
      "SMS reaches customers with unmatched speed—messages are typically viewed within minutes, maintaining read rates far above email. In mature ecosystems, SMS often contributes ~10–20% of total lifecycle revenue. This infrastructure is essential for securing immediate revenue and compounding the results of retention campaigns.",
    highlightsLabel: "What I offer",
    highlights: [
      {
        title: "Compliance & consent",
        copy: "Region-specific language, keyword flows (JOIN/STOP/HELP), quiet hours, opt-in records, double opt-in where required.",
      },
      {
        title: "Strategy & calendar",
        copy: "Channel role, send cadence, offer hierarchy, and orchestration with email to avoid overlap.",
      },
      {
        title: "List growth",
        copy: "Capture via pop-ups/checkout, keyword campaigns, and short links for off-site acquisition.",
      },
      {
        title: "Setup & integration",
        copy: "Short code/TFN/alphanumeric, sender reputation, tracking, and clean data mapping to lists/segments.",
      },
      {
        title: "Automations",
        copy: "Welcome, Abandoned Cart, Browse, Shipping/Delivery, Back-in-Stock, Post-Purchase, Winback—trigger logic and guardrails included.",
      },
      {
        title: "Campaigns",
        copy: "Product drops, limited-time promos, restocks; segmentation for VIP, at-risk, and high-intent cohorts.",
      },
      {
        title: "Testing & optimization",
        copy: "A/B/N on copy, timing, reminders, and link format (short link vs. deep link).",
      },
      {
        title: "Deliverability & safeguards",
        copy: "Carrier filtering checks, frequency caps, throttling for large sends, and fail-safes around sales peaks.",
      },
      {
        title: "Measurement & reporting",
        copy: "Delivery rate, click-through, revenue per message, unsubscribe/complaint rate, and cross-channel attribution readouts.",
      },
    ],
    body: [
      "The SMS channel is fully connected to your email marketing platform: subscribers are routed to the correct lists and segments, consent is logged accurately, and tracking/UTMs are standardized for reliable, cross-channel reporting.",
    ],
    ctaLabel: "Talk about SMS marketing",
    faqs: [
      {
        q: "How can SMS marketing be implemented if the platform lacks native support in my region?",
        a: "Since certain platforms do not offer native SMS support globally, the solution involves engineering a bridge between the email platform and a specialized external SMS gateway via API or webhooks. This allows for real-time message triggers based on user behavior while maintaining a fully automated process.",
      },
      {
        q: "What are the costs associated with SMS marketing?",
        a: "Unlike email, SMS operates on a “pay-as-you-go” model with costs per message sent. The strategy focuses on optimizing content to remain within standard character limits and targeting high-conversion segments, ensuring the channel remains consistently revenue-positive.",
      },
      {
        q: "How is consent and compliance (GDPR) managed?",
        a: "Consent is logged with technical accuracy at the point of subscription, separate from email opt-ins. Every message includes a clear, automated unsubscribe method, protecting the brand and ensuring a healthy, compliant subscriber list.",
      },
      {
        q: "How is GDPR compliance handled for SMS in the EU?",
        a: "Compliance in the EU is managed by ensuring explicit, “opt-in” consent at the point of capture, separate from the email subscription. The infrastructure logs the exact time and source of consent, and every message includes a mandatory, easy-to-use Unsubscribe link or keyword. This technical accuracy protects the brand from legal risks while maintaining a high-quality, engaged list.",
      },
      {
        q: "How is the success of this channel measured?",
        a: "Performance is monitored by tracking direct attribution and incremental revenue lift. SMS typically adds 3–8% in incremental recoveries on automated flows, with success defined by its direct impact on the overall bottom line.",
      },
      {
        q: "Can I track exactly how much revenue an SMS campaign generates?",
        a: "Yes. Through standardized UTM tracking and dedicated discount codes, every click and purchase is attributed to the specific SMS that triggered it. This allows for clear reporting on incremental lift—showing exactly how much revenue was generated by the SMS channel that wouldn't have been captured by email alone.",
      },
    ],
    closing: {
      title: "Is the mobile revenue engine optimized?",
      copy: "Don't leave 10–20% of potential revenue on the table. Transition from email-only to a multi-channel ecosystem that reaches customers where they are most active. Let's audit the current infrastructure and deploy a high-yield SMS strategy.",
    },
    related: ["automation-setup", "newsletters", "reporting"],
  },

  /* --------------------------------------------------------- reporting -- */
  {
    slug: "reporting",
    name: "Reporting",
    n: "09",
    pillar: "04",
    summary:
      "Decision-grade readouts on revenue, growth and account health — each cycle closing with a focused 90-day plan.",
    metaTitle: "Decision-Grade Email Reporting",
    metaDescription:
      "Decision-grade email and SMS reporting: flow and campaign revenue attribution, database growth, deliverability health and a focused 90-day plan every cycle.",
    headline: "Decision-Grade E-mail & SMS Reporting",
    intro:
      "Reporting is not just about looking backward; it is the blueprint for future profit. Every reporting cycle concludes with a focused 90-day plan designed to compound results and drive long-term growth. By monitoring technical account health alongside revenue KPIs, the infrastructure remains optimized to scale without compromising deliverability or list integrity.",
    deliverablesLabel: "What you'll find in this report",
    deliverables: [
      "Automations performance: revenue share by flow, conversion and CTR, lift vs. last period, bottlenecks, and priority fixes.",
      "Campaigns performance: contribution to revenue, open/click rates, revenue per recipient, segment breakdowns, and A/B/N test readouts.",
      "Database & growth: capture funnel (view→submit), net list growth, engagement tiers, churn drivers, and data quality notes.",
      "Account health & deliverability: authentication status, reputation signals, inbox/complaint/bounce metrics, suppression hygiene, and risk flags.",
      "Conclusions & strategic recommendations: 90-day priorities (build/optimize/retire), measurement rules, and a focused action plan to compound results.",
    ],
    ctaLabel: "Talk about reporting",
    faqs: [
      {
        q: "What makes a report “decision-grade”?",
        a: "Unlike standard automated exports, a decision-grade report translates raw data into specific strategic actions. It filters out “vanity metrics” and focuses on KPIs tied directly to revenue and list health, making it clear exactly where to invest resources for the highest return.",
      },
      {
        q: "How is the accuracy of the revenue data ensured?",
        a: "Accuracy is maintained through continuous monitoring of deliverability and technical account health. By verifying the account infrastructure and tracking protocols (such as GA4 and UTM standardization), the reporting reflects a trustworthy and representative view of actual channel performance.",
      },
      {
        q: "Will the report include insights on customer behavior?",
        a: "Yes. Insights are tied to Customer Lifetime Value (CLV), retention metrics, and list health indicators. This allows for a deeper understanding of how different segments interact with the brand, moving beyond simple engagement to actual value-driven data.",
      },
    ],
    closing: {
      title: "From raw data to strategic architecture",
      copy: "Stop guessing and start scaling with a reporting system built for clarity. A decision-grade report does more than track numbers; it identifies the technical and strategic levers needed to compound your revenue. Transition from fragmented metrics to a unified 90-day roadmap that secures your account health and maximizes long-term profit.",
    },
    related: ["audit", "flow-optimization", "strategy"],
  },
];

export const serviceBySlug = Object.fromEntries(services.map((s) => [s.slug, s]));

export function getService(slug) {
  return serviceBySlug[slug] ?? null;
}
