import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000"); // Connect to backend

const getRandomUsername = () => `User${Math.floor(Math.random() * 100) + 1}`;

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]); 
  const [username, setUsername] = useState(getRandomUsername()); 

  useEffect(() => {
    // Receive messages from server
    socket.on("message", (data) => {
      console.log("Received:", data); // Debugging
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = { text: message, sender: username };
      console.log("Sending:", newMessage); // Debugging
      socket.emit("message", newMessage); // Send to server
      setMessage(""); 
    } else {
      console.warn("Empty message not sent"); // Debugging
    }
  };

  return (
    <div>
      <h1>WebRTC Global Chat</h1>
      <h3>Welcome, {username}</h3>

      <div style={{ border: "1px solid black", padding: "10px", height: "200px", overflowY: "scroll" }}>
        {messages.map((msg, index) => (
          <p key={index}><strong>{msg.sender}:</strong> {msg.text}</p>
        ))}
      </div>

      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;
