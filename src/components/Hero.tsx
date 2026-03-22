import { useEffect, useRef } from 'react';
import './Hero.css';

export default function Hero() {
  const terminalRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const commands = [
      'maven init --project "Your Vision"',
      'maven deploy --scale global',
      'maven optimize --ai-powered',
      'maven build --quality first',
    ];
    let cmdIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const type = () => {
      const el = terminalRef.current;
      if (!el) return;

      const currentCmd = commands[cmdIndex];

      if (!isDeleting) {
        el.textContent = currentCmd.slice(0, charIndex + 1);
        charIndex++;
        if (charIndex === currentCmd.length) {
          isDeleting = true;
          timeoutId = setTimeout(type, 2000);
          return;
        }
        timeoutId = setTimeout(type, 60);
      } else {
        el.textContent = currentCmd.slice(0, charIndex);
        charIndex--;
        if (charIndex === 0) {
          isDeleting = false;
          cmdIndex = (cmdIndex + 1) % commands.length;
          timeoutId = setTimeout(type, 500);
          return;
        }
        timeoutId = setTimeout(type, 30);
      }
    };

    timeoutId = setTimeout(type, 1000);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <section className="hero" id="hero">
      <div className="hero__container">
        <div className="hero__badge reveal">
          <span className="hero__badge-dot"></span>
          Available for new projects
        </div>

        {/* data-glitch-skip prevents the glitch system from breaking this element's children */}
        <h1 className="hero__title reveal" data-glitch-skip="true">
          We build{' '}
          <span className="hero__title-gradient">digital products</span>
          <br />that drive growth
        </h1>

        <p className="hero__subtitle reveal">
          MAVEN AI is a technology team providing modern digital solutions globally.
          We focus on quality, simple design, and reliable software systems that
          scale with your business.
        </p>

        {/* Terminal is excluded from glitch via EXCLUDED_PARENT_CLASSES */}
        <div className="hero__terminal reveal">
          <div className="hero__terminal-header">
            <div className="hero__terminal-dots">
              <span></span><span></span><span></span>
            </div>
            <span className="hero__terminal-title">terminal</span>
          </div>
          <div className="hero__terminal-body">
            <span className="hero__terminal-prompt">$</span>
            <span className="hero__terminal-text" ref={terminalRef}></span>
            <span className="hero__terminal-cursor">▊</span>
          </div>
        </div>

        <div className="hero__actions reveal">
          <a href="#contact" className="hero__btn-primary">
            Start Your Journey
            <span className="hero__btn-arrow">→</span>
          </a>
          <a href="#work" className="hero__btn-secondary">
            View Our Work
          </a>
        </div>

        <div className="hero__stats reveal">
          <div className="hero__stat">
            <span className="hero__stat-value">50+</span>
            <span className="hero__stat-label">Projects Delivered</span>
          </div>
          <div className="hero__stat-sep"></div>
          <div className="hero__stat">
            <span className="hero__stat-value">98%</span>
            <span className="hero__stat-label">Client Satisfaction</span>
          </div>
          <div className="hero__stat-sep"></div>
          <div className="hero__stat">
            <span className="hero__stat-value">24/7</span>
            <span className="hero__stat-label">Support Available</span>
          </div>
        </div>
      </div>
    </section>
  );
}
