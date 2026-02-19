"use client"

import { Button } from "@/components/ui/button"
import { connectPage } from "@/data"
import { Phone, Mail, MapPin, Send } from "lucide-react"

export function ContactForm() {
    return (
        <section className="py-20 bg-secondary/5">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {/* Contact Info */}
                    <div>
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">Get in Touch</h2>
                        <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                            Have a question, prayer request, or just want to say hello? Fill out the form or reach us directly.
                        </p>

                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-foreground mb-1">Call Us</h3>
                                    <p className="text-muted-foreground">{connectPage.contactInfo.phone}</p>
                                    <p className="text-xs text-muted-foreground mt-1">Mon-Fri, 9am - 5pm</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-foreground mb-1">Email Us</h3>
                                    <p className="text-muted-foreground">{connectPage.contactInfo.email}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-foreground mb-1">Visit Us</h3>
                                    <p className="text-muted-foreground">{connectPage.contactInfo.address}</p>
                                    <Button variant="link" className="p-0 h-auto text-primary mt-2">Get Directions &rarr;</Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="firstName" className="text-sm font-medium text-foreground">First Name</label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                        placeholder="John"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="lastName" className="text-sm font-medium text-foreground">Last Name</label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                        placeholder="Doe"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium text-foreground">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                    placeholder="john@example.com"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="subject" className="text-sm font-medium text-foreground">Subject</label>
                                <select
                                    id="subject"
                                    className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                >
                                    <option value="general">General Inquiry</option>
                                    <option value="prayer">Prayer Request</option>
                                    <option value="testimony">Share a Testimony</option>
                                    <option value="membership">Membership</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium text-foreground">Message</label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                                    placeholder="How can we help you?"
                                />
                            </div>

                            <Button className="w-full py-6 text-lg gap-2">
                                Send Message <Send className="w-4 h-4" />
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
