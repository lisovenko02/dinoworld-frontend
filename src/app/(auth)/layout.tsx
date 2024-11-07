'use client'

import Image from 'next/image'
import StoreProvider from '../redux'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <StoreProvider>
      <main className="flex min-h-screen w-full justify-between bg-sky-50">
        {children}
        <div className="flex h-screen w-full sticky top-0 items-center justify-end bg-slate-50 max-lg:hidden">
          <Image
            src="/images/dinoauth.png"
            alt="Auth Image"
            width={500}
            height={600}
            className="h-screen w-screen object-cover"
          />
        </div>
      </main>
    </StoreProvider>
  )
}
