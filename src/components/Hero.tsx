'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useI18n } from './I18nProvider';


// Direct translation object - no external JSON needed
const translations = {
  en: {
    companyName: "Gemerlang Sejahtera Abadi",
    welcomeTo: "Welcome to the",
    digitalPartner: "Digital Strategic Partner",
    tellUsWhatYouNeed: "Tell us what you need",
    searchPlaceholder: "Ask me anything about GSA...",
    aiTyping: "AI is typing...",
    tryAgain: "Try again",
    clearChat: "Clear Chat"
  },
  id: {
    companyName: "Gemerlang Sejahtera Abadi",
    welcomeTo: "Selamat Datang di",
    digitalPartner: "Mitra Strategis Digital",
    tellUsWhatYouNeed: "Beritahu kami apa yang Anda butuhkan",
    searchPlaceholder: "Tanyakan apapun tentang GSA...",
    aiTyping: "AI sedang mengetik...",
    tryAgain: "Coba Lagi",
    clearChat: "Hapus Chat"
  },
  ja: {
    companyName: "Gemerlang Sejahtera Abadi",
    welcomeTo: "ようこそ",
    digitalPartner: "デジタル戦略パートナー",
    tellUsWhatYouNeed: "ご要望をお聞かせください",
    searchPlaceholder: "GSAについて何でも聞いてください...",
    aiTyping: "AIが入力中...",
    tryAgain: "再試行",
    clearChat: "チャットをクリア"
  },
  'zh-TW': {
    companyName: "Gemerlang Sejahtera Abadi",
    welcomeTo: "歡迎來到",
    digitalPartner: "數位策略夥伴",
    tellUsWhatYouNeed: "請告訴我們您的需求",
    searchPlaceholder: "問我任何關於GSA的事...",
    aiTyping: "AI正在輸入...",
    tryAgain: "再試一次",
    clearChat: "清除聊天"
  }
};

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: string; // ISO string
}

const Hero = () => {
  const [text, setText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const { language } = useI18n();
  const t = translations[language as keyof typeof translations];
  const fullText = t.digitalPartner;
  const [isClient, setIsClient] = useState(false);

  // Suggested questions for both languages
  const suggestedQuestions = language === 'id'
    ? [
        'Apa layanan utama GSA?',
        'Bagaimana cara menghubungi GSA?',
        'Apa keunggulan GSA dibanding kompetitor?',
        'Siapa saja tim utama GSA?',
        'Bagaimana cara memulai proyek dengan GSA?'
      ]
    : language === 'ja'
    ? [
        'GSAの主なサービスは何ですか？',
        'GSAに連絡するにはどうすればいいですか？',
        'GSAの競合他社に対する強みは何ですか？',
        'GSAの主要メンバーは誰ですか？',
        'GSAとプロジェクトを始めるにはどうすればいいですか？'
      ]
    : language === 'zh-TW'
    ? [
        'GSA的主要服務有哪些？',
        '如何聯絡GSA？',
        'GSA相比競爭對手有什麼優勢？',
        'GSA的主要團隊成員是誰？',
        '如何開始與GSA的專案合作？'
      ]
    : [
        "What are GSA's main services?",
        'How can I contact GSA?',
        'What makes GSA better than competitors?',
        'Who are the key team members at GSA?',
        'How do I start a project with GSA?'
      ];

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        // Reset animation after completion
        setTimeout(() => {
          currentIndex = 0;
          setText('');
        }, 2000); // Wait 2 seconds before restarting
      }
    }, 150); // Slowed down typing speed for better readability

    return () => clearInterval(interval);
  }, [fullText]);

  useEffect(() => { setIsClient(true); }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: searchQuery,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setShowChat(true);

    try {
      const response = await fetch('/api/gemini-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: searchQuery, language }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      const cleanResponse = data.response.replace(/\*/g, '');
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: cleanResponse,
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Search error:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: 'Sorry, I encountered an error. Please try again or contact GSA directly at info@gsagroup.id.',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setSearchQuery('');
    }
  };

  const clearChat = () => {
    setMessages([]);
    setShowChat(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-blue-500 to-green-500 flex items-center px-4 relative overflow-hidden pt-0 md:pt-4 pb-5">
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="max-w-full pt-0">
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-xl text-white mb-10 font-medium">
            {t.companyName}
          </motion.h2>

          <div className="mb-20">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="text-3xl md:text-7xl font-bold text-white mb-8 leading-tight">
              {t.welcomeTo}
            </motion.h1>
            <div className="relative h-[1.2em] flex items-center mb-12">
              <h1 className="text-3xl md:text-7xl font-bold text-white whitespace-nowrap border-r-4 border-white inline-block animate-typing px-2">{text}</h1>
            </div>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="relative max-w-6xl">
            <p className="text-white/90 mb-8 text-lg font-medium">{t.tellUsWhatYouNeed}</p>
            
            {/* Search Form */}
            <form onSubmit={handleSearch} className="relative mb-8">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder} 
                className="w-full px-8 py-6 rounded-2xl text-gray-800 bg-white/95 backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-white/30 pl-20 text-lg font-medium shadow-2xl" 
                disabled={isLoading}
              />
              <div className="absolute left-6 top-1/2 transform -translate-y-1/2 w-8 h-8">
                <Image src="/Home/Logo AI Intelligence.png" alt="AI Intelligence" width={32} height={32} className="object-contain" priority />
              </div>
              <button
                type="submit"
                disabled={isLoading || !searchQuery.trim()}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 disabled:opacity-50 hover:scale-110 transition-transform"
              >
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </button>
            </form>

            {/* Modern Suggested Questions UI */}
            <div className="mb-8">
              <div className="mb-2 text-white/90 font-semibold text-base md:text-lg">Quick Questions</div>
              <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
                {suggestedQuestions.map((q) => (
                  <button
                    key={q}
                    type="button"
                    className="flex-shrink-0 px-5 py-3 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-teal-400 text-white shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all font-medium text-sm md:text-base border-none outline-none focus:ring-2 focus:ring-white/40"
                    style={{ minWidth: '180px' }}
                    onClick={() => {
                      setSearchQuery(q);
                      setTimeout(() => {
                        const fakeEvent = { preventDefault: () => {} } as React.FormEvent;
                        handleSearch(fakeEvent);
                      }, 0);
                    }}
                    disabled={isLoading}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Interface */}
            {showChat && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 max-h-96 overflow-hidden flex flex-col"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-white font-semibold text-lg">GSA AI Assistant</h3>
                  <button
                    onClick={clearChat}
                    className="text-white/70 hover:text-white text-sm bg-white/10 px-3 py-1 rounded-lg hover:bg-white/20 transition-colors"
                  >
                    {t.clearChat}
                  </button>
                </div>
                
                <div className="flex-1 overflow-y-auto space-y-4 mb-4 max-h-64">
                  {messages.map((message) => (
                    <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] p-3 rounded-lg ${
                        message.type === 'user' 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-white/20 text-white'
                      }`}>
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {isClient ? new Date(message.timestamp).toLocaleTimeString() : ''}
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-white/20 text-white p-3 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                          <span className="text-sm ml-2">{t.aiTyping}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* CTA Button to Contact */}
            
          </motion.div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-white/5 rounded-full blur-3xl"></div>
      </div>

      {/* Hide scrollbar utility */}
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default Hero;
