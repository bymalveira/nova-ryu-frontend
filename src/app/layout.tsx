import { QueryProvider } from '@/providers/QueryProvider';
import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import "./globals.css";
import "./fonts.css";
import { Toaster } from 'sonner';
import { AuthProvider } from '@/context/AuthContext';


export const metadata: Metadata = {
  title: "Nova Ryu",
  description: "Escola de artes marciais tradicionais."
}


const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair', 
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans">
        <Toaster position="top-right" richColors />
        <QueryProvider>
            <AuthProvider>
              {children}
            </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}