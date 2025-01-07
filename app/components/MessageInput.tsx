'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useAuth } from '../contexts/AuthContext'

interface MessageInputProps {
  room: string
  onSendMessage: (room: string, content: string) => void
}

export default function MessageInput({ room, onSendMessage }: MessageInputProps) {
  const [message, setMessage] = useState('')
  const { user } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() && user) {
      onSendMessage(room, message.trim())
      setMessage('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-muted">
      <div className="flex space-x-2">
        <Input
          placeholder={`Message #${room}`}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-grow"
        />
        <Button type="submit">Send</Button>
      </div>
    </form>
  )
}

