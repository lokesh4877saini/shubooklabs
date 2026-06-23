// ============================================
// BLOG - REUSABLE JAVASCRIPT FOR ALL POSTS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // --------------------------------------------
    // 1. SMOOTH SCROLL FOR TOC LINKS
    // --------------------------------------------
    document.querySelectorAll('.toc-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --------------------------------------------
    // 2. ACTIVE TOC ITEM HIGHLIGHTING
    // --------------------------------------------
    const tocLinks = document.querySelectorAll('.toc-link');
    const headings = document.querySelectorAll('.blog-article h1, .blog-article h2, .blog-article h3');
    
    if (tocLinks.length > 0 && headings.length > 0) {
        window.addEventListener('scroll', function() {
            let current = '';
            const scrollPosition = window.scrollY + 120;
            
            headings.forEach(heading => {
                if (scrollPosition >= heading.offsetTop) {
                    current = heading.id;
                }
            });
            
            tocLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        });
    }

    // --------------------------------------------
    // 3. COPY CODE BUTTONS
    // --------------------------------------------
    document.querySelectorAll('.blog-article pre').forEach(block => {
        const button = document.createElement('button');
        button.className = 'code-copy-btn';
        button.textContent = 'Copy';
        
        button.addEventListener('click', function() {
            const code = block.querySelector('code');
            const text = code ? code.textContent : block.textContent;
            
            navigator.clipboard.writeText(text).then(() => {
                this.textContent = 'Copied!';
                setTimeout(() => {
                    this.textContent = 'Copy';
                }, 2000);
            }).catch(() => {
                // Fallback
                const textarea = document.createElement('textarea');
                textarea.value = text;
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
                this.textContent = 'Copied!';
                setTimeout(() => {
                    this.textContent = 'Copy';
                }, 2000);
            });
        });
        
        block.style.position = 'relative';
        block.appendChild(button);
    });

    // --------------------------------------------
    // 4. ANCHOR LINKS FOR HEADINGS
    // --------------------------------------------
    document.querySelectorAll('.blog-article h1, .blog-article h2, .blog-article h3, .blog-article h4, .blog-article h5, .blog-article h6').forEach(heading => {
        if (heading.id) {
            const anchor = document.createElement('a');
            anchor.className = 'anchor-link';
            anchor.href = '#' + heading.id;
            anchor.textContent = '#';
            heading.appendChild(anchor);
        }
    });
});