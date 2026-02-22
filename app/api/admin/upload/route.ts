
import { getAdminDb } from '@/lib/firebase-admin';
import { FieldValue, Timestamp } from 'firebase-admin/firestore';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const adminDb = getAdminDb();

        // 1. Validate Admin Secret Key
        const authHeader = request.headers.get('Authorization') || request.headers.get('x-admin-secret-key');
        // Allow passing key via Authorization: Bearer <KEY> or x-admin-secret-key header
        const token = authHeader?.replace('Bearer ', '');

        // Strict string comparison
        if (token !== process.env.ADMIN_SECRET_KEY) {
            return NextResponse.json(
                { error: 'Unauthorized: Invalid Admin Secret Key' },
                { status: 401 }
            );
        }

        // 2. Parse Request Body
        const data = await request.json();

        if (!data || typeof data !== 'object') {
            return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
        }

        // Handle verification check only
        if (data.action === 'verify') {
            return NextResponse.json({ success: true, message: 'Admin key verified' });
        }

        // 3. Determine Collection and Operation
        // The user requirement didn't specify strict schemas for the upload, 
        // but implied "Store metadata in Firestore".
        // I'll assume it accepts { collection: 'apps' | 'projects', data: ... }
        // OR default to 'admin-uploads' if not specified?
        // User requirement: "Accept JSON metadata... Store metadata in Firestore".
        // Context: "Admin Upload API Route". 

        // Let's support uploading to 'projects' or 'apps' based on a 'type' field or 'collection' field in the body.
        // If not provided, we should probably fail or defaults.
        // Let's allow flexibility but safe.

        const { collection: collectionName, ...docData } = data;

        if (!['projects', 'apps'].includes(collectionName)) {
            return NextResponse.json(
                { error: 'Invalid collection. Must be "projects" or "apps".' },
                { status: 400 }
            );
        }

        // 4. Store in Firestore
        // Convert date strings to Timestamps if needed? 
        // The user interface for AppItem has `releaseDate: Timestamp`.
        // The JSON payload will likely have string dates. 
        // Let's try to parse 'releaseDate' or 'createdAt' if they exist as ISO strings.

        if (docData.releaseDate && typeof docData.releaseDate === 'string') {
            docData.releaseDate = Timestamp.fromDate(new Date(docData.releaseDate));
        }
        if (docData.createdAt && typeof docData.createdAt === 'string') {
            docData.createdAt = Timestamp.fromDate(new Date(docData.createdAt));
        }
        // If not present, add createdAt
        if (!docData.createdAt && !docData.releaseDate) {
            docData.createdAt = FieldValue.serverTimestamp();
        }

        const docRef = await adminDb.collection(collectionName).add(docData);

        return NextResponse.json({
            success: true,
            id: docRef.id,
            message: `Document added to ${collectionName}`
        });

    } catch (error) {
        console.error('Admin upload error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
