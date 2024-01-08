import 'dotenv/config';
import Head from 'next/head';
import type { Metadata } from 'next'
import { ThemeProvider } from '../site-ui/theme/ThemeProvider';
import { ImagineContextProviders, LoadingScreen } from '@imagine-cms/web'
import { SiteBody } from '../site-ui/components/site-body/SiteBody.styled';
import { SiteContainer } from '../site-ui/components/site-container/SiteContainer';
import { UsersOnlineContextProvider, WebsocketContextProvider } from '@imagine-cms/websocket'

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
      <Head>
        <link rel="stylesheet" href="/css/fontawesome.css" />
        <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
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
