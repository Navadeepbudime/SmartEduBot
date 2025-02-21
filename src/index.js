import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import routing components
import App from './App.jsx';
import Quiz from './Quiz.jsx'; // Import the Quiz component

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router> {/* Wrap the entire app with Router */}
      <Routes>
        <Route path="/" element={<App />} /> {/* Route for the main App */}
        <Route path="/quiz" element={<Quiz />} /> {/* Route for the Quiz component */}
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();