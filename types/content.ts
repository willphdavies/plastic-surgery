export type CategoryType = "service" | "gallery" | "blog";

export type SeoFields = {
  title: string;
  description: string;
};

export type PageReference = {
  title: string;
  href: string;
};

export type WidgetType = "contactForm" | "googleMap";

export type WidgetDefinition =
  | {
      id: "contact-form";
      type: "contactForm";
      title: string;
      submitLabel: string;
    }
  | {
      id: "location-google-map";
      type: "googleMap";
      title: string;
      address: string;
      iframeHtml: string;
    };

export type ArticleCategory = {
  slug: string;
  title: string;
  categoryType: CategoryType;
  description: string;
  summary: string;
  heroImages: string[];
  content: string;
  relatedContent: PageReference[];
  widgets: WidgetDefinition["id"][];
  seo: SeoFields;
};

export type Article = {
  slug: string;
  title: string;
  href: string;
  summary: string;
  heroImages: string[];
  content: string;
  relatedContent: PageReference[];
  widgets: WidgetDefinition["id"][];
  seo: SeoFields;
  categorySlug?: string;
  featured?: boolean;
};
