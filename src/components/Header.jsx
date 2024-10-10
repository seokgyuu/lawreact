import React, { useState } from "react";
import { CommentOutlined, AppstoreOutlined, MenuOutlined } from "@ant-design/icons";

const headerNav = [
    {
        title: "ChatBot",
        url: "#Comant1",
        icon: CommentOutlined
    },
    {
        title: "기능",
        url: "#Comant",
        icon: AppstoreOutlined
    }
];

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="header">
            <div className="header__inner">
                <div className="header__logo">
                    <a href="/home">
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
