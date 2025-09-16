"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Mic, MicOff, Send, Bot, User, Volume2 } from "lucide-react"

interface Message {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
}

interface VoiceChatbotProps {
  language: "hi" | "en" | "bn" | "te" | "ta" | "mr" | "gu" | "kn"
}

export default function VoiceChatbot({ language }: VoiceChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [recognition, setRecognition] = useState<any | null>(null)
  const [synthesis, setSynthesis] = useState<SpeechSynthesis | null>(null)
  const [speechSupported, setSpeechSupported] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)

  // 🎤 Setup SpeechRecognition + SpeechSynthesis
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognitionAPI =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition

      if (SpeechRecognitionAPI) {
        try {
          const recognitionInstance = new SpeechRecognitionAPI()
          recognitionInstance.continuous = false
          recognitionInstance.interimResults = false

          const langMap: Record<string, string> = {
            hi: "hi-IN",
            en: "en-US",
            bn: "bn-BD",
            te: "te-IN",
            ta: "ta-IN",
            mr: "mr-IN",
            gu: "gu-IN",
            kn: "kn-IN",
          }
          recognitionInstance.lang = langMap[language] || "en-US"

          recognitionInstance.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript
            setInputValue(transcript)
            setIsListening(false)
            sendMessage(transcript) // auto-send after speaking
          }

          recognitionInstance.onerror = () => setIsListening(false)
          recognitionInstance.onend = () => setIsListening(false)

          setRecognition(recognitionInstance)
          setSpeechSupported(true)
        } catch {
          setSpeechSupported(false)
        }
      } else {
        setSpeechSupported(false)
      }

      if (window.speechSynthesis) {
        setSynthesis(window.speechSynthesis)
      }
    }
  }, [language])

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // ----------------- SEND MESSAGE -----------------
  const sendMessage = async (messageText?: string) => {
    const text = messageText || inputValue
    if (!text.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: text,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    let aiResponse = ""

    try {
      if (text.toLowerCase().includes("fertilizer")) {
        const res = await fetch("http://localhost:8000/predict-fertilizer", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            state: "Bihar",
            temperature: 30,
            humidity: 60,
            moisture: 40,
            crop_type: "Maize",
          }),
        })
        const data = await res.json()
        aiResponse = `Recommended Fertilizer: ${data.fertilizer}`
      } else if (text.toLowerCase().includes("yield")) {
        const res = await fetch("http://localhost:8000/predict-yield", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            state: "Andaman and Nicobar Islands",
            district: "NICOBARS",
            year: 2025,
            season: "Rabi",
            crop: "Rice",
            area: 40,
          }),
        })
        const data = await res.json()
        aiResponse = `Predicted Yield: ${data.yield.toFixed(
          2
        )} tons/ha, Production: ${data.production.toFixed(2)} tons`
      } else {
        aiResponse = "I'm here to help with farming queries."
      }
    } catch (err) {
      aiResponse = "⚠️ Error connecting to backend."
    }

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: "bot",
      content: aiResponse,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, botMessage])
    setIsLoading(false)

    // 🔊 Speak AI response
    if (synthesis) {
      const utterance = new SpeechSynthesisUtterance(aiResponse)
      const langMap: Record<string, string> = {
        hi: "hi-IN",
        en: "en-US",
        bn: "bn-BD",
        te: "te-IN",
        ta: "ta-IN",
        mr: "mr-IN",
        gu: "gu-IN",
        kn: "kn-IN",
      }
      utterance.lang = langMap[language] || "en-US"
      utterance.rate = 0.9
      synthesis.speak(utterance)
    }
  }

  // 🎤 Toggle mic
  const toggleVoiceRecognition = () => {
    if (!recognition || !speechSupported) return
    if (isListening) {
      recognition.stop()
      setIsListening(false)
    } else {
      try {
        recognition.start()
        setIsListening(true)
      } catch {
        setIsListening(false)
      }
    }
  }

  return (
    <Card className="h-[500px] flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          Farm Assistant
          {!speechSupported && (
            <span className="text-xs text-muted-foreground ml-2">(Text only)</span>
          )}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col gap-4">
        {/* Messages */}
        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.type === "bot" && (
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <Bot className="h-4 w-4 text-primary-foreground" />
                  </div>
                )}

                <div
                  className={`max-w-[80%] rounded-lg px-3 py-2 ${
                    message.type === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  {message.type === "bot" && synthesis && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 mt-1 hover:bg-transparent"
                      onClick={() => {
                        const utterance = new SpeechSynthesisUtterance(message.content)
                        utterance.lang = "en-US"
                        utterance.rate = 0.9
                        synthesis.speak(utterance)
                      }}
                    >
                      <Volume2 className="h-3 w-3" />
                    </Button>
                  )}
                </div>

                {message.type === "user" && (
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                    <User className="h-4 w-4 text-secondary-foreground" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-primary-foreground" />
                </div>
                <div className="bg-muted rounded-lg px-3 py-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={isListening ? "Listening..." : "Type your question..."}
            disabled={isListening}
          />
          <Button
            onClick={toggleVoiceRecognition}
            variant={isListening ? "destructive" : "outline"}
            size="icon"
            disabled={!speechSupported}
            title={!speechSupported ? "Speech recognition not supported in this browser" : ""}
          >
            {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </Button>
          <Button onClick={() => sendMessage()} disabled={!inputValue.trim() || isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
