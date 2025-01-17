import React, { useEffect, useState } from 'react';
import Message from './Message';
import { FiSend } from "react-icons/fi";
import { socket } from 'socket.io-client';
const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isConnected,setisConnected] = useState()




useEffect(()=>{
  function onConnect(){
    setisConnected(true)

  }
  function onDisconnect(){
    setisConnected(false)
  }
})

  // Handle sending a message
  const handleSend = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages([
        ...messages,
        { text: input, sender: 'user' },
      ]);

      // Simulate receiving a message (this is just for the demo)
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "This is a received message!", sender: 'bot' },
        ]);
      }, 1000); // Simulate receiving a message after 1 second

      setInput('');
    }
  };

  return (
    <div className="h-[42em] static mt-[-2em] ml-[-10em] mb-[-10%] w-screen flex flex-col justify-end p-4 bg-gray-100">
      {/* Chat Window */}
      <div className="flex flex-col space-y-4 overflow-y-auto h-[calc(100vh-100px)] mb-4">
        {messages.map((msg, index) => (
          <Message key={index} text={msg.text} sender={msg.sender} />
        ))}
      </div>

      {/* Input Section */}
      <form className="flex items-center space-x-2" onSubmit={handleSend}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Type a message"
        />
        <button
          type="submit"
          className="p-3 bg-blue-500 text-white rounded-lg"
        >
          <FiSend/>
        </button>
      </form>
    </div>
  );
};

export default ChatApp;
