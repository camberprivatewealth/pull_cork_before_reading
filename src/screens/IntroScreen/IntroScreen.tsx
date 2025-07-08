import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import bgIntro from '../../assets/bg-intro.png';

export const IntroScreen = (): JSX.Element => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const slides = [
    {
      content:
        'RESEARCH SHOWS THAT TALKING ABOUT MONEY WITH FRIENDS AND FAMILY CAN BUILD CLARITY, TRUST, AND A STRONGER SENSE OF WELL-BEING.',
      cta: 'READY?',
    },
    {
      mainContent:
        'IT STARTED WITH A QUESTION: "IF MONEY WERE NO OBJECT, WHAT WOULD YOU DO WITH YOUR LIFE?"',
      subContent:
        "WE SENT THAT QUESTION TO CLIENTS ALONG WITH A BOTTLE OF WHISPERING ANGEL ROSÉ AND A DECK OF CARDS--A GIFT MEANT TO BE OPENED, SHARED, AND DISCUSSED OVER DINNER.\n\nTHE WINE'S NOT INCLUDED THIS TIME. BUT YOU CAN STILL PULL YOUR OWN CORK. THE QUESTIONS ARE JUST AS GOOD.",
      cta: 'CONTINUE',
    },
    {
      content:
        'DRAW A CARD.\nREAD IT OUT LOUD.\nANSWER FIRST.\nLET THE GROUP RESPOND.\n\nCLICK ANYWHERE OR PRESS SPACE TO MOVE FORWARD.\nBACKSPACE TO GO BACK.',
      cta: "LET'S BEGIN",
    },
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    } else {
      sessionStorage.setItem('gameStarted', 'true');
      navigate('/play');
    }
  };

  const renderSlideContent = (slide: any) => {
    if (slide.mainContent) {
      return (
        <>
          <p className="text-[#D46235] text-xl md:text-4xl lg:text-5xl font-light mb-8 md:mb-12 leading-relaxed whitespace-pre-line">
            {slide.mainContent}
          </p>
          <p className="text-[#D46235] text-lg md:text-2xl lg:text-3xl font-light mb-12 md:mb-20 leading-relaxed whitespace-pre-line">
            {slide.subContent}
          </p>
        </>
      );
    }
    return (
      <p className="text-[#D46235] text-xl md:text-4xl lg:text-5xl font-light mb-12 md:mb-20 leading-relaxed whitespace-pre-line">
        {slide.content}
      </p>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[#EAE6E4] flex flex-col items-center justify-center w-full h-screen cursor-pointer text-center px-4 md:px-8 relative overflow-hidden"
      onClick={handleNext}
    >
      {/* Animated Background */}
      <motion.img
        src={bgIntro}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none"
        animate={{
          x: (mousePosition.x - 0.5) * 80,
          y: (mousePosition.y - 0.5) * 80,
        }}
        transition={{ type: 'spring', stiffness: 30, damping: 20 }}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="max-w-[800px] relative z-10"
        >
          {renderSlideContent(slides[currentSlide])}

          <div className="flex flex-col items-center gap-6 md:gap-8">
            <p className="text-[#D46235] text-xl md:text-3xl font-light">
              {slides[currentSlide].cta}
            </p>
            <p className="text-[#D46235] text-xs md:text-sm font-light opacity-60">
              click anywhere to{' '}
              {currentSlide < slides.length - 1 ? 'continue' : 'start'}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Progress Dots */}
      <div className="absolute bottom-8 flex gap-2 z-10">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentSlide ? 'bg-[#D46235]' : 'bg-[#D46235]/30'
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
};