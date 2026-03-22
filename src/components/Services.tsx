import './Services.css';

const services = [
  {
    icon: '🌐',
    title: 'Web Development',
    description: 'Modern, responsive websites and web applications built with cutting-edge technologies. From landing pages to complex SaaS platforms.',
    tags: ['React', 'Next.js', 'Node.js', 'TypeScript'],
    color: 'green',
  },
  {
    icon: '📱',
    title: 'Mobile Development',
    description: 'Cross-platform and native mobile applications that deliver seamless experiences across iOS and Android devices.',
    tags: ['React Native', 'Flutter', 'iOS', 'Android'],
    color: 'blue',
  },
  {
    icon: '🤖',
    title: 'AI Integration',
    description: 'Intelligent automation and AI-powered solutions. We integrate machine learning models, chatbots, and predictive analytics into your workflow.',
    tags: ['OpenAI', 'LangChain', 'Python', 'TensorFlow'],
    color: 'purple',
  },
  {
    icon: '⚡',
    title: 'Automation & APIs',
    description: 'Streamline your operations with custom automation pipelines, API development, and third-party integrations that save time and reduce errors.',
    tags: ['REST', 'GraphQL', 'Webhooks', 'CI/CD'],
    color: 'cyan',
  },
  {
    icon: '🎨',
    title: 'UI/UX Design',
    description: 'User-centered design that converts. We create intuitive interfaces backed by research, prototyping, and iterative testing.',
    tags: ['Figma', 'Prototyping', 'Design Systems', 'A/B Testing'],
    color: 'orange',
  },
  {
    icon: '☁️',
    title: 'Cloud & DevOps',
    description: 'Scalable cloud infrastructure and deployment pipelines. We ensure your applications are fast, secure, and always available.',
    tags: ['AWS', 'GCP', 'Docker', 'Kubernetes'],
    color: 'green',
  },
];

const colorMap: Record<string, string> = {
  green: 'var(--accent)',
  blue: 'var(--blue)',
  purple: 'var(--purple)',
  cyan: 'var(--cyan)',
  orange: 'var(--orange)',
};

const bgMap: Record<string, string> = {
  green: 'var(--accent-muted)',
  blue: 'var(--blue-muted)',
  purple: 'var(--purple-muted)',
  cyan: 'var(--cyan-muted)',
  orange: 'var(--orange-muted)',
};

export default function Services() {
  return (
    <section id="services" className="services">
      <div className="services__container">
        <div className="services__header reveal">
          <span className="services__label">
            <span style={{ color: 'var(--accent)' }}>$</span> services --list
          </span>
          <h2 className="services__title">What We Build</h2>
          <p className="services__subtitle">
            End-to-end digital solutions tailored to your business needs.
            From concept to deployment, we handle it all.
          </p>
        </div>

        <div className="services__grid">
          {services.map((service, i) => (
            <div
              key={service.title}
              className="service-card reveal"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div
                className="service-card__icon"
                style={{ background: bgMap[service.color] }}
              >
                {service.icon}
              </div>
              <h3 className="service-card__title">{service.title}</h3>
              <p className="service-card__desc">{service.description}</p>
              <div className="service-card__tags">
                {service.tags.map(tag => (
                  <span
                    key={tag}
                    className="service-card__tag"
                    style={{
                      borderColor: colorMap[service.color],
                      color: colorMap[service.color],
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
