"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Bot,
  User,
  Sparkles,
  ShieldCheck,
  RefreshCw
} from "lucide-react";
import { ChatMessage, askJanSetuCopilot } from "@/lib/bedrock/bedrockClient";

export const AiCopilotTab: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hello! I am your JanSetu AI Civic Copilot, powered by AWS Bedrock architecture. Ask me anything about scholarship eligibility rules, certificate prerequisites, NPCI bank seeding, or offline counters. You can also tap the microphone to speak your question!",
    },
  ]);
  const [inputQuery, setInputQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [modelSource, setModelSource] = useState<string>("AWS Bedrock / Zero-Fail RAG");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Initialize Speech Recognition if supported
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = "en-IN";

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setInputQuery(transcript);
          setIsListening(false);
        };

        recognition.onerror = () => {
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      }
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in your current browser. Please type your query.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.lang = "en-IN";
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.error("Speech recognition error:", err);
      }
    }
  };

  const handleSpeak = (text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      alert("Text to speech is not supported in your browser.");
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    // Clean markdown stars from speech text
    const cleanText = text.replace(/[*#_`]/g, "");
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = "en-IN";
    utterance.rate = 0.95;

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
    };

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputQuery;
    if (!textToSend.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: "user", content: textToSend };
    setMessages((prev) => [...prev, userMessage]);
    if (!customText) setInputQuery("");
    setIsLoading(true);

    try {
      const response = await askJanSetuCopilot(textToSend, messages, "en");
      setModelSource(response.source === "AWS_BEDROCK_LIVE" ? response.modelUsed : "JanSetu-Civic-RAG (LocalStack/Zero-Fail)");

      const assistantMessage: ChatMessage = {
        role: "assistant",
        content: response.answer,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered a network issue while consulting the knowledge base. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const quickPrompts = [
    "Why is NPCI Aadhaar seeding different from normal linking?",
    "What is the maximum income limit for Post-Matric ST scholarship?",
    "How much fee can a CSC center legally charge for certificates?",
    "How to fix name mismatch between Aadhaar and 10th marksheet?",
  ];

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-[#142A6F] bg-gradient-to-r from-[#0B1B4F] via-[#0C1B4A] to-[#040B22] p-6 text-white shadow-luxury">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#F5E29F] font-display">
            <Sparkles className="size-4" />
            Amazon Bedrock Conversational Copilot
          </div>
          <h3 className="mt-1 text-xl font-bold tracking-tight font-serif">
            Voice & Text Enabled Civic Assistant
          </h3>
          <p className="mt-1 text-xs text-slate-300">
            Citing official Ministry of Tribal Affairs & Social Justice gazettes. Zero hallucinations.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-1.5 font-mono text-xs text-emerald-300 border border-white/10">
          <ShieldCheck className="size-3.5 text-emerald-400" />
          <span>Active Engine: {modelSource}</span>
        </div>
      </div>

      {/* Chat Messages Box */}
      <div className="rounded-2xl border border-[#EDE6DD] bg-white p-4 sm:p-6 shadow-luxury min-h-[480px] flex flex-col justify-between">
        <div className="space-y-4 overflow-y-auto max-h-[500px] pr-2">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex gap-3 ${
                m.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {m.role === "assistant" && (
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-[#0B1B4F] to-[#152864] text-[#F5E29F] shadow-xs">
                  <Bot className="size-4" />
                </div>
              )}

              <div
                className={`rounded-2xl p-4 max-w-[85%] text-xs sm:text-sm leading-relaxed ${
                  m.role === "user"
                    ? "bg-[#0B1B4F] text-white shadow-xs"
                    : "bg-[#FAF7F2] text-slate-800 border border-[#EDE6DD]"
                }`}
              >
                <div className="whitespace-pre-line">{m.content}</div>

                {m.role === "assistant" && (
                  <div className="mt-3 flex items-center justify-between border-t border-[#EDE6DD] pt-2 text-[11px] text-slate-500">
                    <span className="font-mono text-[10px] text-[#854D0E] font-bold">JanSetu AWS Copilot</span>
                    <button
                      onClick={() => handleSpeak(m.content)}
                      className="flex items-center gap-1 text-[#0B1B4F] hover:text-[#854D0E] font-bold transition-colors cursor-pointer"
                      title="Read aloud"
                    >
                      {isSpeaking ? (
                        <>
                          <VolumeX className="size-3.5" />
                          <span>Stop</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="size-3.5" />
                          <span>Listen (Read Aloud)</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>

              {m.role === "user" && (
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#0B1B4F] text-[#F5E29F] shadow-xs">
                  <User className="size-4" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 justify-start items-center text-xs text-slate-500">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#0B1B4F] text-[#F5E29F] animate-pulse">
                <Bot className="size-4" />
              </div>
              <div className="rounded-2xl bg-[#FAF7F2] p-4 border border-[#EDE6DD] flex items-center gap-2">
                <RefreshCw className="size-3.5 animate-spin text-[#854D0E]" />
                <span className="font-medium text-slate-700">Consulting official gazette database & Cedar policies...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Bottom Input & Quick Prompts Area */}
        <div className="mt-4 border-t border-[#EDE6DD] pt-4">
          {/* Quick Prompt Pills */}
          <div className="mb-3 flex flex-wrap gap-1.5">
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(prompt)}
                className="rounded-full border border-[#EDE6DD] bg-[#FAF7F2] px-3 py-1 text-[11px] text-slate-700 hover:border-[#DFC8A5] hover:bg-[#F4ECE1] hover:text-[#0B1B4F] transition-all text-left cursor-pointer"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Bar with Voice Toggle */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleListening}
              className={`rounded-xl p-2.5 transition-all cursor-pointer ${
                isListening
                  ? "bg-rose-600 text-white animate-pulse shadow-md shadow-rose-500/30"
                  : "border border-[#DACBB8] bg-[#FAF7F2] text-[#854D0E] hover:bg-[#F4ECE1]"
              }`}
              title={isListening ? "Listening... click to stop" : "Click to speak your question"}
            >
              {isListening ? <MicOff className="size-4" /> : <Mic className="size-4" />}
            </button>

            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                isListening
                  ? "Listening to your voice..."
                  : "Ask about scholarships, documents, or NPCI bank seeding..."
              }
              className="flex-1 rounded-xl border border-[#EDE6DD] bg-white px-4 py-2.5 text-xs sm:text-sm text-slate-900 focus:border-[#DFB738] focus:ring-2 focus:ring-[#DFB738]/20 focus:outline-hidden"
            />

            <button
              type="button"
              onClick={() => handleSendMessage()}
              disabled={isLoading || !inputQuery.trim()}
              className="flex items-center gap-1.5 rounded-xl bg-[#0B1B4F] px-5 py-2.5 text-xs sm:text-sm font-bold text-[#F5E29F] shadow-xs hover:bg-[#071233] disabled:opacity-50 transition-all cursor-pointer border border-[#142A6F]"
            >
              <span>Ask</span>
              <Send className="size-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
