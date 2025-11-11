/**
 * server.js
 * Simple Express server, testable (exports app) and ready for production env vars.
 */

const express = require('express');
const app = express();

// Built-in middleware to parse JSON request bodies
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
  console.error(err); // log on server
  res.status(500).json({ error: 'Internal Server Error' });
});

// Only start server when file is run directly (keeps it testable)
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

// Export app for testing (e.g., with supertest/jest)
module.exports = app;
