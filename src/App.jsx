import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from 'react'
import HomeView from "./views/Homeview";
import LogoScreen from "./components/LogoScreen";

const App = () => {
  const [showLogoScreen, setShowLogoScreen] = useState(true);

  useEffect(() => {
    const checkServerStartTime = async () => {
      try {
        const response = await fetch('/api/server-start-time');
        const data = await response.json();
        const serverStartTime = new Date(data.startTime);
        const lastVisitTime = new Date(localStorage.getItem('lastVisitTime'));

        if (isNaN(lastVisitTime.getTime()) || serverStartTime > lastVisitTime) {
          const timer = setTimeout(() => {
            setShowLogoScreen(false);
            localStorage.setItem('lastVisitTime', new Date().toISOString());
          }, 1500);

          return () => clearTimeout(timer);
        } else {
          setShowLogoScreen(false);
        }
      } catch (error) {
        console.error('Error checking server start time:', error);
        setShowLogoScreen(false);
      }
    };

    checkServerStartTime();
  }, []);

  return (
    <BrowserRouter>
      {showLogoScreen ? (
        <LogoScreen />
      ) : (
        <Routes>
          <Route path="/" element={<HomeView />} />
        </Routes>
      )}
    </BrowserRouter>
  );
};

export default App;