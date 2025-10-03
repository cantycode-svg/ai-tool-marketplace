import express from 'express';
import { createClient } from '@supabase/supabase-js';

const router = express.Router();

// Initialize Supabase client using environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase env vars missing: SUPABASE_URL and SUPABASE_ANON_KEY');
}
const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');

// Helpers
const parseAuthHeader = (req) => {
  const h = req.headers.authorization || '';
  const [scheme, token] = h.split(' ');
  if (scheme?.toLowerCase() !== 'bearer' || !token) return null;
  return token;
};

// POST /users/register
// body: { email, password, metadata? }
router.post('/register', async (req, res) => {
  try {
    const { email, password, metadata } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ error: 'email and password are required' });
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: metadata || {} },
    });

    if (error) return res.status(400).json({ error: error.message });
    return res.status(201).json({ user: data.user, session: data.session });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'internal server error' });
  }
});

// POST /users/login
// body: { email, password }
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ error: 'email and password are required' });
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return res.status(401).json({ error: error.message });

    return res.status(200).json({ user: data.user, session: data.session });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'internal server error' });
  }
});

// GET /users/profile
// headers: Authorization: Bearer <access_token>
router.get('/profile', async (req, res) => {
  try {
    const token = parseAuthHeader(req);
    if (!token) return res.status(401).json({ error: 'missing bearer token' });

    const { data, error } = await supabase.auth.getUser(token);
    if (error) return res.status(401).json({ error: error.message });

    return res.status(200).json({ user: data.user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'internal server error' });
  }
});

export default router;
