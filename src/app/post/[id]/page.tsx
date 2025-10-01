// src/app/post/[id]/page.tsx
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

// 이 페이지는 잠시 후 만들 피드백 작성 폼입니다.
import CreateFeedback from '@/components/CreateFeedback'

export const dynamic = 'force-dynamic'

type PostPageProps = {
  params: {
    id: string
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const supabase = createServerComponentClient({ cookies })
  
  const { data: post } = await supabase
    .from('posts')
    .select()
    .eq('id', params.id)
    .single()

  const { data: feedbacks } = await supabase
    .from('feedbacks')
    .select()
    .eq('post_id', params.id)

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{post?.title}</h1>
      <p className="mb-8 p-4 border rounded-md">{post?.content}</p>

      <hr className="my-8" />

      {/* 피드백 작성 폼 */}
      <CreateFeedback postId={params.id} />

      {/* 피드백 목록 */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Feedbacks</h2>
        <div className="flex flex-col gap-4">
          {feedbacks?.map((feedback) => (
            <div key={feedback.id} className="p-4 border rounded-md">
              <p>{feedback.content}</p>
            </div>
          ))}
          {feedbacks?.length === 0 && (
            <p className="text-gray-500">No feedbacks yet.</p>
          )}
        </div>
      </div>
    </div>
  )
}
