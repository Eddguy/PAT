import { useState, useRef } from "react";
import { ImSpinner11 } from "react-icons/im";
import { FaCircleArrowUp   } from "react-icons/fa6";

const Pat = () => {
    const [messages, setMessages] = useState([]);
    const [messageHistory, setMessageHistory] = useState([]);
    const [input, setInput] = useState("");
    const [sending, setSending] = useState(false);
    const lastUserMessageIndex = useRef(-1);

    const sendMessage = async () => {
        if (input.trim() === "") return;

        const userMessage = { text: input, user: "user", role: "user" };
        const userMessageHistory = { content: input, role: "user" };

        setMessages((prev) => [...prev, userMessage]);
        setMessageHistory((prev) => [...prev, userMessageHistory]);
        lastUserMessageIndex.current = messages.length;

        setInput("");
        setSending(true);

        try {
            const response = await fetch("http://127.0.0.1:8000/pat", { 
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: input, messageHistory: [...messageHistory, userMessageHistory] }),
            });

            if (!response.ok) throw new Error("Failed to fetch AI response");

            const data = await response.json();
            const aiMessage = { text: data.responseText, user: "ai" }; // Fixed responseText key
            setMessages((prev) => [...prev, aiMessage]);
        } catch (error) {
            console.error("Error:", error);
            alert("Internal Server Error");
        } finally {
            setSending(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <div className="pat_content">
            <div className="chat_container">
                
                <div className="chat_content">
                <h2>PAT AI</h2>
                    {messages.map((msg, index) => (
                        <div key={index} className={`message ${msg.user}`}>
                            {msg.text}
                        </div>
                    ))}
                </div>
                <div className="input_container">
                    <div className="regenerate_button">
                        <div className="regenerate_button_inner">
                            <ImSpinner11 className="chat_button" id="regenerate_button"/>
                        </div>
                    </div>
                    <input
                        className="input_main"
                        type="text"
                        placeholder="Ask Pat..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyPress}
                    />
                    <div className="send_button" onClick={sendMessage}>
                        {sending ? <ImSpinner11 className="chat_button" /> : <FaCircleArrowUp   className="chat_button" />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pat;
