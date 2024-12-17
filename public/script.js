

document.addEventListener('DOMContentLoaded', async () => {
  await fetch('/data.json')
  .then(response => response.json())
  .then(data => {
    const blogData = data.BLOGS;
    const howContent = document.getElementById('how-content');
    let animationDelayIterator = 0.05;

    blogData.forEach(blog => {
      // Create elements for each blog
      const blogOption = document.createElement('div');
      blogOption.className = 'how-option';
      blogOption.style.backgroundImage = `url(${blog.image})`;
      blogOption.style.animationDelay = `${animationDelayIterator}s`;
      animationDelayIterator+=0.05;
      const blogPreview = document.createElement('div');
      blogPreview.className = 'op-prev';
      const blogTitle = document.createElement('h3');
      blogTitle.textContent = blog.name;
      const blogContent = document.createElement('div');
      blogContent.className = 'op-content op-content-prev';
      const blogDescription = document.createElement('h5');
      blogDescription.textContent = blog.description;
      const blogDate = document.createElement('p');
      blogDate.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M96 96c0-35.3 28.7-64 64-64l288 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L80 480c-44.2 0-80-35.8-80-80L0 128c0-17.7 14.3-32 32-32s32 14.3 32 32l0 272c0 8.8 7.2 16 16 16s16-7.2 16-16L96 96zm64 24l0 80c0 13.3 10.7 24 24 24l112 0c13.3 0 24-10.7 24-24l0-80c0-13.3-10.7-24-24-24L184 96c-13.3 0-24 10.7-24 24zm208-8c0 8.8 7.2 16 16 16l48 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-48 0c-8.8 0-16 7.2-16 16zm0 96c0 8.8 7.2 16 16 16l48 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-48 0c-8.8 0-16 7.2-16 16zM160 304c0 8.8 7.2 16 16 16l256 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-256 0c-8.8 0-16 7.2-16 16zm0 96c0 8.8 7.2 16 16 16l256 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-256 0c-8.8 0-16 7.2-16 16z"/></svg> ${blog.blogDate}`;
      blogDate.className = 'op-date-published';
      const blogLastUpdated = document.createElement('p');
      blogLastUpdated.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"/></svg> ${blog.lastUpdated}`;
      blogLastUpdated.className = 'op-date-last-updated';
      const blogDates = document.createElement('div');
      blogDates.className = 'op-dates';
      const blogTags = document.createElement('div');
      blogTags.className = 'op-tags';
      blog.tags.forEach(tag => {
        const tagItem = document.createElement('a');
        tagItem.textContent = tag;
        blogTags.appendChild(tagItem);
      });
      const blogLink = document.createElement('a');
      blogLink.className = 'op-link';
      blogLink.href = blog.image;  // Use the image link as an example, change this if needed
      blogLink.textContent = 'Read more';
      // Compose the structure
      blogPreview.appendChild(blogTitle);
      blogContent.appendChild(blogDescription);
      blogDates.appendChild(blogDate);
      blogDates.appendChild(blogLastUpdated);
      blogContent.appendChild(blogDates);
      blogContent.appendChild(blogTags);
      blogContent.appendChild(blogLink);

      blogOption.appendChild(blogPreview);
      blogOption.appendChild(blogContent);

      howContent.appendChild(blogOption);
    });
    // Apply hover effects after blogs are loaded
    applyHoverEffects();
  })
  .catch(error => console.error('Error loading JSON data:', error));

  function adjustSiblings(option, size, totalOptionsInRow) {
    const siblings = [];

    // Collect previous siblings.
    let sibling = option.previousElementSibling;
    for (let i = 0; sibling && i < totalOptionsInRow - 1; i++) {
      if (sibling.getBoundingClientRect().top === option.getBoundingClientRect().top) {
        siblings.push(sibling);
      }
      sibling = sibling.previousElementSibling;
    }

    siblings.reverse(); // To adjust the previous siblings in the correct order

    // Detect how many previous siblings were actually considered.
    const prevCount = siblings.length;

    // Collect next siblings.
    sibling = option.nextElementSibling;
    for (let i = 0; sibling && i < totalOptionsInRow - 1; i++) {
      if (sibling.getBoundingClientRect().top === option.getBoundingClientRect().top) {
        siblings.push(sibling);
      }
      sibling = sibling.nextElementSibling;
    }

    // Detect how many next siblings were actually considered.
    const nextCount = siblings.length - prevCount;

    // If there are fewer than needed previous siblings, adjust additional next siblings.
    if (prevCount < totalOptionsInRow - 1) {
      sibling = option.nextElementSibling;
      for (let i = 0; sibling && i < (totalOptionsInRow - 1 - prevCount); i++) {
        if (sibling.getBoundingClientRect().top !== option.getBoundingClientRect().top) break;
        siblings.push(sibling);
        sibling = sibling.nextElementSibling;
      }
    }

    // If there are fewer than needed next siblings, adjust additional previous siblings.
    if (nextCount < totalOptionsInRow - 1) {
      sibling = option.previousElementSibling;
      for (let i = 0; sibling && i < (totalOptionsInRow - 1 - nextCount); i++) {
        if (sibling.getBoundingClientRect().top !== option.getBoundingClientRect().top) break;
        siblings.unshift(sibling); // Add to the beginning of the array
        sibling = sibling.previousElementSibling;
      }
    }

    siblings.forEach(s => s.style.width = size);
  }

  function applyHoverEffects() {
    const howOptions = document.querySelectorAll('.how-option');

    howOptions.forEach(option => {
      // Helper function to handle hover/touch start
      const handleHoverStart = (event) => {
        if(!option._isHovered){
          //event.stopPropagation(); // Stop the event from bubbling up to document
          if (window.innerWidth <= 1200) {
            const totalOptionsInRow = 2;
            // Reset widths first
            howOptions.forEach(opt => {
              opt.style.width = '50%';
              opt.querySelector('h3').style.color = '#cccccc50';
            });
            option.querySelector('h3').style.color = 'var(--offWhite)';
            adjustSiblings(option, '30%', totalOptionsInRow);
            option.style.width = '70%';
            option.querySelector('.op-content').classList.remove('op-content-prev');
          } else {
            const totalOptionsInRow = 4;
            // Reset widths first
            howOptions.forEach(opt => {
              opt.style.width = '25%';
              opt.querySelector('h3').style.color = '#cccccc50';
            });
            option.querySelector('h3').style.color = 'var(--offWhite)';
            option.querySelector('.op-content').classList.remove('op-content-prev');
            adjustSiblings(option, '16.66%', totalOptionsInRow);
            option.style.width = '50%';
          }
        }
        

        // Set a flag indicating that the element is hovered
        option._isHovered = true;
      };

      // Helper function to handle hover/touch end
      const handleHoverEnd = (e) => {
        howOptions.forEach(opt => {
          opt.style.width = window.innerWidth <= 1200 ? '50%' : '25%';
          opt.querySelector('h3').style.color = '#cccccc';
          opt._isHovered = false; // Reset the hover flag
          opt.querySelector('.op-content').classList.add('op-content-prev');
          
        });
        
      };

      // Mouse events for desktop

      option.addEventListener('click', handleHoverStart);
      option.addEventListener('mouseleave', handleHoverEnd);
      option.addEventListener('mouseenter', () => {
        option.querySelector('h3').style.color = 'var(--offWhite)';
      });
      // Touch events for mobile
      //option.addEventListener('touchstart', handleHoverStart);
      document.addEventListener('touchstart', (event) => {
        if (!option.contains(event.target) && option._isHovered) {
         handleHoverEnd();
        } else if (option.contains(event.target) && !option._isHovered) {
          // Close other options if not the currently interacted element
          howOptions.forEach(opt => {
            if (opt !== option) {
              opt.style.width = window.innerWidth <= 1200 ? '50%' : '25%';
              opt.querySelector('.op-content').classList.add('op-content-prev');
              opt.querySelector('h3').style.color = '#cccccc';
              opt._isHovered = false;
            }
            else {
              opt.querySelector('h3').style.color = "var(--offWhite";
            }
          });
        }
      }); 
    });

    document.addEventListener('click', (e) => {
        if(!howOptions[0].parentElement.contains(e.target)) {
          howOptions.forEach(opt => {
            opt.style.width = window.innerWidth <= 1200 ? '50%' : '25%';
            //opt.querySelector('h3').style.color = '#cccccc';
            opt._isHovered = false; // Reset the hover flag
          });
        }
      
    });
  }

  window.addEventListener('resize', () => {
    const howOptions = document.querySelectorAll('.how-option');
    if (window.innerWidth <= 1200) {
      howOptions.forEach(opt => {
        opt.style.width = '50%';
       // opt.querySelector('h3').style.color = '#cccccc';
      });
    } else {
      howOptions.forEach(opt => {
        opt.style.width = '25%';
      //  opt.querySelector('h3').style.color = '#cccccc';
      });
    }
  });
});
