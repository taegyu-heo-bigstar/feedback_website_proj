// src/app/page.tsx (2일차 최종 복원 코드)
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'
import LogoutButton from '@/components/LogoutButton'
import CreatePost from '@/components/CreatePost'

export const dynamic = 'force-dynamic'

import { redirect } from 'next/navigation'

export default async function Index() {
  const supabase = createServerComponentClient({ cookies })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect('/landing')
  }

  const { data: posts } = await supabase.from('posts').select('*')

  return (
    <div className="w-full flex flex-col items-center">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm text-foreground">
          <div></div>
          <div>
            <div className="flex items-center gap-4">
              Hey, {session.user.email}
              <LogoutButton />
            </div>
          </div>
        </div>
      </nav>

      <div className="animate-in flex flex-col gap-14 opacity-0 max-w-4xl px-3 py-16 lg:py-24 text-foreground">
        // src/app/page.tsx
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
// ... existing code ...
import LogoutButton from '@/components/LogoutButton'
import CreatePost from '@/components/CreatePost'
import ErrorBoundary from '@/components/ErrorBoundary'

export const dynamic = 'force-dynamic'
// ... existing code ...
        <div className="flex flex-col items-center mb-4 lg:mb-12">
          <h1 className="text-4xl font-bold mb-4">Feedback Board</h1>
          <p className="text-lg">Give and receive feedback on any topic.</p>
        </div>

        {/* 로그인한 사용자에게만 글 작성 폼을 보여줍니다. */}
        <ErrorBoundary>
          <CreatePost userId={session.user.id} />
        </ErrorBoundary>

        <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent">
          <div className="flex flex-col gap-4">
            {posts?.map((post) => (
// ... existing code ...
              <Link key={post.id} href={`/post/${post.id}`} className="hover:bg-gray-800/50 block">
                <div className="p-4 border-b border-b-foreground/10">
                    <h3 className="font-bold text-lg">{post.title}</h3>
                    <p className="mt-2 text-sm">{post.content}</p>
                </div>
              </Link>
            ))}
            {posts?.length === 0 && (
                <div className="p-4 text-center text-gray-500">
                    No posts yet. Be the first to create one!
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
