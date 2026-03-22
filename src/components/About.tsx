import './About.css';

const techStack = [
  { name: 'React', icon: '⚛️' },
  { name: 'Next.js', icon: '▲' },
  { name: 'TypeScript', icon: '📘' },
  { name: 'Node.js', icon: '🟢' },
  { name: 'Python', icon: '🐍' },
  { name: 'PostgreSQL', icon: '🐘' },
  { name: 'AWS', icon: '☁️' },
  { name: 'Docker', icon: '🐳' },
  { name: 'OpenAI', icon: '🤖' },
  { name: 'Firebase', icon: '🔥' },
  { name: 'Figma', icon: '🎨' },
  { name: 'Git', icon: '📂' },
];

export default function About() {
  return (
    <section id="about" className="about">
      <div className="about__container">
        <div className="about__header reveal">
          <span className="about__label">
            <span style={{ color: 'var(--accent)' }}>$</span> about --team
          </span>
          <h2 className="about__title">About MAVEN AI</h2>
        </div>

        <div className="about__grid">
          <div className="about__story reveal">
            <p className="about__story-text">
              <strong>MAVEN AI</strong> (formerly Sysfotech) is a growing technology team
              providing modern digital solutions globally. We are a collective of{' '}
              <span style={{ color: 'var(--accent)' }}>developers, designers, and strategists</span>{' '}
              who believe that great software is built at the intersection of technical
              excellence and deep business understanding.
            </p>
            <p className="about__story-text">
              We don't just write code — we build systems that solve real problems.
              Every project we take on is an opportunity to create something that genuinely
              improves how businesses operate and how users interact with technology.
            </p>

            <div className="about__values">
              <div className="about__value">
                <h4>Quality First</h4>
                <p>We never compromise on code quality, testing, or user experience. Every line of code is crafted with care.</p>
              </div>
              <div className="about__value">
                <h4>Simple Design</h4>
                <p>Complexity is the enemy of reliability. We build clean, intuitive systems that users actually enjoy using.</p>
              </div>
              <div className="about__value">
                <h4>Reliable Systems</h4>
                <p>Our solutions are built to last. Scalable architecture, comprehensive testing, and robust infrastructure.</p>
              </div>
            </div>
          </div>

          <div className="about__tech reveal" style={{ transitionDelay: '200ms' }}>
            <h3 className="about__tech-title">Our Stack</h3>
            <div className="about__tech-grid">
              {techStack.map(tech => (
                <div key={tech.name} className="about__tech-item">
                  <span className="about__tech-icon">{tech.icon}</span>
                  <span className="about__tech-name">{tech.name}</span>
                </div>
              ))}
            </div>

            <div className="about__cta-card">
              <div className="about__cta-icon">🚀</div>
              <h4>Ready to build something great?</h4>
              <p>Let's turn your vision into a product that users love.</p>
              <a href="#contact" className="about__cta-btn">
                Get in Touch →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
