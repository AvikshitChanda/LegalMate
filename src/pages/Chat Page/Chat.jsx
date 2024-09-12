import React, { useState, useRef } from 'react';
import './chat.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Logo from '../../assets/images/logo.png';
import { faMoon, faSun, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Chat = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const chatContainerRef = useRef(null);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, type: 'user' }]);
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
    <div
      id="container"
      className={isDarkMode ? 'dark-mode' : 'light-mode'}
      style={{
        backgroundColor: isDarkMode ? '#18181B' : '#FAFAFA', 
        color: isDarkMode ? '#FFFFFF' : '#000000', 
      }}
    >
      <div
        id="leftPart"
        style={{
          backgroundColor: isDarkMode ? '#27272A' : '#E0E0E0', 
          border: isDarkMode ? '1px solid #27272A' : '1px solid #B5C0D0',
        }}
      >
        <div
          className="theme-toggle-button"
          onClick={toggleTheme}
          title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          style={{
            color: isDarkMode ? '#FFFFFF' : '#000000', 
          }}
        >
          <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} id="toggleIcon" />
          <div
            id="appName"
            style={{
              color: isDarkMode ? '#FFFFFF' : '#000000', 
            }}
          >
            <img src={Logo} alt="Logo" />
            <h1>LegalMate.AI</h1>
          </div>
        </div>
      </div>
      <div
        id="rightPart"
        style={{
          backgroundColor: isDarkMode ? '#1F1F23' : '#FAFAFA', 
        }}
      >
        <div
          id="chatDiscussion"
          ref={chatContainerRef}
          style={{
            padding: '10px',
            height: 'calc(100vh - 150px)', 
            overflowY: 'auto',
          }}
        >
          {messages.map((msg, index) => (
            <div key={index} className={msg.type} style={{ marginBottom: '10px' }}>
              {msg.text}
            </div>
          ))}
        </div>
        <div id="chatInput">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Hey! Feel free to ask me any legal questions you may have."
            style={{
              backgroundColor: isDarkMode ? '#444444' : '#FFFFFF', 
              color: isDarkMode ? '#FFFFFF' : '#000000', 
              borderColor: isDarkMode ? '#555555' : '#CCCCCC', 
            }}
          />
          <button
            className="new-send-button"
            onClick={handleSendMessage}
            title="Send"
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
