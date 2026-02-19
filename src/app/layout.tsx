import type { Metadata } from "next";
import { Montserrat, Merriweather, Oswald } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { SmoothScroll } from "@/components/smooth-scroll";

const montserrat = Montserrat({
    subsets: ["latin"],
    variable: "--font-montserrat",
    display: "swap",
});

const merriweather = Merriweather({
    weight: ["300", "400", "700", "900"],
    subsets: ["latin"],
    variable: "--font-merriweather",
    display: "swap",
});

const oswald = Oswald({
    subsets: ["latin"],
    variable: "--font-oswald",
    display: "swap",
});

export const metadata: Metadata = {
    title: "GPT Hebron City | Christ Revealed, Christ Expressed",
    description: "Green Pastures Tabernacle Hebron City - A place where Christ is Revealed and Expressed.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={cn(
                    "min-h-screen font-sans antialiased",
                    montserrat.variable,
                    merriweather.variable,
                    oswald.variable
                )}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    enableSystem
                    disableTransitionOnChange
                >
                    <SmoothScroll>
                        {children}
                    </SmoothScroll>
                </ThemeProvider>
            </body>
        </html>
    );
}
