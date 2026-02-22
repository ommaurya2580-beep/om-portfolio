// scripts/add-project-rest.mjs
// Uses Firestore REST API — no service account needed, just the API key
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, '../.env.local');
const envContent = readFileSync(envPath, 'utf-8');

// Parse .env.local
for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const idx = trimmed.indexOf('=');
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx).trim();
    const value = trimmed.slice(idx + 1).trim();
    process.env[key] = value;
}

const API_KEY = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
const PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

if (!API_KEY || !PROJECT_ID) {
    console.error('❌ Missing Firebase config from .env.local');
    process.exit(1);
}

console.log(`🔥 Connecting to Firebase project: ${PROJECT_ID}`);

// Firestore REST API URL
const url = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/projects?key=${API_KEY}`;

// Firestore REST API format — values must be wrapped in type objects
const body = {
    fields: {
        title: { stringValue: "Weather App – Real-Time Weather Forecast" },
        category: { stringValue: "Web" },
        description: { stringValue: "Responsive real-time weather application using WeatherAPI and HTTPS fetch integration. Allows users to search any city and view live temperature, weather conditions, and dynamic weather icons." },
        techStack: {
            arrayValue: {
                values: [
                    { stringValue: "HTML5" },
                    { stringValue: "CSS3" },
                    { stringValue: "JavaScript" },
                    { stringValue: "REST API" },
                    { stringValue: "Fetch API" },
                    { stringValue: "Vercel" },
                ]
            }
        },
        githubUrl: { stringValue: "https://github.com/ommaurya2580-beep/weather-app" },
        liveUrl: { stringValue: "https://weather-app-five-dun-93.vercel.app/" },
        featured: { booleanValue: true },
        createdAt: { timestampValue: new Date().toISOString() },
    }
};

const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
});

if (!res.ok) {
    const err = await res.text();
    console.error('❌ Failed to add project:', err);
    process.exit(1);
}

const data = await res.json();
const docId = data.name?.split('/').pop();
console.log('✅ Project added successfully!');
console.log('📄 Document ID:', docId);
console.log('🌐 Live URL: https://weather-app-five-dun-93.vercel.app/');
console.log('🐙 GitHub: https://github.com/ommaurya2580-beep/weather-app');
