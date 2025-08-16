// public/admin/cms-preview.js

// Wait for CMS to be available
if (window.CMS) {
  // Register the shared theme CSS
  CMS.registerPreviewStyle('/shared-theme.css');
  
  // Custom preview template for Case Studies
  const CaseStudyPreview = createClass({
    render: function() {
      const entry = this.props.entry;
      const data = entry.get('data').toJS();
      
      // Process rich text content
      const processRichText = (text) => {
        if (!text) return '';
        
        // Convert markdown-style formatting to HTML
        let processed = text;
        
        // Handle bold and italic
        processed = processed.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
        processed = processed.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        processed = processed.replace(/\*(.*?)\*/g, '<em>$1</em>');
        
        // Handle line breaks
        processed = processed.replace(/\\n\\n/g, '</p><p>');
        processed = processed.replace(/\\n/g, '<br>');
        
        // Handle color spans
        processed = processed.replace(/<span class="([^"]+)">/g, '<span class="$1">');
        
        return processed;
      };
      
      // Build the preview HTML
      return h('div', { className: 'case-study-preview' },
        h('div', { className: 'case-study-content' },
          // Title
          data.title && h('h1', {}, data.title),
          
          // Subtitle
          data.subtitle && h('p', { style: { fontSize: '1.25rem', color: 'var(--color-secondary)' } }, data.subtitle),
          
          // Metadata
          h('div', { className: 'case-study-meta' },
            data.duration && h('span', {}, data.duration),
            data.role && h('span', {}, data.role),
            data.project_type && h('span', {}, data.project_type)
          ),
          
          // Main content sections - handling old format
          data.initial_vision_h1 && h('h1', {}, data.initial_vision_h1),
          data.problem_statement_h2 && h('h2', {}, data.problem_statement_h2),
          data.problem_body && h('div', { 
            dangerouslySetInnerHTML: { __html: '<p>' + processRichText(data.problem_body) + '</p>' }
          }),
          
          data.technical_approach_h2 && h('h2', {}, data.technical_approach_h2),
          data.approach_list && h('ul', {}, 
            data.approach_list.split(';').filter(item => item.trim()).map((item, i) => 
              h('li', { key: i }, item.trim())
            )
          ),
          
          data.architecture_h2 && h('h2', {}, data.architecture_h2),
          data.architecture_body && h('div', { 
            dangerouslySetInnerHTML: { __html: '<p>' + processRichText(data.architecture_body) + '</p>' }
          }),
          
          data.innovation_details_h2 && h('h2', {}, data.innovation_details_h2),
          data.innovation_body && h('div', { 
            dangerouslySetInnerHTML: { __html: '<p>' + processRichText(data.innovation_body) + '</p>' }
          }),
          
          data.collaboration_h2 && h('h2', {}, data.collaboration_h2),
          data.collaboration_body && h('div', { 
            dangerouslySetInnerHTML: { __html: '<p>' + processRichText(data.collaboration_body) + '</p>' }
          }),
          
          data.results_h2 && h('h2', {}, data.results_h2),
          data.results_list && h('ul', {}, 
            data.results_list.split(';').filter(item => item.trim()).map((item, i) => 
              h('li', { key: i }, item.trim())
            )
          ),
          
          // Handle flexible content sections if they exist
          data.content_sections && data.content_sections.map((section, index) => {
            switch(section.type) {
              case 'h1':
                return h('h1', { key: index }, section.content);
              case 'h2':
                return h('h2', { key: index }, section.content);
              case 'h3':
                return h('h3', { key: index }, section.content);
              case 'paragraph':
                return h('p', { key: index }, section.content);
              case 'body':
                return h('div', { 
                  key: index,
                  dangerouslySetInnerHTML: { __html: '<p>' + processRichText(section.content) + '</p>' }
                });
              case 'list':
                const items = section.items ? section.items.split(';') : [];
                return h('ul', { key: index }, 
                  items.map((item, i) => h('li', { key: i }, item.trim()))
                );
              case 'quote':
                return h('blockquote', { key: index }, section.content);
              case 'code':
                return h('pre', { key: index },
                  h('code', { className: `language-${section.language || 'javascript'}` }, section.content)
                );
              default:
                return null;
            }
          }),
          
          // Tags section
          (data.design_tools || data.ai_tools || data.dev_tools || data.skills) && h('div', { className: 'case-study-tags' },
            h('h3', {}, 'Project Details'),
            data.design_tools && h('div', { className: 'tag-category' },
              h('strong', {}, 'Design Tools: '),
              h('span', {}, data.design_tools)
            ),
            data.ai_tools && h('div', { className: 'tag-category' },
              h('strong', {}, 'AI Tools: '),
              h('span', {}, data.ai_tools)
            ),
            data.dev_tools && h('div', { className: 'tag-category' },
              h('strong', {}, 'Dev Tools: '),
              h('span', {}, data.dev_tools)
            ),
            data.skills && h('div', { className: 'tag-category' },
              h('strong', {}, 'Skills: '),
              h('span', {}, data.skills)
            )
          )
        )
      );
    }
  });
  
  // Register the preview template
  CMS.registerPreviewTemplate('case_studies', CaseStudyPreview);
  
  // Simple preview for About page
  const AboutPreview = createClass({
    render: function() {
      const entry = this.props.entry;
      const data = entry.get('data').toJS();
      
      return h('div', { className: 'case-study-content' },
        h('h1', {}, data.headline),
        h('p', { style: { fontSize: '1.25rem', color: 'var(--color-secondary)' } }, data.introduction),
        data.facts && h('div', {},
          h('h2', {}, 'Quick Facts'),
          h('ul', {}, data.facts.map((fact, i) => h('li', { key: i }, fact)))
        )
      );
    }
  });
  
  CMS.registerPreviewTemplate('about', AboutPreview);
  
  // Contact page preview
  const ContactPreview = createClass({
    render: function() {
      const entry = this.props.entry;
      const data = entry.get('data').toJS();
      
      return h('div', { className: 'case-study-content' },
        h('h1', {}, data.title),
        h('p', { style: { fontSize: '1.25rem', color: 'var(--color-secondary)' } }, data.introduction),
        h('div', {},
          h('h2', {}, 'Email'),
          h('a', { href: `mailto:${data.email}` }, data.email)
        ),
        h('div', {},
          h('h2', {}, 'LinkedIn'),
          h('a', { href: data.linkedin, target: '_blank' }, 'LinkedIn Profile')
        ),
        data.github && h('div', {},
          h('h2', {}, 'GitHub'),
          h('a', { href: data.github, target: '_blank' }, 'GitHub Profile')
        ),
        h('p', {}, data.message)
      );
    }
  });
  
  CMS.registerPreviewTemplate('contact', ContactPreview);
}