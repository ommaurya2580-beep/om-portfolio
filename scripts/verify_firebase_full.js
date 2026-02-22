const fs = require('fs');
const path = require('path');

// Helper to parse .env file
function parseEnv(filePath) {
    if (!fs.existsSync(filePath)) return {};
    const content = fs.readFileSync(filePath, 'utf8');
    const env = {};
    content.split('\n').forEach(line => {
        line = line.trim();
        if (!line || line.startsWith('#')) return;
        const match = line.match(/^([^=]+)=(.*)$/);
        if (match) {
            let value = match[2].trim();
            if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
            if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
            env[match[1].trim()] = value;
        }
    });
    return env;
}

(async () => {
    console.log("\n🔥 STARTING FULL FIREBASE VERIFICATION 🔥\n");

    // 1. Check Environment
    const envPath = path.join(__dirname, '../.env.local');
    const env = parseEnv(envPath);
    console.log("   Keys found in .env.local:", Object.keys(env));

    console.log("1️⃣  Environment Variables Check");
    const requiredKeys = [
        'NEXT_PUBLIC_FIREBASE_API_KEY',
        'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
        'ADMIN_SECRET_KEY'
    ];

    let missing = false;
    requiredKeys.forEach(key => {
        if (!env[key]) {
            console.log(`   ❌ Missing: ${key}`);
            missing = true;
        } else if (env[key].includes('PLACEHOLDER') || env[key].includes('placeholder')) {
            console.log(`   ⚠️  Placeholder detected: ${key}`);
            missing = true;
        } else {
            console.log(`   ✅ Valid: ${key}`);
        }
    });

    if (missing) {
        console.log("\n❌ Verification Aborted: Env vars missing.");
        process.exit(1);
    }

    // 2. Admin API Check
    console.log("\n2️⃣  Admin API Security Check");
    // Try both 3000 and 3001
    const ports = [3001, 3000];
    let apiSuccess = false;

    for (const port of ports) {
        try {
            const res = await fetch(`http://localhost:${port}/api/admin/upload`, {
                method: 'POST',
                headers: { 'x-admin-key': env.ADMIN_SECRET_KEY }
            });

            if (res.status === 400) {
                console.log(`   ✅ Port ${port}: API accepted key (Returned 400 Bad Request as expected).`);
                apiSuccess = true;
                break;
            } else if (res.status === 401 || res.status === 403) {
                console.log(`   ❌ Port ${port}: API Rejected Key. Check ADMIN_SECRET_KEY.`);
                break;
            } else if (res.status === 404) {
                // Not running on this port
                continue;
            }
        } catch (e) {
            // Connection refused
        }
    }

    if (!apiSuccess) {
        console.log("   ⚠️  Could not reach Admin API on port 3000/3001. Is server running?");
    }

    // 3. Firestore Connection
    console.log("\n3️⃣  Firestore Connection Check");
    try {
        const { initializeApp } = await import('firebase/app');
        const { getFirestore, collection, getDocs, addDoc, deleteDoc, doc } = await import('firebase/firestore');

        const firebaseConfig = {
            apiKey: env.NEXT_PUBLIC_FIREBASE_API_KEY,
            authDomain: env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
            projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
            storageBucket: env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
            messagingSenderId: env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
            appId: env.NEXT_PUBLIC_FIREBASE_APP_ID,
        };

        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);

        // Read
        process.stdout.write("   ⏳ Connecting to Firestore...");
        try {
            const querySnapshot = await getDocs(collection(db, "projects"));
            console.log(`\r   ✅ Connected! Found ${querySnapshot.size} projects.`);
        } catch (e) {
            console.log(`\r   ❌ Connection Failed: ${e.code || e.message}`);
            if (e.code === 'permission-denied') console.log("      (Check Firestore Rules in Console)");
            throw e; // Stop
        }

        // Write
        process.stdout.write("   ⏳ Testing Write Permission...");
        try {
            const testRef = await addDoc(collection(db, "projects"), {
                title: "Verification Test",
                category: "System",
                timestamp: new Date()
            });
            console.log(`\r   ✅ Write Success (ID: ${testRef.id})`);

            // Delete
            await deleteDoc(doc(db, "projects", testRef.id));
            console.log("   ✅ Cleanup Success");
        } catch (e) {
            console.log(`\r   ❌ Write Failed: ${e.code || e.message}`);
            if (e.code === 'permission-denied') console.log("      (Check Firestore Rules in Console)");
        }

    } catch (e) {
        // If import fails or other error
        if (e.code !== 'permission-denied') console.log(`   ❌ Error: ${e.message}`);
    }

    console.log("\n🏁 Verification Complete.");

})();
