// layout.tsx
import Navbar from './navbar';
import { Providers } from './providers';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-gray-900">
      <body className="h-full">
        <Providers>
          <div className="min-h-full flex flex-col">
            <Navbar />
            <main className="flex-1">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {children}
              </div>
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}