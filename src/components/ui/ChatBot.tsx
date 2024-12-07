"use client"
import { useState } from "react";
import Image from "next/image";
import { TbMessageChatbotFilled } from "react-icons/tb";
import user from "../../images/avatar.png"
import bot from "../../images/chat.png"

interface Message {
  id: number;
  type: "user" | "bot";
  text: string;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  // Handle sending a message
  const sendMessage = () => {
    if (input.trim() === "") return;

    const userMessage = { id: Date.now(), type: "user", text: input };
    const botReply = {
      id: Date.now() + 1,
      type: "bot",
      text: "This is a sample bot response.", // Replace with actual bot logic
    };

    setMessages((prev) => [...prev, userMessage, botReply]);
    setInput("");
  };

  return (
    <div className="font-oxaniumregular">
      {/* Minimalistic Chat Icon */}
      <div
        className="fixed bottom-4 right-4 bg-[#AD1AAF] rounded-full p-4 cursor-pointer shadow-lg font-oxaniumregular"
        onClick={() => setIsOpen(!isOpen)}
      >
        <TbMessageChatbotFilled size={24} />

      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-16 right-4 w-80 bg-gray-900 rounded-xl shadow-lg flex flex-col">
          {/* Chat Header */}
          <div className="bg-[#AD1AAF] text-white py-3 px-4 rounded-t-xl font-semibold">
            Chatbot
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.type === "user" ? "flex-row-reverse" : ""
                } gap-4`}
              >
                <Image
  src={msg.type === "user" ? "/images/avatar.png" : "/images/chat.png"}
  alt={msg.type === "user" ? "User" : "Bot"}
  width={30}
  height={30}
  className="rounded-full"
/>

                <div
                  className={`max-w-[70%] p-3 border ${
                    msg.type === "user"
                      ? "bg-[#AD1AAF]/10 border-[#AD1AAF] rounded-l-xl rounded-br-2xl"
                      : "bg-white/10 border-purple-700 rounded-r-xl rounded-bl-2xl"
                  }`}
                >
                  <p className="text-sm text-white">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <div className="flex items-center border-t border-gray-700 p-3 bg-gray-800">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-400"
            />
            <button
              onClick={sendMessage}
              className="ml-3 bg-[#AD1AAF] hover:bg-[#8c158e] text-white px-4 py-2 rounded-lg"
            >
              Send
            </button>
           

          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
