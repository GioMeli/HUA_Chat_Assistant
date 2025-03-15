import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Chat() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchChatHistory = async () => {
            const user = JSON.parse(localStorage.getItem("user"));
            if (!user) return;

            const response = await fetch("http://localhost:5000/chat/history", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });

            const data = await response.json();
            setMessages(data);
        };

        fetchChatHistory();
    }, []);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const response = await fetch("http://localhost:5000/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ message: input }),
        });

        const data = await response.json();
        setMessages([...messages, { message: input, response: data.response }]);
        setInput("");
    };

    return (
        <div className="chat-container">
            <h2>HUA Chat Assistant</h2>
            <div className="chat-box">
                {messages.map((msg, index) => (
                    <div key={index} className="chat-message">
                        <strong>You:</strong> {msg.message}
                        <br />
                        <strong>Bot:</strong> {msg.response}
                    </div>
                ))}
            </div>
            <input type="text" placeholder="Ask me anything..." value={input} onChange={(e) => setInput(e.target.value)} />
            <button onClick={sendMessage}>Send</button>
            <button onClick={() => navigate("/")}>Logout</button>
        </div>
    );
}

export default Chat;

