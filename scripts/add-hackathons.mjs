// scripts/add-hackathons.mjs
// Adds all hackathon entries to Firestore `hackathons` collection via REST API
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

console.log(`🔥 Firebase project: ${PROJECT_ID}`);
console.log(`📂 Collection: hackathons\n`);

const hackathons = [
    {
        title: 'TATA Crucible Campus Quiz 2025',
        organization: 'TATA Group',
        type: 'Competition',
        year: '2025',
        icon: '🎯',
        color: '#ff0080',
        certificateUrl: 'https://unstop.com/certificate-preview/258c3353-83a4-449c-b31a-d1dfe94d2fea',
    },
    {
        title: 'NITS Hacks 8.0 – Coding Track',
        organization: 'NIT Silchar',
        type: 'Hackathon',
        year: '2024',
        icon: '🚀',
        color: '#ffa116',
        certificateUrl: 'https://unstop.com/certificate-preview/cf8147b5-86af-4a53-b4c4-4f89d7637128',
    },
    {
        title: 'CodeSummit 2.0 – Online Assessment',
        organization: 'RAIT ACM Student Chapter',
        type: 'Coding',
        year: '2025',
        icon: '💻',
        color: '#bf00ff',
        certificateUrl: 'https://unstop.com/certificate-preview/a78a22d9-462d-41cd-a42f-4f689dcf75f0',
    },
    {
        title: 'NationBuilding Case Study Competition 2026 – Online Quiz',
        organization: 'National Level',
        type: 'Competition',
        year: '2026',
        icon: '🌐',
        color: '#00f5ff',
        certificateUrl: 'https://unstop.com/certificate-preview/9e26ec77-4e0f-472c-9a68-1890fc6fef15',
    },
    {
        title: 'Hack4Delhi – Unstop Holiday Fest 2025',
        organization: 'NSUT Delhi',
        type: 'Hackathon',
        year: '2025',
        icon: '💡',
        color: '#bf00ff',
        certificateUrl: 'https://unstop.com/certificate-preview/81740470-0985-42a1-a9a4-eef791c32b9c',
    },
    {
        title: 'Kascade, Kshitij 2026',
        organization: 'IIT Kharagpur',
        type: 'Hackathon',
        year: '2026',
        icon: '🏆',
        color: '#00f5ff',
        certificateUrl: 'https://unstop.com/certificate-preview/d6fdb50a-9f9a-4c7a-8dfa-6d3a73a12978',
    },
    {
        title: 'Marketwise – E-Summit 2026',
        organization: 'IIT Roorkee',
        type: 'Competition',
        year: '2026',
        icon: '📈',
        color: '#00ff88',
        certificateUrl: 'https://unstop.com/certificate-preview/fc5af2cc-cfc2-45e5-8028-6db61883dbf8',
    },
    {
        title: 'Marketwise – Round 1 (AI & ML Fundamentals)',
        organization: 'IIT Roorkee',
        type: 'Competition',
        year: '2026',
        icon: '🧠',
        color: '#ffa116',
        certificateUrl: 'https://unstop.com/certificate-preview/39a942b7-0d77-412e-b822-2abe523deaa4',
    },
    {
        title: 'GLB Hackathon 4.0',
        organization: 'GL Bajaj Institute',
        type: 'Hackathon',
        year: '2024',
        icon: '⚡',
        color: '#00ff88',
        certificateUrl: 'https://unstop.com/certificate-preview/7508abbe-f215-48ab-ab3e-d9e6152337aa',
    },
];

const BASE_URL = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/hackathons`;

let added = 0;
let failed = 0;

for (const item of hackathons) {
    const fields = {
        title: { stringValue: item.title },
        organization: { stringValue: item.organization },
        type: { stringValue: item.type },
        year: { stringValue: item.year },
        icon: { stringValue: item.icon },
        color: { stringValue: item.color },
        createdAt: { timestampValue: new Date().toISOString() },
    };

    if (item.certificateUrl) {
        fields.certificateUrl = { stringValue: item.certificateUrl };
    }

    const res = await fetch(`${BASE_URL}?key=${API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fields }),
    });

    if (res.ok) {
        const data = await res.json();
        const id = data.name?.split('/').pop();
        console.log(`✅ [${++added}] ${item.title}`);
        console.log(`   ID: ${id}`);
        if (item.certificateUrl) {
            console.log(`   🔗 ${item.certificateUrl.slice(0, 60)}...`);
        } else {
            console.log(`   ⏳ No certificate URL (pending)`);
        }
        console.log('');
    } else {
        const err = await res.text();
        console.error(`❌ Failed: ${item.title}`, err);
        failed++;
    }
}

console.log(`\n📊 Summary: ${added} added, ${failed} failed`);
console.log(`✅ Firestore 'hackathons' collection is ready!`);
