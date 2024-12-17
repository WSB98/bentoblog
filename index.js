const express = require('express');
const path = require('path');
const cors = require('cors'); 
const app = express();
const port = process.env.PORT || 3000;

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(express.json());

// Serve the index.html file
// Serve index.html for any other route (this ensures the client app can handle routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});