import React, { useState } from "react";
import { CalculatorOutlined, CommentOutlined, AppstoreOutlined } from "@ant-design/icons";

const headerNav = [
    {
        title: "ChatBot",
        url: "#Comant1",
        toggle: true,
        icon: () => <CommentOutlined />
    },
    {
        title: "Cal",
        url: "#Cal",
        toggle: true,
        icon: () => <CalculatorOutlined />
    },
    {
        title: "기능3",
        url: "#Comant3",
        toggle: true,
        icon: () => <AppstoreOutlined />
    }
];

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false); // 햄버거 메뉴 열림/닫힘 상태

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen); // 햄버거 메뉴 열림/닫힘 상태 토글
    };

    return (
        <header id="header" role="banner" className="header__inner">
            <div className="header__logo">
                <a href="/">
                    <h1>team2</h1>
                </a>
            </div>
            <nav className={`header__nav ${isMenuOpen ? "show" : ""}`}>
                <ul className="nav-buttons">
                    {headerNav.map((item, index) => (
                        item.toggle && (
                            <li key={index}>
                                <a href={item.url}>
                                    {item.icon && item.icon()} {item.title}
                                </a>
                            </li>
                        )
                    ))}
                </ul>
            </nav>
            <div className="header__nav__mobile hamburger-menu" onClick={toggleMenu}>
                <span />
                <span />
                <span />
            </div>
        </header>
    );
};

export default Header;
