
import React from 'react';
import ChatInterface from '@/components/ChatInterface';

const ChatPage: React.FC = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 p-4 border-b">
        <img 
          src="/lovable-uploads/1f739179-779c-4d4d-b9f1-1de27a432d5e.png" 
          alt="MindHaven Logo" 
          className="h-8 w-auto"
        />
        <h1 className="text-xl font-bold">AI Companion</h1>
      </div>
      <div className="flex-1 overflow-hidden">
        <ChatInterface />
      </div>
    </div>
  );
};

export default ChatPage;
