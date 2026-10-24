import { useEffect, useState } from 'react';
import {
  LayoutDashboard,
  Building2,
  ClipboardCheck,
  History,
  Search,
  RefreshCw,
  MapPin,
  ShieldCheck,
  AlertTriangle,
  Plus,
  X,
  Activity
} from 'lucide-react';
import './App.css';

const API = 'http://localhost:5001/api';

function App() {
  const [facilities, setFacilities] = useState([]);
  const [inspections, setInspections] = useState([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    facility_id: '',
    inspector_name: '',
    inspection_date: new Date().toISOString().slice(0, 10),
    safety_score: 85,
    notes: ''
  });
  const [message, setMessage] = useState('');

  async function loadFacilities() {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API}/facilities`);
      if (!response.ok) throw new Error('Unable to load facilities');

      const data = await response.json();
      setFacilities(data);

      const historyResponse = await fetch(`${API}/inspections`);
      if (historyResponse.ok) {
        setInspections(await historyResponse.json());
      }
    } catch {
      setError('API connection failed. Make sure the backend is running on port 5001.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadFacilities();
  }, []);

  async function submitInspection(event) {
    event.preventDefault();
    setMessage('');

    try {
      const response = await fetch(`${API}/inspections`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          facility_id: Number(form.facility_id),
          safety_score: Number(form.safety_score)
        })
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Could not save inspection');

      setMessage('Inspection saved successfully!');
      setShowForm(false);
      setForm({
        facility_id: '',
        inspector_name: '',
        inspection_date: new Date().toISOString().slice(0, 10),
        safety_score: 85,
        notes: ''
      });

      await loadFacilities();
    } catch (err) {
      setMessage(err.message);
    }
  }

  const filtered = facilities.filter((facility) => {
    const matchesSearch =
      facility.name.toLowerCase().includes(search.toLowerCase()) ||
      facility.location.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = status === 'All' || facility.status === status;
    return matchesSearch && matchesStatus;
  });

  const safeCount = facilities.filter((f) => f.status === 'Safe').length;
  const attentionCount = facilities.filter((f) => f.status !== 'Safe').length;
  const average = facilities.length
    ? Math.round(facilities.reduce((sum, f) => sum + f.score, 0) / facilities.length)
    : 0;

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-icon">F</span>
          <div>
            <h2>FacilityCare</h2>
            <small>MANAGEMENT SYSTEM</small>
          </div>
        </div>

        <p className="menu-label">WORKSPACE</p>

        <a className="nav-item active" href="#dashboard">
          <LayoutDashboard size={19} /> Dashboard
        </a>
        <a className="nav-item" href="#facilities">
          <Building2 size={19} /> Facilities
        </a>
        <a className="nav-item" href="#inspections">
          <ClipboardCheck size={19} /> Inspections
        </a>
        <a className="nav-item" href="#history">
          <History size={19} /> Inspection History
        </a>

        <div className="sidebar-bottom">
          <div className="help-card">
            <ShieldCheck size={27} />
            <h3>Keep it safe!</h3>
            <p>Regular inspections help maintain a safe facility.</p>
          </div>

          <div className="user-profile">
            <div className="avatar">TD</div>
            <div>
              <strong>Administrator</strong>
              <small>Facility Manager</small>
            </div>
          </div>
        </div>
      </aside>

      <main className="main-content" id="dashboard">
        <header className="topbar">
          <div>
            <p className="breadcrumb">Workspace / Overview</p>
            <h1>Facility Inspection Dashboard</h1>
          </div>
          <span className="online-badge">
            <span className="online-dot"></span> System Online
          </span>
        </header>

        <section className="welcome-banner">
          <div>
            <span className="eyebrow">FACILITY MANAGEMENT</span>
            <h2>Good day, Administrator! 👋</h2>
            <p>Monitor facility safety and keep every inspection on track.</p>
            <button className="primary-button" onClick={() => setShowForm(true)}>
              <Plus size={18} /> New Inspection
            </button>
          </div>
          <Building2 className="banner-icon" size={100} />
        </section>

        {message && (
          <div className="message-box">
            {message}
            <button onClick={() => setMessage('')} aria-label="Dismiss message">
              <X size={16} />
            </button>
          </div>
        )}

        <section className="stats-grid">
          <article className="stat-card">
            <div className="stat-heading">
              <span>Total Facilities</span>
              <Building2 className="blue-icon" />
            </div>
            <h2>{facilities.length}</h2>
            <p>Registered facilities</p>
          </article>

          <article className="stat-card">
            <div className="stat-heading">
              <span>Safe Facilities</span>
              <ShieldCheck className="green-icon" />
            </div>
            <h2>{safeCount}</h2>
            <p>Facilities marked safe</p>
          </article>

          <article className="stat-card">
            <div className="stat-heading">
              <span>Need Attention</span>
              <AlertTriangle className="orange-icon" />
            </div>
            <h2>{attentionCount}</h2>
            <p>Require follow-up</p>
          </article>

          <article className="stat-card">
            <div className="stat-heading">
              <span>Average Safety Score</span>
              <Activity className="purple-icon" />
            </div>
            <h2>{average}%</h2>
            <p>Across all facilities</p>
          </article>
        </section>

        <section className="panel" id="facilities">
          <div className="panel-heading">
            <div>
              <h2>Facility Overview</h2>
              <p>Search and monitor your registered facilities.</p>
            </div>
            <span className="record-count">{filtered.length} records</span>
          </div>

          <div className="filters">
            <div className="search-box">
              <Search size={19} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search facility or location..."
              />
            </div>

            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="All">All statuses</option>
              <option value="Safe">Safe</option>
              <option value="Inspection Due">Inspection Due</option>
              <option value="Attention">Attention</option>
            </select>

            <button className="refresh-button" onClick={loadFacilities}>
              <RefreshCw size={17} /> Refresh
            </button>
          </div>

          {loading && <div className="info-box">Loading facilities from API...</div>}

          {error && (
            <div className="error-box">
              {error}
              <button onClick={loadFacilities}>Retry</button>
            </div>
          )}

          {!loading && !error && (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>FACILITY</th>
                    <th>LOCATION</th>
                    <th>SAFETY SCORE</th>
                    <th>STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((facility) => (
                    <tr key={facility.id}>
                      <td>
                        <div className="facility-cell">
                          <span className="facility-icon"><Building2 size={18} /></span>
                          <strong>{facility.name}</strong>
                        </div>
                      </td>
                      <td><MapPin size={15} className="location-icon" /> {facility.location}</td>
                      <td>
                        <div className="score-cell">
                          <div className="score-track">
                            <div
                              className="score-fill"
                              style={{ width: `${facility.score}%` }}
                            />
                          </div>
                          {facility.score}%
                        </div>
                      </td>
                      <td>
                        <span className={`status-badge ${facility.status.toLowerCase().replaceAll(' ', '-')}`}>
                          {facility.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr><td colSpan="4" className="empty-state">No facilities found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section className="lower-grid" id="inspections">
          <article className="panel">
            <div className="panel-heading">
              <div>
                <h2>Inspection Summary</h2>
                <p>Current facility safety snapshot</p>
              </div>
              <ShieldCheck className="green-icon" size={26} />
            </div>
            <div className="summary-row">
              <span>Safe facilities</span><strong>{safeCount}</strong>
            </div>
            <div className="summary-row">
              <span>Require attention</span><strong>{attentionCount}</strong>
            </div>
            <div className="summary-row">
              <span>Total facilities</span><strong>{facilities.length}</strong>
            </div>
          </article>

          <article className="panel" id="history">
            <div className="panel-heading">
              <div>
                <h2>Inspection History</h2>
                <p>Saved inspections from the database</p>
              </div>
              <History className="purple-icon" size={26} />
            </div>

            {inspections.length === 0 && (
              <p className="empty-history">No inspections recorded yet.</p>
            )}

            {inspections.map((item) => (
              <div className="history-item" key={item.id}>
                <div>
                  <strong>{item.facility_name}</strong>
                  <p>{item.inspector_name} · {item.inspection_date}</p>
                  {item.notes && <small>{item.notes}</small>}
                </div>
                <span className={`status-badge ${item.status.toLowerCase()}`}>
                  {item.safety_score}% · {item.status}
                </span>
              </div>
            ))}
          </article>
        </section>

        <footer>FacilityCare Dashboard · Day 10 Final Project</footer>
      </main>

      {showForm && (
        <div className="modal-backdrop">
          <form className="inspection-form" onSubmit={submitInspection}>
            <div className="form-heading">
              <div>
                <h2>New Facility Inspection</h2>
                <p>Record a safety inspection.</p>
              </div>
              <button type="button" className="close-button" onClick={() => setShowForm(false)}>
                <X />
              </button>
            </div>

            <label>
              Facility
              <select
                required
                value={form.facility_id}
                onChange={(e) => setForm({ ...form, facility_id: e.target.value })}
              >
                <option value="">Select facility</option>
                {facilities.map((facility) => (
                  <option key={facility.id} value={facility.id}>
                    {facility.name}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Inspector Name
              <input
                required
                value={form.inspector_name}
                onChange={(e) => setForm({ ...form, inspector_name: e.target.value })}
                placeholder="Enter inspector name"
              />
            </label>

            <label>
              Inspection Date
              <input
                type="date"
                required
                value={form.inspection_date}
                onChange={(e) => setForm({ ...form, inspection_date: e.target.value })}
              />
            </label>

            <label>
              Safety Score (0–100)
              <input
                type="number"
                min="0"
                max="100"
                required
                value={form.safety_score}
                onChange={(e) => setForm({ ...form, safety_score: e.target.value })}
              />
            </label>

            <label>
              Notes
              <textarea
                rows="3"
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                placeholder="Inspection notes (optional)"
              />
            </label>

            <div className="form-actions">
              <button type="button" className="secondary-button" onClick={() => setShowForm(false)}>
                Cancel
              </button>
              <button type="submit" className="primary-button">
                Save Inspection
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;