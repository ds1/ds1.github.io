import React from 'react';
import styled from 'styled-components';
import RichText from '../components/RichText';
import contactData from '../data/contact.json';

const ContactWrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem 0;
  
  @media (max-width: 768px) {
    padding: 1rem 0;
  }
`;

const PageTitle = styled.h1`
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 1.75rem;
    margin-bottom: 1rem;
  }
`;

const Introduction = styled.p`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 2rem;
  line-height: 1.5;
  
  @media (max-width: 768px) {
    font-size: 1.125rem;
    margin-bottom: 1.5rem;
    line-height: 1.6;
  }
  
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const ContactInfo = styled.div`
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
  }
`;

const ContactMethod = styled.div`
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    margin-bottom: 1.25rem;
  }
`;

const ContactLabel = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.text};
  
  @media (max-width: 768px) {
    font-size: 1.125rem;
    margin-bottom: 0.375rem;
  }
`;

const ContactLink = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  transition: color 0.2s ease;
  display: inline-block;
  word-break: break-all; // Prevent long emails from breaking layout

  &:hover {
    text-decoration: underline;
    color: ${({ theme }) => theme.colors.secondary};
  }
  
  @media (max-width: 768px) {
    font-size: 0.95rem;
    padding: 0.25rem 0; // Extra padding for touch targets
    min-height: auto; // Override global link min-height
    line-height: 1.6;
  }
`;

const ContentSection = styled.div`
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    margin-top: 1.5rem;
  }
`;

const Contact = () => {
  return (
    <ContactWrapper>
      <PageTitle>{contactData.title}</PageTitle>
      
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

      <ContentSection>
        <RichText content={contactData.content} />
      </ContentSection>
    </ContactWrapper>
  );
};

export default Contact;