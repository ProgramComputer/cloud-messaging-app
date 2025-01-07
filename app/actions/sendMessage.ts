'use server'

import { v4 as uuidv4 } from 'uuid'
import { pusherServer } from '../lib/pusher'

export async function sendMessage(username: string, content: string) {
  const message = {
    id: uuidv4(),
    content,
    username,
    createdAt: new Date().toISOString(),
  }

  await pusherServer.trigger('chat', 'new-message', message)

  // In a real app, you'd save the message to a database here
  console.log('New message:', message)

  return message
}

