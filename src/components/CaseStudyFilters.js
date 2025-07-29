import React, { useState } from 'react';
import styled from 'styled-components';
import { tagCategoryColors, tagCategoryNames, getTagColor } from '../utils/tagConfig';

const FilterContainer = styled.div`
  margin-bottom: 2rem;
  padding: 1.5rem;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: 8px;
`;

const SearchBar = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1.5rem;
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

const FilterSection = styled.div`
  margin-bottom: 1rem;
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
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.875rem;
`;

const CaseStudyFilters = ({ caseStudies, tagCategories, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');
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
      // Search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch = 
          study.title.toLowerCase().includes(searchLower) ||
          study.description.toLowerCase().includes(searchLower);
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

    onFilter(filtered);
  }, [searchTerm, selectedTags, caseStudies, onFilter]);

  const hasActiveFilters = searchTerm || Object.values(selectedTags).some(tags => tags.length > 0);

  return (
    <FilterContainer>
      <SearchBar
        type="text"
        placeholder="Search case studies..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

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
    </FilterContainer>
  );
};

export default CaseStudyFilters;