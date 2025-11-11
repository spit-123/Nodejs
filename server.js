/**
 * server.js
 * Simple Express server, testable (exports app) and ready for cloud deployment.
 */

const express = require('express');
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Basic health route
app.get('/', (req, res) => {
  res.send('Hello from Node.js + GitHub Actions!');
});

// Example API route
app.get('/api/now', (req, res) => {
  res.json({ now: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Generic error handler
app.use((err, req, res, next) => {
  console.error(err); // log error
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start server only when run directly
if (require.main === module) {
  const PORT = process.env.PORT || 3000;

  // Bind to all network interfaces (0.0.0.0) for cloud access
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

// Export app for testing
module.exports = app;
