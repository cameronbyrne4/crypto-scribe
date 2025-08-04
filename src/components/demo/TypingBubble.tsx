import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, MessageCircle } from 'lucide-react';

interface TypingBubbleProps {
  message: string;
  duration: number;
}

export const TypingBubble: React.FC<TypingBubbleProps> = ({ message, duration }) => {
  const [isTyping, setIsTyping] = useState(true);
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    // Show typing animation for first part of duration
    const typingDuration = duration * 0.3;
    const typingTimer = setTimeout(() => {
      setIsTyping(false);
      // Start typing out the message
      let index = 0;
      const typingInterval = setInterval(() => {
        if (index < message.length) {
          setDisplayedText(message.slice(0, index + 1));
          index++;
        } else {
          clearInterval(typingInterval);
        }
      }, (duration * 0.7) / message.length);
    }, typingDuration);

    return () => clearTimeout(typingTimer);
  }, [message, duration]);

  return (
    <Card className="max-w-3xl w-full bg-white/5 border-white/10 backdrop-blur-xl">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0">
            <MessageCircle className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <h3 className="text-lg font-semibold text-white">ChainQuery AI</h3>
              <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 text-xs">
                Analyzing
              </Badge>
            </div>
            
            {isTyping ? (
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-purple-400" />
                <div className="flex gap-1">
                  <motion.div
                    className="w-2 h-2 rounded-full bg-gray-400"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                  />
                  <motion.div
                    className="w-2 h-2 rounded-full bg-gray-400"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                  />
                  <motion.div
                    className="w-2 h-2 rounded-full bg-gray-400"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                  />
                </div>
              </div>
            ) : (
              <p className="text-gray-300 text-lg leading-relaxed">
                {displayedText}
                <motion.span
                  className="inline-block w-0.5 h-5 bg-purple-400 ml-1"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
