// src/app/login/page.tsx
'use client'

import { createClient } from '@/lib/supabase/client'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const supabase = createClient()
  const router = useRouter()

  supabase.auth.onAuthStateChange((event) => {
    if (event === 'SIGNED_IN') {
      router.push('/')
      router.refresh()
    }
  })

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ width: '320px' }}>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
          providers={['github']} // 다른 로그인 옵션(google 등)을 추가할 수 있습니다.
          redirectTo={`${location.origin}/auth/callback`}
        />
      </div>
    </div>
  )
}
