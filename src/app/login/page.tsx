// src/app/login/page.tsx
'use client'

import { createClient } from '@/lib/supabase/client'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useRouter } from 'next/navigation'
import { AuthChangeEvent } from '@supabase/supabase-js' // 이 줄이 추가되었습니다!

export default function LoginPage() {
  const supabase = createClient()
  const router = useRouter()

  // event에 AuthChangeEvent 라는 이름표(타입)를 붙여주었습니다.
  supabase.auth.onAuthStateChange((event: AuthChangeEvent) => {
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
          providers={['github']}
          redirectTo={`${location.origin}/auth/callback`}
        />
      </div>
    </div>
  )
}

