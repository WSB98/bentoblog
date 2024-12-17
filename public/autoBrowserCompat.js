export function autoBrowserCompat() {
  // Function to add browser compatibility prefixes to properties
  let styleContent = '';

  function addBrowserPrefixes(stylesheet) {
    try {
      const rules = stylesheet.cssRules || stylesheet.rules;
      for (let rule of rules) {
        if (rule.style) {
          // Gather CSS properties that need fallbacks
          const properties = ['height', 'width', 'display', 'transform', 'transition', 'backdrop-filter'];
          properties.forEach(property => {
            switch (property) {
              case 'height':
              case 'width':
                if (rule.style[property] === 'fit-content') {
                  addFitContentFallbacks(rule, property);
                }
                break;
              case 'display':
                if (rule.style[property] === 'flex') {
                  addFlexFallbacks(rule);
                }
                break;
              case 'transform':
                if (rule.style[property]) {
                  addTransformFallbacks(rule);
                }
                break;
              case 'transition':
                if (rule.style[property]) {
                  addTransitionFallbacks(rule);
                }
                break;
              case 'backdrop-filter':
                if (rule.style[property]) {
                  addBackdropFilterFallbacks(rule);
                }
                break;
            }
          });
        }
      }
    } catch (e) {
      console.error('Could not access stylesheet:', e);
    }
  }

  // Function to add fit-content fallbacks
  function addFitContentFallbacks(rule, property) {
    const selector = rule.selectorText;
    styleContent += `
      ${selector} {
        ${property}: fit-content;
        ${property}: -moz-fit-content;
        ${property}: -webkit-fit-content;
      }
    `;
  }

  // Function to add flex fallbacks
  function addFlexFallbacks(rule) {
    const selector = rule.selectorText;
    styleContent += `
      ${selector} {
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
      }
    `;
  }

  // Function to add transform fallbacks
  function addTransformFallbacks(rule) {
    const selector = rule.selectorText;
    const transformValue = rule.style.transform;
    styleContent += `
      ${selector} {
        -ms-transform: ${transformValue};
        -webkit-transform: ${transformValue};
        transform: ${transformValue};
      }
    `;
  }

  // Function to add transition fallbacks
  function addTransitionFallbacks(rule) {
    const selector = rule.selectorText;
    const transitionValue = rule.style.transition;
    styleContent += `
      ${selector} {
        -webkit-transition: ${transitionValue};
        -moz-transition: ${transitionValue};
        -o-transition: ${transitionValue};
        transition: ${transitionValue};
      }
    `;
  }

  // Function to add backdrop-filter fallbacks
  function addBackdropFilterFallbacks(rule) {
    const selector = rule.selectorText;
    const backdropFilterValue = rule.style.backdropFilter;
    styleContent += `
      ${selector} {
        backdrop-filter: ${backdropFilterValue};
        -webkit-backdrop-filter: ${backdropFilterValue};
      }
    `;
  }

  // Iterate over all the stylesheets in the document
  for (let i = 0; i < document.styleSheets.length; i++) {
    addBrowserPrefixes(document.styleSheets[i]);
  }

  // Only add the style content if there are new styles to apply
  if (styleContent) {
    document.getElementById('autoBrowserCompat').innerHTML = styleContent;
  }
}

export function initCompat() {
  const styleInjection = document.createElement('style');
  styleInjection.id = "autoBrowserCompat";
  document.head.appendChild(styleInjection);
}