import { NextResponse } from 'next/server'

// In a real app, you'd fetch this from a database
const messages = [
  {
    id: '1',
    content: 'Welcome to the chat!',
    username: 'System',
    createdAt: new Date().toISOString(),
  },
]

export async function GET() {
  return NextResponse.json(messages)
}

