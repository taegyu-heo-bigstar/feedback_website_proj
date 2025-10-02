// src/components/CreateFeedback.jsx
'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function CreateFeedback({ postId }) {
  const supabase = createClient()
  const router = useRouter()
  const [content, setContent] = useState('')
  const [nickname, setNickname] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)
    const { error } = await supabase.from('feedbacks').insert({ content, post_id: postId, nickname })
    setLoading(false)
    if (error) {
      setError(error.message)
    } else {
      setContent('')
      setNickname('')
      setSuccess(true)
      // 페이지를 새로고침하는 대신 router.refresh()를 사용하여 데이터를 갱신합니다.
      router.refresh()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 border rounded-md mb-8">
      <h2 className="text-xl font-bold">피드백 작성</h2>
      <input
        type="text"
        placeholder="닉네임"
        value={nickname}
        onChange={e => setNickname(e.target.value)}
        className="border p-2 rounded"
        required
      />
      <textarea
        placeholder="피드백 내용을 입력하세요"
        value={content}
        onChange={e => setContent(e.target.value)}
        className="border p-2 rounded"
        required
      />
      {error && <div className="text-red-500 text-sm">{error}</div>}
      {success && <div className="text-green-500 text-sm">피드백이 등록되었습니다!</div>}
      <button
        type="submit"
        className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? '등록 중...' : '등록'}
      </button>
    </form>
  )
}
