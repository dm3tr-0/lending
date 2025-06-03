// server.js


import express from 'express';
import { Pool } from 'pg';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: process.env.PGUSER || 'postgres',
  password: process.env.PGPASSWORD || '1234',
  host: process.env.PGHOST || 'localhost',
  database: process.env.PGDATABASE || 'landing_constructor',
  port: Number(process.env.PGPORT) || 5432,
});

// Получение всех пользователей
app.get('/api/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, email, created_at FROM users');
    res.json(result.rows);
  } catch (error) {
    console.error('Ошибка при получении пользователей:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Получение всех шаблонов
app.get('/api/templates', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM templates');
    res.json(result.rows);
  } catch (error) {
    console.error('Ошибка при получении шаблонов:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});


// Получение лэндинга по ID
app.get('/api/getlandings/:id', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM landings WHERE id = $1',
      [req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Landing not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Ошибка при получении лэндинга:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

app.get('/api/gettemplate/:id', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM templates WHERE id = $1',
      [req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Template not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching template:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


// Создание нового шаблона
app.post('/api/templates', async (req, res) => {
  const { name, description, html_content, thumbnail_url } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO templates (name, description, html_content, thumbnail_url) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, description, html_content, thumbnail_url]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Ошибка при создании шаблона:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Получение всех лэндингов пользователя
app.get('/api/landings/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
    const result = await pool.query(
      `SELECT l.id, l.name, l.created_at, l.updated_at, t.name as template_name, t.thumbnail_url
       FROM landings l
       LEFT JOIN templates t ON l.template_id = t.id
       WHERE l.user_id = $1
       ORDER BY l.updated_at DESC`,
      [userId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Ошибка при получении лэндингов:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Создание нового лэндинга
app.post('/api/landings', async (req, res) => {
  const { userId, templateId, name, htmlContent } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO landings (user_id, template_id, name, html_content)
       VALUES ($1, $2, $3, $4)
       RETURNING id`,
      [userId, templateId, name, htmlContent]
    );
    res.status(201).json({ id: result.rows[0].id });
  } catch (error) {
    console.error('Ошибка при создании лэндинга:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Обновление лэндинга
app.put('/api/landings/:id', async (req, res) => {
  const landingId = req.params.id;
  const { htmlContent } = req.body;
  try {
    await pool.query(
      `UPDATE landings 
       SET html_content = $1, updated_at = NOW()
       WHERE id = $2`,
      [htmlContent, landingId]
    );
    res.status(200).json({ message: 'Лэндинг обновлен' });
  } catch (error) {
    console.error('Ошибка при обновлении лэндинга:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Удаление лэндинга
app.delete('/api/landings/:id', async (req, res) => {
  const landingId = req.params.id;
  try {
    await pool.query('DELETE FROM landings WHERE id = $1', [landingId]);
    res.status(204).send();
  } catch (error) {
    console.error('Ошибка при удалении лэндинга:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

app.post('/api/register', async (req, res) => {
  const { firebase_uid, email } = req.body;

  try {
    // Простая вставка в базу данных
    const result = await pool.query(
      `INSERT INTO users (firebase_uid, email) 
       VALUES ($1, $2) 
       ON CONFLICT (firebase_uid) DO NOTHING 
       RETURNING id`,
      [firebase_uid, email]
    );
    
    // Если пользователь уже существует (ON CONFLICT)
    if (result.rows.length === 0) {
      return res.status(200).json({ message: 'User already exists' });
    }
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Database operation failed' });
  }
});


// Получение пользователя по Firebase UID
app.post('/api/user-by-firebase', async (req, res) => {
  const { firebase_uid } = req.body;
  try {
    const result = await pool.query(
      'SELECT id FROM users WHERE firebase_uid = $1',
      [firebase_uid]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
