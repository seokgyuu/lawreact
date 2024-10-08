import React, { useState, useEffect, useRef } from "react";

const ChatBot = ({ chatLog, addMessage, aiResponding }) => {
    const [userInput, setUserInput] = useState("");
    const chatLogRef = useRef(null); // chat log에 대한 참조 생성
    const [isUserScrolling, setIsUserScrolling] = useState(false); // 사용자가 스크롤하는지 여부를 추적
    const [isAiResponding, setIsAiResponding] = useState(false); // AI가 응답 중인지 상태 추적

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (userInput.trim() && !isAiResponding) { // AI가 응답 중일 때는 메시지 전송 금지
            addMessage(userInput); // 사용자 메시지 추가
            setUserInput(""); // 입력 필드 초기화
            setIsAiResponding(true); // AI가 응답 중인 상태로 설정
            setTimeout(() => {
                setIsAiResponding(false); // AI 응답 완료 상태로 설정
            }, 2000); // 2초 후에 AI 응답 추가 (실제 응답 시간을 시뮬레이션)
        }
    };

    // 사용자가 스크롤하면 자동 스크롤을 비활성화
    const handleScroll = () => {
        if (chatLogRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = chatLogRef.current;
            // 사용자가 상단으로 스크롤할 때는 자동 스크롤을 비활성화
            setIsUserScrolling(scrollTop + clientHeight < scrollHeight - 10);
        }
    };
    
    //메세지칸이 차면 자동 스크롤
    useEffect(() => {
        if (chatLogRef.current && !isUserScrolling) {
            chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
        }
    }, [chatLog, isUserScrolling]);

    return (
        <div id="Chatbot">
            <div id="chat-log" ref={chatLogRef} onScroll={handleScroll}>
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
                    disabled={isAiResponding} // AI가 응답 중일 때 비활성화
                />
                <button type="submit" disabled={isAiResponding}>전송</button> {/* AI 응답 중일 때 버튼 비활성화 */}
            </form>
        </div>
    );
};

export default ChatBot;
