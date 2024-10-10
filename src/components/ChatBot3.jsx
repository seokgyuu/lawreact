import React, { useState, useEffect, useRef } from "react";
import { TypeAnimation } from 'react-type-animation';

const ChatBot3 = ({ chatLog, addMessage, aiResponding }) => {
    const [userInput, setUserInput] = useState("");
    const chatLogRef = useRef(null); // chat log에 대한 참조 생성
    const [isUserScrolling, setIsUserScrolling] = useState(false); // 사용자가 스크롤하는지 여부를 추적
    const [isAiResponding, setIsAiResponding] = useState(false); // AI가 응답 중인지 상태 추적
    const [animationEnded, setAnimationEnded] = useState({}); // 애니메이션이 끝났는지 메시지별로 추적

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
    
    // 메세지 칸이 차면 자동 스크롤
    useEffect(() => {
        if (chatLogRef.current && !isUserScrolling) {
            chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
        }
    }, [chatLog, isUserScrolling]);

    // 애니메이션이 끝나면 상태 업데이트
    const handleAnimationEnd = (index) => {
        setAnimationEnded(prev => ({
            ...prev,
            [index]: true  // 해당 인덱스의 메시지에 대한 애니메이션 종료 상태를 true로 설정
        }));
    };

    return (
        <div id="Chatbot">
            <div id="chat-log" ref={chatLogRef} onScroll={handleScroll}>
                {chatLog.map((msg, index) => (
                    <div key={index} className={msg.sender === "사용자" ? "user-message" : "ai-message"}>
                        <strong>{msg.sender}: </strong>
                        {msg.sender === "AI" ? (
                            animationEnded[index] ? ( // 애니메이션이 끝난 후 정적인 텍스트로 표시
                                <span>{msg.message}</span>
                            ) : (
                                <TypeAnimation
                                    sequence={[msg.message, 1000]}
                                    speed={50}
                                    style={{ fontSize: '1em' }}
                                    repeat={1} // 반복 횟수 설정
                                    onFinished={() => handleAnimationEnd(index)} // 애니메이션 끝났을 때 실행
                                />
                            )
                        ) : (
                            msg.message
                        )}
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
                <button type="submit" disabled={isAiResponding}>전송</button>
            </form>
        </div>
    );
};

export default ChatBot3;
