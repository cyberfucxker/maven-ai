// ============================================
// BOXD-Style TextScramble — Ported to React
// Full-site glitch: on-scroll, on-hover, random ambient
// SAFE: skips form elements, terminal refs, dynamic lists
// ============================================

class TextScramble {
  el: HTMLElement;
  chars: string;
  queue: Array<{ from: string; to: string; start: number; end: number; char?: string }>;
  frame: number;
  frameRequest: number;
  resolve!: () => void;
  isRunning: boolean;
  originalText: string;

  constructor(el: HTMLElement) {
    this.el = el;
    this.chars = '!<>-_\\/[]{}—=+*^?#________';
    this.queue = [];
    this.frame = 0;
    this.frameRequest = 0;
    this.isRunning = false;
    this.originalText = el.innerText;
    this.update = this.update.bind(this);
  }

  setText(newText: string): Promise<void> {
    if (this.isRunning) return Promise.resolve();
    this.isRunning = true;
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise<void>((resolve) => (this.resolve = resolve));
    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 20);
      const end = start + Math.floor(Math.random() * 20);
      this.queue.push({ from, to, start, end });
    }
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }

  update() {
    let output = '';
    let complete = 0;
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end } = this.queue[i];
      let char = this.queue[i].char;
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += `<span class="glitch-char">${char}</span>`;
      } else {
        output += from;
      }
    }
    this.el.innerHTML = output;
    if (complete === this.queue.length) {
      this.isRunning = false;
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }

  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }

  destroy() {
    cancelAnimationFrame(this.frameRequest);
    this.isRunning = false;
  }
}

// ============================================
// ELEMENT SAFETY CHECKS
// ============================================

// Tags that should NEVER be glitched (form elements, interactive, etc.)
const EXCLUDED_TAGS = new Set([
  'INPUT', 'TEXTAREA', 'SELECT', 'OPTION', 'OPTGROUP',
  'SCRIPT', 'STYLE', 'NOSCRIPT', 'IFRAME', 'SVG', 'PATH',
  'IMG', 'VIDEO', 'AUDIO', 'CANVAS', 'OBJECT',
]);

// Classes that mark an element as excluded from glitching
const EXCLUDED_CLASSES = [
  'hero__terminal-text',    // terminal typewriter — managed by its own effect
  'hero__terminal-cursor',  // cursor animation
  'hero__terminal-prompt',  // the $ prompt
  'hero__terminal-dots',    // traffic light dots
  'hero__badge-dot',        // pulsing dot
  'hero__title-gradient',   // has complex inner HTML
  'nav__hamburger',         // hamburger lines
  'hero__stat-sep',         // separator divs (no text)
  'glitch-char',            // already a glitch char
];

// Parent classes — if an element is INSIDE these, skip it
const EXCLUDED_PARENT_CLASSES = [
  'hero__terminal',         // entire terminal block
  'contact__form',          // entire contact form (don't glitch inputs/labels)
  'nav__hamburger',         // hamburger button
  'portfolio__grid',        // ★ KEY FIX: don't glitch portfolio cards (React re-renders them)
];

function shouldSkipElement(el: HTMLElement): boolean {
  // Skip if element or any parent has data-glitch-skip
  if (el.dataset.glitchSkip || el.closest('[data-glitch-skip]')) return true;

  // Skip excluded tags
  if (EXCLUDED_TAGS.has(el.tagName)) return true;

  // Skip if element has an excluded class
  const classList = el.className || '';
  if (typeof classList === 'string') {
    for (const cls of EXCLUDED_CLASSES) {
      if (classList.includes(cls)) return true;
    }
  }

  // Skip if inside an excluded parent
  for (const parentCls of EXCLUDED_PARENT_CLASSES) {
    if (el.closest(`.${parentCls}`)) return true;
  }

  // Skip empty or very short text
  const text = el.innerText?.trim();
  if (!text || text.length < 2) return true;

  // Skip if has complex child elements (images, divs, etc.)
  const simpleChildTags = new Set(['SPAN', 'STRONG', 'EM', 'B', 'I', 'CODE', 'BR']);
  const hasComplexChildren = Array.from(el.children).some(
    (child) => !simpleChildTags.has(child.tagName)
  );
  if (hasComplexChildren && el.children.length > 0) return true;

  return false;
}

// ============================================
// GLITCH MANAGER
// ============================================

interface GlitchEntry {
  el: HTMLElement;
  fx: TextScramble;
  originalText: string;
  ambientTimer: ReturnType<typeof setTimeout> | null;
  isVisible: boolean;
  observer: IntersectionObserver | null;
}

const managedElements: GlitchEntry[] = [];

/**
 * Attach glitch behavior to a single element.
 */
function attachGlitch(el: HTMLElement) {
  if (el.dataset.glitchManaged) return;
  if (shouldSkipElement(el)) return;

  el.dataset.glitchManaged = 'true';
  const fx = new TextScramble(el);
  const entry: GlitchEntry = {
    el,
    fx,
    originalText: el.innerText.trim(),
    ambientTimer: null,
    isVisible: false,
    observer: null,
  };

  // --- HOVER GLITCH ---
  el.addEventListener('mouseenter', () => {
    if (!fx.isRunning && document.contains(el)) {
      fx.setText(entry.originalText);
    }
  });

  // --- SCROLL-INTO-VIEW GLITCH + AMBIENT SCHEDULING ---
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((obs) => {
        // Safety: if element no longer in DOM, clean up
        if (!document.contains(el)) {
          observer.disconnect();
          if (entry.ambientTimer) clearTimeout(entry.ambientTimer);
          return;
        }

        if (obs.isIntersecting && !el.dataset.glitched) {
          fx.setText(entry.originalText);
          el.dataset.glitched = 'true';
          entry.isVisible = true;
          scheduleAmbientGlitch(entry);
        } else if (obs.isIntersecting) {
          entry.isVisible = true;
          if (!entry.ambientTimer) scheduleAmbientGlitch(entry);
        } else {
          entry.isVisible = false;
          if (entry.ambientTimer) {
            clearTimeout(entry.ambientTimer);
            entry.ambientTimer = null;
          }
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
  );

  entry.observer = observer;
  observer.observe(el);
  managedElements.push(entry);
}

/**
 * Schedule random ambient glitch. 5–15s intervals.
 */
function scheduleAmbientGlitch(entry: GlitchEntry) {
  const randomDelay = 5000 + Math.random() * 10000;
  entry.ambientTimer = setTimeout(() => {
    // Safety check: element still in DOM?
    if (!document.contains(entry.el)) {
      entry.ambientTimer = null;
      return;
    }
    if (entry.isVisible && !entry.fx.isRunning) {
      entry.fx.setText(entry.originalText);
    }
    if (entry.isVisible) {
      scheduleAmbientGlitch(entry);
    } else {
      entry.ambientTimer = null;
    }
  }, randomDelay);
}

/**
 * Clean up stale references (elements removed from DOM).
 */
function cleanupStale() {
  for (let i = managedElements.length - 1; i >= 0; i--) {
    const entry = managedElements[i];
    if (!document.contains(entry.el)) {
      entry.fx.destroy();
      if (entry.ambientTimer) clearTimeout(entry.ambientTimer);
      if (entry.observer) entry.observer.disconnect();
      managedElements.splice(i, 1);
    }
  }
}

/**
 * Master init — scans the DOM and attaches glitch to safe text elements.
 */
export function initFullSiteGlitch() {
  // Clean stale first
  cleanupStale();

  // Target every meaningful text element
  const selectors = [
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'p', 'a', 'span', 'li', 'label', 'button',
    'code', 'strong', 'em', 'td', 'th', 'summary',
  ];

  const elements = document.querySelectorAll<HTMLElement>(selectors.join(', '));
  elements.forEach((el) => attachGlitch(el));
}

/**
 * React hook — call in your root App component.
 */
export function useFullSiteGlitch() {
  const init = () => {
    // Initial scan after React paints
    setTimeout(() => {
      initFullSiteGlitch();
    }, 300);

    // Re-scan periodically for dynamically added elements
    const rescanInterval = setInterval(() => {
      initFullSiteGlitch();
    }, 2000);

    return () => {
      clearInterval(rescanInterval);
      // Cleanup all managed elements
      managedElements.forEach((entry) => {
        entry.fx.destroy();
        if (entry.ambientTimer) clearTimeout(entry.ambientTimer);
        if (entry.observer) entry.observer.disconnect();
      });
      managedElements.length = 0;
    };
  };

  return init;
}

export { TextScramble };
