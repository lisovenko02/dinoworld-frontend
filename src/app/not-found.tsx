'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function NotFound() {
  const router = useRouter()

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100 text-center px-4 relative">
      <button
        onClick={() => router.back()}
        className="absolute top-10 left-10 flex items-center text-blue-500 hover:text-blue-600"
      >
        <ArrowLeft size={20} />
        <span className="ml-1">Go Back</span>
      </button>

      <div className="relative w-64 h-64 md:w-80 md:h-80 mb-8">
        <Image
          src="/images/notFounds.png"
          alt="Page not found"
          fill
          style={{ objectFit: 'contain' }}
        />
      </div>
      <h1 className="text-2xl md:text-4xl font-semibold text-gray-700 mb-4">
        Oops! Page Not Found
      </h1>
      <p className="text-gray-500 mb-6">
        The page you are looking for does not exist or has been moved.
      </p>

      <Link
        href="/market"
        className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition duration-300"
      >
        Back to Home
      </Link>
    </div>
  )
}
