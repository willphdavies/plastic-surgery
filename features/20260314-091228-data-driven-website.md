# Feature Specification

## Data-Driven Website

**Stack:** Next.js + AWS Amplify + Sanity CMS  
**Client:** Plastic Surgery Practice Website

---

# 1. Objectives

Build a **data-driven marketing website** to replace the existing Wix site.

Goals:

- Preserve as much **existing site content** as possible
- Provide a **clean editorial workflow**
- Support **high performance SEO**
- Enable **future automation of gallery uploads**
- Allow content editing without developer involvement
- Maintain a **developer-friendly architecture**

---

# 2. Technology Stack

## Frontend

- Next.js (App Router)
- TypeScript
- React Server Components
- Next Image optimization
- Shared layout derived from `content/template.html`
- Global CSS extracted from the approved static template
- Dedicated color variables file for design tokens

## Hosting

- AWS Amplify
- Git-based deployment
- CDN caching

## CMS

- Sanity

---

## Responsibilities

| System                | Responsibility             |
| --------------------- | -------------------------- |
| Next.js               | Rendering UI               |
| Amplify               | Hosting / deployment       |
| Sanity                | Content management         |
| Sanity Asset Pipeline | Image hosting / transforms |

---

# 3. Frontend Implementation Direction

## Layout Reference

The file `content/template.html` should be treated as the base layout reference for the application shell.

This shell includes:

- Full-width phone banner
- Header
- Primary navigation
- Social links
- Footer

### Implementation Notes

- The shared Next.js site layout should be built from `content/template.html`.
- `content/home.html` should be treated as an example content page built inside that shell.
- New page views should reuse the same shell structure unless a page has a clear reason to diverge.
- `content/template.html` is a one-time source reference and should not become a separately maintained parallel template system.

## CSS Strategy

The CSS currently embedded in `content/template.html` should be extracted and reorganized for the app implementation.

### Required approach

- Extract shared shell and typography styles into global CSS.
- Keep app-wide reset, layout primitives, banner, header, navigation, footer, and shared button styles in global CSS.
- Keep page-specific styles scoped to page/view containers.
- Preserve the existing visual direction from `template.html` rather than redesigning the shell during first implementation.

### Global CSS scope

Global styles should include:

- Base element resets
- Body background and typography defaults
- Shared container width utilities
- Shared button styles
- Banner styles
- Header and navigation styles
- Footer styles
- Shared social icon link styles

### Hardcoded shell content

For the initial implementation, the following shell-level items should be hardcoded in the shared layout:

- Phone banner content
- Social media links
- Shared header navigation labels
- Shared footer practice text

## Design Tokens

Create a dedicated variables file for colors and other global design tokens.

### Required token direction

- Colors should be defined in a dedicated variables file instead of being repeated inline across components.
- The initial focus should be color variables, but the file may also hold spacing radii, shadows, and layout max widths if useful.
- The palette should be derived from the approved template styling.
- Use plain CSS custom properties as the default token format.

### Initial color token intent

At minimum, define variables for:

- Page background
- Surface backgrounds
- Primary text
- Muted text
- Border / divider lines
- Accent
- Accent dark
- Warm neutral accent
- Banner background

## App Router Structure

The implementation should align with the project structure rules in `PROJECT_STRUCTURE.md`.

### Page composition

- Shared shell should live in the App Router layout layer.
- Route files in `app/**` should stay thin and compose page views.
- Page-level UI should live in `views/**`.
- Reusable presentational pieces should live in `components/**`.
- Shared CSS variables and global shell styling should be loaded once at the app level.

---

# 4. Site Structure

## Pages

| Page         | Type                |
| ------------ | ------------------- |
| Home         | Single page         |
| About        | Article page        |
| Services     | Article page        |
| Gallery      | Article category    |
| Blog         | Category + article  |
| Contact      | Single page         |
| Testimonials | Placeholder / blank |

---

# 5. Routing Structure

/
/about
/contact
/services
/services/[slug]
/photo-gallery/[slug]
/blog/[category]
/blog/[category]/[slug]

---

# 6. Content Models (Sanity)

## Home Page

Home is a structured singleton page, not a block-based builder.

Editors should be able to edit each predefined section.

### Schema

homePage
hero
title
subtitle
heroImage
callToAction
seo

introSection
title
body

servicesPreview
title
description

galleryPreview
title
description

testimonialsPreview
title

blogPreview
title

contactCTA
title
body

---

# 7. Shared Editorial Model

All pages except the Home page should use a shared `article` document model.

### Schema

article
title
slug
category (reference, optional)
tags[]
summary
heroImages[]
content (PortableText / Markdown style)
relatedContent[]
widgets[]
seo
metadata

### Notes

- Categories are one-to-many: one category can contain many articles.
- Tags are many-to-many: one article can have many tags, and one tag can be used by many articles.
- Pages with no category are considered top-level pages.
- All non-home pages must include SEO fields.
- The `metadata` group should cover page metadata needed outside the core content body.
- The article model should support `relatedContent[]` for internal links to `article` and `articleCategory` pages.
- The article model should stay simple and support optional `widgets[]` for page-level inserts.
- Category landing pages should also support `relatedContent[]`.

### SEO / Metadata Requirements

Each `article` should support:

- SEO title
- SEO description
- Open Graph title
- Open Graph description
- Open Graph image
- Canonical URL override
- Robots / indexing controls
- Social share image
- Browser/page title

Supporting taxonomy documents:

articleCategory
title
slug
categoryType
summary
heroImages[]
content
relatedContent[]
widgets[]
description
seo

### Category Notes

- `/services` should be an article category landing page.
- Gallery categories should use the same underlying category system as articles.
- Gallery categories must remain easy to identify for automation.
- Use a simple `categoryType` field to distinguish category behaviors such as `service`, `gallery`, and `blog`.
- Category landing pages should support the same editorial flexibility as article pages, including summary, hero images, content, and widgets.
- Widgets should come from a static code-defined list, not an open-ended Sanity-defined widget builder.

tag
title
slug

---

# 8. Services

Services should include both:

- A category landing page at `/services`
- Individual service article pages at `/services/[slug]`

Each service will have its own article page.

### Route

/services
/services/[slug]

### Example services (from existing site)

Possible services:

- Facelift
- Rhinoplasty
- Blepharoplasty
- Neck Lift
- Brow Lift
- Chin Augmentation
- Botox
- Fillers

---

# 9. Gallery System

## Route

/photo-gallery/[slug]

Where slug corresponds to the shared category slug for the gallery category.

Example:

/photo-gallery/facelift
/photo-gallery/rhinoplasty
/photo-gallery/blepharoplasty

---

# 10. Gallery Data Model

Gallery pages should be treated as article category pages that display multiple cases.

Gallery data is built around **cases**, not just images.

This enables:

- clean organization
- automation
- sorting
- filtering
- SEO

---

## Category Model

Gallery landing pages should use `articleCategory` with `categoryType = gallery`.

### Notes

- A gallery category is not a separate document type.
- It should support editorial intro content plus a grid/list of related cases.
- Category identification for gallery automation should be straightforward from the slug and `categoryType`.

---

## Schema: Gallery Case

Represents one patient case.

galleryCase
title
category (reference)
patientCode
procedure
notes
date
images[]

---

## Schema: Gallery Image

galleryImage
image
imageType (before | after | additional)
view (front | side | angle)
caption
sortOrder

---

# 11. Gallery Template

Each gallery page should display:

### Layout

Gallery Page

Title
Intro text
Optional hero image(s)

Grid of Cases

Case Card
Before Image
After Image
Link to case detail

Case detail pages are optional future scope and not required now.

---

# 12. Testimonials

Testimonials can remain blank for now.

No Google reviews integration is required in the initial implementation.

---

# 13. Automated Gallery Upload Design

The gallery schema is intentionally designed to support **email-based ingestion**.

---

## Planned Workflow

Doctor emails photos
↓
AWS SES inbox
↓
Lambda processes email
↓
Images stored
↓
Sanity API creates gallery case
↓
Images attached to case

---

## Email Format

Example:

To: gallery@site.com

Subject:
Facelift – Patient 123 – 6 months

Attachments:

before.jpg
after.jpg

---

## Lambda Extraction

Fields parsed:

procedure
patientCode
timepoint
image files

---

## Result

Lambda creates:

galleryCase
procedure = facelift
patientCode = 123
images = before + after

---

# 14. Blog

---

## Routes

/blog/[category]
/blog/[category]/[slug]

---

## Category Page

Displays:

Category title
Article list

---

## Article Page

Displays:

Title
Hero image(s)
Summary
Content
Related articles

---

## Content Model

Blog articles use the shared `article` model with an `articleCategory` reference and `tags[]`.

Constraint:

One article -> one category

One article -> many tags

---

# 15. Contact Page

Single page using the shared `article` model for editorial content plus contact-specific fields as needed.

### Schema

article
title
slug
category
tags[]
summary
heroImages[]
content
seo
metadata

contactDetails
phone
email
address
mapLocation

---

## Contact Form

Submission pipeline:

Contact Form
↓
Next.js API route
↓
Email via SES

### Initial Widgets

The initial widget set should support:

- ContactForm
- Embeddable Google Map

### Google Map Widget

The Google Map widget should store an iframe snippet for embedding.

### Widget Source

Widgets should be selected from a static code-defined list based on what exists in the codebase.

Sanity should not act as a free-form widget builder.

---

# 16. Existing Site Content Migration

Content to migrate where possible.

---

## Pages

Home
About
Services
Photo Gallery
Blog
Contact

---

## Gallery

Current galleries include:

Facelift
Rhinoplasty
Blepharoplasty
Neck Lift
Brow Lift

Each case will become:

galleryCase

---

## Blog

Existing blog posts migrate into:

article

with assigned category.

---

# 17. Performance Considerations

- Use **Next Image**
- Lazy load galleries
- Use CDN caching
- Optimize image sizes

---

# 18. Future Enhancements

Potential upgrades:

### Case Detail Pages

/photo-gallery/[slug]/[case]

### AI image tagging

### Automated gallery ingestion

### Review ingestion pipeline

### Structured FAQ content

---

# 19. Deployment Workflow

Git push
↓
Amplify build
↓
Next.js build
↓
CDN deploy

---

# 20. Summary

The system provides:

- A **structured content model**
- A **scalable gallery architecture**
- A **clean Next.js developer workflow**
- The ability to support **automated photo ingestion**
- A site that is **faster, easier to maintain, and easier to evolve** than the current Wix implementation.
