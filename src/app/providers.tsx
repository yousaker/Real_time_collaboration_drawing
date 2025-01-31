'use client';
import { ClerkProvider } from '@clerk/nextjs';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: '#000000', // لون رئيسي
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
}