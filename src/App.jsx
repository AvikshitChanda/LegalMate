import React, { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LocomotiveScroll from 'locomotive-scroll';
import './App.css';
import Landing from './pages/Landing Page/Landing';
import Chat from './pages/Chat Page/Chat';
import './utils/locomotive-scroll.css';

function App() {
  const scrollRef = useRef(null);

  useEffect(() => {
    const loader = document.querySelector("#loader");

    // Hide loader after 2.9 seconds
    setTimeout(() => {
      loader.style.top = "-100%";
    }, 3100);

    // Initialize Locomotive Scroll
    const scroll = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
    });

    // Cleanup on unmount
    return () => {
      if (scroll) scroll.destroy();
    };
  }, []);

  return (
    <Router>
      <div id="loader">
        <h1>Integrity</h1>
        <h1>Justice</h1>
        <h1>Expertise</h1>
      </div>
      
      <div id="scroll-container" ref={scrollRef} data-scroll-container>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/chat" element={<Chat />} />
          {/* Add more routes here as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
