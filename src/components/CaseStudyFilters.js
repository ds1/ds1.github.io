import React, { useState } from 'react';
import styled from 'styled-components';
import { tagCategoryColors, tagCategoryNames, getTagColor } from '../utils/tagConfig';

const FilterContainer = styled.div`
  margin-bottom: 2rem;
  padding: 1.5rem;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: 8px;
`;

const SearchSection = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: ${({ $hasFilters }) => $hasFilters ? '1.5rem' : '0'};
  
  @media (max-width: 768px) {
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
  padding: 0.75rem;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.secondary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const FilterToggleButton = styled.button`
  padding: 0.75rem 1.5rem;
  border: 2px solid ${({ theme, $active }) => $active ? theme.colors.primary : theme.colors.textSecondary};
  background-color: ${({ theme, $active }) => $active ? theme.colors.primary : 'transparent'};
  color: ${({ theme, $active }) => $active ? theme.colors.background : theme.colors.text};
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 120px;
  justify-content: center;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme, $active }) => $active ? theme.colors.secondary : theme.colors.primary + '20'};
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const FilterIconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
`;

const ChevronIcon = styled.span`
  display: inline-block;
  font-size: 0.75rem;
  transition: transform 0.2s ease;
  transform: ${({ $rotated }) => $rotated ? 'rotate(180deg)' : 'rotate(0deg)'};
`;

const ActiveFilterIndicator = styled.span`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.background};
  padding: 0.125rem 0.375rem;
  border-radius: 10px;
  font-size: 0.75rem;
  font-weight: bold;
  margin-left: 0.25rem;
`;

const FiltersWrapper = styled.div`
  max-height: ${({ $show }) => $show ? '1000px' : '0'};
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
`;

const FilterSection = styled.div`
  margin-bottom: 1.5rem;
  
  &:first-child {
    margin-top: 0.5rem;
  }
`;

const FilterTitle = styled.h3`
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  color: ${({ theme, $category }) => tagCategoryColors[$category] || theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const TagGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Tag = styled.button`
  padding: 0.375rem 0.75rem;
  border: 1px solid ${({ $category, $active }) => 
    $active ? tagCategoryColors[$category] : getTagColor($category, 0.5)};
  background-color: ${({ $category, $active }) => 
    $active ? tagCategoryColors[$category] : getTagColor($category, 0.1)};
  color: ${({ theme, $category, $active }) => 
    $active ? theme.colors.background : theme.colors.text};
  border-radius: 20px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ $category }) => tagCategoryColors[$category]};
    background-color: ${({ $category, $active }) => 
      $active ? tagCategoryColors[$category] : getTagColor($category, 0.2)};
  }
`;

const ClearButton = styled.button`
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  border: none;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ResultCount = styled.p`
  margin-top: 1rem;
  margin-bottom: 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.875rem;
  padding-top: ${({ $hasFilters }) => $hasFilters ? '0' : '1rem'};
  border-top: ${({ theme, $hasFilters }) => $hasFilters ? 'none' : `1px solid ${theme.colors.background}`};
`;

const SearchHighlight = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 500;
`;

const CaseStudyFilters = ({ caseStudies, onFilter }) => {
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
          if (study.tags[category]) {
            study.tags[category].forEach(tag => availableTags[category].add(tag));
          }
        });
      }
    });

    return Object.fromEntries(
      Object.entries(availableTags).map(([key, set]) => [key, Array.from(set)])
    );
  };

  const availableTags = getAvailableTags();
  const activeFilterCount = Object.values(selectedTags).reduce((sum, tags) => sum + tags.length, 0);

  const handleTagClick = (category, tag) => {
    setSelectedTags(prev => {
      const newTags = { ...prev };
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
    setFilteredCount(caseStudies.length);
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
  React.useEffect(() => {
    const filtered = caseStudies.filter(study => {
      // Search filter - searches across all content
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        
        // Search in basic fields (title, description, subtitle, metadata)
        let matchesSearch = 
          study.title?.toLowerCase().includes(searchLower) ||
          study.description?.toLowerCase().includes(searchLower) ||
          study.subtitle?.toLowerCase().includes(searchLower) ||
          study.role?.toLowerCase().includes(searchLower) ||
          study.duration?.toLowerCase().includes(searchLower) ||
          study.project_type?.toLowerCase().includes(searchLower);
        
        // Search in all content sections (h1, h2, h3, body text, lists)
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
        
        // Search in all tags
        if (!matchesSearch && study.tags) {
          const allTags = Object.values(study.tags).flat().join(' ').toLowerCase();
          matchesSearch = allTags.includes(searchLower);
        }
        
        // Search in images (alt text and captions)
        if (!matchesSearch && study.images) {
          const imageText = study.images.map(img => 
            `${img.alt || ''} ${img.caption || ''}`
          ).join(' ').toLowerCase();
          matchesSearch = imageText.includes(searchLower);
        }
        
        if (!matchesSearch) return false;
      }

      // Tag filters
      for (const [category, tags] of Object.entries(selectedTags)) {
        if (tags.length > 0 && study.tags && study.tags[category]) {
          const hasTag = tags.some(tag => study.tags[category].includes(tag));
          if (!hasTag) return false;
        }
      }

      return true;
    });

    setFilteredCount(filtered.length);
    onFilter(filtered);
  }, [searchTerm, selectedTags, caseStudies, onFilter]);

  const hasActiveFilters = searchTerm || Object.values(selectedTags).some(tags => tags.length > 0);
  const hasTagFilters = Object.entries(availableTags).some(([_, tags]) => tags.length > 0);

  return (
    <FilterContainer>
      <SearchSection $hasFilters={hasTagFilters}>
        <SearchBarWrapper>
          <SearchBar
            type="text"
            placeholder="Search titles, content, tags, roles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchBarWrapper>
        
        {hasTagFilters && (
          <FilterToggleButton 
            onClick={() => setShowFilters(!showFilters)}
            $active={showFilters}
          >
            <FilterIconWrapper>
              <span>Filters</span>
              {activeFilterCount > 0 && (
                <ActiveFilterIndicator>{activeFilterCount}</ActiveFilterIndicator>
              )}
              <ChevronIcon $rotated={showFilters}>▼</ChevronIcon>
            </FilterIconWrapper>
          </FilterToggleButton>
        )}
      </SearchSection>

      {hasTagFilters && (
        <FiltersWrapper $show={showFilters}>
          {Object.entries(availableTags).map(([category, tags]) => (
            tags.length > 0 && (
              <FilterSection key={category}>
                <FilterTitle $category={category}>
                  {tagCategoryNames[category] || category.replace(/([A-Z])/g, ' $1').trim()}
                </FilterTitle>
                <TagGroup>
                  {tags.map(tag => (
                    <Tag
                      key={tag}
                      $active={selectedTags[category].includes(tag)}
                      $category={category}
                      onClick={() => handleTagClick(category, tag)}
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
          Found <SearchHighlight>{filteredCount}</SearchHighlight> case 
          {filteredCount === 1 ? ' study' : ' studies'}
          {searchTerm && (
            <> matching "<SearchHighlight>{searchTerm}</SearchHighlight>"</>
          )}
        </ResultCount>
      )}
    </FilterContainer>
  );
};

export default CaseStudyFilters;