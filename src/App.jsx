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
  ChevronLeft,
  ChevronRight,
  Zap,
  Briefcase,
  Wrench,
  Layers,
  Lock,
  ExternalLink,
  Search,
  SortAsc,
  SortDesc,
  GraduationCap,
  User,
  Users,
  X,
  Mail,
  MapPin
} from 'lucide-react';
import { AppProvider, useApp } from './context/AppContext';
import projectsData from './data/projects.json';

// Icon mapping
const iconMap = {
  Stethoscope, Workflow, Building2, Linkedin,
  FileText, BarChart3, FileCode, Fuel, Sparkles
};

const categoryIcons = {
  all: Layers,
  ai: Zap,
  enterprise: Briefcase,
  tools: Wrench,
  showcase: Star
};

const typeIcons = {
  client: Users,
  personal: User,
  graduation: GraduationCap
};

// Tech Stack Icons mapping (using simple colored badges with tooltips)
const techColors = {
  'React': '#61DAFB',
  'Next.js': '#000000',
  'TypeScript': '#3178C6',
  'JavaScript': '#F7DF1E',
  'Vite': '#646CFF',
  'TailwindCSS': '#06B6D4',
  'Framer Motion': '#FF0055',
  'i18n': '#26A69A',
  'Prisma': '#2D3748',
  'PostgreSQL': '#336791',
  'SQLite': '#003B57',
  'Express': '#000000',
  'NestJS': '#E0234E',
  'Gemini AI': '#8E75B2',
  'AI/OCR': '#FF6F00',
  'React Flow': '#FF0072',
  'Genkit': '#4285F4',
  'Node.js': '#339933',
  'MongoDB': '#47A248'
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
  'project-fuelwell': 'var(--project-fuelwell)',
  'project-sparkles': '#FF6B9D'
};

// ============================================
// TECH BADGE COMPONENT
// ============================================
function TechBadge({ tech }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const color = techColors[tech] || '#6B7280';

  return (
    <div
      className="tech-badge-wrapper"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div
        className="tech-badge"
        style={{
          backgroundColor: `${color}20`,
          borderColor: `${color}40`
        }}
      >
        <span
          className="tech-dot"
          style={{ backgroundColor: color }}
        />
        <span className="tech-name">{tech}</span>
      </div>
      {showTooltip && (
        <div className="tech-tooltip">
          {tech}
        </div>
      )}
    </div>
  );
}

// ============================================
// IMAGE CAROUSEL COMPONENT
// ============================================
function ImageCarousel({ images, title }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="carousel-placeholder">
        <Layers size={48} />
      </div>
    );
  }

  if (images.length === 1) {
    return (
      <img
        src={images[0]}
        alt={title}
        loading="lazy"
        className="carousel-single-image"
      />
    );
  }

  const nextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="carousel">
      <img
        src={images[currentIndex]}
        alt={`${title} - ${currentIndex + 1}`}
        loading="lazy"
        className="carousel-image"
      />

      <button
        className="carousel-btn carousel-btn-prev"
        onClick={prevImage}
        aria-label="Previous image"
      >
        <ChevronLeft size={20} />
      </button>

      <button
        className="carousel-btn carousel-btn-next"
        onClick={nextImage}
        aria-label="Next image"
      >
        <ChevronRight size={20} />
      </button>

      <div className="carousel-dots">
        {images.map((_, idx) => (
          <button
            key={idx}
            className={`carousel-dot ${idx === currentIndex ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setCurrentIndex(idx);
            }}
            aria-label={`Go to image ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

// ============================================
// GITHUB BADGE COMPONENT
// ============================================
function GitHubBadge({ isPublic, githubUrl, t }) {
  if (isPublic && githubUrl) {
    return (
      <a
        href={githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="github-badge github-badge-public"
      >
        <Github size={14} />
        <span>{t('projects.public')}</span>
        <ExternalLink size={12} />
      </a>
    );
  }

  return (
    <div className="github-badge github-badge-private">
      <Lock size={14} />
      <span>{t('projects.private')}</span>
    </div>
  );
}

// ============================================
// TYPE BADGE COMPONENT
// ============================================
function TypeBadge({ type, label }) {
  const TypeIcon = typeIcons[type] || User;

  return (
    <div className={`type-badge type-badge-${type}`}>
      <TypeIcon size={14} />
      <span>{label}</span>
    </div>
  );
}

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
            <div className="logo-icon">
              <span className="logo-icon-text">{t('logo')}</span>
            </div>
          </a>

          <div className="header-controls">
            <button
              onClick={toggleLanguage}
              className="nav-icon-btn"
              aria-label={t('accessibility.toggleLanguage')}
            >
              <Globe size={20} />
            </button>

            <button
              onClick={toggleTheme}
              className="nav-icon-btn"
              aria-label={t('accessibility.toggleTheme')}
            >
              <motion.div
                initial={false}
                animate={{ rotate: theme === 'dark' ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </motion.div>
            </button>

            <a
              href="https://github.com/Mhy-1"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-icon-btn"
              aria-label="GitHub Profile"
            >
              <Github size={20} />
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
  const clientCount = projectsData.projects.filter(p => p.type === 'client').length;

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
            <Sparkles size={16} />
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
              <div className="stat-value accent">{clientCount}</div>
              <div className="stat-label">{t('hero.stats.clients')}</div>
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
            <ChevronDown size={24} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================
// PROJECT CARD - New Design with all features
// ============================================
function ProjectCard({ project, index }) {
  const { t, language } = useApp();
  const [isHovered, setIsHovered] = useState(false);
  const Icon = iconMap[project.icon] || Layers;
  const iconColor = projectColors[project.colorClass] || 'var(--primary)';

  const title = language === 'ar' ? project.titleAr : project.title;
  const description = language === 'ar' ? project.descriptionAr : project.description;
  const typeLabel = language === 'ar' ? project.typeLabelAr : project.typeLabel;
  const viewLabel = language === 'ar' ? project.viewLabelAr : project.viewLabel;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className={`project-card ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card Image Section with Carousel */}
      <div className="card-image">
        <ImageCarousel images={project.images} title={title} />

        {/* Badges overlay */}
        <div className="card-badges">
          <TypeBadge type={project.type} label={typeLabel} />
          {project.featured && (
            <div className="featured-badge">
              <Star size={12} />
              <span>{t('projects.featured')}</span>
            </div>
          )}
        </div>

        {/* Hover overlay with quick info */}
        <motion.div
          className="card-hover-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="hover-content">
            <span className="hover-year">{project.year}</span>
            <div className="hover-tech">
              {project.tech.slice(0, 3).map((tech) => (
                <span key={tech} className="hover-tech-item">{tech}</span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Card Content Section */}
      <div className="card-content">
        <div className="card-header">
          <div className="card-icon" style={{ background: iconColor }}>
            <Icon size={20} />
          </div>
          <div className="card-title-section">
            <h3 className="card-title">{title}</h3>
            <GitHubBadge
              isPublic={project.isPublic}
              githubUrl={project.githubUrl}
              t={t}
            />
          </div>
        </div>

        <p className="card-description">{description}</p>

        {/* Tech Stack with icons */}
        <div className="card-tech">
          {project.tech.slice(0, 4).map((tech) => (
            <TechBadge key={tech} tech={tech} />
          ))}
          {project.tech.length > 4 && (
            <span className="tech-more">+{project.tech.length - 4}</span>
          )}
        </div>

        {/* Actions */}
        <div className="card-actions">
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            {project.viewType === 'website' ? (
              <ExternalLink size={18} />
            ) : (
              <ArrowUpRight size={18} />
            )}
            {viewLabel}
          </a>
        </div>
      </div>
    </motion.article>
  );
}

// ============================================
// SEARCH & FILTER BAR
// ============================================
function SearchFilterBar({
  searchTerm,
  setSearchTerm,
  activeFilter,
  setActiveFilter,
  activeType,
  setActiveType,
  sortOrder,
  setSortOrder,
  projectCounts
}) {
  const { t, language } = useApp();

  const categoryFilters = [
    { id: 'all', label: t('projects.filter.all'), count: projectCounts.all },
    { id: 'ai', label: t('projects.filter.ai'), count: projectCounts.ai },
    { id: 'enterprise', label: t('projects.filter.enterprise'), count: projectCounts.enterprise },
    { id: 'tools', label: t('projects.filter.tools'), count: projectCounts.tools },
    { id: 'showcase', label: t('projects.filter.showcase'), count: projectCounts.showcase },
  ];

  const typeFilters = [
    { id: 'all', label: language === 'ar' ? 'الكل' : 'All Types', count: projectCounts.all },
    { id: 'client', label: language === 'ar' ? 'عميل' : 'Client', count: projectCounts.client },
    { id: 'personal', label: language === 'ar' ? 'شخصي' : 'Personal', count: projectCounts.personal },
    { id: 'graduation', label: language === 'ar' ? 'تخرج' : 'Graduation', count: projectCounts.graduation },
  ];

  return (
    <div className="search-filter-bar">
      {/* Search Input */}
      <div className="search-wrapper">
        <Search size={20} className="search-icon" />
        <input
          type="text"
          placeholder={language === 'ar' ? 'ابحث عن مشروع...' : 'Search projects...'}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        {searchTerm && (
          <button
            className="search-clear"
            onClick={() => setSearchTerm('')}
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Category Filters */}
      <div className="filters-row">
        <div className="filters-group">
          <span className="filters-label">{language === 'ar' ? 'الفئة:' : 'Category:'}</span>
          <div className="filters">
            {categoryFilters.map((filter) => {
              const FilterIcon = categoryIcons[filter.id] || Layers;
              return (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
                >
                  <FilterIcon size={16} />
                  <span>{filter.label}</span>
                  <span className="filter-count">{filter.count}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Type Filters */}
      <div className="filters-row">
        <div className="filters-group">
          <span className="filters-label">{language === 'ar' ? 'النوع:' : 'Type:'}</span>
          <div className="filters type-filters">
            {typeFilters.map((filter) => {
              const TypeIcon = typeIcons[filter.id] || Layers;
              return (
                <button
                  key={filter.id}
                  onClick={() => setActiveType(filter.id)}
                  className={`filter-btn filter-btn-type ${activeType === filter.id ? 'active' : ''}`}
                >
                  {filter.id !== 'all' && <TypeIcon size={14} />}
                  <span>{filter.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sort Toggle */}
        <button
          className="sort-btn"
          onClick={() => setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest')}
        >
          {sortOrder === 'newest' ? <SortDesc size={18} /> : <SortAsc size={18} />}
          <span>{sortOrder === 'newest'
            ? (language === 'ar' ? 'الأحدث' : 'Newest')
            : (language === 'ar' ? 'الأقدم' : 'Oldest')
          }</span>
        </button>
      </div>
    </div>
  );
}

// ============================================
// PROJECTS SECTION
// ============================================
function Projects() {
  const { t } = useApp();
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeType, setActiveType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');

  // Calculate counts for filters
  const projectCounts = useMemo(() => {
    const counts = {
      all: projectsData.projects.length,
      ai: projectsData.projects.filter(p => p.category === 'ai').length,
      enterprise: projectsData.projects.filter(p => p.category === 'enterprise').length,
      tools: projectsData.projects.filter(p => p.category === 'tools').length,
      showcase: projectsData.projects.filter(p => p.category === 'showcase').length,
      client: projectsData.projects.filter(p => p.type === 'client').length,
      personal: projectsData.projects.filter(p => p.type === 'personal').length,
      graduation: projectsData.projects.filter(p => p.type === 'graduation').length,
    };
    return counts;
  }, []);

  const filteredProjects = useMemo(() => {
    let filtered = projectsData.projects;

    // Filter by category
    if (activeFilter !== 'all') {
      filtered = filtered.filter(p => p.category === activeFilter);
    }

    // Filter by type
    if (activeType !== 'all') {
      filtered = filtered.filter(p => p.type === activeType);
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(term) ||
        p.titleAr.includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.descriptionAr.includes(term) ||
        p.tech.some(t => t.toLowerCase().includes(term))
      );
    }

    // Sort
    filtered = [...filtered].sort((a, b) => {
      if (sortOrder === 'newest') {
        return b.year - a.year;
      }
      return a.year - b.year;
    });

    return filtered;
  }, [activeFilter, activeType, searchTerm, sortOrder]);

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
        </div>

        <SearchFilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          activeType={activeType}
          setActiveType={setActiveType}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          projectCounts={projectCounts}
        />

        <AnimatePresence mode="popLayout">
          {filteredProjects.length > 0 ? (
            <motion.div layout className="projects-grid">
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              className="no-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Search size={48} />
              <p>{t('projects.noResults')}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

// ============================================
// FOOTER
// ============================================
function Footer() {
  const { t, language } = useApp();
  const year = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: 'https://github.com/Mhy-1', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/mdajam', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:contact@mdajam.com', label: 'Email' },
  ];

  const quickLinks = [
    { id: 'main-site', label: language === 'ar' ? 'الموقع الرئيسي' : 'Main Site', href: 'https://mdajam.com' },
    { id: 'cv', label: language === 'ar' ? 'السيرة الذاتية' : 'CV', href: 'https://mdajam.com' },
    { id: 'links', label: language === 'ar' ? 'روابطي' : 'Links', href: 'https://links.mdajam.com' },
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-main">
          {/* Brand Section */}
          <div className="footer-brand">
            <a href="/" className="footer-logo">
              <div className="logo-icon">
                <span className="logo-icon-text">{t('logo')}</span>
              </div>
            </a>
            <p className="footer-tagline">
              {language === 'ar'
                ? 'معرض المشاريع التقنية'
                : 'Technical Projects Showcase'}
            </p>
            <div className="footer-location">
              <MapPin size={14} />
              <span>{language === 'ar' ? 'المملكة العربية السعودية' : 'Saudi Arabia'}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-links">
            <h4>{language === 'ar' ? 'روابط سريعة' : 'Quick Links'}</h4>
            <ul>
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer">
                    {link.label}
                    <ArrowUpRight size={12} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="footer-social">
            <h4>{language === 'ar' ? 'تواصل معي' : 'Connect'}</h4>
            <div className="social-icons">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {year} mdajam.com · {t('footer.rights')}
          </p>
          <p className="footer-developer">
            {language === 'ar' ? (
              <>
                <span className="dev-label">تطوير</span>
                <span className="dev-name">م. مشاري دعجم</span>
              </>
            ) : (
              <>
                <span className="dev-label">Developed by</span>
                <span className="dev-name">Eng. Meshari Dejem</span>
              </>
            )}
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
    <div className="app">
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
