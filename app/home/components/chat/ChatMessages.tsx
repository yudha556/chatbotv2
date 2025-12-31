import { motion } from "framer-motion"

interface ChatMessage {
  role: "user" | "assistant"
  text: string
}

interface ChatMessagesProps {
  messages: ChatMessage[]
}

export default function ChatMessages({ messages }: ChatMessagesProps) {
  return (
    <div className="flex flex-col gap-3 mb-4">
      {messages.map((msg, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className={`max-w-[75%] px-4 py-2 rounded-xl text-sm leading-relaxed ${
            msg.role === "user"
              ? "ml-auto bg-primary text-primary-foreground"
              : "bg-muted"
          }`}
        >
          {msg.text}
        </motion.div>
      ))}
    </div>
  )
}
