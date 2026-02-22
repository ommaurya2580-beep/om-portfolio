
const fs = require('fs');
const path = require('path');

async function verify() {
    console.log('🔍 Verifying Environment & Connectivity...\n');

    // 1. Manually load .env.local
    const envPath = path.resolve(__dirname, '../.env.local');
    const envVars = {};

    if (fs.existsSync(envPath)) {
        const raw = fs.readFileSync(envPath, 'utf-8');
        raw.split('\n').forEach(line => {
            const trimmed = line.trim();
            if (!trimmed || trimmed.startsWith('#')) return;

            const match = trimmed.match(/^([^=]+)=(.*)$/);
            if (match) {
                let key = match[1].trim();
                let value = match[2].trim();
                // Remove quotes if present
                if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
                if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
                envVars[key] = value;
            }
        });
    } else {
        console.error('❌ .env.local not found');
        return;
    }

    // 2. Check for Placeholders
    const issues = [];
    const requiredKeys = ['NEXT_PUBLIC_FIREBASE_API_KEY', 'NEXT_PUBLIC_EMAILJS_SERVICE_ID', 'ADMIN_SECRET_KEY'];

    requiredKeys.forEach(key => {
        if (!envVars[key]) {
            issues.push(`Missing: ${key}`);
        } else if (envVars[key].includes('PLACEHOLDER') || envVars[key].includes('placeholder')) {
            issues.push(`Placeholder: ${key}`);
        }
    });

    if (issues.length > 0) {
        console.error('❌ Environment Check Failed (Placeholders Found):');
        issues.forEach(i => console.error(`   - ${i}`));
        console.log('⚠️  Skipping Firestore connection tests as they will fail without real credentials.');
    } else {
        console.log('✅ Environment variables appear to be configured.');
    }

    // 3. Test Admin API Route
    const adminKey = envVars['ADMIN_SECRET_KEY'];
    const apiUrl = 'http://localhost:3000/api/admin/upload';

    console.log(`\nTesting API Route: ${apiUrl}`);
    console.log(`Using Admin Key: ${adminKey}`);

    try {
        const res = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-admin-key': adminKey || ''
            },
            body: JSON.stringify({ action: 'verify' })
        });

        if (res.status === 200) {
            const data = await res.json();
            if (data.success) {
                console.log('✅ API Test Passed: Admin authenticated successfully.');
            } else {
                console.error('❌ API Test Failed: Response success was false', data);
            }
        } else {
            console.error(`❌ API Test Failed: Status ${res.status}`);
            console.error(await res.text());
        }
    } catch (err) {
        console.error('❌ API Connectivity Failed. Is the dev server running?');
        console.error('Error:', err.message);
    }
}

verify().catch(console.error);
