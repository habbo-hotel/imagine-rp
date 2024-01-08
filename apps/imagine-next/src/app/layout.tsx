import 'dotenv/config';
import type { Metadata } from 'next'
import { ImagineContextProviders, LoadingScreen } from '@imagine-cms/web'
import { UsersOnlineContextProvider, WebsocketContextProvider } from '@imagine-cms/websocket'
import { SiteBody } from '../site-ui/components/site-body/SiteBody.styled';
import { SiteContainer } from '../site-ui/components/site-container/SiteContainer';
import { ThemeProvider } from '../site-ui/theme/ThemeProvider';

export const metadata: Metadata = {
  title: 'Imagine',
  description: 'By LeChris',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ImagineContextProviders loadingScreen={<LoadingScreen />}>
          <WebsocketContextProvider>
            <UsersOnlineContextProvider>
              <ThemeProvider>
                <SiteBody />
                <SiteContainer>

                  {children}
                </SiteContainer>
              </ThemeProvider>
            </UsersOnlineContextProvider>
          </WebsocketContextProvider>
        </ImagineContextProviders>
      </body>
    </html>
  )
}
