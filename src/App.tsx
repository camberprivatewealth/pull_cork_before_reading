import React, { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { IntroScreen } from "./screens/IntroScreen";
import { GameScreen } from "./screens/GameScreen";

export const App = (): JSX.Element => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // If user directly accesses /play, redirect to home
    if (location.pathname === '/play' && !sessionStorage.getItem('gameStarted')) {
      navigate('/');
    }
  }, [location, navigate]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<IntroScreen />} />
        <Route path="/play" element={<GameScreen />} />
        <Route path="*" element={<IntroScreen />} />
      </Routes>
    </AnimatePresence>
  );
};