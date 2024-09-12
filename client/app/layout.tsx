import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "@/components/providers/auth-provider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "700", "200", "500", "600"],
});

export const metadata: Metadata = {
  title: "Shoop!",
  description: "Start shopping today!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={poppins.className}>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            {children}

            <Toaster />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
