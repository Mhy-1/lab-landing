import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';
import {
  ExternalLink,
  Github,
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
  Filter,
  Grid3X3,
  LayoutList,
  Search,
  ArrowUpRight,
  Code2,
  Zap
} from 'lucide-react';
import projectsData from './data/projects.json';

// Icon mapping from string to component
const iconMap = {
  Stethoscope,
  Workflow,
  Building2,
  Linkedin,
  FileText,
  BarChart3,
  FileCode,
  Fuel,
};

const statusConfig = {
  ready: { color: 'bg-emerald-500', label: 'جاهز', labelEn: 'Ready' },
  'in-progress': { color: 'bg-amber-500', label: 'قيد التطوير', labelEn: 'In Progress' },
  planned: { color: 'bg-slate-500', label: 'مخطط', labelEn: 'Planned' },
};

const categories = [
  { id: 'all', label: 'الكل', icon: Grid3X3 },
  { id: 'ai', label: 'ذكاء اصطناعي', icon: Zap },
  { id: 'enterprise', label: 'أنظمة مؤسسية', icon: Building2 },
  { id: 'tools', label: 'أدوات', icon: Code2 },
];

function Particles() {
  const particles = useMemo(() =>
    [...Array(30)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 10}s`,
      duration: `${15 + Math.random() * 15}s`,
      size: Math.random() > 0.5 ? 4 : 2,
    })), []
  );

  return (
    <div className="particles">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            animationDelay: p.delay,
            animationDuration: p.duration,
            width: p.size,
            height: p.size,
          }}
        />
      ))}
    </div>
  );
}

function ProjectCard({ project, index, viewMode }) {
  const Icon = iconMap[project.icon] || Code2;
  const status = statusConfig[project.status];

  if (viewMode === 'list') {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        transition={{ delay: index * 0.05 }}
        className="glass rounded-xl p-4 flex items-center gap-4 card-hover group"
      >
        <div className={`bg-gradient-to-br ${project.color} p-3 rounded-xl shrink-0`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-bold text-white truncate">{project.titleAr}</h3>
            {project.featured && <Star className="w-4 h-4 text-amber-400 fill-amber-400 shrink-0" />}
          </div>
          <p className="text-sm text-gray-400 truncate">{project.descriptionAr}</p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className={`${status.color} px-2 py-0.5 rounded-full text-xs text-white`}>
            {status.label}
          </span>
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-1 px-4 py-2 rounded-lg bg-gradient-to-r ${project.color} text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity`}
          >
            عرض
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -30, scale: 0.95 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className="card-hover group"
    >
      <div className="glass rounded-2xl overflow-hidden h-full flex flex-col relative">
        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-4 left-4 z-10 flex items-center gap-1 bg-amber-500/90 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-full">
            <Star className="w-3 h-3 fill-white" />
            مميز
          </div>
        )}

        {/* Header with gradient */}
        <div className={`bg-gradient-to-br ${project.color} p-6 relative overflow-hidden`}>
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-xl" />

          {/* Animated glow on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="relative flex items-center justify-between">
            <motion.div
              className="bg-white/20 backdrop-blur-sm rounded-xl p-3"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Icon className="w-8 h-8 text-white" />
            </motion.div>
            <div className={`${status.color} px-3 py-1 rounded-full text-xs font-medium text-white shadow-lg`}>
              {status.label}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-xl font-bold text-white mb-1 group-hover:text-purple-300 transition-colors">
            {project.titleAr}
          </h3>
          <p className="text-sm text-gray-500 mb-3 font-medium">{project.title}</p>
          <p className="text-gray-400 text-sm mb-4 flex-1 leading-relaxed">{project.descriptionAr}</p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 mb-5">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-xs bg-white/5 border border-white/10 rounded-lg text-gray-400 hover:bg-white/10 hover:text-white transition-colors cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Actions */}
          <motion.a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r ${project.color} text-white font-medium text-sm shadow-lg transition-all`}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <ExternalLink className="w-4 h-4" />
            عرض المشروع
            <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}

function App() {
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const projects = projectsData.projects.map(p => ({
    ...p,
    icon: p.icon,
  }));

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = searchQuery === '' ||
        project.titleAr.includes(searchQuery) ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.descriptionAr.includes(searchQuery);

      const matchesCategory = activeCategory === 'all' ||
        (activeCategory === 'ai' && project.tech.some(t => t.toLowerCase().includes('ai') || t.toLowerCase().includes('genkit'))) ||
        (activeCategory === 'enterprise' && ['ems', 'e-form', 'survey-system'].includes(project.id)) ||
        (activeCategory === 'tools' && ['flowforge', 'resume-ai', 'linkedin-generator'].includes(project.id));

      return matchesSearch && matchesCategory;
    });
  }, [projects, searchQuery, activeCategory]);

  const readyCount = projects.filter(p => p.status === 'ready').length;

  return (
    <div className="min-h-screen relative">
      <Particles />

      {/* Hero Section */}
      <header className="relative z-10 pt-16 pb-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-6"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-gray-300">معرض المشاريع التقنية</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-5xl md:text-7xl font-extrabold mb-4"
          >
            <span className="gradient-text">Lab</span>
            <span className="text-white">.mdajam</span>
            <span className="text-purple-400">.com</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg text-gray-400 max-w-2xl mx-auto mb-8"
          >
            مجموعة من المشاريع التقنية المتنوعة - من أنظمة إدارة المستشفيات إلى أدوات الذكاء الاصطناعي
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mb-8"
          >
            <div className="glass rounded-xl px-5 py-2.5 flex items-center gap-3">
              <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-white font-medium text-sm">{readyCount} مشاريع جاهزة</span>
            </div>
            <a
              href="https://github.com/msharydajam"
              target="_blank"
              rel="noopener noreferrer"
              className="glass rounded-xl px-5 py-2.5 flex items-center gap-2 hover:bg-white/10 transition-colors"
            >
              <Github className="w-4 h-4 text-gray-400" />
              <span className="text-gray-300 text-sm">GitHub</span>
            </a>
          </motion.div>
        </div>
      </header>

      {/* Filters & Search */}
      <section className="relative z-10 px-6 mb-8">
        <div className="max-w-6xl mx-auto">
          <div className="glass rounded-2xl p-4 flex flex-col md:flex-row items-center gap-4">
            {/* Search */}
            <div className="relative flex-1 w-full md:w-auto">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="ابحث عن مشروع..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pr-10 pl-4 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-500/50 transition-colors"
              />
            </div>

            {/* Categories */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
              {categories.map((cat) => {
                const CatIcon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                      activeCategory === cat.id
                        ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                        : 'bg-white/5 text-gray-400 border border-transparent hover:bg-white/10'
                    }`}
                  >
                    <CatIcon className="w-4 h-4" />
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* View toggle */}
            <div className="flex items-center gap-1 bg-white/5 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid' ? 'bg-purple-500/20 text-purple-300' : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list' ? 'bg-purple-500/20 text-purple-300' : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                <LayoutList className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <main className="relative z-10 px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="popLayout">
            {filteredProjects.length > 0 ? (
              <motion.div
                layout
                className={viewMode === 'grid'
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  : "flex flex-col gap-3"
                }
              >
                {filteredProjects.map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index} viewMode={viewMode} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <Filter className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-500">لا توجد مشاريع تطابق البحث</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © 2026 mdajam.com - جميع الحقوق محفوظة
          </p>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500">صنع بـ</span>
            <span className="text-red-500">❤️</span>
            <span className="text-gray-500">باستخدام</span>
            <span className="text-purple-400 font-medium">React + Vite + Tailwind</span>
          </div>
        </div>
      </footer>

      {/* Version Badge */}
      <div className="fixed bottom-4 left-4 z-50 glass rounded-full px-3 py-1.5 flex items-center gap-2 text-xs">
        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
        <span className="text-gray-400">v{projectsData.meta.version}</span>
      </div>
    </div>
  );
}

export default App;
