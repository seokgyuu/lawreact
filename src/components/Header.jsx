import React, { useState } from "react";
import Comant1 from './Comant1';
import Comant2 from './Cal'; 
import Comant3 from './Comant3'; 
import ChatBot from './ChatBot'; 
import axios from "axios"; 

const headerNav = [
    {
        title: "ChatBot",
        url: "#Comant1",
        toggle: true
    },
    {
        title: "Cal",
        url: "#Cal",
        toggle: true
    },
    {
        title: "기능3",
        url: "#Comant3",
        toggle: true
    }
];

const Header = () => {
    const [activeComponent, setActiveComponent] = useState(null); 
    const [chatbotVisible, setChatbotVisible] = useState(false);
    const [chatbotMessages, setChatbotMessages] = useState([]);

    const handleToggleComponent = (component) => {
        setActiveComponent(prev => (prev === component ? null : component)); 
        if (component === "ChatBot") {
            setChatbotVisible(true);
        } else {
            setChatbotVisible(false);
        }
    };

    const sendMessageToChatbot = async (msg) => {
        setChatbotMessages(prevMessages => [...prevMessages, { sender: "사용자", message: msg }]);

        try {
            const response = await axios.post("http://localhost:5000/chat", { message: msg });
            setChatbotMessages(prevMessages => [...prevMessages, { sender: "AI", message: response.data.response }]);
        } catch (error) {
            console.error("Error:", error);
            setChatbotMessages(prevMessages => [...prevMessages, { sender: "AI", message: "서버에 문제가 발생했습니다." }]);
        }
    };

    return (
        <header id="header" role="banner">
            <h1>팀이름</h1>
            <nav>
                <ul className="nav-buttons">
                    {headerNav.map((item, index) => (
                        item.toggle && (
                            <li key={index}>
                                <button onClick={() => handleToggleComponent(item.title)}>
                                    {item.title}
                                </button>
                            </li>
                        )
                    ))}
                </ul>
            </nav>
            {activeComponent === "ChatBot" && <Comant1 sendMessage={sendMessageToChatbot} />}
            {activeComponent === "Cal" && <Comant2 show={activeComponent === "Cal"} />} 
            {activeComponent === "기능3" && <Comant3 />}
            {chatbotVisible && <ChatBot chatLog={chatbotMessages} addMessage={(sender, msg) => sendMessageToChatbot(msg)} />}
        </header>
    );
};

export default Header;
