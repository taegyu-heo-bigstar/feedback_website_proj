// src/app/page.jsx
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'
import CreatePost from '@/components/CreatePost.jsx'

export const dynamic = 'force-dynamic'

export default async function Index() {
  const supabase = createServerComponentClient({ cookies })
  const { data: posts } = await supabase.from('posts').select('*')

  return (
    <div className="w-full flex flex-col items-center">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm text-foreground">
          <div></div>
          <div>
            {/* Nickname display can go here later */}
          </div>
        </div>
      </nav>

      <div className="animate-in flex flex-col gap-14 opacity-0 max-w-4xl px-3 py-16 lg:py-24 text-foreground">
        <div className="flex flex-col items-center mb-4 lg:mb-12">
          <h1 className="text-4xl font-bold mb-4">Feedback Board</h1>
          <p className="text-lg">Give and receive feedback on any topic.</p>
        </div>

        <CreatePost />

        <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent">
          <div className="flex flex-col gap-4">
            {posts?.map((post) => (
              <Link
                key={post.id}
                href={`/post/${post.id}`}
                className="block p-4 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <h2 className="text-xl font-semibold">{post.title}</h2>
                <p className="text-sm text-gray-500">by {post.nickname || 'Anonymous'}</p>
              </Link>
            ))}
            {posts?.length === 0 && (
              <div className="text-center text-gray-500">
                <p>아직 게시물이 없습니다.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
