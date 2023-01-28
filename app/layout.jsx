'use client'

import '../styles/globals.css'
import { SessionProvider } from "next-auth/react"

export default function RootLayout({children, ...props}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.jsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
      <SessionProvider session={props.session}>
        {children}
      </SessionProvider>
      </body>
    </html>
  )
}
