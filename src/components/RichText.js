import React from 'react';
import styled from 'styled-components';

const StyledText = styled.span`
  &.text-primary { color: ${({ theme }) => theme.colors.primary}; }
  &.text-secondary { color: ${({ theme }) => theme.colors.secondary}; }
  &.text-success { color: #4ade80; }
  &.text-warning { color: #fbbf24; }
  &.text-error { color: #ef4444; }
`;

const Paragraph = styled.p`
  margin-bottom: 1rem;
  line-height: 1.6;
  white-space: pre-wrap;
  
  @media (max-width: 768px) {
    margin-bottom: 0.875rem;
    line-height: 1.7; // Slightly more line height for mobile readability
    font-size: 0.95rem;
  }
`;

const List = styled.ul`
  margin-bottom: 1rem;
  padding-left: 1.5rem;
  list-style-type: disc;
  
  @media (max-width: 768px) {
    margin-bottom: 0.875rem;
    padding-left: 1.25rem;
  }
`;

const NumberedList = styled.ol`
  margin-bottom: 1rem;
  padding-left: 1.5rem;
  list-style-type: decimal;
  counter-reset: ${props => props.start ? `list ${props.start - 1}` : 'none'};
  
  & > li {
    counter-increment: list;
  }
  
  & > li::marker {
    content: counter(list) ". ";
  }
  
  @media (max-width: 768px) {
    margin-bottom: 0.875rem;
    padding-left: 1.25rem;
  }
`;

const ListItem = styled.li`
  margin-bottom: 0.5rem;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    margin-bottom: 0.625rem;
    line-height: 1.7;
    font-size: 0.95rem;
  }
  
  /* Handle nested content with proper spacing */
  strong, em {
    line-height: inherit;
  }
`;

const processInlineFormatting = (text) => {
  if (!text || typeof text !== 'string') {
    return '';
  }

  // First handle multi-line spans - match spans that contain line breaks
  let processed = text.replace(
    /<span class="(.*?)">([\s\S]*?)<\/span>/g,
    (match, className, content) => {
      // Process the content inside the span
      const lines = content.split('\n')
        .map(line => line.trim())
        .filter(line => line)
        .map(line => `<styled class="${className}">${line}</styled>`)
        .join('\n');
      return lines;
    }
  );

  // Now handle any remaining inline formatting
  processed = processed.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
  processed = processed.replace(/\*\*(.*?)\*\*\*/g, '<strong>$1</strong>');
  processed = processed.replace(/\*(.*?)\*/g, '<em>$1</em>');

  return processed;
};

const parseListItems = (text) => {
  if (!text || typeof text !== 'string') {
    return [];
  }

  const lists = [];
  let currentList = [];
  let currentType = null;
  let currentNumberingStart = 1;

  // Split by line breaks and clean up empty lines
  const lines = text.split('\n')
    .map(line => line.trim())
    .filter(line => line);

  lines.forEach(line => {
    if (typeof line !== 'string') return;

    // Check for bullet points (both • and - bullets)
    const bulletMatch = line.match(/^[•\-*]\s*(.*)/);
    // Check for numbered list items (any number followed by period)
    const numberMatch = line.match(/^(\d+)\.\s*(.*)/);

    if (bulletMatch) {
      // If we were building a different type of list, save it
      if (currentType && currentType !== 'bullet' && currentList.length > 0) {
        lists.push({ type: currentType, items: [...currentList], startNumber: currentType === 'number' ? currentNumberingStart : undefined });
        currentList = [];
      }
      currentType = 'bullet';
      // Process any styled content within the list item
      let content = bulletMatch[1];
      if (content.includes('<styled')) {
        content = processInlineFormatting(content);
      }
      currentList.push(content);
    } else if (numberMatch) {
      // If starting a new numbered list or switching from bullet list
      if (currentType !== 'number') {
        if (currentList.length > 0) {
          lists.push({ type: currentType, items: [...currentList], startNumber: currentType === 'number' ? currentNumberingStart : undefined });
          currentList = [];
        }
        currentType = 'number';
        currentNumberingStart = parseInt(numberMatch[1], 10);
      }
      // Process any styled content within the list item
      let content = numberMatch[2];
      if (content.includes('<styled')) {
        content = processInlineFormatting(content);
      }
      currentList.push(content);
    } else {
      // If we were building a list, save it before adding text
      if (currentList.length > 0) {
        lists.push({ type: currentType, items: [...currentList], startNumber: currentType === 'number' ? currentNumberingStart : undefined });
        currentList = [];
      }
      // Add the text line, processing any styling
      lists.push({ 
        type: 'text', 
        content: line.includes('<styled') ? processInlineFormatting(line) : line 
      });
      currentType = null;
      currentNumberingStart = 1;
    }
  });

  // Add the last list if there is one
  if (currentList.length > 0) {
    lists.push({ type: currentType, items: [...currentList], startNumber: currentType === 'number' ? currentNumberingStart : undefined });
  }

  return lists;
};

const renderFormattedText = (text) => {
  if (!text || typeof text !== 'string') {
    return null;
  }

  // Split the text into parts that are either styled spans or regular text
  const parts = text.split(/(<styled.*?<\/styled>|<strong>.*?<\/strong>|<em>.*?<\/em>)/g);
  
  return parts.map((part, index) => {
    if (!part) return null;
    if (typeof part !== 'string') return null;

    if (part.startsWith('<styled')) {
      const className = part.match(/class="(.*?)"/)?.[1];
      const content = part.match(/>(.*?)<\/styled>/)?.[1];
      if (!className || !content) return null;
      return <StyledText key={index} className={className}>{content}</StyledText>;
    }
    if (part.startsWith('<strong>')) {
      return <strong key={index}>{part.slice(8, -9)}</strong>;
    }
    if (part.startsWith('<em>')) {
      return <em key={index}>{part.slice(4, -5)}</em>;
    }
    return part;
  }).filter(Boolean);
};

const RichText = ({ content, isListContent }) => {
  // Handle array content for lists
  if (isListContent && Array.isArray(content)) {
    return (
      <List>
        {content.map((item, index) => (
          <ListItem key={index}>{renderFormattedText(processInlineFormatting(String(item)))}</ListItem>
        ))}
      </List>
    );
  }

  // Handle string content
  if (typeof content === 'string') {
    const processedContent = processInlineFormatting(content);
    const sections = parseListItems(processedContent);

    return (
      <div>
        {sections.map((section, index) => {
          if (!section) return null;

          if (section.type === 'bullet' && Array.isArray(section.items)) {
            return (
              <List key={index}>
                {section.items.map((item, i) => (
                  <ListItem key={i}>{renderFormattedText(processInlineFormatting(item))}</ListItem>
                ))}
              </List>
            );
          }
          if (section.type === 'number' && Array.isArray(section.items)) {
            return (
              <NumberedList key={index} start={section.startNumber}>
                {section.items.map((item, i) => (
                  <ListItem key={i}>{renderFormattedText(processInlineFormatting(item))}</ListItem>
                ))}
              </NumberedList>
            );
          }
          if (section.type === 'text' && section.content) {
            return (
              <Paragraph key={index}>
                {renderFormattedText(section.content)}
              </Paragraph>
            );
          }
          return null;
        })}
      </div>
    );
  }

  return null;
};

export default RichText;