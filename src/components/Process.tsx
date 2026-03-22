import './Process.css';

const steps = [
  {
    num: '01',
    title: 'Discovery',
    description: 'We dive deep into your business goals, target audience, and technical requirements through collaborative workshops and research.',
    details: ['Requirements gathering', 'Market research', 'Technical feasibility', 'Project scoping'],
  },
  {
    num: '02',
    title: 'Design',
    description: 'Creating wireframes, prototypes, and visual designs that align with your brand identity and deliver exceptional user experiences.',
    details: ['Wireframing', 'UI/UX design', 'Prototype testing', 'Design system creation'],
  },
  {
    num: '03',
    title: 'Develop',
    description: 'Building your solution with clean, scalable code using modern technologies. Agile sprints ensure continuous progress and feedback.',
    details: ['Sprint planning', 'Clean architecture', 'Code reviews', 'Continuous integration'],
  },
  {
    num: '04',
    title: 'Deploy & Scale',
    description: 'Launching your product with confidence. We handle infrastructure, monitoring, and ongoing optimization to ensure peak performance.',
    details: ['Cloud deployment', 'Performance tuning', 'Analytics setup', '24/7 monitoring'],
  },
];

export default function Process() {
  return (
    <section id="process" className="process">
      <div className="process__container">
        <div className="process__header reveal">
          <span className="process__label">
            <span style={{ color: 'var(--accent)' }}>$</span> workflow --steps
          </span>
          <h2 className="process__title">How We Work</h2>
          <p className="process__subtitle">
            A proven, transparent process that keeps you in control at every stage.
          </p>
        </div>

        <div className="process__timeline">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className="process-step reveal"
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="process-step__indicator">
                <span className="process-step__num">{step.num}</span>
                {i < steps.length - 1 && <div className="process-step__line"></div>}
              </div>
              <div className="process-step__content">
                <h3 className="process-step__title">{step.title}</h3>
                <p className="process-step__desc">{step.description}</p>
                <div className="process-step__details">
                  {step.details.map(detail => (
                    <span key={detail} className="process-step__detail">
                      <span style={{ color: 'var(--accent)' }}>✓</span> {detail}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
