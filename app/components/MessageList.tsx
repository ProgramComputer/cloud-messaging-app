'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useAuth } from '../contexts/AuthContext'
import { Smile, Plus } from 'lucide-react'
import dynamic from 'next/dynamic'

const Picker = dynamic(() => import('@emoji-mart/react'), { ssr: false })

interface Message {
  id: string
  content: string
  username: string
  createdAt: string
  reactions: { [key: string]: string[] }
}

interface MessageListProps {
  messages: Message[]
  room: string
  onReaction: (messageId: string, emoji: string) => void
}

export default function MessageList({ messages, room, onReaction }: MessageListProps) {
  const { user } = useAuth()
  const [showEmojiPicker, setShowEmojiPicker] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleEmojiSelect = (messageId: string, emoji: any) => {
    onReaction(messageId, emoji.native)
    setShowEmojiPicker(null)
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="flex-grow overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <Card key={message.id}>
          <CardContent className="p-4">
            <p className="font-semibold">{message.username}</p>
            <p>{message.content}</p>
            <p className="text-sm text-muted-foreground">
              {new Date(message.createdAt).toLocaleString()}
            </p>
            <div className="mt-2 flex flex-wrap gap-2 items-center">
              {Object.entries(message.reactions).map(([emoji, users]) => (
                <Popover key={emoji}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="px-2 py-0 h-6">
                      {emoji} <span className="ml-1 text-xs">{users.length}</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-2">
                    <p className="text-sm">Reacted by: {users.join(', ')}</p>
                  </PopoverContent>
                </Popover>
              ))}
              <Popover open={showEmojiPicker === message.id} onOpenChange={(open) => setShowEmojiPicker(open ? message.id : null)}>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="px-2 py-0 h-6">
                    <Plus className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  {mounted && (
                    <Picker
                      data={async () => {
                        const response = await fetch(
                          'https://cdn.jsdelivr.net/npm/@emoji-mart/data'
                        )
                        return response.json()
                      }}
                      onEmojiSelect={(emoji: any) => handleEmojiSelect(message.id, emoji)}
                    />
                  )}
                </PopoverContent>
              </Popover>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

