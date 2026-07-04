const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", app: "Dashboard Konsol" });
});

app.listen(PORT, () => {
  console.log(`Dashboard Konsol server running on port ${PORT}`);
});
