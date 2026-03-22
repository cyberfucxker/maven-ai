import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__grid">
          <div className="footer__brand">
            <a href="/" className="footer__logo">
              <span className="footer__logo-icon">◆</span>
              <span>MAVEN</span>
              <span className="footer__logo-ai">AI</span>
            </a>
            <p className="footer__brand-desc">
              Modern digital solutions. Quality-first development.
              Building the future, one product at a time.
            </p>
            <div className="footer__socials">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="footer__social">
                GH
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="footer__social">
                LI
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="footer__social">
                X
              </a>
            </div>
          </div>

          <div className="footer__links">
            <h4>Services</h4>
            <a href="#services">Web Development</a>
            <a href="#services">Mobile Development</a>
            <a href="#services">AI Integration</a>
            <a href="#services">Cloud & DevOps</a>
          </div>

          <div className="footer__links">
            <h4>Company</h4>
            <a href="#about">About</a>
            <a href="#work">Portfolio</a>
            <a href="#process">Process</a>
            <a href="#contact">Contact</a>
          </div>

          <div className="footer__links">
            <h4>Legal</h4>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} MAVEN AI. All rights reserved.</p>
          <p className="footer__bottom-tag">
            Crafted with <span style={{ color: 'var(--accent)' }}>precision</span> and <span style={{ color: 'var(--accent)' }}>care</span>.
          </p>
        </div>
      </div>
    </footer>
  );
}
