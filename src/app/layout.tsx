import { Metadata } from 'next';

import './globals.css';

import { Inter } from 'next/font/google';

import { AppWrapperProvider } from '@/lib/contexts/App.context';
import { ChakraUIProvider } from '@/lib/contexts/chakra-ui/ChakraUIProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: `Systems Hub`,
  description: `Empowering Businesses through Efficient Information Management`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className} suppressHydrationWarning={true}>
        <AppWrapperProvider>
          <ChakraUIProvider>{children}</ChakraUIProvider>
        </AppWrapperProvider>
      </body>
    </html>
  );
}
