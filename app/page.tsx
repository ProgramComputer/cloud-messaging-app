import { Suspense } from 'react'
import LoginForm from './components/LoginForm'
import ChatInterface from './components/ChatInterface'

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <header className="bg-primary text-primary-foreground p-4">
        <h1 className="text-2xl font-bold">ChatGenius</h1>
      </header>
      <Suspense fallback={<div>Loading...</div>}>
        <ChatInterface />
      </Suspense>
    </div>
  )
}

