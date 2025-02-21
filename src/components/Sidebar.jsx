import React from "react";
import "./Sidebar.css";

const Sidebar = ({ showHistory, chatHistory, setMessages, setShowHistory }) => {
  return (
    <div className={`sidebar ${showHistory ? "show" : ""}`}>
      <h2>Chat History</h2>
      <button className="close-btn" onClick={() => setShowHistory(false)}>✖</button>
      {chatHistory.length === 0 ? (
        <p>No previous chats</p>
      ) : (
        chatHistory.map((chat, index) => (
          <div key={index} className="history-item" onClick={() => setMessages(chat)}>
            Chat {index + 1}
          </div>
        ))
      )}
    </div>
  );
};

export default Sidebar;
