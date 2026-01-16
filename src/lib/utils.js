// Utility function for conditional class names
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

// Project categories mapping
export const projectCategories = {
  ai: ['linkedin-generator', 'resume-ai'],
  enterprise: ['ems', 'e-form', 'survey-system'],
  tools: ['flowforge', 'fuel-well'],
  showcase: ['rameem'],
};

// Get category for a project
export function getProjectCategory(projectId) {
  for (const [category, ids] of Object.entries(projectCategories)) {
    if (ids.includes(projectId)) return category;
  }
  return 'other';
}

// Format number with locale
export function formatNumber(num, locale = 'en') {
  return new Intl.NumberFormat(locale === 'ar' ? 'ar-SA' : 'en-US').format(num);
}
