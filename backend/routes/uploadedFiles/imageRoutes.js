import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the 'uploads/images' directory
router.use('/images', express.static(path.join(__dirname, '../../uploads/images')));

router.get('/:imageName', (req, res) => {
  const { imageName } = req.params;

  // Send the image file
  res.sendFile(path.join(__dirname, '../../uploads/images', imageName), (err) => {
    if (err) {
      console.error(err);
      res.status(err.status).end();
    }
  });
});

export default router;
