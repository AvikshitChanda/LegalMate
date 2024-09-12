import React, { useState } from 'react';
import './chat.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Logo from '../../assets/images/logo.png';
import { faMoon, faSun, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Chat = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div
      id="container"
      className={isDarkMode ? 'dark-mode' : 'light-mode'}
      style={{
        backgroundColor: isDarkMode ? '#18181B' : '#FAFAFA', // Background color for the entire container
        color: isDarkMode ? '#FFFFFF' : '#000000', // Text color for the entire container
      }}
    >
      <div
        id="leftPart"
        style={{
          backgroundColor: isDarkMode ? '#27272A' : '#E0E0E0', // Different background color for left part
          border: isDarkMode?'1px solid #27272A':'1px solid #B5C0D0',
        }}
      >
        <div
          className="theme-toggle-button"
          onClick={toggleTheme}
          title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          style={{
            color: isDarkMode ? '#FFFFFF' : '#000000', // Toggle button icon color
          }}
        >
          <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} id="toggleIcon" />
          <div
            id="appName"
            style={{
              color: isDarkMode ? '#FFFFFF' : '#000000', // App name color
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
          backgroundColor: isDarkMode ? '#1F1F23' : '#FAFAFA', // Different background color for right part
        }}
      >
        <div
          id="chatDiscusion"
        >
          {/* Chat messages go here */}
        </div>
        <div id="chatInput">
          <input
            type="text"
            placeholder="Hey! Feel free to ask me any legal questions you may have."
            style={{
              backgroundColor: isDarkMode ? '#444444' : '#FFFFFF', // Input field background color
              color: isDarkMode ? '#FFFFFF' : '#000000', // Input field text color
              borderColor: isDarkMode ? '#555555' : '#CCCCCC', // Input field border color
            }}
          />
          
          {/* New Chatbot-Style Send Button */}
          <button
            className="new-send-button"
            onClick={() => {
              /* Handle send action for the new button */
            }}
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
