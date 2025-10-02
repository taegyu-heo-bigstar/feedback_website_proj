// src/components/CreatePost.tsx
'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function CreatePost({ userId }: { userId: string }) {
  const supabase = createClient()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
// ... existing code ...
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)
    const { error } = await supabase.from('posts').insert({ title, content, user_id: userId })
    setLoading(false)
    if (error) {
      setError(error.message)
// ... existing code ...
