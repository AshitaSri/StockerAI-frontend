/* src/components/Chatbox/Chatbox.js */
import React, { useState } from 'react'; 
import './Chatbox.css';

const Chatbox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [username, setUsername] = useState('User');
  const [isOpen, setIsOpen] = useState(false);

  const handleSend = () => {
    if (input.trim()) {
      const newMessage = {
        text: input,
        timestamp: new Date().toLocaleTimeString(),
        sender: username,
      };
      setMessages([...messages, newMessage]);
      setInput('');
    }
  };

  const toggleChatbox = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`chatbox-container ${isOpen ? 'open' : ''}`}>
      {!isOpen && (
        <div className="chatbox-toggle" onClick={toggleChatbox}>
          Chat
        </div>
      )}
      {isOpen && (
        <div className="chatbox">
          <div className="chatbox-header">
            <h2>Stock Market Chat</h2>
            <button className="close-button" onClick={toggleChatbox}>✖</button>
          </div>
          <div className="chatbox-messages">
            {messages.map((message, index) => (
              <div key={index} className={`chatbox-message ${message.sender}`}>
                <div className="message-info">
                  <span className="message-sender">{message.sender}</span>
                  <span className="message-timestamp">{message.timestamp}</span>
                </div>
                <div className="message-text">{message.text}</div>
              </div>
            ))}
          </div>
          <div className="chatbox-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type a message..."
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbox;
