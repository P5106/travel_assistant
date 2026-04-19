import React, { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  // Auto scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  //main
  const handleUserQuery = async (text) => {
    const userMessage = { text, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await fetch("http://localhost:5000/chat", {  
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: text }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { text: data.reply, sender: "bot" },
      ]);
    } catch (err) {
      console.log(err);
    }
  };

  // Input send
  const sendMessage = () => {
    if (!input) return;
    handleUserQuery(input);
    setInput("");
  };

  return (
    <div className="app">

      {/* header */}
      <div className="header">
        🌍 AI Travel Assistant
      </div>

      <div className="main">

        {/* CHAT SECTION */}
        <div className="chat-container">
          <div className="chat-box">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          <div className="input-area">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about places..."
            />
            <button onClick={sendMessage}>➤</button>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="info-panel">
          <h2>✈️ Travel Info</h2>
          <p>Click a destination 👇</p>

          {/* MANALI CARD */}
          <div
            className="card"
            onClick={() => handleUserQuery("Manali")}
          >
            <h3>🏔️ Manali</h3>
            <p>Best time: Oct–Feb</p>
            <p>Budget: ₹5k–₹15k</p>
          </div>

          {/* GOA CARD */}
          <div
            className="card"
            onClick={() => handleUserQuery("Goa")}
          >
            <h3>🏝️ Goa</h3>
            <p>Best time: Nov–Feb</p>
            <p>Budget: ₹6k–₹20k</p>
          </div>

        </div>

      </div>
    </div>
  );
}

export default App;