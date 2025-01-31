import { ClerkProvider } from '@clerk/nextjs';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: '#FF5733', // Orange vif
          colorBackground: '#F3F4F6', // Fond gris clair
          // Texte sombre
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
}
