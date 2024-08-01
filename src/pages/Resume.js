import React from 'react';
import styled from 'styled-components';

const ResumeWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 0;
`;

const ResumeSection = styled.section`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  border-bottom: 2px solid #333;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
`;

const JobTitle = styled.h3`
  margin-bottom: 0.5rem;
`;

const Company = styled.h4`
  margin-bottom: 0.5rem;
  font-weight: normal;
`;

const DateRange = styled.p`
  margin-bottom: 0.5rem;
  color: #666;
`;

const List = styled.ul`
  padding-left: 1.5rem;
`;

const DownloadButton = styled.a`
  display: inline-block;
  background-color: #007bff;
  color: white;
  padding: 0.5rem 1rem;
  text-decoration: none;
  border-radius: 4px;
  margin-top: 1rem;

  &:hover {
    background-color: #0056b3;
  }
`;

const Resume = () => {
  return (
    <ResumeWrapper>
      <h1>Dan Schmitz - Interaction Designer</h1>
      <p>Email: dan@schmitz.ai | Website: https://danschmitz.work | Location: Boulder, Colorado</p>
      
      <ResumeSection>
        <SectionTitle>Summary</SectionTitle>
        <p>Interaction Designer with 11 years of experience in UX/UI design and technology commercialization. Seeking an Interaction Designer role to leverage expertise in user-centered design, AI integration, and team leadership. Aiming to drive product innovation with a blend of strategic thinking and technical skills, backed by a Master's in Technology Commercialization (valedictorian) and a proven track record of transforming concepts into successful, market-validated products.</p>
      </ResumeSection>

      <ResumeSection>
        <SectionTitle>Experience</SectionTitle>
        
        <JobTitle>Product Design Lead</JobTitle>
        <Company>Apple</Company>
        <DateRange>06/2022 - 08/2024 | Remote (Boulder, Colorado)</DateRange>
        <List>
          <li>Executed product design functions on a tactical and strategic level for a business-critical admin web application used globally</li>
          <li>Measurably improved usability and utility through research-driven user experience design</li>
          <li>Streamlined design operations and established sustainable governance systems</li>
          <li>Initiated the product's migration to a uniform design system to facilitate consistent, efficient, and higher-quality experiences</li>
          <li>Managed product design sprints and backlog through effective requirements gathering and writing</li>
        </List>

        <JobTitle>Founder and CEO</JobTitle>
        <Company>Petal</Company>
        <DateRange>10/2016 - 09/2023 | Remote (United States)</DateRange>
        <List>
          <li>Bootstrapped a profitable AI neurotechnology startup that commercialized novel systems and methods for brainwave data analysis and utility</li>
          <li>Sold licenses for custom, research-grade instrumentation, toolkits, APIs, and Al-training software</li>
          <li>Used by researchers, developers, and creative technologists in thousands of leading tech companies, universities, labs, museums, and practices globally</li>
          <li>Hired and managed a diverse team of engineers, scientists, and data analysts</li>
          <li>Fortified market position with a robust intellectual property portfolio</li>
        </List>

        <JobTitle>Technology Transfer and Business Development Consultant</JobTitle>
        <Company>Global Innovation Lab | The University of Texas at Austin</Company>
        <DateRange>08/2022 - 08/2023 | Austin, Texas</DateRange>
        <List>
          <li>Developed and delivered go-to-market strategies for East Asian startups seeking to commercialize their R&D technologies in US markets</li>
          <li>Authored and presented executive-level reports summarizing technical research, strategic analysis, and market validation interviews</li>
          <li>Formed warm relationships with cold outbound leads through novel mass-prospecting techniques then personal customer discovery engagements</li>
        </List>

        <JobTitle>UX Design Manager</JobTitle>
        <Company>IronNet Cybersecurity</Company>
        <DateRange>01/2021 - 05/2022 | Remote (United States)</DateRange>
        <List>
          <li>Pioneered design standards, systems, and operations as the cloud-engineering team's first design hire</li>
          <li>Recruited and supervised a visual designer to expand and manage an interactive design system</li>
          <li>Transformed initial napkin sketch ideas into market-validated, interactive prototypes</li>
        </List>

        <JobTitle>UX Designer</JobTitle>
        <Company>National Instruments</Company>
        <DateRange>10/2019 - 12/2020 | Austin, Texas</DateRange>
        <List>
          <li>Managed the transformation of the customer support experience comprised of service request management, product documentation, and training</li>
          <li>Achieved a 568% boost in user feedback engagement through iterative wireframe and interactive prototype development</li>
          <li>Streamlined design experimentation and production processes</li>
        </List>

        <JobTitle>Interaction Design Contractor</JobTitle>
        <Company>Magic Leap</Company>
        <DateRange>07/2019 - 09/2019 | Austin, Texas</DateRange>
        <List>
          <li>Defined operating system-level interaction paradigms for spatial computing on Magic Leap 1</li>
          <li>Programmed a spatial audio simulator in C# with Unity to test and inform audio mode design</li>
          <li>Prototyped hand-gestural input experiences</li>
        </List>

        <JobTitle>Innovation Consultant</JobTitle>
        <Company>Accenture</Company>
        <DateRange>01/2018 - 05/2019 | Chicago, Illinois</DateRange>
        <List>
          <li>Developed and implemented new business models and innovation projects for Fortune 50+ enterprises</li>
          <li>Devised methodologies and frameworks for AI and voice interaction projects</li>
          <li>Boosted sales and operations efficiency by programming an AI chatbot to manage 80% of incoming requests</li>
          <li>Demonstrated the benefits of virtual reality and augmented reality through 3D simulation software presentations</li>
        </List>

        <JobTitle>Interaction Designer</JobTitle>
        <Company>Nerdery</Company>
        <DateRange>03/2015 - 01/2018 | Chicago, Illinois</DateRange>
        <List>
          <li>Led client projects through the full UX design spectrum and formed internal initiatives for R&D and outbound sales</li>
          <li>Facilitated workshops with clients, cross-functional teams, stakeholders, and leadership</li>
          <li>Identified opportunities for new business capabilities, a metamorphic user research lab, and new revenue streams</li>
          <li>Fostered an internal innovation club to experiment with new technology and create proof-of-concept products</li>
          <li>Spoke and wrote publicly on tech innovation via panels, articles, and special events</li>
        </List>

        <JobTitle>UX Architect and Strategist</JobTitle>
        <Company>Coplex</Company>
        <DateRange>06/2013 - 02/2015 | Phoenix, Arizona</DateRange>
        <List>
          <li>Designed and prototyped architecture, flows, and interactions for online stores, trade publications, and web applications</li>
          <li>Analyzed business viability of adding a new mobile app design practice (processes, design systems, operating model, perspective, and principles)</li>
        </List>
      </ResumeSection>

      <ResumeSection>
        <SectionTitle>Education</SectionTitle>
        <JobTitle>Master of Science in Technology Commercialization</JobTitle>
        <Company>McCombs School of Business at University of Texas, Austin, Texas</Company>
        <DateRange>06/2021 - 06/2022</DateRange>
        <List>
          <li>4.0 GPA and Valedictorian</li>
          <li>Gained practical experience in new venture development, product management, technology transfer and commercialization</li>
          <li>Full-time master's program</li>
          <li>No. 3 master's program in U.S. for entrepreneurship (Eduniversal Ranking)</li>
        </List>

        <JobTitle>Bachelor of Journalism with Strategic Communication emphasis and a minor in business</JobTitle>
        <Company>Missouri School of Journalism at University of Missouri, Columbia, Missouri</Company>
        <DateRange>08/2009 - 05/2013</DateRange>
        <List>
          <li>Developed skills in public relations, interviewing, storytelling, writing, creative strategy, and digital media technologies</li>
          <li>Cum Laude Honors</li>
          <li>Dean's List 7 of 8 semesters</li>
          <li>No. 1 journalism school in U.S. (NewsPro)</li>
        </List>
      </ResumeSection>

      <ResumeSection>
        <SectionTitle>Training / Courses</SectionTitle>
        <List>
          <li>Leading Like a Futurist</li>
          <li>Design Thinking: Prototyping</li>
          <li>Programmatic UI with Unity</li>
          <li>Rapid Prototyping for Product Design</li>
        </List>
      </ResumeSection>

      <ResumeSection>
        <SectionTitle>Skills</SectionTitle>
        <h3>Hard skills</h3>
        <p>Design artifact production, Mockups, Specifications, Wireframing, Interaction design, Visual design, Flow mapping, User journeys, User research, Presentations, Market research, Prototype development, Business strategy, Operations, Simulations, Spatial computing, Requirements gathering, Prompt engineering, Workflow automation</p>
        
        <h3>Soft skills</h3>
        <p>Written and oral communication, Galvanization, Strategic thinking, Problem-solving, Active listening, Constructive feedback, Empathy, Adaptability, Creative thinking, Teamwork, Leadership, Facilitation, Decision-making, Negotiation, Business development, Pattern recognition</p>
        
        <h3>Strengths</h3>
        <p>Futuristic, Strategic, Restorative, Competitive, Intellectual, Analytical</p>

        <h3>Tools</h3>
        <p>Figma, Sketch, Miro, Axure, Adobe Creative Suite, ChatGPT, Claude.ai, Zapier, Excel, JIRA, Python, Unity, Git, Node.js, React</p>
      </ResumeSection>

      <ResumeSection>
        <SectionTitle>Find me online</SectionTitle>
        <p>LinkedIn: <a href="https://linkedin.com/in/SchmitzDan">https://linkedin.com/in/SchmitzDan</a></p>
        <p>Website: <a href="https://danschmitz.work">https://danschmitz.work</a></p>
        <p>Email: <a href="mailto:dan@schmitz.ai">dan@schmitz.ai</a></p>
      </ResumeSection>

      <DownloadButton href="/DanSchmitzResume.pdf" download>Download Full Resume (PDF)</DownloadButton>
    </ResumeWrapper>
  );
};

export default Resume;