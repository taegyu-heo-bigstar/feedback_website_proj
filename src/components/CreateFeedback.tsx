// src/components/CreateFeedback.tsx
'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

interface CreateFeedbackProps {
  postId: string
}

export default function CreateFeedback({ postId }: CreateFeedbackProps) {
  const supabase = createClient()
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)
    const { error } = await supabase.from('feedbacks').insert({ content, post_id: postId })
    setLoading(false)
    if (error) {
      setError(error.message)
    } else {
      setContent('')
      setSuccess(true)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 border rounded-md mb-8">
      <h2 className="text-xl font-bold">피드백 작성</h2>
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
