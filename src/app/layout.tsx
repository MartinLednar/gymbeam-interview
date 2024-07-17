import "./globals.css";
import Navbar from "@/components/navbar/navbar.component";
import { QueryClientProvider } from "@/components/wrappers/queryClient/queryClient.wrapper";
import { ToasterProvider } from "@/components/wrappers/toast/toast.wrapper";
import { ThemeProvider } from "@/components/wrappers/nextTheme/nextTheme.wrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <QueryClientProvider>
          <ThemeProvider attribute="class">
            <Navbar />
            {children}
            <ToasterProvider />
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
