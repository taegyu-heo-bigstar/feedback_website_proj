// src/app/login/page.tsx
'use client'

import { createClient } from '@/lib/supabase/client'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useRouter } from 'next/navigation'
import { AuthChangeEvent } from '@supabase/supabase-js'

export default function LoginPage() {
  const supabase = createClient()
  const router = useRouter()

  supabase.auth.onAuthStateChange((event: AuthChangeEvent) => {
    if (event === 'SIGNED_IN') {
      router.push('/')
      router.refresh()
    }
  })

  // 'location.origin' 대신 환경 변수를 사용하도록 수정했습니다.
  const redirectUrl = process.env.NEXT_PUBLIC_SITE_URL ? `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback` : '/auth/callback';

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ width: '320px' }}>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
          providers={['github']}
          redirectTo={redirectUrl}
        />
      </div>
    </div>
  )
}


