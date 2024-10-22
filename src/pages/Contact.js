import React from 'react';
import styled from 'styled-components';
import RichText from '../components/RichText';
import contactData from '../data/contact.json';

const ContactWrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem 0;
`;

const Introduction = styled.p`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 2rem;
  line-height: 1.5;
`;

const ContactInfo = styled.div`
  margin-bottom: 2rem;
`;

const ContactMethod = styled.div`
  margin-bottom: 1rem;
`;

const ContactLabel = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.text};
`;

const ContactLink = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    text-decoration: underline;
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const Contact = () => {
  return (
    <ContactWrapper>
      <h1>{contactData.title}</h1>
      
      <Introduction>{contactData.introduction}</Introduction>
      
      <ContactInfo>
        <ContactMethod>
          <ContactLabel>Email:</ContactLabel>
          <ContactLink 
            href={`mailto:${contactData.email}`}
            aria-label="Send email to Dan"
          >
            {contactData.email}
          </ContactLink>
        </ContactMethod>
        
        <ContactMethod>
          <ContactLabel>LinkedIn:</ContactLabel>
          <ContactLink 
            href={contactData.linkedin}
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Visit LinkedIn profile"
          >
            LinkedIn Profile
          </ContactLink>
        </ContactMethod>

        <ContactMethod>
          <ContactLabel>GitHub:</ContactLabel>
          <ContactLink 
            href={contactData.github}
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Visit GitHub profile"
          >
            GitHub Profile
          </ContactLink>
        </ContactMethod>
      </ContactInfo>

      <RichText content={contactData.content} />
    </ContactWrapper>
  );
};

export default Contact;