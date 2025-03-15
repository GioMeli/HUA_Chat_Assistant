import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Chat() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [error, setError] = useState(null); // New: To handle errors
    const navigate = useNavigate();

    useEffect(() => {
        const fetchChatHistory = async () => {
            try {
                const response = await fetch("http://localhost:5000/chat/history", {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch chat history");
                }

                const data = await response.json();
                setMessages(data);
            } catch (err) {
                setError("Could not load chat history. Try again later.");
                console.error("Error fetching chat history:", err);
            }
        };

        fetchChatHistory();
    }, []);

    const sendMessage = async () => {
        if (!input.trim()) return;

        try {
            const response = await fetch("http://localhost:5000/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ message: input }),
            });

            if (!response.ok) {
                throw new Error("Failed to send message");
            }

            const data = await response.json();
            setMessages([...messages, { message: input, response: data.response }]);
            setInput("");
        } catch (err) {
            setError("Failed to send message. Try again.");
            console.error("Error sending message:", err);
        }
    };

    return (
        <div className="chat-container">
            <h2>HUA Chat Assistant</h2>

            {error && <p className="error-message">{error}</p>} {/* New: Show errors */}

            <div className="chat-box">
                {messages.map((msg, index) => (
                    <div key={index} className="chat-message">
                        <strong>You:</strong> {msg.message}
                        <br />
                        <strong>Bot:</strong> {msg.response}
                    </div>
                ))}
            </div>

            <input 
                type="text" 
                placeholder="Ask me anything..." 
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
            />

            <button onClick={sendMessage}>Send</button>
            <button onClick={() => navigate("/")}>Logout</button>
        </div>
    );
}

export default Chat;

