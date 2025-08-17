// src/utils/tagConfig.js

export const tagCategoryColors = {
  // Tools categories - using sophisticated colors from the new theme
  designTools: '#7C3AED',    // Purple
  aiTools: '#3B82F6',        // Blue
  devTools: '#14B8A6',       // Teal
  
  // Work categories
  skills: '#10B981',         // Green
  roles: '#F97316',          // Orange
  
  // Output categories
  artifactTypes: '#EC4899',  // Pink
  fidelity: '#6366F1',       // Indigo
  
  // AI/Design categories
  aiModels: '#EAB308',       // Yellow
  designPrinciples: '#10B981', // Green
  usabilityHeuristics: '#6366F1' // Indigo
};

// Category display names
export const tagCategoryNames = {
  designTools: 'Design Tools',
  aiTools: 'AI Tools',
  devTools: 'Development',
  skills: 'Skills',
  roles: 'Role',
  artifactTypes: 'Deliverables',
  fidelity: 'Fidelity',
  aiModels: 'AI Models',
  designPrinciples: 'Design Principles',
  usabilityHeuristics: 'UX Heuristics'
};

// Helper to get color with opacity
export const getTagColor = (category, opacity = 1) => {
  const color = tagCategoryColors[category] || '#5865F2';
  if (opacity === 1) return color;
  
  // Convert hex to rgba
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);
  
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};