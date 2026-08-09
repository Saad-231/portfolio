"use client";

import { useRef, useState, type FormEvent, type ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSend, FiCheck, FiAlertCircle } from "react-icons/fi";
import SectionHeading from "@/components/ui/SectionHeading";
import { sendContactEmail } from "@/lib/emailjs";
import { SOCIALS } from "@/lib/data";

type FormStatus = "idle" | "loading" | "success" | "error";

interface FormValues {
  name: string;
  email: string;
  message: string;
}

const INITIAL_VALUES: FormValues = { name: "", email: "", message: "" };

function validate(values: FormValues) {
  const errors: Partial<FormValues> = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!values.email.trim()) {
    errors.email = "Please enter your email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!values.message.trim()) {
    errors.message = "Please write a short message.";
  } else if (values.message.trim().length < 10) {
    errors.message = "Message should be at least 10 characters.";
  }
  return errors;
}

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<Partial<FormValues>>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (field: keyof FormValues) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus("loading");
    setErrorMessage(null);

    try {
      if (!formRef.current) throw new Error("Form reference missing.");
      await sendContactEmail(formRef.current);
      setStatus("success");
      setValues(INITIAL_VALUES);
      window.setTimeout(() => setStatus("idle"), 4000);
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Something went wrong sending your message. Please try again."
      );
    }
  };

  return (
    <section id="contact" className="relative py-28 sm:py-36">
      <div className="section-shell">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Contact"
              title="Let's build something worth showing."
              description="Have a project in mind, or just want to say hello? My inbox is open."
            />

            <div className="mt-10 space-y-6">
              <div>
                <p className="font-mono text-[0.65rem] uppercase tracking-widest text-bone-dim">
                  Email
                </p>
                <a
                  href={`mailto:${SOCIALS.email}`}
                  className="mt-1.5 block text-lg text-bone transition-colors hover:text-gold"
                >
                  {SOCIALS.email}
                </a>
              </div>
              <div>
                <p className="font-mono text-[0.65rem] uppercase tracking-widest text-bone-dim">
                  GitHub
                </p>
                <a
                  href={SOCIALS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1.5 block text-lg text-bone transition-colors hover:text-gold"
                >
                  github.com/Saad-231
                </a>
              </div>
            </div>
          </div>

          <div className="card-panel relative p-6 sm:p-10">
            <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-6">
              <Field
                label="Name"
                name="from_name"
                value={values.name}
                onChange={handleChange("name")}
                error={errors.name}
                placeholder="Your full name"
              />
              <Field
                label="Email"
                name="from_email"
                type="email"
                value={values.email}
                onChange={handleChange("email")}
                error={errors.email}
                placeholder="you@example.com"
              />
              <Field
                label="Message"
                name="message"
                as="textarea"
                value={values.message}
                onChange={handleChange("message")}
                error={errors.message}
                placeholder="Tell me a little about your project..."
              />

              <button
                type="submit"
                disabled={status === "loading"}
                className="btn-gold w-full disabled:cursor-not-allowed disabled:opacity-60"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {status === "loading" ? (
                    <motion.span
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-gold/30 border-t-gold" />
                      Sending
                    </motion.span>
                  ) : status === "success" ? (
                    <motion.span
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <FiCheck size={16} /> Message Sent
                    </motion.span>
                  ) : (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      Send Message <FiSend size={14} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              {status === "error" && errorMessage && (
                <motion.p
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-sm text-red-400"
                  role="alert"
                >
                  <FiAlertCircle size={14} /> {errorMessage}
                </motion.p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

interface FieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  placeholder?: string;
  type?: string;
  as?: "input" | "textarea";
}

function Field({ label, name, value, onChange, error, placeholder, type = "text", as = "input" }: FieldProps) {
  const commonProps = {
    id: name,
    name,
    value,
    onChange,
    placeholder,
    "aria-invalid": Boolean(error),
    "aria-describedby": error ? `${name}-error` : undefined,
    className:
      "w-full rounded-xl border border-navy-500 bg-navy-900/60 px-4 py-3 text-sm text-bone placeholder:text-bone-dim transition-colors duration-300 focus:border-gold focus:outline-none",
  };

  return (
    <div>
      <label htmlFor={name} className="mb-2 block font-mono text-[0.65rem] uppercase tracking-widest text-bone-muted">
        {label}
      </label>
      {as === "textarea" ? (
        <textarea {...commonProps} rows={5} />
      ) : (
        <input {...commonProps} type={type} />
      )}
      {error && (
        <p id={`${name}-error`} className="mt-2 text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
