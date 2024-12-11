import React from "react";
import "../styles/Header.css";
import mainImg from "../img/main.png"

const Header = () => (
    <header className="header">
        
        <div className="others">
            <h1 className="store-title"> <span className="line">⸻</span>ㅤ Chocolate Storeㅤ <span className="line">⸻</span></h1>
            <p className="store-subtitle">Explore Our Chocolates</p>
            <img className="main-img" src={mainImg} alt="main-img" />
            
        </div>
    </header>
);

export default Header;
