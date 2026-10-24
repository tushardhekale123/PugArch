
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Temporary sample data
let facilities = [
  { id: 1, name: 'Main Office', location: 'Amravati', status: 'Safe', score: 95 },
  { id: 2, name: 'Production Unit', location: 'Akola', status: 'Inspection Due', score: 68 },
  { id: 3, name: 'Storage Facility', location: 'Khamgaon', status: 'Attention', score: 52 },
  { id: 4, name: 'Research Center', location: 'Pune', status: 'Safe', score: 91 }
];

let inspections = [];
let complaints = [];

let nextFacilityId = 5;
let nextInspectionId = 1;
let nextComplaintId = 1;

const allowedStatuses = ['Safe', 'Inspection Due', 'Attention'];
const allowedPriorities = ['Low', 'Medium', 'High'];
const allowedComplaintStatuses = ['Open', 'In Progress', 'Resolved'];

function validScore(score) {
  return Number.isInteger(Number(score)) &&
    Number(score) >= 0 &&
    Number(score) <= 100;
}

function getStatus(score) {
  return Number(score) >= 80 ? 'Safe' : 'Attention';
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Facility API is running',
    database: 'Not configured - using temporary data'
  });
});

// Get facilities
app.get('/api/facilities', (req, res) => {
  res.json([...facilities].sort((a, b) => b.id - a.id));
});

// Get one facility
app.get('/api/facilities/:id', (req, res) => {
  const facility = facilities.find(f => f.id === Number(req.params.id));

  if (!facility) {
    return res.status(404).json({ error: 'Facility not found' });
  }

  res.json(facility);
});

// Add facility
app.post('/api/facilities', (req, res) => {
  const { name, location, status = 'Safe', score = 0 } = req.body;

  if (!name?.trim() || !location?.trim()) {
    return res.status(400).json({
      error: 'Facility name and location are required'
    });
  }

  if (!allowedStatuses.includes(status) || !validScore(score)) {
    return res.status(400).json({ error: 'Invalid status or score' });
  }

  const facility = {
    id: nextFacilityId++,
    name: name.trim(),
    location: location.trim(),
    status,
    score: Number(score)
  };

  facilities.push(facility);
  res.status(201).json(facility);
});

// Update facility
app.put('/api/facilities/:id', (req, res) => {
  const { name, location, status, score } = req.body;

  if (!name?.trim() || !location?.trim()) {
    return res.status(400).json({
      error: 'Facility name and location are required'
    });
  }

  if (!allowedStatuses.includes(status) || !validScore(score)) {
    return res.status(400).json({ error: 'Invalid status or score' });
  }

  const facility = facilities.find(f => f.id === Number(req.params.id));

  if (!facility) {
    return res.status(404).json({ error: 'Facility not found' });
  }

  Object.assign(facility, {
    name: name.trim(),
    location: location.trim(),
    status,
    score: Number(score)
  });

  res.json({ success: true, facility });
});

// Delete facility
app.delete('/api/facilities/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = facilities.findIndex(f => f.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Facility not found' });
  }

  facilities.splice(index, 1);
  inspections = inspections.filter(i => i.facility_id !== id);
  complaints = complaints.filter(c => c.facility_id !== id);

  res.json({ success: true, message: 'Facility deleted successfully' });
});

// Add inspection
app.post('/api/inspections', (req, res) => {
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
      error: 'Safety score must be between 0 and 100'
    });
  }

  const facility = facilities.find(f => f.id === Number(facility_id));

  if (!facility) {
    return res.status(404).json({ error: 'Facility not found' });
  }

  const score = Number(safety_score);

  const inspection = {
    id: nextInspectionId++,
    facility_id: Number(facility_id),
    facility_name: facility.name,
    inspector_name: inspector_name.trim(),
    inspection_date,
    safety_score: score,
    notes,
    status: getStatus(score)
  };

  inspections.push(inspection);
  facility.score = score;
  facility.status = getStatus(score);

  res.status(201).json(inspection);
});

// Get inspection history
app.get('/api/inspections', (req, res) => {
  res.json([...inspections].sort((a, b) => b.id - a.id));
});

// Get complaints
app.get('/api/complaints', (req, res) => {
  res.json(
    [...complaints].sort((a, b) => b.id - a.id).map(c => ({
      ...c,
      facility_name:
        facilities.find(f => f.id === c.facility_id)?.name || 'Unknown facility'
    }))
  );
});

// Add complaint
app.post('/api/complaints', (req, res) => {
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

  if (!allowedPriorities.includes(priority)) {
    return res.status(400).json({ error: 'Invalid complaint priority' });
  }

  const facility = facilities.find(f => f.id === Number(facility_id));

  if (!facility) {
    return res.status(400).json({ error: 'Facility not found' });
  }

  const complaint = {
    id: nextComplaintId++,
    facility_id: Number(facility_id),
    facility_name: facility.name,
    title: title.trim(),
    description,
    priority,
    status: 'Open',
    created_at: new Date().toISOString()
  };

  complaints.push(complaint);
  res.status(201).json(complaint);
});

// Update complaint status
app.patch('/api/complaints/:id/status', (req, res) => {
  const { status } = req.body;

  if (!allowedComplaintStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid complaint status' });
  }

  const complaint = complaints.find(c => c.id === Number(req.params.id));

  if (!complaint) {
    return res.status(404).json({ error: 'Complaint not found' });
  }

  complaint.status = status;

  res.json({
    success: true,
    message: 'Complaint status updated',
    complaint
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Facility API running on port ${PORT}`);
});

