import React, { useState, useEffect, useRef } from "react";

const ChatBot = ({ chatLog, addMessage }) => {
    const [userInput, setUserInput] = useState("");
    const chatLogRef = useRef(null); // chat log에 대한 참조 생성

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (userInput.trim()) {
            addMessage(userInput); // 사용자 메시지 추가
            setUserInput(""); // 입력 필드 초기화
        }
    };

    // chatLog가 변경될 때마다 스크롤을 하단으로 이동
    useEffect(() => {
        if (chatLogRef.current) {
            chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
        }
    }, [chatLog]);

    return (
        <div id="Chatbot">
            <div id="chat-log" ref={chatLogRef}>
                {chatLog.map((msg, index) => (
                    <div key={index} className={msg.sender === "사용자" ? "user-message" : "ai-message"}>
                        <strong>{msg.sender}: </strong>
                        {msg.message}
                    </div>
                ))}
            </div>
            <form onSubmit={handleFormSubmit}>
                <textarea
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="메시지를 입력하세요"
                />
                <button type="submit">전송</button>
            </form>
        </div>
    );
};

export default ChatBot;