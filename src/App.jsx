import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import axios from "axios";
import { FaHistory, FaBook, FaPlus } from "react-icons/fa";
import { IconBoxPadding } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import chatIcon from ".//icon.png";

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
  const [chats, setChats] = useState([{ id: Date.now(), messages: [] }]);
  const [currentChat, setCurrentChat] = useState(chats[0]);
  const [inputValue, setInputValue] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const [showCourses, setShowCourses] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentChat]);

  const handleSendMessage = async () => {
    if (inputValue.trim()) {
      const userMessage = { text: inputValue, sender: "user" };
      const updatedChat = {
        ...currentChat,
        messages: [...currentChat.messages, userMessage],
      };
      setChats(chats.map(chat => (chat.id === currentChat.id ? updatedChat : chat)));
      setCurrentChat(updatedChat);
      setInputValue("");
  
      try {
        console.log("Sending request to Gemini API...");
        const response = await axios.post(
          "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent",
          {
            contents: [{ parts: [{ text: inputValue }] }]
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            params: {
              key: "AIzaSyDfaw8qdb-mopTtFBcCy0ec8kuldAJtsts",
            }
          }
        );
  
        console.log("Gemini API response:", response.data);
  
        const botMessage = {
          text: response.data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't process your request.",
          sender: "bot"
        };
  
        setChats(prevChats => prevChats.map(chat => 
          chat.id === currentChat.id ? { ...chat, messages: [...chat.messages, botMessage] } : chat
        ));
        setCurrentChat(prevChat => ({ ...prevChat, messages: [...prevChat.messages, botMessage] }));
      } catch (error) {
        console.error("Error fetching Gemini response:", error.response ? error.response.data : error.message);
        const botMessage = { text: "Sorry, I couldn't process your request. Please try again.", sender: "bot" };
        setChats(prevChats => prevChats.map(chat => 
          chat.id === currentChat.id ? { ...chat, messages: [...chat.messages, botMessage] } : chat
        ));
        setCurrentChat(prevChat => ({ ...prevChat, messages: [...prevChat.messages, botMessage] }));
      }
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

  const handleStartQuiz = () => {
    navigate("/quiz");
  };

  return (
    <div className="container">
      
      <div className={`sidebar left ${showHistory ? "open" : ""}`}>
        <h2>Chat History</h2>
        <button className="new-chat-btn" onClick={() => {
          const newChat = { id: Date.now(), messages: [] };
          setChats([newChat, ...chats]);
          setCurrentChat(newChat);
        }}>
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

      
      <div className="main-content">
        {selectedCourse ? (
          <div className="course-details">
            <h2>{selectedCourse.name}</h2>
            <p>{selectedCourse.description}</p>
            <button onClick={() => setSelectedCourse(null)}>Back to Chat</button>
          </div>
        ) : (
          <div className="chat-window expanded">
            <div className="chat-header">
              <img src={chatIcon} alt="Chat Icon" className="chat-icon" />
              <span className="chat-header-text">Smart Edu Bot</span>
            </div>
            <div className="messages">
              {currentChat.messages.map((msg, index) => (
                <div key={index} className={`message ${msg.sender}`}>
                  {msg.text}
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
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <button onClick={handleSendMessage}>Send</button>
              <button onClick={handleStartQuiz} className="start-quiz-btn">Start Quiz</button>
            </div>
          </div>
        )}
      </div>

      
      <div className={`sidebar right ${showCourses ? "open" : ""}`}>
        <h2>Available Courses</h2>
        <ul>
          {courses.map((course, index) => (
            <li key={index} onClick={() => setSelectedCourse(course)}>{course.name}</li>
          ))}
        </ul>
      </div>

      
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