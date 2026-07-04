# Dashboard Konsol

Dashboard React profesional untuk monitoring BKI, SCI, SI, workload, compliance score, tren bulanan, dan aktivitas operasional.

Run lokal:

npm install
npm start

Buka http://localhost:3000.

Build production:

npm run build
npm run preview

Backend fallback:

npm run server

Endpoint utama:

http://localhost:5000/api/health
http://localhost:5000/api/dashboard/summary
http://localhost:5000/api/entities/totals-with-trends
http://localhost:5000/api/calendar/count

Netlify:

Build command: npm run build
Publish directory: build

Vercel:

Framework preset: Create React App
Build command: npm run build
Output directory: build
