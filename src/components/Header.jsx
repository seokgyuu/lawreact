import React, { useState } from "react";
import {useLocation} from "react-router-dom";
import { CommentOutlined, AppstoreOutlined, MenuOutlined } from "@ant-design/icons";


const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    
    let headerNav;
    if (location.pathname === "/home") {
        headerNav = [
            {
                title: "ChatBot1",
                url: "/",
                icon: CommentOutlined
            },
            {
                title: "기능",
                url: "/",
                icon: AppstoreOutlined
            }
        ];
   
}  else if(location.pathname === "/home2"){
    headerNav =[
        {
            title: "ChatBot2",
            url: "/",
            icon: CommentOutlined
        },
        {
            title: "기능",
            url: "/",
            icon: AppstoreOutlined
        }
    ];
}else if(location.pathname === "/cal"){
    headerNav =[
        {
            title: "ChatBot3",
            url: "/",
            icon: CommentOutlined
        },
        {
            title: "기능",
            url: "/",
            icon: AppstoreOutlined
        }
    ];
}

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="header">
            <div className="header__inner">
                <div className="header__logo">
                    <a href="/">
                        <h1>team2</h1>
                    </a>
                </div>
                <nav className={`header__nav ${isMenuOpen ? "show" : ""}`}>
                    <ul>
                        {headerNav.map((item, index) => (
                            <li key={index}>
                                <a href={item.url}>
                                    <item.icon />
                                    <span>{item.title}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
                <button className="header__hamburger" onClick={toggleMenu} aria-label="메뉴 열기">
                    <MenuOutlined />
                </button>
            </div>
        </header>
    );
};

export default Header;
