import React from 'react';
import styled from 'styled-components';

const StyledText = styled.span`
  &.text-primary { color: ${({ theme }) => theme.colors.primary}; }
  &.text-secondary { color: ${({ theme }) => theme.colors.secondary}; }
  &.text-success { color: #4ade80; }
  &.text-warning { color: #fbbf24; }
`;

const Paragraph = styled.p`
  margin-bottom: 1rem;
  line-height: 1.6;
`;

const List = styled.ul`
  margin-bottom: 1rem;
  padding-left: 1.5rem;
`;

const ListItem = styled.li`
  margin-bottom: 0.5rem;
`;

// Helper function to parse rich text content
const parseRichText = (text) => {
  if (!text) return null;

  // First handle line breaks
  const lines = text.split('\\n');

  return lines.map((line, index) => {
    // Process the line content
    let content = line;

    // Handle colored spans
    content = content.replace(
      /<span class="(.*?)">(.*?)<\/span>/g,
      (match, className, text) => `<styled class="${className}">${text}</styled>`
    );

    // Handle bold & italic
    content = content.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
    content = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    content = content.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Handle bullet points
    if (content.startsWith('•')) {
      return <ListItem key={index} dangerouslySetInnerHTML={{ __html: content.slice(1) }} />;
    }

    // Convert the processed content to JSX
    const jsx = content.split(/(<styled.*?<\/styled>|<strong>.*?<\/strong>|<em>.*?<\/em>)/g)
      .map((part, i) => {
        if (part.startsWith('<styled')) {
          const className = part.match(/class="(.*?)"/)[1];
          const text = part.match(/>(.*?)<\/styled>/)[1];
          return <StyledText key={i} className={className}>{text}</StyledText>;
        }
        if (part.startsWith('<strong>')) {
          return <strong key={i}>{part.slice(8, -9)}</strong>;
        }
        if (part.startsWith('<em>')) {
          return <em key={i}>{part.slice(4, -5)}</em>;
        }
        return part;
      });

    // Return appropriate element based on content
    if (content.startsWith('•')) {
      return <List key={index}>{jsx}</List>;
    }
    return <Paragraph key={index}>{jsx}</Paragraph>;
  });
};

const RichText = ({ content }) => {
  if (typeof content === 'string') {
    return <div>{parseRichText(content)}</div>;
  }

  // Handle the existing array structure
  return (
    <div>
      {content.map((block, index) => {
        if (block.type === 'list') {
          return (
            <List key={index}>
              {block.content.map((item, i) => (
                <ListItem key={i}>{parseRichText(item)}</ListItem>
              ))}
            </List>
          );
        }
        return <div key={index}>{parseRichText(block.content)}</div>;
      })}
    </div>
  );
};

export default RichText;