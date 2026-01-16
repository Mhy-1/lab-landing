import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sun,
  Moon,
  Globe,
  ExternalLink,
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
import { cn } from './lib/utils';
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

// ============================================
// HEADER COMPONENT
// ============================================
function Header() {
  const { theme, toggleTheme, language, toggleLanguage, t, isRTL } = useApp();
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
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-all duration-300',
        scrolled ? 'py-3' : 'py-5'
      )}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <nav
          className={cn(
            'flex items-center justify-between px-4 sm:px-6 py-3 rounded-2xl transition-all duration-300',
            scrolled ? 'glass shadow-lg' : 'bg-transparent'
          )}
        >
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
              <span className="text-white font-bold text-sm">L</span>
            </div>
            <span className="font-bold text-lg text-primary hidden sm:block">
              Lab<span className="text-accent">.</span>
            </span>
          </a>

          {/* Controls */}
          <div className="flex items-center gap-2">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="btn-ghost px-3 py-2 rounded-xl flex items-center gap-2"
              aria-label={t('accessibility.toggleLanguage')}
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">
                {language === 'ar' ? 'EN' : 'عربي'}
              </span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="btn-ghost p-2.5 rounded-xl"
              aria-label={t('accessibility.toggleTheme')}
            >
              <motion.div
                initial={false}
                animate={{ rotate: theme === 'dark' ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </motion.div>
            </button>

            {/* GitHub */}
            <a
              href="https://github.com/Mhy-1"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost p-2.5 rounded-xl hidden sm:flex"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
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
    <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-24 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -start-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -end-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="badge">
              <Sparkles className="w-3.5 h-3.5" />
              {t('hero.badge')}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-display mt-6 mb-6"
          >
            {language === 'ar' ? (
              <>
                <span className="text-primary">{t('hero.title')}</span>{' '}
                <span className="gradient-text">{t('hero.titleAccent')}</span>
              </>
            ) : (
              <>
                <span className="gradient-text">{t('hero.titleAccent')}</span>{' '}
                <span className="text-primary">{t('hero.title')}</span>
              </>
            )}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-body text-secondary max-w-xl mx-auto mb-10"
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center justify-center gap-8 sm:gap-12"
          >
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-primary">{projectCount}</div>
              <div className="text-micro text-muted uppercase tracking-wider mt-1">
                {t('hero.stats.projects')}
              </div>
            </div>
            <div className="w-px h-12 bg-border-subtle" />
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-accent">{projectCount}</div>
              <div className="text-micro text-muted uppercase tracking-wider mt-1">
                {t('hero.stats.ready')}
              </div>
            </div>
            <div className="w-px h-12 bg-border-subtle" />
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-primary">{techCount}+</div>
              <div className="text-micro text-muted uppercase tracking-wider mt-1">
                {t('hero.stats.technologies')}
              </div>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-16 flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="text-subtle"
            >
              <ChevronDown className="w-6 h-6" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// PROJECT CARD
// ============================================
function ProjectCard({ project, index }) {
  const { t, language } = useApp();
  const Icon = iconMap[project.icon] || Layers;
  const isLarge = project.size === 'large';

  const title = language === 'ar' ? project.titleAr : project.title;
  const description = language === 'ar' ? project.descriptionAr : project.description;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className={cn('group', isLarge && 'bento-large')}
    >
      <div className={cn('card h-full', project.colorClass)}>
        <div className="p-6 sm:p-8 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div
              className="w-12 h-12 rounded-xl project-accent flex items-center justify-center"
              style={{ backgroundColor: `rgb(var(--project-color))` }}
            >
              <Icon className="w-6 h-6 text-white" />
            </div>

            <div className="flex items-center gap-2">
              {project.featured && (
                <span className="badge text-xs">
                  <Star className="w-3 h-3" />
                  {t('projects.featured')}
                </span>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <h3 className="text-title text-primary mb-2 group-hover:text-accent transition-colors">
              {title}
            </h3>
            <p className="text-caption text-muted mb-4 line-clamp-2">
              {description}
            </p>

            {/* Tech tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tech.slice(0, 4).map((tech) => (
                <span key={tech} className="tag">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-4 border-t border-subtle">
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary flex-1"
            >
              {t('projects.viewProject')}
              <ArrowUpRight className="w-4 h-4" />
            </a>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary px-3"
                aria-label={t('projects.viewCode')}
              >
                <Github className="w-4 h-4" />
              </a>
            )}
          </div>
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
    <section id="projects" className="py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-10">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-headline text-primary"
          >
            {t('projects.title')}
          </motion.h2>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-2"
          >
            {filters.map((filter) => {
              const FilterIcon = categoryIcons[filter.id] || Layers;
              return (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all',
                    activeFilter === filter.id
                      ? 'bg-accent text-white'
                      : 'bg-surface text-secondary hover:text-primary border border-subtle'
                  )}
                >
                  <FilterIcon className="w-4 h-4" />
                  {filter.label}
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* Projects Grid */}
        <AnimatePresence mode="popLayout">
          <motion.div layout className="bento-grid">
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
    <footer className="py-8 border-t border-subtle">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-caption text-muted">
            © {year} mdajam.com · {t('footer.rights')}
          </p>
          <p className="text-caption text-muted flex items-center gap-2">
            {t('footer.madeWith')} <span className="text-red-500">❤️</span> {t('footer.using')}{' '}
            <span className="text-accent font-medium">React + Vite</span>
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
    <div className="min-h-screen bg-base relative noise">
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
