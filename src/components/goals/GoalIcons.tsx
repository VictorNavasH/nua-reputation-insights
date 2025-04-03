
import React from 'react';
import { MessageSquare, ThumbsUp, Star, Clock } from 'lucide-react';

// Export pre-configured icon components
export const MessageSquareIcon = () => <MessageSquare className="h-5 w-5" />;
export const ThumbsUpIcon = () => <ThumbsUp className="h-5 w-5" />;
export const StarIcon = () => <Star className="h-5 w-5" />;
export const ClockIcon = () => <Clock className="h-5 w-5" />;

// Utility function to get icon component by name
export const getIconByName = (iconName: string) => {
  switch (iconName) {
    case 'MessageSquare': return <MessageSquare className="h-5 w-5" />;
    case 'ThumbsUp': return <ThumbsUp className="h-5 w-5" />;
    case 'Star': return <Star className="h-5 w-5" />;
    case 'Clock': return <Clock className="h-5 w-5" />;
    default: return <MessageSquare className="h-5 w-5" />;
  }
};
