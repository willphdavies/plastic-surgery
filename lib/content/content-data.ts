import type { Article, ArticleCategory, WidgetDefinition } from "@/types/content";

type ServiceCatalogItem = {
  slug: string;
  title: string;
  summary: string;
  image: string;
  featured?: boolean;
};

export const widgetDefinitions: WidgetDefinition[] = [
  {
    id: "contact-form",
    type: "contactForm",
    title: "Request a Consultation",
    submitLabel: "Send Inquiry",
  },
  {
    id: "location-google-map",
    type: "googleMap",
    title: "Facial Surgery Practice",
    address: "Old Town, Portland, OR",
    iframeHtml:
      '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11180.970950448977!2d-122.69212764094087!3d45.52532062723172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5495a0aa760d4f55%3A0x832a930e6fa4a44c!2sOld%20Town%2C%20Portland%2C%20OR!5e0!3m2!1sen!2sus!4v1773804120893!5m2!1sen!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
  },
];

const serviceCatalog: ServiceCatalogItem[] = [
  {
    slug: "facelift",
    title: "Facelift",
    summary:
      "Facelift surgery information, including treatment options, recovery, and consultation guidance. Facelift surgery information.",
    image: "/services/facelift.png",
    featured: true,
  },
  {
    slug: "necklift",
    title: "Necklift",
    summary: "Necklift surgery information, including treatment options, recovery, and consultation guidance.",
    image: "/services/necklift.png",
  },
  {
    slug: "rhinoplasty",
    title: "Rhinoplasty and Nose Surgery",
    summary:
      "Rhinoplasty and nose surgery information, including treatment options, recovery, and consultation guidance.",
    image: "/services/rhinoplasty.png",
  },
  {
    slug: "scar-revision",
    title: "Scar Revision",
    summary: "Scar improvement strategies and procedural education.",
    image: "/services/scar-revision.png",
  },
  {
    slug: "male-facial-plastic-surgery",
    title: "Plastic Surgery for Men",
    summary: "Facial plastic surgery treatments and considerations for men.",
    image: "/services/man.png",
    featured: true,
  },
  {
    slug: "fillers",
    title: "Fillers",
    summary: "Injectable filler treatments and facial volume restoration.",
    image: "/services/fillers.png",
  },
];

const serviceArticles: Article[] = serviceCatalog.map((service) => ({
  slug: service.slug,
  title: service.title,
  href: `/services/${service.slug}`,
  categorySlug: "services",
  summary: service.summary,
  heroImages: [service.image],
  content: `## ${service.title}

This is the initial structured article route for ${service.title.toLowerCase()}. It is wired into the shared article model and can be replaced with Sanity content later without changing the route architecture.

## Consultation

Use the related content links and consultation widget to move patients toward the next step clearly.`,
  relatedContent: [
    { title: "Services", href: "/services" },
    { title: "Contact", href: "/contact" },
  ],
  widgets: ["contact-form"],
  seo: {
    title: `${service.title} | Sarah Mitchell MD`,
    description: `${service.title} service information from Sarah Mitchell MD.`,
  },
  featured: service.featured ?? false,
}));

export const categories: ArticleCategory[] = [
  {
    slug: "services",
    title: "Facial Plastic Surgery Services",
    categoryType: "service",
    description: "Current facial plastic surgery service catalog from the practice.",
    summary:
      "Dr. Mitchell offers surgical and non-surgical facial treatments. Select a service below to learn more about each procedure.",
    heroImages: ["/doctor-white-coat.png"],
    content: `## Service overview

This category page is based on the current live services page and reflects the active service list presented on the practice website.

## Available treatment types

- Surgical facial procedures
- Facial contouring procedures
- Injectables and non-surgical treatments

{{widget:contact-form}}`,
    relatedContent: [
      { title: "About Dr. Mitchell", href: "/about" },
      { title: "Contact", href: "/contact" },
    ],
    widgets: [],
    seo: {
      title: "Facial Plastic Surgery Services | Sarah Mitchell MD",
      description:
        "Explore the current facial plastic surgery and injectable services offered by Sarah Mitchell MD.",
    },
  },
  {
    slug: "facelift",
    title: "Facelift Gallery",
    categoryType: "gallery",
    description: "Before-and-after facelift cases.",
    summary:
      "Review facelift case photography in a quieter, category-led gallery format.",
    heroImages: ["/services/facelift.avif"],
    content: `## Gallery Overview

This gallery category introduces facelift cases and should support case cards, concise editorial framing, and a smooth path to consultation.

{{widget:contact-form}}`,
    relatedContent: [
      { title: "Facelift Service", href: "/services/facelift" },
      { title: "Contact", href: "/contact" },
    ],
    widgets: [],
    seo: {
      title: "Facelift Gallery | Sarah Mitchell MD",
      description: "Facelift before-and-after photo gallery.",
    },
  },
  {
    slug: "insights",
    title: "Blog",
    categoryType: "blog",
    description: "Educational articles and practice updates.",
    summary:
      "Structured editorial content covering procedures, consultations, and patient education.",
    heroImages: [],
    content: `## Editorial content

Blog category pages should support editorial intros plus a clean listing of related articles.`,
    relatedContent: [{ title: "Contact", href: "/contact" }],
    widgets: [],
    seo: {
      title: "Blog | Sarah Mitchell MD",
      description: "Educational articles from Sarah Mitchell MD.",
    },
  },
];

export const articles: Article[] = [
  {
    slug: "about",
    title: "About Dr. Sarah Mitchell",
    href: "/about",
    summary:
      "Learn about Dr. Sarah Mitchell's background, training, fellowship, and practice philosophy.",
    heroImages: ["/doctor-white-coat.png"],
    content: `## Background

Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.

## Medical education

It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

## Residency and fellowship

She completed residency training in {training} at {univerity} in Portland. She then completed a facial plastic and reconstructive surgery fellowship in {fellowship_location} through the {fellowship_organization}, with advanced exposure to facelift surgery, rhinoplasty, facial trauma, and skin cancer reconstruction.

## Academic and professional experience

It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters

## Practice

Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.`,
  relatedContent: [],
    widgets: ["contact-form"],
    seo: {
      title: "About Dr. Mitchell | Sarah Mitchell MD",
      description:
        "Learn about Dr. Sarah Mitchell's background and training.",
    },
  },
  {
    slug: "contact",
    title: "Get In Touch",
    href: "/contact",
    summary:
      "Contact Sarah Mitchell MD to request a consultation or ask questions about treatments.",
    heroImages: ["/doctor-normal.png"],
    content: `## Phone and fax

- Phone: [555-555-5555](tel:+15555555555)
- Fax: 555-555-5555

{{widget:location-google-map}}
`,

    relatedContent: [],
    widgets: ["contact-form"],
    seo: {
      title: "Contact | Sarah Mitchell MD",
      description: "Contact Sarah Mitchell MD and request a consultation.",
    },
  },
  ...serviceArticles,
];
