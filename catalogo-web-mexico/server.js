import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Serve demos from public directory  
app.use('/demos', express.static(path.join(__dirname, 'public/demos')));

// For SPA routing - fallback to index.html for unmatched routes
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Catálogo Frontend running on http://0.0.0.0:${PORT}`);
  console.log(`📂 Serving demos from /demos`);
});
