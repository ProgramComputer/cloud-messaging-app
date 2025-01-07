'use client'

import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import LoginForm from './LoginForm'
import Sidebar from './Sidebar'
import MessageList from './MessageList'
import MessageInput from './MessageInput'

interface Message {
  id: string
  content: string
  username: string
  createdAt: string
  reactions: { [key: string]: string[] }
}

export default function ChatInterface() {
  const { user, logout } = useAuth()
  const [currentRoom, setCurrentRoom] = useState('general')
  const [messages, setMessages] = useState<{ [room: string]: Message[] }>({
    general: [
      {
        id: '1',
        content: 'Welcome to the general channel!',
        username: 'System',
        createdAt: new Date().toISOString(),
        reactions: {},
      },
    ],
    random: [
      {
        id: '2',
        content: 'Welcome to the random channel!',
        username: 'System',
        createdAt: new Date().toISOString(),
        reactions: {},
      },
    ],
    work: [
      {
        id: '3',
        content: 'Welcome to the work channel!',
        username: 'System',
        createdAt: new Date().toISOString(),
        reactions: {},
      },
    ],
    Alice: [
      {
        id: '4',
        content: 'Hey there!',
        username: 'Alice',
        createdAt: new Date().toISOString(),
        reactions: {},
      },
    ],
    Bob: [
      {
        id: '5',
        content: 'How are you doing?',
        username: 'Bob',
        createdAt: new Date().toISOString(),
        reactions: {},
      },
    ],
    Charlie: [
      {
        id: '6',
        content: 'Nice to meet you!',
        username: 'Charlie',
        createdAt: new Date().toISOString(),
        reactions: {},
      },
    ],
  })

  const addMessage = (room: string, content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      username: user!.username,
      createdAt: new Date().toISOString(),
      reactions: {},
    }
    setMessages(prevMessages => ({
      ...prevMessages,
      [room]: [...(prevMessages[room] || []), newMessage],
    }))
  }

  const handleReaction = (messageId: string, emoji: string) => {
    setMessages(prevMessages => {
      const updatedMessages = [...prevMessages[currentRoom]]
      const messageIndex = updatedMessages.findIndex(m => m.id === messageId)
      if (messageIndex !== -1) {
        const message = updatedMessages[messageIndex]
        const updatedReactions = { ...message.reactions }
        if (!updatedReactions[emoji]) {
          updatedReactions[emoji] = []
        }
        if (!updatedReactions[emoji].includes(user!.username)) {
          updatedReactions[emoji] = [...updatedReactions[emoji], user!.username]
        } else {
          updatedReactions[emoji] = updatedReactions[emoji].filter(u => u !== user!.username)
        }
        if (updatedReactions[emoji].length === 0) {
          delete updatedReactions[emoji]
        }
        updatedMessages[messageIndex] = { ...message, reactions: updatedReactions }
      }
      return { ...prevMessages, [currentRoom]: updatedMessages }
    })
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-full">
        <LoginForm />
      </div>
    )
  }

  const isDirectMessage = !['general', 'random', 'work'].includes(currentRoom)

  return (
    <div className="flex h-full">
      <Sidebar currentRoom={currentRoom} setCurrentRoom={setCurrentRoom} onLogout={logout} />
      <div className="flex-grow flex flex-col">
        <div className="bg-background p-2 border-b">
          <h2 className="text-lg font-semibold">
            {isDirectMessage ? `Chat with ${currentRoom}` : `#${currentRoom}`}
          </h2>
        </div>
        <MessageList 
          messages={messages[currentRoom] || []} 
          room={currentRoom} 
          onReaction={handleReaction}
        />
        <MessageInput room={currentRoom} onSendMessage={addMessage} />
      </div>
    </div>
  )
}

