"use client"

import { givingPage } from "@/data"
import { Copy, Check, Smartphone, Building, Globe, Send } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

export function GivingMethods() {
    const [copied, setCopied] = useState<string | null>(null)

    const handleCopy = (text: string, id: string) => {
        navigator.clipboard.writeText(text)
        setCopied(id)
        setTimeout(() => setCopied(null), 2000)
    }

    const getIcon = (type: string) => {
        switch (type) {
            case "mobile": return <Smartphone className="w-6 h-6" />
            case "bank": return <Building className="w-6 h-6" />
            case "online": return <Globe className="w-6 h-6" />
            case "international": return <Send className="w-6 h-6" />
            default: return <Building className="w-6 h-6" />
        }
    }

    return (
        <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {givingPage.methods.map((method) => (
                        <div
                            key={method.id}
                            className="bg-card border border-border rounded-2xl p-8 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 group"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                    {getIcon(method.type)}
                                </div>
                                <div>
                                    <h3 className="text-xl font-display font-bold text-foreground">{method.title}</h3>
                                    <p className="text-sm text-muted-foreground">{method.description}</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {method.details.map((detail, idx) => (
                                    <div key={idx} className="bg-secondary/5 rounded-xl p-4 flex items-center justify-between group/item hover:bg-secondary/10 transition-colors">
                                        <div>
                                            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">{detail.label}</p>
                                            <p className="text-lg font-bold text-foreground font-mono">{detail.value}</p>
                                        </div>
                                        <button
                                            onClick={() => handleCopy(detail.value, `${method.id}-${idx}`)}
                                            className="p-2 text-muted-foreground hover:text-primary transition-colors focus:outline-none"
                                            title="Copy to clipboard"
                                        >
                                            {copied === `${method.id}-${idx}` ? (
                                                <Check className="w-5 h-5 text-green-500" />
                                            ) : (
                                                <Copy className="w-5 h-5 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                                            )}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
