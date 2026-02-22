// scripts/add-project.mjs
// Run with: node scripts/add-project.mjs
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

// Load .env.local manually
const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, '../.env.local');
const envContent = readFileSync(envPath, 'utf-8');

// Parse env vars
for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const [key, ...rest] = trimmed.split('=');
    process.env[key.trim()] = rest.join('=').trim();
}

// Import Firebase
const { initializeApp } = await import('firebase/app');
const { getFirestore, collection, addDoc, serverTimestamp } = await import('firebase/firestore');

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

console.log('🔥 Connecting to Firebase project:', firebaseConfig.projectId);

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const projectData = {
    title: "Weather App – Real-Time Weather Forecast",
    category: "Web",
    description: "Responsive real-time weather application using WeatherAPI and HTTPS fetch integration. Allows users to search any city and view live temperature, weather conditions, and dynamic weather icons.",
    techStack: ["HTML5", "CSS3", "JavaScript", "REST API", "Fetch API", "Vercel"],
    githubUrl: "https://github.com/ommaurya2580-beep/weather-app",
    liveUrl: "https://weather-app-five-dun-93.vercel.app/",
    featured: true,
    createdAt: serverTimestamp(),
};

try {
    const docRef = await addDoc(collection(db, 'projects'), projectData);
    console.log('✅ Project added successfully!');
    console.log('📄 Document ID:', docRef.id);
    console.log('🌐 Live URL:', projectData.liveUrl);
    process.exit(0);
} catch (error) {
    console.error('❌ Error adding project:', error.message);
    process.exit(1);
}
