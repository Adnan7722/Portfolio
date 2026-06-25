import type { Metadata, Viewport } from "next";
import { profile } from "@/lib/data";
import { ThemeProvider } from "@/components/ThemeProvider";
import { BootProvider } from "@/components/BootScreen";
import { AuroraBackground } from "@/components/AuroraBackground";
import { Navbar } from "@/components/Navbar";
import { ChatBot } from "@/components/ChatBot";
import "./globals.css";

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.role}`,
  description:
    "Adnan builds fast, business-ready systems powered by AI — full-stack development, AI workflow automation, and end-to-end deployment for small businesses.",
  keywords: [
    "Full-Stack Engineer",
    "AI Automation",
    "Next.js",
    "MERN",
    "Small Business",
    "Adnan",
  ],
  authors: [{ name: profile.name }],
  openGraph: {
    title: `${profile.name} — ${profile.role}`,
    description: profile.tagline,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0a09",
  width: "device-width",
  initialScale: 1,
};

// Apply the saved theme before first paint to avoid a flash. Dark is default.
const themeScript = `
(function() {
  try {
    var t = localStorage.getItem('theme');
    if (t === 'light') document.documentElement.classList.add('light');
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `if ('serviceWorker' in navigator) navigator.serviceWorker.getRegistrations().then(rs => rs.forEach(r => r.unregister()));`,
          }}
        />
      </head>
      <body className="grain scanlines antialiased">
        <ThemeProvider>
          <BootProvider>
            <AuroraBackground />
            <Navbar />
            {children}
            <ChatBot />
          </BootProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
