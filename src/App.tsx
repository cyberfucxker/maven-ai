import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Process from './components/Process';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { useFullSiteGlitch } from './hooks/useGlitch';
import './App.css';

function App() {
  const initGlitch = useFullSiteGlitch();

  useEffect(() => {
    // Scroll reveal animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));

    // Initialize full-site glitch (all text elements)
    const cleanupGlitch = initGlitch();

    return () => {
      observer.disconnect();
      cleanupGlitch();
    };
  }, [initGlitch]);

  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <Portfolio />
      <Process />
      <About />
      <Contact />
      <Footer />
    </>
  );
}

export default App;
