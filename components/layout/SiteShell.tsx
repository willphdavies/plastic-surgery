import type { ReactNode, SVGProps } from "react";
import Link from "next/link";
import { SiteNav } from "@/components/layout/SiteNav";

type SiteShellProps = {
  children: ReactNode;
};

const socialLinks = [
  {
    href: "#",
    label: "Google",
    Icon: GoogleIcon,
  },
  {
    href: "#",
    label: "Instagram",
    Icon: InstagramIcon,
  },
  {
    href: "#",
    label: "Facebook",
    Icon: FacebookIcon,
  },
] as const;

export function SiteShell({ children }: SiteShellProps) {
  return (
    <div className="deSiteShell">
      <div className="deShellDemoBanner" role="note" aria-label="Demonstration website notice">
        <p className="deShellDemoBannerText">
          This is a demonstration website created to showcase design and
          functionality.
        </p>
      </div>

      <div className="deShellBanner">
        <a className="deShellBannerLink" href="tel:5555555555">
          Call Today! 555-555-5555
        </a>
      </div>

      <div className="deShellContainer">
        <header className="deShellHeader">
          <div className="deShellHeaderInner">
            <Link className="deShellBrand" href="/">
              <img
                className="deShellBrandImage"
                src="/logo.png"
                alt="Sarah Mitchell MD logo"
              />
              <span className="deShellBrandCopy">
                <span className="deShellBrandTitle">Sarah Mitchell MD</span>
                <span className="deShellBrandSubtitle">
                  Facial Plastic Surgery
                </span>
              </span>
            </Link>
            <SiteNav />
          </div>
        </header>

        <main aria-label="Page Content" className="deShellMain">
          {children}
        </main>

        <footer className="deShellFooter">
          <div className="deShellFooterInner">
            <div>&copy; 2026 Sarah Mitchell MD</div>

            <div className="deShellFooterMeta">
              <div>Facial Plastic Surgery · Portland</div>

              <div aria-label="Social media links" className="deShellSocialLinks">
                {socialLinks.map(({ href, label, Icon }) => (
                  <a
                    key={`footer-${label}`}
                    className="deShellSocialLink"
                    href={href}
                    aria-label={label}
                    title={label}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Icon className="deShellSocialIcon" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="deShellFooterCredit">
            Powered by{" "}
            <a href="https://www.digitalelevation.us" target="_blank" rel="noreferrer">
              Digital Elevation
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}

function GoogleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M21.8 12.23c0-.76-.07-1.49-.2-2.2H12v4.16h5.49a4.7 4.7 0 0 1-2.04 3.08v2.56h3.3c1.94-1.79 3.05-4.43 3.05-7.6Z" />
      <path d="M12 22c2.76 0 5.08-.91 6.78-2.46l-3.3-2.56c-.91.61-2.08.98-3.48.98-2.67 0-4.94-1.8-5.75-4.22H2.84v2.64A10 10 0 0 0 12 22Z" />
      <path d="M6.25 13.74A5.98 5.98 0 0 1 5.93 12c0-.61.11-1.2.32-1.74V7.62H2.84A10 10 0 0 0 2 12c0 1.61.39 3.13 1.08 4.38l3.17-2.64Z" />
      <path d="M12 6.04c1.5 0 2.85.52 3.91 1.53l2.93-2.93C17.07 2.98 14.75 2 12 2A10 10 0 0 0 3.08 7.62l3.17 2.64C7.06 7.84 9.33 6.04 12 6.04Z" />
    </svg>
  );
}

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.8A3.95 3.95 0 0 0 3.8 7.75v8.5a3.95 3.95 0 0 0 3.95 3.95h8.5a3.95 3.95 0 0 0 3.95-3.95v-8.5a3.95 3.95 0 0 0-3.95-3.95h-8.5Zm8.95 1.35a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.8A3.2 3.2 0 1 0 12 15.2 3.2 3.2 0 0 0 12 8.8Z" />
    </svg>
  );
}

function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M13.5 22v-8.2h2.76l.41-3.2H13.5V8.56c0-.93.26-1.56 1.59-1.56h1.7V4.14A22.8 22.8 0 0 0 14.3 4c-2.46 0-4.15 1.5-4.15 4.27v2.33H7.36v3.2h2.79V22h3.35Z" />
    </svg>
  );
}
