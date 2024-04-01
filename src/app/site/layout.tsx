import { ClerkProvider } from '@clerk/nextjs';
import { ReactNode } from 'react';

import Navbar from '@/components/core/nav/Navbar';

function SiteLayout({ children }: { children: ReactNode }) {
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
      <header>
        <Navbar />
      </header>
      <main>{children}</main>
    </ClerkProvider>
  );
}

export default SiteLayout;
