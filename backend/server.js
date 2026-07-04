const path = require("path");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 5000;
const buildPath = path.join(__dirname, "..", "build");

const totals = {
  bki: { value: 18420, increase: "+12.4%", progress: "0.92" },
  sci: { value: 13280, increase: "+8.7%", progress: "0.86" },
  si: { value: 11245, increase: "+15.2%", progress: "0.89" },
  konsol: { value: 42945, increase: "+11.8%", progress: "0.91" },
};

app.use(express.json());
app.use(express.static(buildPath));

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", app: "Dashboard Konsol", timestamp: new Date().toISOString() });
});

app.get("/api/dashboard/summary", (req, res) => {
  res.json({ status: "ok", source: "fallback", totals });
});

app.get("/api/entities/totals-with-trends", (req, res) => {
  res.json(totals);
});

app.get("/api/calendar/count", (req, res) => {
  res.json({ count: 4 });
});

app.listen(PORT, () => {
  console.log(`Dashboard Konsol server running on port ${PORT}`);
});
