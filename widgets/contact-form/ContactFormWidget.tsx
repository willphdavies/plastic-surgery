import styles from "./ContactFormWidget.module.css";

type ContactFormWidgetProps = {
  title: string;
  submitLabel: string;
};

export function ContactFormWidget({
  title,
  submitLabel,
}: ContactFormWidgetProps) {
  return (
    <section className={styles.deContactFormWidget}>
      <h2 className={styles.deTitle}>{title}</h2>
      <form className={styles.deGrid}>
        <div className={styles.deField}>
          <label className={styles.deLabel} htmlFor="contact-name">
            Name
          </label>
          <input className={styles.deInput} id="contact-name" name="name" type="text" />
        </div>
        <div className={styles.deField}>
          <label className={styles.deLabel} htmlFor="contact-email">
            Email
          </label>
          <input className={styles.deInput} id="contact-email" name="email" type="email" />
        </div>
        <div className={styles.deField}>
          <label className={styles.deLabel} htmlFor="contact-message">
            Message
          </label>
          <textarea className={styles.deTextarea} id="contact-message" name="message" />
        </div>
        <div>
          <button className={styles.deButton} type="submit">
            {submitLabel}
          </button>
        </div>
      </form>
    </section>
  );
}
