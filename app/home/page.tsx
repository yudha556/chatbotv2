"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import JadwalCard from "./components/jadwalCard"
import TugasCard from "./components/tugasCard"
import ChatInput from "./components/chat/ChatInput"
import ChatMessages from "./components/chat/ChatMessages"

type Message = {
  role: "user" | "assistant" // test
  text: string
}

export default function Home() {
  const [hasChatStarted, setHasChatStarted] = useState<boolean>(false)
  const [messages, setMessages] = useState<Message[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    if (hasChatStarted) {
      scrollToBottom()
    }
  }, [messages, hasChatStarted])

  const handleSend = (text: string) => {
    setMessages((prev) => [...prev, { role: "user", text }])
    setHasChatStarted(true)

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "Oke, aku bantu jawab ya 👀" },
      ])
    }, 1200)
  }

  return (
    <div className="relative flex flex-col h-full">
      <AnimatePresence mode="wait">
        {!hasChatStarted && (
          <motion.div
            className="w-full"
            initial={{ opacity: 1, height: "auto" }}
            exit={{ 
              opacity: 0, 
              height: 0,
              marginBottom: 0,
              transition: { 
                opacity: { duration: 0.3 },
                height: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
              }
            }}
          >
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              <motion.div
                className="flex-1"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -200, opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <JadwalCard />
              </motion.div>

              <motion.div
                className="flex-1"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 200, opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <TugasCard />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className={`w-full mx-auto flex-1 transition-all duration-300 ${
          hasChatStarted ? "max-w-4xl" : "max-w-3xl"
        }`}
        animate={{
          marginBottom: hasChatStarted ? "120px" : "0px"
        }}
        transition={{ duration: 0.3 }}
      >
        <ChatMessages messages={messages} />
        <div ref={messagesEndRef} />
      </motion.div>

      <motion.div
        className={`w-full mx-auto ${
          hasChatStarted
            ? "fixed bottom-0 left-35 right-0 bg-background border-t"
            : "relative"
        }`}
        initial={false}
        animate={{
          y: hasChatStarted ? 0 : -10,
        }}
        transition={{ duration: 0.50, ease: "easeOut" }}
      >
        <div className={`p-4 mx-auto ${hasChatStarted ? "max-w-6xl" : ""}`}>
          <ChatInput onSend={handleSend} />
        </div>
      </motion.div>

    </div>
  )
}
