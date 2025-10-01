// src/components/CreatePost.tsx
'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function CreatePost() {
  const supabase = createClient()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)
    const { error } = await supabase.from('posts').insert({ title, content })
    setLoading(false)
    if (error) {
      setError(error.message)
    } else {
      setTitle('')
      setContent('')
      setSuccess(true)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 border rounded-md mb-8">
      <h2 className="text-xl font-bold">글 작성</h2>
      <input
        type="text"
        placeholder="제목"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="border p-2 rounded"
        required
      />
      <textarea
        placeholder="내용"
        value={content}
        onChange={e => setContent(e.target.value)}
        className="border p-2 rounded"
        required
      />
      {error && <div className="text-red-500 text-sm">{error}</div>}
      {success && <div className="text-green-500 text-sm">글이 등록되었습니다!</div>}
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
