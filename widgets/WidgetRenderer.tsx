import { getWidgetById } from "@/lib/content/content";
import type { WidgetDefinition } from "@/types/content";
import { ContactFormWidget } from "@/widgets/contact-form/ContactFormWidget";
import { GoogleMapWidget } from "@/widgets/google-map/GoogleMapWidget";

type WidgetRendererProps = {
  widgetId: WidgetDefinition["id"];
};

export function WidgetRenderer({ widgetId }: WidgetRendererProps) {
  const widget = getWidgetById(widgetId);

  if (!widget) {
    return null;
  }

  if (widget.type === "contactForm") {
    return <ContactFormWidget title={widget.title} submitLabel={widget.submitLabel} />;
  }

  if (widget.type === "googleMap") {
    return (
      <GoogleMapWidget
        title={widget.title}
        address={widget.address}
        iframeHtml={widget.iframeHtml}
      />
    );
  }

  return null;
}
