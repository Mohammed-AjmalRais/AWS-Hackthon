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

    const cleanText = text.replace(/[*_#`]/g, "");
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = "en-IN";
    utterance.rate = 0.95;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const handleSendMessage = async (queryToSend?: string) => {
    const query = queryToSend || inputQuery;
    if (!query.trim() || isLoading) return;

    const newMessages: ChatMessage[] = [...messages, { role: "user", content: query }];
    setMessages(newMessages);
    setInputQuery("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query,
          history: newMessages.slice(-5),
          language: "en",
        }),
      });

      const data = await res.json();
      if (data.success) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.answer },
        ]);
        setModelSource(data.source === "AWS_BEDROCK_LIVE" ? "Amazon Bedrock (Claude 3.5)" : "Zero-Fail Civic RAG");
      } else {
        throw new Error(data.error);
      }
    } catch (err) {
      // Fallback
      const fallbackResponse = await askJanSetuCopilot(query, newMessages, "en");
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: fallbackResponse.answer },
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
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950 p-6 text-white shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-orange-400">
            <Sparkles className="size-4" />
            Amazon Bedrock Conversational Copilot
          </div>
          <h3 className="mt-1 text-xl font-bold tracking-tight">
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
      <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-xs min-h-[480px] flex flex-col justify-between">
        <div className="space-y-4 overflow-y-auto max-h-[500px] pr-2">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex gap-3 ${
                m.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {m.role === "assistant" && (
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-orange-600 text-white shadow-xs">
                  <Bot className="size-4" />
                </div>
              )}

              <div
                className={`rounded-2xl p-4 max-w-[85%] text-xs sm:text-sm leading-relaxed ${
                  m.role === "user"
                    ? "bg-orange-600 text-white"
                    : "bg-slate-50 text-slate-800 border border-slate-200/80"
                }`}
              >
                <div className="whitespace-pre-line">{m.content}</div>

                {m.role === "assistant" && (
                  <div className="mt-3 flex items-center justify-between border-t border-slate-200/60 pt-2 text-[11px] text-slate-400">
                    <span className="font-mono text-[10px]">JanSetu AWS Copilot</span>
                    <button
                      onClick={() => handleSpeak(m.content)}
                      className="flex items-center gap-1 text-orange-600 hover:text-orange-800 font-medium transition-colors cursor-pointer"
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
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-slate-800 text-white shadow-xs">
                  <User className="size-4" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 justify-start items-center text-xs text-slate-500">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-orange-600 text-white animate-pulse">
                <Bot className="size-4" />
              </div>
              <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200/80 flex items-center gap-2">
                <RefreshCw className="size-3.5 animate-spin text-orange-600" />
                <span>Consulting official gazette database & Cedar policies...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Bottom Input & Quick Prompts Area */}
        <div className="mt-4 border-t border-slate-100 pt-4">
          {/* Quick Prompt Pills */}
          <div className="mb-3 flex flex-wrap gap-1.5">
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(prompt)}
                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] text-slate-700 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-800 transition-all text-left cursor-pointer"
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
                  : "border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-orange-600"
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
              className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-xs sm:text-sm text-slate-900 focus:border-orange-500 focus:outline-hidden"
            />

            <button
              type="button"
              onClick={() => handleSendMessage()}
              disabled={isLoading || !inputQuery.trim()}
              className="flex items-center gap-1.5 rounded-xl bg-orange-600 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-xs hover:bg-orange-700 disabled:opacity-50 transition-all cursor-pointer"
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
