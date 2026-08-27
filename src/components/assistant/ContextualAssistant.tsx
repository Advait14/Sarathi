"use client";

import { useState, useEffect, useRef } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Heading, Text } from "@/components/ui/Text";
import {
  ShieldIcon,
  InfoIcon,
  ArrowRightIcon,
  UserIcon,
} from "@/components/ui/Icons";
import {
  stateContextMap,
  generateAssistantResponse,
  type AssistantMessage,
} from "@/data/aiAssistant";

export interface ContextualAssistantProps {
  activeStateKey: string;
}

export function ContextualAssistant({ activeStateKey }: ContextualAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<AssistantMessage[]>([]);
  const [inputQuery, setInputQuery] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentContext =
    stateContextMap[activeStateKey] ?? stateContextMap.waiting_state;

  // Initialize welcome message when context opens
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: "welcome-1",
          sender: "assistant",
          text: `Namaste! I am your **Sarathi Journey Guide**.\n\nI can explain official government terms, clarify what is happening at your current step (${currentContext.stateLabel}), and tell you what comes next.\n\nChoose a question below or type your own.`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    }
  }, [messages.length, currentContext.stateLabel]);

  // Scroll to bottom of chat
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  function handleSend(queryText: string) {
    if (!queryText.trim()) return;

    const userMsg: AssistantMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: queryText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const answerText = generateAssistantResponse(queryText, activeStateKey);

    const assistantMsg: AssistantMessage = {
      id: `assistant-${Date.now() + 1}`,
      sender: "assistant",
      text: answerText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setInputQuery("");
  }

  function handleClearChat() {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: "assistant",
        text: `Conversation cleared. I'm ready to answer any questions about your **${currentContext.stateLabel}** stage.`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  }

  return (
    <>
      {/* Floating Launcher Button (Bottom Right) */}
      {!isOpen ? (
        <aside
          aria-label="Contextual AI Assistant"
          className="fixed bottom-6 right-6 z-40"
        >
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-expanded={false}
            aria-controls="assistant-dialog"
            className="group flex min-h-11 items-center gap-2.5 rounded-full bg-[var(--color-primary)] px-4 py-3 text-xs font-bold text-white shadow-lg transition-all hover:bg-[var(--color-accent)] hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2"
          >
            <ShieldIcon size="sm" className="text-white" />
            <span>Ask Sarathi Guide</span>
            <span className="rounded-full bg-white/20 px-2 py-0.5 text-[0.625rem] uppercase font-bold tracking-wider">
              AI Helper
            </span>
          </button>
        </aside>
      ) : null}

      {/* Expanded Assistant Card Drawer */}
      {isOpen ? (
        <section
          id="assistant-dialog"
          role="dialog"
          aria-modal="false"
          aria-labelledby="assistant-panel-title"
          className="fixed bottom-4 right-4 z-40 w-[calc(100vw-2rem)] max-w-md overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-200 flex flex-col h-[560px] max-h-[85vh]"
        >
          {/* Assistant Header */}
          <div className="border-b border-[var(--color-border)] bg-[var(--color-primary)] p-3.5 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldIcon size="sm" className="text-white" />
                <Heading as="h3" id="assistant-panel-title" variant="section" className="text-white text-sm font-bold">
                  Sarathi AI Guide
                </Heading>
                <span className="rounded bg-white/20 px-1.5 py-0.5 text-[0.625rem] font-bold uppercase tracking-wider text-white">
                  Prototype
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close Sarathi AI Guide"
                className="rounded p-1 text-white/80 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <span className="text-lg font-bold leading-none" aria-hidden="true">&times;</span>
              </button>
            </div>


            {/* Active Context Indicator */}
            <div className="mt-2 flex items-center gap-1.5 text-[0.6875rem] text-white/90">
              <span className="opacity-75">Context:</span>
              <span className="font-semibold rounded bg-white/15 px-1.5 py-0.5">
                {currentContext.stateLabel}
              </span>
            </div>
          </div>

          {/* Prototype Disclaimer Banner */}
          <div className="border-b border-[var(--color-info-border)] bg-[var(--color-info-soft)] px-3 py-1.5 text-[0.625rem] text-[var(--color-info-text)] flex items-center justify-between">
            <span className="flex items-center gap-1">
              <InfoIcon size="sm" className="text-[var(--color-info)]" />
              Explanatory guide only · Grounded in CMVR rules
            </span>
            <button
              type="button"
              onClick={handleClearChat}
              className="text-[0.625rem] font-semibold text-[var(--color-info-text)] underline hover:opacity-80"
            >
              Clear chat
            </button>
          </div>

          {/* Chat Messages Stream */}
          <div
            role="log"
            aria-live="polite"
            aria-label="Chat conversation history"
            className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[var(--color-canvas)] text-xs"
          >

            {messages.map((msg) => {
              const isUser = msg.sender === "user";
              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2 ${
                    isUser ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <div
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[0.625rem] font-bold ${
                      isUser
                        ? "bg-[var(--color-accent)] text-white"
                        : "bg-[var(--color-primary)] text-white"
                    }`}
                  >
                    {isUser ? <UserIcon size="sm" /> : <ShieldIcon size="sm" />}
                  </div>

                  <div
                    className={`max-w-[82%] rounded-[var(--radius-sm)] p-3 text-xs leading-relaxed ${
                      isUser
                        ? "bg-[var(--color-accent)] text-white font-medium"
                        : "border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] shadow-sm whitespace-pre-line"
                    }`}
                  >
                    {msg.text}
                    <div
                      className={`mt-1 text-[0.5625rem] ${
                        isUser ? "text-white/70" : "text-[var(--color-muted)]"
                      } text-right`}
                    >
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Dynamic Suggested Questions Pills */}
          <div className="border-t border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-2.5">
            <span className="text-[0.625rem] font-bold uppercase tracking-wider text-[var(--color-muted)] block mb-1.5">
              Suggested Questions for this Stage:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {currentContext.suggestedQuestions.map((q, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSend(q)}
                  className="rounded border border-[var(--color-border)] bg-[var(--color-surface)] px-2 py-1 text-[0.6875rem] font-medium text-[var(--color-text)] hover:bg-[var(--color-surface-muted)] hover:border-[var(--color-accent)] transition-colors text-left"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(inputQuery);
            }}
            className="border-t border-[var(--color-border)] bg-[var(--color-surface)] p-2.5 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask a question about your licence..."
              aria-label="Ask a question about your licence"
              className="flex-1 rounded-[var(--radius-xs)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] px-3 py-2 text-xs text-[var(--color-text)] focus:border-[var(--color-accent)] focus:outline-none"
            />
            <Button
              type="submit"
              variant="primary"
              size="sm"
              disabled={!inputQuery.trim()}
              className="px-3"
            >
              Send
            </Button>
          </form>
        </section>
      ) : null}
    </>
  );
}
