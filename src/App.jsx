import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { FaHistory, FaBook, FaPlus } from "react-icons/fa";

const courses = [
  { name: "Mathematics", description: "Learn algebra, geometry, and calculus." },
  { name: "Science", description: "Explore physics, chemistry, and biology." },
  { name: "History", description: "Dive into world and regional history." },
  { name: "English", description: "Improve your grammar and literature skills." },
  { name: "Computer Science", description: "Understand programming and algorithms." },
  { name: "Physics", description: "Discover the laws of nature." },
  { name: "Chemistry", description: "Study elements, compounds, and reactions." },
  { name: "Biology", description: "Understand living organisms and ecosystems." },
  { name: "Economics", description: "Learn about markets, trade, and policies." },
  { name: "Psychology", description: "Explore human behavior and the mind." }
];

const ChatbotApp = () => {
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const [showCourses, setShowCourses] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentChat]);

  const startNewChat = () => {
    const newChat = { id: Date.now(), messages: [] };
    setChats([newChat, ...chats]);
    setCurrentChat(newChat);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() && currentChat) {
      const userMessage = { text: inputValue, sender: "user" };
      const updatedChat = {
        ...currentChat,
        messages: [...currentChat.messages, userMessage],
      };
      setChats(chats.map(chat => (chat.id === currentChat.id ? updatedChat : chat)));
      setTimeout(() => {
        const botMessage = { text: getBotResponse(inputValue), sender: "bot" };
        const updatedChatWithBot = {
          ...updatedChat,
          messages: [...updatedChat.messages, botMessage],
        };
        setChats(chats.map(chat => (chat.id === currentChat.id ? updatedChatWithBot : chat)));
      }, 1000);
      setInputValue("");
    }
  };

  const getBotResponse = (message) => {
    if (message.toLowerCase().includes("quiz")) {
      return "Sure! Let's start a quiz. What topic are you interested in?";
    } else if (message.toLowerCase().includes("math")) {
      return "Here's a helpful math resource: [Math Link]";
    } else {
      return "I'm here to help! Ask me anything.";
    }
  };

  return (
    <div className="container">
      {/* History Sidebar */}
      <div className={`sidebar left ${showHistory ? "open" : ""}`}>
        <h2>Chat History</h2>
        <button className="new-chat-btn" onClick={startNewChat}>
          <FaPlus /> New Chat
        </button>
        {chats.map((chat, index) => (
          <div
            key={chat.id}
            className={`history-item ${currentChat?.id === chat.id ? "active" : ""}`}
            onClick={() => setCurrentChat(chat)}
          >
            Chat {index + 1}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="main-content">
        {selectedCourse ? (
          <div className="course-details">
            <h2>{selectedCourse.name}</h2>
            <p>{selectedCourse.description}</p>
            <button onClick={() => setSelectedCourse(null)}>Back to Chat</button>
          </div>
        ) : currentChat ? (
          <div className="chat-window expanded">
            <div className="messages">
              {currentChat.messages.map((msg, index) => (
                <div key={index} className={`message ${msg.sender}`}>
                  <strong>{msg.sender}:</strong> {msg.text}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="input-area">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <button onClick={handleSendMessage}>Send</button>
            </div>
          </div>
        ) : (
          <div className="start-chat-message">Click 'New Chat' to start a conversation.</div>
        )}
      </div>

      {/* Courses Sidebar */}
      <div className={`sidebar right ${showCourses ? "open" : ""}`}>
        <h2>Available Courses</h2>
        <ul>
          {courses.map((course, index) => (
            <li key={index} onClick={() => setSelectedCourse(course)}>{course.name}</li>
          ))}
        </ul>
      </div>

      {/* Sidebar Toggle Buttons */}
      <button className="toggle-btn left" onClick={() => setShowHistory(!showHistory)}>
        <FaHistory />
      </button>
      <button className="toggle-btn right" onClick={() => setShowCourses(!showCourses)}>
        <FaBook />
      </button>
    </div>
  );
};

export default ChatbotApp;
