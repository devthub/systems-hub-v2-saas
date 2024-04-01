import { ClerkProvider } from '@clerk/nextjs';
import { ReactNode } from 'react';

function MainLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider
      appearance={{
        layout: {
          socialButtonsPlacement: 'bottom',
          socialButtonsVariant: 'iconButton',
          termsPageUrl: 'https://clerk.com/terms',
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
}

export default MainLayout;
