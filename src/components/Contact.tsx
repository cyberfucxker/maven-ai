import { useState, type FormEvent } from 'react';
import './Contact.css';

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    service: '',
    budget: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorStatus(false);

    try {
      // We are using Web3Forms (A free, reliable lead-gen API)
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "173ccb14-444e-4cea-a3d1-9b779cbd76dd", // Your direct Web3Forms Key
          subject: "New Lead from MAVEN AI Website",
          from_name: "MAVEN AI Contact Form",
          ...formState
        }),
      });

      const result = await response.json();
      if (result.success) {
        setSubmitted(true);
        setFormState({ name: '', email: '', service: '', budget: '', message: '' });
        setTimeout(() => setSubmitted(false), 4000);
      } else {
        setErrorStatus(true);
        setTimeout(() => setErrorStatus(false), 4000);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorStatus(true);
      setTimeout(() => setErrorStatus(false), 4000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact">
      <div className="contact__container">
        <div className="contact__grid">
          <div className="contact__info reveal">
            <span className="contact__label">
              <span style={{ color: 'var(--accent)' }}>$</span> contact --init
            </span>
            <h2 className="contact__title">Let's Build<br />Something Great</h2>
            <p className="contact__subtitle">
              Have a project in mind? Let's discuss how we can turn your vision
              into reality. No commitment, just honest conversation.
            </p>

            <div className="contact__details">
              <div className="contact__detail">
                <span className="contact__detail-icon">📧</span>
                <div>
                  <span className="contact__detail-label">Email</span>
                  <a href="mailto:hello@maven-ai.dev" className="contact__detail-value">
                    hello@maven-ai.dev
                  </a>
                </div>
              </div>
              <div className="contact__detail">
                <span className="contact__detail-icon">📍</span>
                <div>
                  <span className="contact__detail-label">Location</span>
                  <span className="contact__detail-value">Global · Remote First</span>
                </div>
              </div>
              <div className="contact__detail">
                <span className="contact__detail-icon">⏰</span>
                <div>
                  <span className="contact__detail-label">Response Time</span>
                  <span className="contact__detail-value">Within 24 hours</span>
                </div>
              </div>
            </div>
          </div>

          <form className="contact__form reveal" onSubmit={handleSubmit} style={{ transitionDelay: '200ms' }}>
            <div className="contact__form-row">
              <div className="contact__field">
                <label htmlFor="contact-name">Name</label>
                <input
                  id="contact-name"
                  type="text"
                  placeholder="Your name"
                  value={formState.name}
                  onChange={e => setFormState(s => ({ ...s, name: e.target.value }))}
                  required
                />
              </div>
              <div className="contact__field">
                <label htmlFor="contact-email">Email</label>
                <input
                  id="contact-email"
                  type="email"
                  placeholder="you@company.com"
                  value={formState.email}
                  onChange={e => setFormState(s => ({ ...s, email: e.target.value }))}
                  required
                />
              </div>
            </div>

            <div className="contact__form-row">
              <div className="contact__field">
                <label htmlFor="contact-service">Service</label>
                <select
                  id="contact-service"
                  value={formState.service}
                  onChange={e => setFormState(s => ({ ...s, service: e.target.value }))}
                  required
                >
                  <option value="">Select a service</option>
                  <option value="web">Web Development</option>
                  <option value="mobile">Mobile Development</option>
                  <option value="ai">AI Integration</option>
                  <option value="automation">Automation & APIs</option>
                  <option value="design">UI/UX Design</option>
                  <option value="cloud">Cloud & DevOps</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="contact__field">
                <label htmlFor="contact-budget">Budget Range</label>
                <select
                  id="contact-budget"
                  value={formState.budget}
                  onChange={e => setFormState(s => ({ ...s, budget: e.target.value }))}
                >
                  <option value="">Select budget</option>
                  <option value="5k-10k">$5,000 - $10,000</option>
                  <option value="10k-25k">$10,000 - $25,000</option>
                  <option value="25k-50k">$25,000 - $50,000</option>
                  <option value="50k+">$50,000+</option>
                </select>
              </div>
            </div>

            <div className="contact__field">
              <label htmlFor="contact-message">Tell us about your project</label>
              <textarea
                id="contact-message"
                rows={5}
                placeholder="Describe your project, timeline, and any specific requirements..."
                value={formState.message}
                onChange={e => setFormState(s => ({ ...s, message: e.target.value }))}
                required
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || submitted}
              className={`contact__submit ${submitted ? 'contact__submit--sent' : ''} ${errorStatus ? 'contact__submit--error' : ''}`}
            >
              {isSubmitting ? 'Sending...' : 
               submitted ? '✓ Message Sent!' : 
               errorStatus ? '❌ Failed. Try Again.' : 
               'Send Message →'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
