require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'facility_management',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const allowedStatuses = ['Safe', 'Inspection Due', 'Attention'];

function validScore(score) {
  return Number.isInteger(Number(score)) &&
    Number(score) >= 0 &&
    Number(score) <= 100;
}

function getStatus(score) {
  return Number(score) >= 80 ? 'Safe' : 'Attention';
}

async function initializeDatabase() {
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS facilities (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(150) NOT NULL,
      location VARCHAR(150) NOT NULL,
      status ENUM('Safe', 'Inspection Due', 'Attention')
        NOT NULL DEFAULT 'Safe',
      safety_score INT NOT NULL DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await pool.execute(`
    CREATE TABLE IF NOT EXISTS inspections (
      id INT AUTO_INCREMENT PRIMARY KEY,
      facility_id INT NOT NULL,
      inspector_name VARCHAR(100) NOT NULL,
      inspection_date DATE NOT NULL,
      safety_score INT NOT NULL,
      notes TEXT,
      status ENUM('Safe', 'Attention') NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (facility_id)
        REFERENCES facilities(id) ON DELETE CASCADE
    )
  `);

  await pool.execute(`
    CREATE TABLE IF NOT EXISTS complaints (
      id INT AUTO_INCREMENT PRIMARY KEY,
      facility_id INT NOT NULL,
      title VARCHAR(200) NOT NULL,
      description TEXT,
      priority ENUM('Low', 'Medium', 'High')
        NOT NULL DEFAULT 'Medium',
      status ENUM('Open', 'In Progress', 'Resolved')
        NOT NULL DEFAULT 'Open',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (facility_id)
        REFERENCES facilities(id) ON DELETE CASCADE
    )
  `);

  const [rows] = await pool.execute(
    'SELECT COUNT(*) AS count FROM facilities'
  );

  if (Number(rows[0].count) === 0) {
    await pool.query(`
      INSERT INTO facilities (name, location, status, safety_score)
      VALUES
        ('Main Office', 'Amravati', 'Safe', 95),
        ('Production Unit', 'Akola', 'Inspection Due', 68),
        ('Storage Facility', 'Khamgaon', 'Attention', 52),
        ('Research Center', 'Pune', 'Safe', 91)
    `);

    console.log('Sample facilities inserted.');
  }

  console.log('MySQL database initialized.');
}

// Health check
app.get('/api/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');

    res.json({
      success: true,
      message: 'Facility API is running',
      database: 'MySQL connected'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'MySQL connection failed'
    });
  }
});

// Get all facilities
app.get('/api/facilities', async (req, res) => {
  try {
    const [facilities] = await pool.execute(`
      SELECT id, name, location, status, safety_score AS score
      FROM facilities
      ORDER BY id DESC
    `);

    res.json(facilities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to fetch facilities' });
  }
});

// Get one facility
app.get('/api/facilities/:id', async (req, res) => {
  try {
    const [rows] = await pool.execute(`
      SELECT id, name, location, status, safety_score AS score
      FROM facilities
      WHERE id = ?
    `, [req.params.id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Facility not found' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to fetch facility' });
  }
});

// Create a facility
app.post('/api/facilities', async (req, res) => {
  const { name, location, status = 'Safe', score = 0 } = req.body;

  if (!name?.trim() || !location?.trim()) {
    return res.status(400).json({
      error: 'Facility name and location are required'
    });
  }

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid facility status' });
  }

  if (!validScore(score)) {
    return res.status(400).json({
      error: 'Score must be an integer between 0 and 100'
    });
  }

  try {
    const [result] = await pool.execute(`
      INSERT INTO facilities (name, location, status, safety_score)
      VALUES (?, ?, ?, ?)
    `, [name.trim(), location.trim(), status, Number(score)]);

    res.status(201).json({
      id: result.insertId,
      name: name.trim(),
      location: location.trim(),
      status,
      score: Number(score)
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to create facility' });
  }
});

// Update a facility
app.put('/api/facilities/:id', async (req, res) => {
  const { name, location, status, score } = req.body;

  if (!name?.trim() || !location?.trim()) {
    return res.status(400).json({
      error: 'Facility name and location are required'
    });
  }

  if (!allowedStatuses.includes(status) || !validScore(score)) {
    return res.status(400).json({
      error: 'Invalid status or score'
    });
  }

  try {
    const [result] = await pool.execute(`
      UPDATE facilities
      SET name = ?, location = ?, status = ?, safety_score = ?
      WHERE id = ?
    `, [
      name.trim(),
      location.trim(),
      status,
      Number(score),
      req.params.id
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Facility not found' });
    }

    res.json({ success: true, message: 'Facility updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to update facility' });
  }
});

// Delete a facility
app.delete('/api/facilities/:id', async (req, res) => {
  try {
    const [result] = await pool.execute(
      'DELETE FROM facilities WHERE id = ?',
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Facility not found' });
    }

    res.json({ success: true, message: 'Facility deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to delete facility' });
  }
});

// Create an inspection
app.post('/api/inspections', async (req, res) => {
  const {
    facility_id,
    inspector_name,
    inspection_date,
    safety_score,
    notes = ''
  } = req.body;

  if (!facility_id || !inspector_name?.trim() || !inspection_date) {
    return res.status(400).json({
      error: 'Facility, inspector name and inspection date are required'
    });
  }

  if (!validScore(safety_score)) {
    return res.status(400).json({
      error: 'Safety score must be an integer between 0 and 100'
    });
  }

  const score = Number(safety_score);
  const status = getStatus(score);

  try {
    const [facilityRows] = await pool.execute(
      'SELECT id FROM facilities WHERE id = ?',
      [facility_id]
    );

    if (facilityRows.length === 0) {
      return res.status(404).json({ error: 'Facility not found' });
    }

    const [result] = await pool.execute(`
      INSERT INTO inspections
        (facility_id, inspector_name, inspection_date, safety_score, notes, status)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [
      Number(facility_id),
      inspector_name.trim(),
      inspection_date,
      score,
      notes,
      status
    ]);

    // Update the facility's current safety score and status.
    const facilityStatus = score >= 80 ? 'Safe' : 'Attention';

    await pool.execute(`
      UPDATE facilities
      SET safety_score = ?, status = ?
      WHERE id = ?
    `, [score, facilityStatus, Number(facility_id)]);

    res.status(201).json({
      id: result.insertId,
      facility_id: Number(facility_id),
      inspector_name: inspector_name.trim(),
      inspection_date,
      safety_score: score,
      notes,
      status
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to save inspection' });
  }
});

// Get inspection history
app.get('/api/inspections', async (req, res) => {
  try {
    const [inspections] = await pool.execute(`
      SELECT
        i.id,
        i.facility_id,
        f.name AS facility_name,
        i.inspector_name,
        DATE_FORMAT(i.inspection_date, '%Y-%m-%d') AS inspection_date,
        i.safety_score,
        i.notes,
        i.status
      FROM inspections i
      JOIN facilities f ON f.id = i.facility_id
      ORDER BY i.id DESC
    `);

    res.json(inspections);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to fetch inspections' });
  }
});

// Get complaints
app.get('/api/complaints', async (req, res) => {
  try {
    const [complaints] = await pool.execute(`
      SELECT
        c.id,
        c.facility_id,
        f.name AS facility_name,
        c.title,
        c.description,
        c.priority,
        c.status,
        c.created_at
      FROM complaints c
      JOIN facilities f ON f.id = c.facility_id
      ORDER BY c.id DESC
    `);

    res.json(complaints);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to fetch complaints' });
  }
});

// Create a complaint
app.post('/api/complaints', async (req, res) => {
  const {
    facility_id,
    title,
    description = '',
    priority = 'Medium'
  } = req.body;

  if (!facility_id || !title?.trim()) {
    return res.status(400).json({
      error: 'Facility and complaint title are required'
    });
  }

  if (!['Low', 'Medium', 'High'].includes(priority)) {
    return res.status(400).json({ error: 'Invalid complaint priority' });
  }

  try {
    const [result] = await pool.execute(`
      INSERT INTO complaints (facility_id, title, description, priority)
      VALUES (?, ?, ?, ?)
    `, [Number(facility_id), title.trim(), description, priority]);

    res.status(201).json({
      id: result.insertId,
      facility_id: Number(facility_id),
      title: title.trim(),
      description,
      priority,
      status: 'Open'
    });
  } catch (error) {
    console.error(error);

    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      return res.status(400).json({ error: 'Facility not found' });
    }

    res.status(500).json({ error: 'Unable to create complaint' });
  }
});

// Update complaint status
app.patch('/api/complaints/:id/status', async (req, res) => {
  const { status } = req.body;

  if (!['Open', 'In Progress', 'Resolved'].includes(status)) {
    return res.status(400).json({ error: 'Invalid complaint status' });
  }

  try {
    const [result] = await pool.execute(
      'UPDATE complaints SET status = ? WHERE id = ?',
      [status, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Complaint not found' });
    }

    res.json({ success: true, message: 'Complaint status updated' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to update complaint' });
  }
});

// Start server only after MySQL connects and tables are ready.
initializeDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Facility API running at http://localhost:${PORT}`);
      console.log(`Health check: http://localhost:${PORT}/api/health`);
    });
  })
  .catch((error) => {
    console.error('Unable to initialize MySQL database.');
    console.error(error.message);
    process.exit(1);
  });