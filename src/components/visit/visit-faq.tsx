"use client"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { visitPage } from "@/data"

export function VisitFAQ() {
    return (
        <section className="py-20 bg-secondary/5">
            <div className="container mx-auto px-4 max-w-3xl">
                <div className="text-center mb-12">
                    <span className="text-primary font-bold tracking-widest uppercase text-sm mb-2 block">Common Questions</span>
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">What to Expect</h2>
                </div>

                <Accordion type="single" collapsible className="w-full space-y-4">
                    {visitPage.faqs.map((faq, idx) => (
                        <AccordionItem
                            key={idx}
                            value={`item-${idx}`}
                            className="bg-card border border-border rounded-xl px-6 data-[state=open]:border-primary/30 transition-all duration-300 shadow-sm"
                        >
                            <AccordionTrigger className="text-lg font-bold text-foreground hover:text-primary no-underline py-6">
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    )
}
