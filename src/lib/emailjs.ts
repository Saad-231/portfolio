import emailjs from "@emailjs/browser";

/**
 * EmailJS configuration.
 *
 * These three values come from environment variables so real credentials
 * never get committed to source control. See ".env.local.example" (copy it
 * to ".env.local") for exactly where to find each one in your EmailJS
 * dashboard: https://dashboard.emailjs.com
 *
 *   NEXT_PUBLIC_EMAILJS_SERVICE_ID  → Email Services → your service
 *   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID → Email Templates → your template
 *   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY  → Account → General → Public Key
 *
 * The contact template should reference these variables:
 *   {{from_name}}, {{from_email}}, {{message}}
 * which match the `name` attributes on the form fields in Contact.tsx.
 */
const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "";
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "";
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "";

/**
 * Sends the contact form via EmailJS. Throws a descriptive error if
 * credentials haven't been configured yet, so the failure is obvious
 * during setup instead of failing silently.
 */
export async function sendContactEmail(form: HTMLFormElement): Promise<void> {
  const isPlaceholder =
    !SERVICE_ID ||
    !TEMPLATE_ID ||
    !PUBLIC_KEY ||
    SERVICE_ID.includes("your_") ||
    TEMPLATE_ID.includes("your_") ||
    PUBLIC_KEY.includes("your_");

  if (isPlaceholder) {
    throw new Error(
      "Email isn't configured yet — add your EmailJS Service ID, Template ID and Public Key to .env.local (see .env.local.example)."
    );
  }

  await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form, { publicKey: PUBLIC_KEY });
}
