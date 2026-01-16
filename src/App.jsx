import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sun,
  Moon,
  Globe,
  Github,
  ArrowUpRight,
  Sparkles,
  Workflow,
  FileText,
  BarChart3,
  Building2,
  Linkedin,
  FileCode,
  Fuel,
  Stethoscope,
  Star,
  ChevronDown,
  Zap,
  Briefcase,
  Wrench,
  Layers
} from 'lucide-react';
import { AppProvider, useApp } from './context/AppContext';
import projectsData from './data/projects.json';

// Icon mapping
const iconMap = {
  Stethoscope, Workflow, Building2, Linkedin,
  FileText, BarChart3, FileCode, Fuel
};

const categoryIcons = {
  all: Layers,
  ai: Zap,
  enterprise: Briefcase,
  tools: Wrench,
  showcase: Star
};

// Project color mapping
const projectColors = {
  'project-rameem': 'var(--project-rameem)',
  'project-flowforge': 'var(--project-flowforge)',
  'project-ems': 'var(--project-ems)',
  'project-linkedin': 'var(--project-linkedin)',
  'project-resume': 'var(--project-resume)',
  'project-survey': 'var(--project-survey)',
  'project-eform': 'var(--project-eform)',
  'project-fuelwell': 'var(--project-fuelwell)'
};

// ============================================
// HEADER COMPONENT
// ============================================
function Header() {
  const { theme, toggleTheme, language, toggleLanguage, t } = useApp();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`header ${scrolled ? 'scrolled' : ''}`}
    >
      <div className="container">
        <nav className="header-nav">
          <a href="/" className="logo">
            <div className="logo-icon">L</div>
            <span className="logo-text">Lab<span>.</span></span>
          </a>

          <div className="header-controls">
            <button
              onClick={toggleLanguage}
              className="icon-btn lang-btn"
              aria-label={t('accessibility.toggleLanguage')}
            >
              <Globe />
              <span>{language === 'ar' ? 'EN' : 'عربي'}</span>
            </button>

            <button
              onClick={toggleTheme}
              className="icon-btn"
              aria-label={t('accessibility.toggleTheme')}
            >
              <motion.div
                initial={false}
                animate={{ rotate: theme === 'dark' ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {theme === 'dark' ? <Sun /> : <Moon />}
              </motion.div>
            </button>

            <a
              href="https://github.com/Mhy-1"
              target="_blank"
              rel="noopener noreferrer"
              className="icon-btn"
              aria-label="GitHub"
            >
              <Github />
            </a>
          </div>
        </nav>
      </div>
    </motion.header>
  );
}

// ============================================
// HERO SECTION
// ============================================
function Hero() {
  const { t, language } = useApp();
  const projectCount = projectsData.projects.length;
  const techCount = [...new Set(projectsData.projects.flatMap(p => p.tech))].length;

  return (
    <section className="hero">
      <div className="hero-bg">
        <div className="hero-blob hero-blob-1" />
        <div className="hero-blob hero-blob-2" />
      </div>

      <div className="container">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="badge">
            <Sparkles />
            {t('hero.badge')}
          </div>

          <h1 className="hero-title">
            {language === 'ar' ? (
              <>
                {t('hero.title')}{' '}
                <span className="hero-title-accent">{t('hero.titleAccent')}</span>
              </>
            ) : (
              <>
                <span className="hero-title-accent">{t('hero.titleAccent')}</span>{' '}
                {t('hero.title')}
              </>
            )}
          </h1>

          <p className="hero-subtitle">{t('hero.subtitle')}</p>

          <div className="hero-stats">
            <div className="stat">
              <div className="stat-value">{projectCount}</div>
              <div className="stat-label">{t('hero.stats.projects')}</div>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <div className="stat-value accent">{projectCount}</div>
              <div className="stat-label">{t('hero.stats.ready')}</div>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <div className="stat-value">{techCount}+</div>
              <div className="stat-label">{t('hero.stats.technologies')}</div>
            </div>
          </div>

          <motion.div
            className="scroll-indicator"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================
// PROJECT CARD - New Design with Image
// ============================================
function ProjectCard({ project, index }) {
  const { t, language } = useApp();
  const Icon = iconMap[project.icon] || Layers;
  const iconColor = projectColors[project.colorClass] || 'var(--primary)';

  const title = language === 'ar' ? project.titleAr : project.title;
  const description = language === 'ar' ? project.descriptionAr : project.description;
  const categoryLabel = language === 'ar' ? project.categoryLabelAr : project.categoryLabel;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="project-card"
    >
      {/* Card Image Section */}
      <div className="card-image">
        {project.image ? (
          <img
            src={project.image}
            alt={title}
            loading="lazy"
          />
        ) : (
          <div className="card-image-placeholder">
            <div className="placeholder-icon" style={{ background: iconColor }}>
              <Icon />
            </div>
          </div>
        )}

        {/* Category Badge */}
        <span className="category-badge">{categoryLabel}</span>

        {/* Featured Badge */}
        {project.featured && (
          <div className="featured-badge">
            <Star />
            {t('projects.featured')}
          </div>
        )}
      </div>

      {/* Card Content Section */}
      <div className="card-content">
        <div className="card-header">
          <div className="card-icon" style={{ background: iconColor }}>
            <Icon />
          </div>
          <h3 className="card-title">{title}</h3>
        </div>

        <p className="card-description">{description}</p>

        <div className="card-tags">
          {project.tech.slice(0, 4).map((tech) => (
            <span key={tech} className="tag">{tech}</span>
          ))}
        </div>

        <div className="card-actions">
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            {t('projects.viewProject')}
            <ArrowUpRight />
          </a>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              aria-label={t('projects.viewCode')}
            >
              <Github />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

// ============================================
// PROJECTS SECTION
// ============================================
function Projects() {
  const { t } = useApp();
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: t('projects.filter.all') },
    { id: 'ai', label: t('projects.filter.ai') },
    { id: 'enterprise', label: t('projects.filter.enterprise') },
    { id: 'tools', label: t('projects.filter.tools') },
  ];

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return projectsData.projects;
    return projectsData.projects.filter(p => p.category === activeFilter);
  }, [activeFilter]);

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <div className="section-header">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="section-title"
          >
            {t('projects.title')}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="filters"
          >
            {filters.map((filter) => {
              const FilterIcon = categoryIcons[filter.id] || Layers;
              return (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
                >
                  <FilterIcon />
                  {filter.label}
                </button>
              );
            })}
          </motion.div>
        </div>

        <AnimatePresence mode="popLayout">
          <motion.div layout className="projects-grid">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

// ============================================
// FOOTER
// ============================================
function Footer() {
  const { t } = useApp();
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <p className="footer-text">
            © {year} mdajam.com · {t('footer.rights')}
          </p>
          <p className="footer-text">
            {t('footer.madeWith')} <span>React + Vite</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

// ============================================
// MAIN APP
// ============================================
function AppContent() {
  return (
    <div>
      <Header />
      <main>
        <Hero />
        <Projects />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
