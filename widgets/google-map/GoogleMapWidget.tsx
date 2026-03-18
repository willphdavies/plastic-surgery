import styles from "./GoogleMapWidget.module.css";

type GoogleMapWidgetProps = {
  title: string;
  address: string;
  iframeHtml: string;
};

export function GoogleMapWidget({
  title,
  address,
  iframeHtml,
}: GoogleMapWidgetProps) {
  return (
    <section className={styles.deGoogleMapWidget}>
      <h2 className={styles.deTitle}>{title}</h2>
      <p className={styles.deAddress}>{address}</p>
      <div
        className={styles.deFrame}
        dangerouslySetInnerHTML={{ __html: iframeHtml }}
      />
    </section>
  );
}
