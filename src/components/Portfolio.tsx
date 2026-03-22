import { useState, useEffect, useRef } from 'react';
import './Portfolio.css';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  tags: string[];
  metric: string;
  metricLabel: string;
  color: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'FinFlow Dashboard',
    category: 'Web App',
    description: 'A real-time financial analytics dashboard with AI-powered forecasting, interactive charts, and automated reporting for enterprise clients.',
    tags: ['React', 'Python', 'AWS', 'D3.js'],
    metric: '3x',
    metricLabel: 'Faster Decisions',
    color: 'var(--accent)',
  },
  {
    id: 2,
    title: 'MedConnect',
    category: 'Mobile App',
    description: 'Telemedicine platform connecting patients with specialists. Features video consultations, prescription management, and health record integration.',
    tags: ['React Native', 'Node.js', 'MongoDB', 'WebRTC'],
    metric: '50K+',
    metricLabel: 'Active Users',
    color: 'var(--blue)',
  },
  {
    id: 3,
    title: 'ShopAI Assistant',
    category: 'AI Integration',
    description: 'Intelligent shopping assistant using NLP to understand customer queries, recommend products, and handle returns with conversational AI.',
    tags: ['OpenAI', 'LangChain', 'Next.js', 'Supabase'],
    metric: '40%',
    metricLabel: 'More Conversions',
    color: 'var(--purple)',
  },
  {
    id: 4,
    title: 'LogiTrack Pro',
    category: 'Web App',
    description: 'End-to-end logistics management system with real-time fleet tracking, route optimization, and automated dispatch scheduling.',
    tags: ['Vue.js', 'Go', 'PostgreSQL', 'MapBox'],
    metric: '60%',
    metricLabel: 'Cost Reduction',
    color: 'var(--cyan)',
  },
  {
    id: 5,
    title: 'EduVerse',
    category: 'Web App',
    description: 'Gamified e-learning platform with adaptive AI curriculum, real-time collaboration, and comprehensive analytics for educators.',
    tags: ['Next.js', 'TypeScript', 'Prisma', 'Stripe'],
    metric: '10K+',
    metricLabel: 'Students Enrolled',
    color: 'var(--orange)',
  },
  {
    id: 6,
    title: 'CloudSync CRM',
    category: 'SaaS',
    description: 'Modern CRM platform with AI-powered lead scoring, pipeline automation, and deep integration with existing business tools.',
    tags: ['React', 'FastAPI', 'Redis', 'GCP'],
    metric: '2x',
    metricLabel: 'Sales Velocity',
    color: 'var(--accent)',
  },
];

const categories = ['All', 'Web App', 'Mobile App', 'AI Integration', 'SaaS'];

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('All');
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  // Re-trigger reveal animation when filter changes
  useEffect(() => {
    if (!gridRef.current) return;
    // Small delay to let React render the new cards
    const timer = setTimeout(() => {
      const cards = gridRef.current?.querySelectorAll('.project-card');
      cards?.forEach((card, i) => {
        // Reset animation
        card.classList.remove('visible');
        // Stagger reveal
        setTimeout(() => {
          card.classList.add('visible');
        }, i * 80);
      });
    }, 50);
    return () => clearTimeout(timer);
  }, [activeFilter]);

  return (
    <section id="work" className="portfolio">
      <div className="portfolio__container">
        <div className="portfolio__header reveal">
          <span className="portfolio__label">
            <span style={{ color: 'var(--accent)' }}>$</span> projects --showcase
          </span>
          <h2 className="portfolio__title">Selected Work</h2>
          <p className="portfolio__subtitle">
            A curated selection of projects that showcase our capabilities across various industries and technologies.
          </p>
        </div>

        <div className="portfolio__filters reveal">
          {categories.map(cat => (
            <button
              key={cat}
              className={`portfolio__filter ${activeFilter === cat ? 'portfolio__filter--active' : ''}`}
              onClick={() => setActiveFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="portfolio__grid" ref={gridRef} key={activeFilter}>
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, i) => (
              <div
                key={project.id}
                className="project-card reveal"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="project-card__header">
                  <span className="project-card__category">{project.category}</span>
                  <div
                    className="project-card__metric"
                    style={{ color: project.color }}
                  >
                    <span className="project-card__metric-value">{project.metric}</span>
                    <span className="project-card__metric-label">{project.metricLabel}</span>
                  </div>
                </div>

                <h3 className="project-card__title">{project.title}</h3>
                <p className="project-card__desc">{project.description}</p>

                <div className="project-card__footer">
                  <div className="project-card__tags">
                    {project.tags.map(tag => (
                      <span key={tag} className="project-card__tag">{tag}</span>
                    ))}
                  </div>
                  <a
                    href="#contact"
                    className="project-card__link"
                    style={{ color: project.color }}
                  >
                    Details →
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="portfolio__empty">
              <p>No projects in this category yet. More coming soon!</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
