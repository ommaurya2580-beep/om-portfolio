import { initializeApp, getApps, cert, type ServiceAccount, type App as FirebaseApp } from 'firebase-admin/app';
import { getFirestore, type Firestore } from 'firebase-admin/firestore';

// ------------------------------------------------------------------
// Validate and Retrieve Service Account Credentials
// ------------------------------------------------------------------
function getServiceAccount(): ServiceAccount {
    // 1. Try FIREBASE_SERVICE_ACCOUNT_KEY (JSON string from env vars, e.g., Vercel)
    const jsonKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
    if (jsonKey) {
        try {
            return JSON.parse(jsonKey) as ServiceAccount;
        } catch (e) {
            console.error('FIREBASE_SERVICE_ACCOUNT_KEY is not valid JSON.', e);
            throw new Error('Invalid FIREBASE_SERVICE_ACCOUNT_KEY');
        }
    }

    // 2. Try GOOGLE_APPLICATION_CREDENTIALS (path to local file)
    // Note: automatic Google auth might work even without explicit setup
    // if standard env var is set, but we might want explicit loading here
    // if we strictly follow "Support BOTH".
    // However, initializeApp({ credential: cert(...) }) works best with object.
    // If we rely on ADC (Application Default Credentials), we can just use `applicationDefault()`.

    // Let's support the path explicitly if provided in env (custom approach) or fallback.
    // Actually, standard practice for local is simply `process.env.GOOGLE_APPLICATION_CREDENTIALS`.
    // If that is set, we don't necessarily need to parse it ourselves if we use `applicationDefault()`.
    // BUT the prompt asks to "Support BOTH ... b) GOOGLE_APPLICATION_CREDENTIALS (local file path)".
    // Let's implement robust loading.

    const credentialsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
    if (credentialsPath) {
        try {
            // We're not reading the file here because 'cert' expects the object or path. 
            // If running in Node, 'require' or 'fs' can read it.
            // However, typical `cert` usage: cert(serviceAccountPathOrObject)
            // So we can pass the path directly *IF* we are sure helper functions accept it.
            // `cert` from firebase-admin accepts `string | ServiceAccount`.
            // So we can return undefined here and handle it in initialization? 
            // No, let's keep it simple.

            // If we're here, we return null to indicate "use path or ADC".
            // But to match the "Support BOTH" requirement strictly in one flow:

            // If using `cert(path)`, it works.
            return require(credentialsPath);
        } catch (error) {
            console.error('Failed to load credentials from GOOGLE_APPLICATION_CREDENTIALS path.', error);
            // Fallthrough or throw?
        }
    }

    // If neither:
    throw new Error(
        'Missing Firebase Admin credentials. Set FIREBASE_SERVICE_ACCOUNT_KEY or GOOGLE_APPLICATION_CREDENTIALS.'
    );
}

// ------------------------------------------------------------------
// Initialize Firebase Admin (Singleton with Lazy Loading)
// ------------------------------------------------------------------

let app: FirebaseApp | undefined;
let db: Firestore | undefined;

export function getAdminApp(): FirebaseApp {
    if (!app) {
        const serviceAccount = getServiceAccount();
        const options = {
            credential: cert(serviceAccount),
        };

        if (getApps().length === 0) {
            app = initializeApp(options);
        } else {
            app = getApps()[0];
        }
    }
    return app!;
}

export function getAdminDb(): Firestore {
    if (!db) {
        const app = getAdminApp();
        db = getFirestore(app);
    }
    return db!;
}
