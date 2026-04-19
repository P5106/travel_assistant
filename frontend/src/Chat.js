import React, { useState } from "react";
import axios from "axios";

function Chat() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    if (!message) return;

    const userMsg = message;

    setChat([...chat, { type: "user", text: userMsg }]);
    setMessage("");

    try {
      const res = await axios.post("http://localhost:5000/chat", {
        message: userMsg
      });

      setChat(prev => [
        ...prev,
        { type: "bot", text: res.data.reply }
      ]);

    } catch (error) {
      setChat(prev => [
        ...prev,
        { type: "bot", text: "Error connecting to server" }
      ]);
    }
  };

  return (
    <div className="chat-container">

      <div className="chat-box">
        {chat.map((msg, index) => (
          <div key={index} className={msg.type}>
            {msg.text}
          </div>
        ))}
      </div>

      <div className="input-box">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask about travel..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>

    </div>
  );
}

export default Chat;