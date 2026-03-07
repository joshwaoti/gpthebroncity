"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { connectPage } from "@/data";
import {
  Phone,
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";

type ContactSubject = "general" | "prayer" | "testimony" | "membership";

type ContactFormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: ContactSubject;
  message: string;
};

const INITIAL_FORM: ContactFormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  subject: "general",
  message: "",
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function ContactForm() {
  const submitContact = useMutation(api.contact.submit);

  const [form, setForm] = useState<ContactFormState>(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function setField<K extends keyof ContactFormState>(
    key: K,
    value: ContactFormState[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (successMessage) setSuccessMessage("");
    if (errorMessage) setErrorMessage("");
  }

  const fullName = `${form.firstName.trim()} ${form.lastName.trim()}`.trim();
  const canSubmit = !submitting;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!form.firstName.trim()) {
      setErrorMessage("Please enter your first name.");
      return;
    }

    if (!form.lastName.trim()) {
      setErrorMessage("Please enter your last name.");
      return;
    }

    if (!isValidEmail(form.email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (form.message.trim().length < 10) {
      setErrorMessage("Please enter a message with at least 10 characters.");
      return;
    }

    setSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      await submitContact({
        // Backward compatibility for deployments still requiring `name`
        name: fullName,
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim().toLowerCase(),
        phone: form.phone.trim() ? form.phone.trim() : undefined,
        subject: form.subject,
        message: form.message.trim(),
      });

      setSuccessMessage(
        "Message sent successfully. We’ll get back to you soon.",
      );
      setForm(INITIAL_FORM);
    } catch (err) {
      console.error("Contact submission failed:", err);
      setErrorMessage(
        "Unable to send your message right now. Please try again shortly.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="py-20 bg-secondary/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
              Get in Touch
            </h2>
            <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
              Have a question, prayer request, or just want to say hello? Fill
              out the form or reach us directly.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-1">
                    Call Us
                  </h3>
                  <p className="text-muted-foreground">
                    {connectPage.contactInfo.phone}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Mon-Fri, 9am - 5pm
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-1">
                    Email Us
                  </h3>
                  <p className="text-muted-foreground">
                    {connectPage.contactInfo.email}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-1">
                    Visit Us
                  </h3>
                  <p className="text-muted-foreground">
                    {connectPage.contactInfo.address}
                  </p>
                  <Link
                    href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(connectPage.contactInfo.address)}`}
                    target="_blank"
                  >
                    <Button
                      variant="link"
                      className="p-0 h-auto text-primary mt-2"
                    >
                      Get Directions &rarr;
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
            <form className="space-y-6" onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="firstName"
                    className="text-sm font-medium text-foreground"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    value={form.firstName}
                    onChange={(e) => setField("firstName", e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    placeholder="John"
                    required
                    maxLength={80}
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="lastName"
                    className="text-sm font-medium text-foreground"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    value={form.lastName}
                    onChange={(e) => setField("lastName", e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    placeholder="Doe"
                    required
                    maxLength={80}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-foreground"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={form.email}
                  onChange={(e) => setField("email", e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  placeholder="john@example.com"
                  required
                  maxLength={120}
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="phone"
                  className="text-sm font-medium text-foreground"
                >
                  Phone Number (optional)
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={form.phone}
                  onChange={(e) => setField("phone", e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  placeholder="+254 700 000 000"
                  maxLength={30}
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="subject"
                  className="text-sm font-medium text-foreground"
                >
                  Subject
                </label>
                <select
                  id="subject"
                  value={form.subject}
                  onChange={(e) =>
                    setField("subject", e.target.value as ContactSubject)
                  }
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                >
                  <option value="general">General Inquiry</option>
                  <option value="prayer">Prayer Request</option>
                  <option value="testimony">Share a Testimony</option>
                  <option value="membership">Membership</option>
                </select>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-foreground"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  value={form.message}
                  onChange={(e) => setField("message", e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                  placeholder="How can we help you?"
                  required
                  minLength={10}
                  maxLength={2000}
                />
              </div>

              {successMessage && (
                <div className="rounded-lg border border-green-200 bg-green-50 text-green-800 dark:border-green-900/40 dark:bg-green-900/20 dark:text-green-300 px-4 py-3 text-sm flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>{successMessage}</span>
                </div>
              )}

              {errorMessage && (
                <div className="rounded-lg border border-red-200 bg-red-50 text-red-800 dark:border-red-900/40 dark:bg-red-900/20 dark:text-red-300 px-4 py-3 text-sm flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <Button
                type="submit"
                disabled={!canSubmit}
                className="w-full py-6 text-lg gap-2 disabled:opacity-60"
                aria-disabled={!canSubmit}
              >
                {submitting ? (
                  "Sending..."
                ) : (
                  <>
                    Send Message <Send className="w-4 h-4" />
                  </>
                )}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                Sending as:{" "}
                <span className="font-medium text-foreground">
                  {fullName || "—"}
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
