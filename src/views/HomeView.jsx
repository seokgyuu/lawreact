import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import ChatBot from '../components/ChatBot'; 
import axios from "axios"; 
import { v4 as uuid4 } from "uuid";

const HomeView = () => {
    const [chatbotMessages, setChatbotMessages] = useState([]);
    const [sessionId, setSessionId] = useState("");
    const [historyVisible, setHistoryVisible] = useState(false);

    useEffect(() => {
        setSessionId(uuid4());
    }, []);

    const sendMessageToChatbot = async (msg) => {
        setChatbotMessages(prevMessages => [...prevMessages, { sender: "사용자", message: msg }]);

        try {
            const response = await axios.post("http://localhost:8000/query", {
                query: msg,
                session_id: sessionId
            });
            setChatbotMessages(prevMessages => [...prevMessages, { sender: "AI", message: response.data.answer }]);
        } catch (error) {
            setChatbotMessages(prevMessages => [...prevMessages, { sender: "AI", message: "서버에 문제가 발생했습니다." }]);
        }
    };

    const toggleHistory =() =>{
        setHistoryVisible(!historyVisible)
    }

    return (
        <>
            <Header /> 
            <ChatBot chatLog={chatbotMessages} addMessage={sendMessageToChatbot} /> {/* 항상 렌더링 */}
        </>
    );
};

export default HomeView;
