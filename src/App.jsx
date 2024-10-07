import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HomeView from "./views/Homeview";
import LogoScreen from "./components/LogoScreen";  


const App = () => {
  const [showLogoScreen , setShowLogoScreen] = useState(true);

  useEffect(()=>{
    const timer = setTimeout(()=>{
      setShowLogoScreen(false);
    },0);

    return () => clearTimeout(timer);
  },[]);

  return (
      <BrowserRouter>
        {showLogoScreen?(
          <LogoScreen/>
        ):(
        <Routes>
            <Route path="/" element={<HomeView/>}/>
        </Routes>
        )}
      </BrowserRouter>
  );
};

export default App;
