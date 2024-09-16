import React, { useState, useRef } from 'react';
import './chat.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Logo from '../../assets/images/logo.png';
import { faMoon, faSun, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const Chat = () => {
  const [isDarkMode, setIsDarkMode] = useState(true); // Default dark mode
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const chatContainerRef = useRef(null);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };



  const handleSendMessage = async () => {
    if (input.trim()) {
      // Add the user's message to the chat
      setMessages([...messages, { text: input, type: 'user' }]);

      try {
        // Send user's message to the Flask API
        const response = await fetch('http://localhost:5000/ask', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ question: input }),
        });

        const data = await response.json();

        // Add AI's response to the chat
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: data.answer, type: 'bot' },
        ]);
      } catch (error) {
        // Handle error (e.g., server down)
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: 'Error: Could not reach the server', type: 'error' },
        ]);
      }

      // Clear the input field
      setInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  React.useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div id="container" className={isDarkMode ? 'dark-mode' : 'light-mode'}>
      <div id="leftPart">
        <div
          className="theme-toggle-button"
          onClick={toggleTheme}
          title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} id="toggleIcon" />
          <div id="appName">
            <img src={Logo} alt="Logo" />
            <h1>LegalMate.AI</h1>
          </div>
        </div>
      </div>
      <div id="rightPart">
        <div id="chatDiscussSection">
          <div id="innerDiscuss">
          {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.type === 'user' ? 'user-message' : 'bot-message'}`}>
            {msg.text}
          </div>
          ))}

          </div>
        </div>
        <div id="chatInput">
        <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Hey! Feel free to ask me any legal questions you may have."
        />
        <button className="new-send-button" onClick={handleSendMessage} title="Send">
            <FontAwesomeIcon icon={faArrowRight} />
        </button>
    </div>
</div>

    </div>
  );
};

export default Chat;
