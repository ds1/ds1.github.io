import React from 'react';
import styled from 'styled-components';

const ContactWrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem 0;
`;

const Heading = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
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
`;

const ContactLink = styled.a`
  color: #007bff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Contact = () => {
  return (
    <ContactWrapper>
      <Heading>Get in Touch</Heading>
      <ContactInfo>
        <ContactMethod>
          <ContactLabel>Email:</ContactLabel>
          <ContactLink href="mailto:dan@schmitz.ai">dan@schmitz.ai</ContactLink>
        </ContactMethod>
        <ContactMethod>
          <ContactLabel>LinkedIn:</ContactLabel>
          <ContactLink href="https://www.linkedin.com/in/schmitzdan" target="_blank" rel="noopener noreferrer">
            linkedin.com/in/schmitzdan
          </ContactLink>
        </ContactMethod>
        </ContactInfo>
      <p>
        I'm open to discussing new projects or the futures of any topic. 
        Feel free to reach out through any of the channels above and I'll get back to you as soon as possible.
      </p>
    </ContactWrapper>
  );
};

export default Contact;