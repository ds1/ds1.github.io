//src/components/RichText.js

import React from 'react';
import styled from 'styled-components';

const Heading1 = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
`;

const Heading2 = styled.h2`
  font-size: 2rem;
  margin-bottom: 1.25rem;
  color: ${({ theme }) => theme.colors.text};
`;

const Heading3 = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.text};
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

const RichText = ({ content }) => {
  return (
    <>
      {content.map((block, index) => {
        switch (block.type) {
          case 'h1':
            return <Heading1 key={index}>{block.content}</Heading1>;
          case 'h2':
            return <Heading2 key={index}>{block.content}</Heading2>;
          case 'h3':
            return <Heading3 key={index}>{block.content}</Heading3>;
          case 'list':
            return (
              <List key={index}>
                {block.content.map((item, i) => (
                  <ListItem key={i}>{item}</ListItem>
                ))}
              </List>
            );
          default:
            return <Paragraph key={index}>{block.content}</Paragraph>;
        }
      })}
    </>
  );
};

export default RichText;