// src/components/CaseStudyFilters.js
import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { tagCategoryColors, tagCategoryNames, getTagColor } from '../utils/tagConfig';

// Animations
const slideDown = keyframes`
  from {
    opacity: 0;
    max-height: 0;
  }
  to {
    opacity: 1;
    max-height: 1000px;
  }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

// Refined filter container with glass morphism
const FilterContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.surface};
  backdrop-filter: blur(10px);
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  position: relative;
  box-shadow: 
    ${({ theme }) => theme.shadows['inner-sm']},
    ${({ theme }) => theme.shadows.sm};
  
  /* Subtle gradient overlay */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.colors.secondary}03 0%,
      transparent 50%,
      ${({ theme }) => theme.colors.accent}02 100%
    );
    pointer-events: none;
  }
  
  > * {
    position: relative;
    z-index: 1;
  }
`;

const SearchSection = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.base};
  align-items: center;
  margin-bottom: ${({ $hasFilters, theme }) => $hasFilters ? theme.spacing.xl : '0'};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const SearchBarWrapper = styled.div`
  flex: 1;
  position: relative;
`;

const SearchBar = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.base};
  border: 2px solid ${({ theme }) => theme.colors.borderLight};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.normal};
  transition: all ${({ theme }) => theme.transitions.fast};
  font-family: ${({ theme }) => theme.fonts.body};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.secondary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.focusRing};
    background: ${({ theme }) => theme.colors.background};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textTertiary};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 16px; /* Prevent iOS zoom */
  }
`;

const FilterToggleButton = styled.button`
  padding: ${({ theme }) => theme.spacing.base} ${({ theme }) => theme.spacing.xl};
  border: 2px solid ${({ theme, $active }) => 
    $active ? theme.colors.secondary : theme.colors.borderLight};
  background: ${({ theme, $active }) => 
    $active 
      ? `linear-gradient(135deg, ${theme.colors.secondary}, ${theme.colors.secondary}DD)`
      : theme.colors.surface};
  color: ${({ theme, $active }) => 
    $active ? theme.colors.background : theme.colors.text};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  min-width: 140px;
  justify-content: center;
  position: relative;
  overflow: hidden;
  font-family: ${({ theme }) => theme.fonts.body};
  
  /* Ripple effect */
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
  }
  
  &:active::before {
    width: 200px;
    height: 200px;
  }

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadows.md};
    border-color: ${({ theme }) => theme.colors.secondary};
    background: ${({ theme, $active }) => 
      $active 
        ? `linear-gradient(135deg, ${theme.colors.secondary}DD, ${theme.colors.accent}DD)`
        : theme.colors.backgroundSecondary};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 100%;
  }
`;

const ChevronIcon = styled.span`
  display: inline-block;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  transition: transform ${({ theme }) => theme.transitions.fast};
  transform: ${({ $rotated }) => $rotated ? 'rotate(180deg)' : 'rotate(0deg)'};
`;

const ActiveFilterIndicator = styled.span`
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing['2xs']} ${({ theme }) => theme.spacing.xs};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin-left: ${({ theme }) => theme.spacing.xs};
  animation: ${pulse} 2s ease-in-out infinite;
`;

// FIXED: Using css helper for keyframe interpolation
const FiltersWrapper = styled.div`
  overflow: hidden;
  transition: all ${({ theme }) => theme.transitions.slow};
  max-height: ${({ $show }) => $show ? '1000px' : '0'};
  opacity: ${({ $show }) => $show ? '1' : '0'};
  
  ${({ $show }) => $show && css`
    animation: ${slideDown} 0.3s ease-out;
  `}
`;

const FilterSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  
  &:first-child {
    margin-top: ${({ theme }) => theme.spacing.xs};
  }
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const FilterTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme, $category }) => tagCategoryColors[$category] || theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: ${({ theme }) => theme.letterSpacing.wider};
  opacity: 0.9;
  font-family: ${({ theme }) => theme.fonts.heading};
`;

const TagGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Tag = styled.button`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.base};
  border: 1px solid ${({ $category, $active }) => 
    $active ? tagCategoryColors[$category] : getTagColor($category, 0.3)};
  background: ${({ $category, $active }) => 
    $active 
      ? `linear-gradient(135deg, ${tagCategoryColors[$category]}DD, ${tagCategoryColors[$category]})`
      : getTagColor($category, 0.05)};
  color: ${({ theme, $category, $active }) => 
    $active ? theme.colors.background : theme.colors.text};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  position: relative;
  overflow: hidden;
  font-family: ${({ theme }) => theme.fonts.body};
  
  /* Subtle inner shadow when active */
  ${({ $active, theme }) => $active && css`
    box-shadow: ${theme.shadows.inner};
    transform: scale(0.98);
  `}
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: translate(-50%, -50%);
    transition: width 0.4s, height 0.4s;
  }
  
  &:active::before {
    width: 100px;
    height: 100px;
  }

  &:hover {
    transform: ${({ $active }) => $active ? 'scale(0.98)' : 'translateY(-1px)'};
    box-shadow: ${({ theme, $active }) => 
      $active ? theme.shadows.inner : theme.shadows.sm};
    border-color: ${({ $category }) => tagCategoryColors[$category]};
    background: ${({ $category, $active }) => 
      $active 
        ? tagCategoryColors[$category]
        : getTagColor($category, 0.15)};
  }
`;

const ClearButton = styled.button`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.lg};
  border: none;
  background: linear-gradient(135deg, 
    ${({ theme }) => theme.colors.primary}, 
    ${({ theme }) => theme.colors.secondary}
  );
  color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  transition: all ${({ theme }) => theme.transitions.fast};
  position: relative;
  overflow: hidden;
  font-family: ${({ theme }) => theme.fonts.body};
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: translate(-50%, -50%);
    transition: width 0.4s, height 0.4s;
  }
  
  &:active::before {
    width: 150px;
    height: 150px;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const ResultCount = styled.p`
  margin-top: ${({ theme }) => theme.spacing.lg};
  margin-bottom: 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  padding-top: ${({ $hasFilters, theme }) => $hasFilters ? '0' : theme.spacing.lg};
  border-top: ${({ theme, $hasFilters }) => 
    $hasFilters ? 'none' : `1px solid ${theme.colors.borderLight}`};
  font-weight: ${({ theme }) => theme.fontWeights.normal};
  font-family: ${({ theme }) => theme.fonts.body};
`;

const SearchHighlight = styled.span`
  color: ${({ theme }) => theme.colors.secondary};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
`;

const CaseStudyFilters = ({ caseStudies = [], onFilter = () => {} }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCount, setFilteredCount] = useState(caseStudies.length);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTags, setSelectedTags] = useState({
    designTools: [],
    aiTools: [],
    devTools: [],
    skills: [],
    roles: [],
    artifactTypes: [],
    fidelity: [],
    aiModels: []
  });

  // Get all unique tags from case studies
  const getAvailableTags = () => {
    const availableTags = {
      designTools: new Set(),
      aiTools: new Set(),
      devTools: new Set(),
      skills: new Set(),
      roles: new Set(),
      artifactTypes: new Set(),
      fidelity: new Set(),
      aiModels: new Set()
    };

    caseStudies.forEach(study => {
      if (study.tags) {
        Object.keys(availableTags).forEach(category => {
          if (study.tags[category] && Array.isArray(study.tags[category])) {
            study.tags[category].forEach(tag => {
              if (tag) availableTags[category].add(tag);
            });
          }
        });
      }
    });

    return Object.fromEntries(
      Object.entries(availableTags).map(([key, set]) => [key, Array.from(set)])
    );
  };

  const availableTags = getAvailableTags();
  const activeFilterCount = Object.values(selectedTags).reduce((sum, tags) => sum + (tags ? tags.length : 0), 0);

  const handleTagClick = (category, tag) => {
    setSelectedTags(prev => {
      const newTags = { ...prev };
      if (!newTags[category]) {
        newTags[category] = [];
      }
      
      if (newTags[category].includes(tag)) {
        newTags[category] = newTags[category].filter(t => t !== tag);
      } else {
        newTags[category] = [...newTags[category], tag];
      }
      
      return newTags;
    });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedTags({
      designTools: [],
      aiTools: [],
      devTools: [],
      skills: [],
      roles: [],
      artifactTypes: [],
      fidelity: [],
      aiModels: []
    });
  };

  // Apply filters whenever search term or selected tags change
  useEffect(() => {
    const filtered = caseStudies.filter(study => {
      // Search filter - searches across all content
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        
        // Search in basic fields
        let matchesSearch = 
          study.title?.toLowerCase().includes(searchLower) ||
          study.description?.toLowerCase().includes(searchLower) ||
          study.subtitle?.toLowerCase().includes(searchLower) ||
          study.role?.toLowerCase().includes(searchLower) ||
          study.duration?.toLowerCase().includes(searchLower) ||
          study.project_type?.toLowerCase().includes(searchLower);
        
        // Search in content sections
        if (!matchesSearch && study.content) {
          const contentText = study.content.map(section => {
            if (typeof section.content === 'string') {
              return section.content;
            } else if (Array.isArray(section.content)) {
              return section.content.join(' ');
            }
            return '';
          }).join(' ').toLowerCase();
          
          matchesSearch = contentText.includes(searchLower);
        }
        
        // Search in tags
        if (!matchesSearch && study.tags) {
          const allTags = Object.values(study.tags)
            .filter(tags => Array.isArray(tags))
            .flat()
            .join(' ')
            .toLowerCase();
          matchesSearch = allTags.includes(searchLower);
        }
        
        if (!matchesSearch) return false;
      }

      // Tag filters
      for (const [category, tags] of Object.entries(selectedTags)) {
        if (tags && tags.length > 0) {
          if (!study.tags || !study.tags[category]) return false;
          const hasTag = tags.some(tag => study.tags[category].includes(tag));
          if (!hasTag) return false;
        }
      }

      return true;
    });

    setFilteredCount(filtered.length);
    onFilter(filtered);
  }, [searchTerm, selectedTags, caseStudies, onFilter]);

  const hasActiveFilters = searchTerm || Object.values(selectedTags).some(tags => tags && tags.length > 0);
  const hasTagFilters = Object.entries(availableTags).some(([_, tags]) => tags && tags.length > 0);

  return (
    <FilterContainer>
      <SearchSection $hasFilters={hasTagFilters}>
        <SearchBarWrapper>
          <SearchBar
            type="text"
            placeholder="Search projects, skills, tools..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search projects"
          />
        </SearchBarWrapper>
        
        {hasTagFilters && (
          <FilterToggleButton 
            onClick={() => setShowFilters(!showFilters)}
            $active={showFilters}
            aria-expanded={showFilters}
            aria-label="Toggle filters"
          >
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <ActiveFilterIndicator>{activeFilterCount}</ActiveFilterIndicator>
            )}
            <ChevronIcon $rotated={showFilters}>▼</ChevronIcon>
          </FilterToggleButton>
        )}
      </SearchSection>

      {hasTagFilters && (
        <FiltersWrapper $show={showFilters}>
          {Object.entries(availableTags).map(([category, tags]) => (
            tags && tags.length > 0 && (
              <FilterSection key={category}>
                <FilterTitle $category={category}>
                  {tagCategoryNames[category] || category.replace(/([A-Z])/g, ' $1').trim()}
                </FilterTitle>
                <TagGroup>
                  {tags.map(tag => (
                    <Tag
                      key={tag}
                      $active={selectedTags[category]?.includes(tag)}
                      $category={category}
                      onClick={() => handleTagClick(category, tag)}
                      aria-pressed={selectedTags[category]?.includes(tag)}
                    >
                      {tag}
                    </Tag>
                  ))}
                </TagGroup>
              </FilterSection>
            )
          ))}

          {hasActiveFilters && (
            <ClearButton onClick={clearFilters}>
              Clear All Filters
            </ClearButton>
          )}
        </FiltersWrapper>
      )}

      {(searchTerm || hasActiveFilters) && (
        <ResultCount $hasFilters={hasTagFilters}>
          Found <SearchHighlight>{filteredCount}</SearchHighlight> project
          {filteredCount === 1 ? '' : 's'}
          {searchTerm && (
            <> matching "<SearchHighlight>{searchTerm}</SearchHighlight>"</>
          )}
        </ResultCount>
      )}
    </FilterContainer>
  );
};

export default CaseStudyFilters;