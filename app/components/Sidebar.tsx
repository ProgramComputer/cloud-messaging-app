'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useAuth } from '../contexts/AuthContext'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronDown, ChevronRight, Hash, User } from 'lucide-react'

interface SidebarProps {
  currentRoom: string
  setCurrentRoom: (room: string) => void
  onLogout: () => void
}

const rooms = ['general', 'random', 'work']
const directMessages = ['Alice', 'Bob', 'Charlie']

export default function Sidebar({ currentRoom, setCurrentRoom, onLogout }: SidebarProps) {
  const { user } = useAuth()
  const [isChannelsOpen, setIsChannelsOpen] = useState(true)
  const [isDMsOpen, setIsDMsOpen] = useState(true)

  return (
    <div className="w-64 bg-secondary p-4 flex flex-col h-full">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Welcome, {user?.username}</h2>
        <p className="text-sm text-muted-foreground">Role: {user?.role}</p>
      </div>
      <nav className="space-y-2 flex-grow">
        <Collapsible
          open={isChannelsOpen}
          onOpenChange={setIsChannelsOpen}
          className="space-y-2"
        >
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between">
              <span>Channels</span>
              {isChannelsOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-1">
            {rooms.map((room) => (
              <Button
                key={room}
                variant={currentRoom === room ? 'secondary' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setCurrentRoom(room)}
              >
                <Hash className="mr-2 h-4 w-4" />
                {room}
              </Button>
            ))}
          </CollapsibleContent>
        </Collapsible>
        
        <Collapsible
          open={isDMsOpen}
          onOpenChange={setIsDMsOpen}
          className="space-y-2"
        >
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between">
              <span>Direct Messages</span>
              {isDMsOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-1">
            {directMessages.map((dm) => (
              <Button
                key={dm}
                variant={currentRoom === dm ? 'secondary' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setCurrentRoom(dm)}
              >
                <User className="mr-2 h-4 w-4" />
                {dm}
              </Button>
            ))}
          </CollapsibleContent>
        </Collapsible>
      </nav>
      <Button variant="outline" onClick={onLogout}>Logout</Button>
    </div>
  )
}

