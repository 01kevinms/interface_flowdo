// app/layout.tsx
import { ThemeProvider } from "../components/theme/AuthTheme";
import { ReactQueryProvider } from "../providers/reac-query";
import { AuthProvider } from "../services/auth.guard";
import "./globals.css";


export const metadata = {
  title: "Flow do",
  description: "Criado com Next.js",
  icons: "/icon.png?v=1",
  other: [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "true" },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Poppins:wght@100;400;700&display=swap",
    },
  ],
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="dark">
      <body className="bg-zinc-50 dark:bg-black text-zinc-900 dark:text-white font-sans">
        <ThemeProvider>
          <ReactQueryProvider>
            <AuthProvider>{children}</AuthProvider>
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}