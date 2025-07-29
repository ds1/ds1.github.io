// src/utils/tagConfig.js

export const tagCategoryColors = {
  // Tools categories
  designTools: '#A259FF',    // Purple - for design tools
  aiTools: '#FF6B6B',       // Coral red - for AI tools
  devTools: '#4ECDC4',      // Teal - for development tools
  
  // Work categories
  skills: '#61dafb',        // Light blue (your primary) - for skills
  roles: '#FFD93D',         // Golden yellow - for roles
  
  // Output categories
  artifactTypes: '#95E1D3', // Mint green - for artifact types
  fidelity: '#F38181',      // Salmon - for fidelity levels
  
  // AI/Design categories
  aiModels: '#FF8787',      // Light red - for AI models
  designPrinciples: '#A8E6CF', // Pastel green - for design principles
  usabilityHeuristics: '#C7CEEA' // Lavender - for usability heuristics
};

// Category display names
export const tagCategoryNames = {
  designTools: 'Design Tools',
  aiTools: 'AI Tools',
  devTools: 'Development Tools',
  skills: 'Skills',
  roles: 'Roles',
  artifactTypes: 'Artifact Types',
  fidelity: 'Fidelity',
  aiModels: 'AI Models',
  designPrinciples: 'Design Principles',
  usabilityHeuristics: 'Usability Heuristics'
};

// Helper to get color with opacity
export const getTagColor = (category, opacity = 1) => {
  const color = tagCategoryColors[category] || '#61dafb';
  if (opacity === 1) return color;
  
  // Convert hex to rgba
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);
  
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};