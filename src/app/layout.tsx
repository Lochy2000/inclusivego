import type { Metadata } from 'next';
import { AccessibilityProvider } from '@/features/settings';
import { RequirementProvider } from '@/features/requirements';
import { RouteProvider } from '@/features/routes';
import { APP_NAME, APP_DESCRIPTION } from '@/lib/constants';
import './globals.css';

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AccessibilityProvider>
          <RequirementProvider>
            <RouteProvider>
              {children}
            </RouteProvider>
          </RequirementProvider>
        </AccessibilityProvider>
      </body>
    </html>
  );
}
