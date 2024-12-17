document.addEventListener("DOMContentLoaded", function() {
  const h1 = document.querySelector('h1'); // Select the h1 element
  const text = h1.textContent; // Get the text content of the h1 element
  const cursor = document.createElement('span'); // Create a span for the cursor
  cursor.classList.add('blink'); // Add the blinking class to the cursor
  cursor.textContent = '|'; // Set the cursor content
  h1.textContent = ''; // Clear the current h1 text content
  h1.appendChild(cursor); // Append the cursor to the h1 element
  let index = 0;
  function typeWriter() {
    if (index < text.length) {
      h1.textContent = text.slice(0, index + 1); // Append each character
      h1.appendChild(cursor); // Keep appending the cursor
      index++;
      setTimeout(typeWriter, 100); // Adjust the speed as needed
    }
  }
  typeWriter();
});