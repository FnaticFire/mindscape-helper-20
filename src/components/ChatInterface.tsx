
import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Loader } from 'lucide-react';

const ChatInterface: React.FC = () => {
  const { chatMessages, addChatMessage, isChatLoading } = useApp();
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      addChatMessage({
        text: message,
        sender: 'user'
      });
      setMessage('');
    }
  };
  
  // Add welcome message if no messages exist
  useEffect(() => {
    if (chatMessages.length === 0) {
      addChatMessage({
        text: "Hi there! I'm your MindHaven AI companion. I'm here to listen and support you with evidence-based techniques from cognitive behavioral therapy and mindfulness. How are you feeling today?",
        sender: 'ai'
      });
    }
  }, [chatMessages.length, addChatMessage]);
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatMessages.map(message => (
          <div
            key={message.id}
            className={`chat-bubble ${message.sender === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'}`}
          >
            <p>{message.text}</p>
            <div className="text-xs opacity-70 mt-1">
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        ))}
        
        {isChatLoading && (
          <div className="chat-bubble chat-bubble-ai flex items-center gap-2">
            <Loader className="h-4 w-4 animate-spin" />
            <p>Thinking...</p>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSendMessage} className="p-4 border-t bg-card">
        <div className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
            disabled={isChatLoading}
          />
          <Button type="submit" size="icon" disabled={!message.trim() || isChatLoading}>
            <Send size={18} />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;
