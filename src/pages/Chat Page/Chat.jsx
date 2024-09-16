import React, { useState, useRef } from 'react';
import './chat.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Logo from '../../assets/images/logo.png';
import { faMoon, faSun, faArrowRight } from '@fortawesome/free-solid-svg-icons';


const Chat = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false); 
  const chatContainerRef = useRef(null);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleSendMessage = async () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, type: 'user' }]);
      setInput(''); 
      setIsLoading(true); 

      try {
        const response = await fetch('http://localhost:5000/ask', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ question: input }),
        });

        const data = await response.json();

       
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: data.answer, type: 'bot' },
        ]);
      } catch (error) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: 'Error: Could not reach the server', type: 'error' },
        ]);
      }

      setIsLoading(false); 
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
              <div
                key={index}
                className={`message ${msg.type === 'user' ? 'user-message' : 'bot-message'}`}
              >
                {msg.text}
              </div>
            ))}
          </div>
        </div>

        {isLoading && (
          <div id="thinking">
            AI is thinking
            <span className="dot one">.</span>
            <span className="dot two">.</span>
            <span className="dot three">.</span>
          </div>
        )}

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
