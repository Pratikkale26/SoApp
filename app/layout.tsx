import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SoApp',
  description: 'Created with PK',
  icons: './favicon.png',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
