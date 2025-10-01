// src/components/LogoutButton.tsx
'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function LogoutButton() {
  const supabase = createClient()
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/landing')
    router.refresh()
  }

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700"
    >
      로그아웃
    </button>
  )
}
