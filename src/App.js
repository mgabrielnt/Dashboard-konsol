import React, { useMemo, useState } from "react";

const modules = [
  {
    key: "bki",
    label: "BKI",
    name: "Badan Karantina Indonesia",
    total: 18420,
    trend: 12.4,
    sla: 98.6,
    accuracy: 97.8,
    risk: "Low",
    queue: 126,
    resolved: 17290,
    icon: "BK",
  },
  {
    key: "sci",
    label: "SCI",
    name: "Supply Chain Intelligence",
    total: 13280,
    trend: 8.7,
    sla: 96.4,
    accuracy: 95.9,
    risk: "Medium",
    queue: 212,
    resolved: 12488,
    icon: "SC",
  },
  {
    key: "si",
    label: "SI",
    name: "Strategic Intelligence",
    total: 11245,
    trend: 15.2,
    sla: 97.1,
    accuracy: 96.7,
    risk: "Low",
    queue: 94,
    resolved: 10790,
    icon: "SI",
  },
];

const monthlyTrend = [
  { month: "Jan", bki: 1160, sci: 860, si: 720 },
  { month: "Feb", bki: 1240, sci: 940, si: 780 },
  { month: "Mar", bki: 1385, sci: 1010, si: 845 },
  { month: "Apr", bki: 1510, sci: 1120, si: 910 },
  { month: "Mei", bki: 1675, sci: 1205, si: 1004 },
  { month: "Jun", bki: 1780, sci: 1330, si: 1106 },
  { month: "Jul", bki: 1890, sci: 1460, si: 1210 },
];

const workloadRows = [
  { id: "KSL-2401", owner: "BKI", title: "Validasi dokumen komoditas ekspor", status: "Selesai", priority: "High", time: "1 jam lalu" },
  { id: "KSL-2402", owner: "SCI", title: "Anomali rute distribusi prioritas", status: "Proses", priority: "Critical", time: "2 jam lalu" },
  { id: "KSL-2403", owner: "SI", title: "Sinkronisasi indikator strategis bulanan", status: "Selesai", priority: "Medium", time: "Hari ini" },
  { id: "KSL-2404", owner: "BKI", title: "Audit kepatuhan titik layanan", status: "Review", priority: "High", time: "Kemarin" },
  { id: "KSL-2405", owner: "SCI", title: "Konsolidasi dataset operasional", status: "Proses", priority: "Medium", time: "Kemarin" },
];

const complianceItems = [
  { label: "Data completeness", score: 98, detail: "Kolom wajib dan metadata utama aman" },
  { label: "Processing SLA", score: 96, detail: "Mayoritas pekerjaan selesai sebelum tenggat" },
  { label: "Operational accuracy", score: 97, detail: "Validasi manual dan sistem konsisten" },
  { label: "Risk control", score: 92, detail: "Perlu monitor antrian prioritas tinggi" },
];

const timelineItems = [
  "08.30 — Data warehouse sync completed",
  "10.15 — 212 items moved to review queue",
  "13.40 — SCI anomaly batch flagged",
  "15.10 — Executive summary generated",
];

const statusClass = {
  Selesai: "done",
  Proses: "process",
  Review: "review",
};

const formatNumber = (value) => new Intl.NumberFormat("id-ID").format(value);
const formatDecimal = (value) => new Intl.NumberFormat("id-ID", { maximumFractionDigits: 1 }).format(value);

function App() {
  const [activeModule, setActiveModule] = useState("all");
  const [period, setPeriod] = useState("2026");

  const selectedModules = useMemo(() => {
    if (activeModule === "all") return modules;
    return modules.filter((item) => item.key === activeModule);
  }, [activeModule]);

  const summary = useMemo(() => {
    const total = selectedModules.reduce((sum, item) => sum + item.total, 0);
    const queue = selectedModules.reduce((sum, item) => sum + item.queue, 0);
    const resolved = selectedModules.reduce((sum, item) => sum + item.resolved, 0);
    const sla = selectedModules.reduce((sum, item) => sum + item.sla, 0) / selectedModules.length;
    const accuracy = selectedModules.reduce((sum, item) => sum + item.accuracy, 0) / selectedModules.length;

    return { total, queue, resolved, sla, accuracy };
  }, [selectedModules]);

  const filteredRows = useMemo(() => {
    if (activeModule === "all") return workloadRows;
    return workloadRows.filter((row) => row.owner.toLowerCase() === activeModule);
  }, [activeModule]);

  const maxTrend = Math.max(...monthlyTrend.flatMap((item) => [item.bki, item.sci, item.si]));
  const currentDate = new Date().toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const handleExport = () => {
    const headers = ["id", "owner", "title", "status", "priority", "time"];
    const rows = filteredRows.map((row) => headers.map((header) => `"${row[header]}"`).join(","));
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `dashboard-konsol-${activeModule}-${period}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="dashboard-shell">
      <aside className="sidebar" aria-label="Dashboard navigation">
        <div className="brand-block">
          <div className="brand-mark">K</div>
          <div>
            <p className="eyebrow">Command Center</p>
            <h1>Dashboard Konsol</h1>
          </div>
        </div>

        <nav className="nav-stack">
          {[
            ["Overview", "active"],
            ["Monitoring", ""],
            ["Analytics", ""],
            ["Reports", ""],
            ["Settings", ""],
          ].map(([label, state]) => (
            <button className={`nav-item ${state}`} key={label} type="button">
              <span />
              {label}
            </button>
          ))}
        </nav>

        <div className="sidebar-card">
          <p>System health</p>
          <strong>99.4%</strong>
          <span>All core services are operational.</span>
        </div>
      </aside>

      <section className="content-area">
        <header className="hero-card">
          <div className="hero-copy">
            <p className="eyebrow">Operational intelligence · {period}</p>
            <h2>Executive dashboard untuk monitoring BKI, SCI, dan SI.</h2>
            <p>
              Tampilan ini dibuat ringan, responsif, dan siap deploy. Data contoh tetap tersedia agar dashboard tidak blank saat API atau database belum aktif.
            </p>
          </div>

          <div className="hero-actions">
            <select value={period} onChange={(event) => setPeriod(event.target.value)} aria-label="Pilih periode">
              <option value="2026">2026</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
            </select>
            <button className="primary-button" type="button" onClick={handleExport}>Export CSV</button>
          </div>
        </header>

        <section className="filter-row" aria-label="Filter modul">
          <button className={activeModule === "all" ? "chip active" : "chip"} onClick={() => setActiveModule("all")} type="button">All Units</button>
          {modules.map((item) => (
            <button className={activeModule === item.key ? "chip active" : "chip"} key={item.key} onClick={() => setActiveModule(item.key)} type="button">
              {item.label}
            </button>
          ))}
        </section>

        <section className="metric-grid" aria-label="Ringkasan metrik utama">
          <article className="metric-card highlight">
            <p>Total Records</p>
            <strong>{formatNumber(summary.total)}</strong>
            <span>+{formatDecimal(selectedModules.reduce((sum, item) => sum + item.trend, 0) / selectedModules.length)}% vs periode lalu</span>
          </article>
          <article className="metric-card">
            <p>Resolved</p>
            <strong>{formatNumber(summary.resolved)}</strong>
            <span>Validated and completed</span>
          </article>
          <article className="metric-card">
            <p>Open Queue</p>
            <strong>{formatNumber(summary.queue)}</strong>
            <span>Needs operational attention</span>
          </article>
          <article className="metric-card">
            <p>Average SLA</p>
            <strong>{formatDecimal(summary.sla)}%</strong>
            <span>Accuracy {formatDecimal(summary.accuracy)}%</span>
          </article>
        </section>

        <section className="module-grid" aria-label="Unit summary">
          {modules.map((item) => (
            <article className="module-card" key={item.key}>
              <div className="module-head">
                <span>{item.icon}</span>
                <div>
                  <h3>{item.label}</h3>
                  <p>{item.name}</p>
                </div>
              </div>
              <div className="module-stats">
                <div>
                  <strong>{formatNumber(item.total)}</strong>
                  <span>Total</span>
                </div>
                <div>
                  <strong>{formatDecimal(item.sla)}%</strong>
                  <span>SLA</span>
                </div>
                <div>
                  <strong>{item.risk}</strong>
                  <span>Risk</span>
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="analytics-grid">
          <article className="panel trend-panel">
            <div className="panel-header">
              <div>
                <p className="eyebrow">Monthly trend</p>
                <h3>Volume monitoring per unit</h3>
              </div>
              <span>{currentDate}</span>
            </div>

            <div className="chart-wrap" aria-label="Grafik tren bulanan">
              {monthlyTrend.map((item) => (
                <div className="trend-column" key={item.month}>
                  <div className="bars">
                    <span className="bar bki" style={{ height: `${(item.bki / maxTrend) * 100}%` }} />
                    <span className="bar sci" style={{ height: `${(item.sci / maxTrend) * 100}%` }} />
                    <span className="bar si" style={{ height: `${(item.si / maxTrend) * 100}%` }} />
                  </div>
                  <small>{item.month}</small>
                </div>
              ))}
            </div>

            <div className="legend-row">
              <span><i className="dot bki" />BKI</span>
              <span><i className="dot sci" />SCI</span>
              <span><i className="dot si" />SI</span>
            </div>
          </article>

          <article className="panel compliance-panel">
            <div className="panel-header">
              <div>
                <p className="eyebrow">Quality control</p>
                <h3>Compliance score</h3>
              </div>
            </div>

            <div className="score-list">
              {complianceItems.map((item) => (
                <div className="score-item" key={item.label}>
                  <div>
                    <strong>{item.label}</strong>
                    <span>{item.detail}</span>
                  </div>
                  <b>{item.score}%</b>
                  <em style={{ width: `${item.score}%` }} />
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="bottom-grid">
          <article className="panel table-panel">
            <div className="panel-header">
              <div>
                <p className="eyebrow">Workload</p>
                <h3>Recent operational queue</h3>
              </div>
              <span>{filteredRows.length} items</span>
            </div>

            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Unit</th>
                    <th>Task</th>
                    <th>Status</th>
                    <th>Priority</th>
                    <th>Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRows.map((row) => (
                    <tr key={row.id}>
                      <td>{row.id}</td>
                      <td>{row.owner}</td>
                      <td>{row.title}</td>
                      <td><span className={`status-pill ${statusClass[row.status]}`}>{row.status}</span></td>
                      <td>{row.priority}</td>
                      <td>{row.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>

          <article className="panel timeline-panel">
            <div className="panel-header">
              <div>
                <p className="eyebrow">Live activity</p>
                <h3>Latest events</h3>
              </div>
            </div>
            <ul>
              {timelineItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </section>
      </section>
    </main>
  );
}

export default App;
