import React from 'react';
import { motion } from 'framer-motion';

const Message = ({ text, sender }) => {
  const isUserMessage = sender === 'user';

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: '100%', // Start from below the screen
      }}
      animate={{
        opacity: 1,
        y: 0, // Move to its final position (0 means no offset)
      }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`max-w-xs p-3 rounded-lg ${isUserMessage ? 'bg-blue-500 text-white self-end' : 'bg-gray-300 text-black self-start'}`}
    >
      {text}
    </motion.div>
  );
};

export default Message;
