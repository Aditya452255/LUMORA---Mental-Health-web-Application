const express = require('express');
const router = express.Router();

// Proxy POST /api/chat -> http://localhost:8000/chat
router.post('/', async (req, res) => {
  try {
    const base = process.env.API_EXTERNAL_BASE || '';
    const target = base ? `${base.replace(/\/$/, '')}/chat` : 'http://localhost:8000/chat';

    const response = await fetch(target, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });

    const data = await response.json().catch(() => null);
    if (!response.ok) return res.status(response.status).json(data || { error: 'Upstream error' });
    return res.json(data);
  } catch (err) {
    console.error('Chat proxy error', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
