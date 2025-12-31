"use client"

import { useState, KeyboardEvent } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { Paperclip, Image, FileText, Send } from "lucide-react"

interface ChatInputProps {
  onSend: (message: string) => void
}

export default function ChatInput({ onSend }: ChatInputProps) {
  const [message, setMessage] = useState<string>("")

  const handleSend = (): void => {
    if (!message.trim()) return
    onSend(message)
    setMessage("")
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="relative w-full">
      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Tanya apa aja ke sini..."
        className="resize-none min-h-[90px] pr-24 pb-12"
      />

      {/* Attach dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute bottom-2 left-2"
          >
            <Paperclip className="w-5 h-5" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start">
          <DropdownMenuItem>
            <Image className="mr-2 h-4 w-4" />
            Gambar
          </DropdownMenuItem>
          <DropdownMenuItem>
            <FileText className="mr-2 h-4 w-4" />
            Dokumen
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Send */}
      <Button
        size="icon"
        className="absolute bottom-2 right-2"
        onClick={handleSend}
        disabled={!message.trim()}
      >
        <Send className="w-5 h-5" />
      </Button>
    </div>
  )
}
