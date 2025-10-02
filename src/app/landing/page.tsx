// src/app/landing/page.tsx
'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LandingPage() {
  const router = useRouter()
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-100 to-blue-300 dark:from-gray-900 dark:to-gray-800">
      <div className="bg-white dark:bg-gray-900 p-8 rounded shadow w-96 flex flex-col gap-6 items-center">
        <h1 className="text-3xl font-bold mb-2">피드백 게시판</h1>
        <p className="text-lg mb-4 text-center">로그인 또는 회원가입 후 피드백을 남겨보세요!</p>
        <div className="flex gap-4 w-full">
          <Link href="/login">
            <button className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
              로그인
            </button>
          </Link>
          <Link href="/signup">
            <button className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700">
              회원가입
            </button>
          </Link>
          <Link href="/guest-session">
            <button className="flex-1 bg-gray-600 text-white py-2 rounded hover:bg-gray-700">
              비회원 접속
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
