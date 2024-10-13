import type {Metadata} from "next";
import localFont from "next/font/local";
import "./globals.css";
import {CopilotKit} from "@copilotkit/react-core";
import "@copilotkit/react-ui/styles.css";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "Summerize your contents",
    description: "Content summary tool. Powered by CopilotKit."
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <head>
            <link rel="icon" href="/public/banner.png" sizes="any"/>
        </head>
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <CopilotKit runtimeUrl="/api/copilotkit">
            {children}
        </CopilotKit>
        </body>
        </html>
    );
}
