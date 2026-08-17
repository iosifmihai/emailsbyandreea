/**
 * Platforms, client brands and certifications — all sourced from the live
 * site, using the official logo assets downloaded to /public/assets.
 */

export const platforms = [
  { name: "Klaviyo", logo: "/assets/platforms/klaviyo.png" },
  { name: "Mailchimp", logo: "/assets/platforms/mailchimp.png" },
  { name: "HubSpot", logo: "/assets/platforms/hubspot.png" },
  { name: "Omnisend", logo: "/assets/platforms/omnisend.png" },
  { name: "theMarketer", logo: "/assets/platforms/themarketer.png" },
  { name: "AWeber", logo: "/assets/platforms/aweber.png" },
  { name: "Beehiiv", logo: "/assets/platforms/beehiiv.png" },
  { name: "Sendy", logo: "/assets/platforms/sendy.png" },
];

export const brands = [
  { name: "SMP Courier", logo: "/assets/brands/smp-courier.png" },
  { name: "Obaby", logo: "/assets/brands/obaby.png" },
  { name: "NOR", logo: "/assets/brands/nor.png" },
  { name: "Magnet Travel", logo: "/assets/brands/magnet-travel.png" },
  { name: "Somproduct", logo: "/assets/brands/somproduct.png" },
  { name: "Dezvoltare Copii & Adolescenți", logo: "/assets/brands/dezvoltare-copii.png" },
  { name: "BLENN Events", logo: "/assets/brands/blenn-events.png" },
  { name: "Wanty", logo: "/assets/brands/wanty.avif" },
];

export const certificates = [
  {
    name: "Klaviyo Omnichannel Strategy Certificate",
    image: "/assets/certs/klaviyo-omnichannel.jpg",
  },
  { name: "Klaviyo Product Certificate", image: "/assets/certs/klaviyo-product.jpg" },
  {
    name: "Klaviyo Deliverability Certificate",
    image: "/assets/certs/klaviyo-deliverability.jpg",
  },
];

/** Counter values read from the live homepage metrics. */
export const metrics = [
  { value: 20, suffix: "+", label: "Accounts Managed" },
  { value: 10, suffix: "+ mil", label: "Newsletters Sent" },
  { value: 100, suffix: "+", label: "Campaigns Engineered" },
];
