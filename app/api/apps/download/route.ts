
import { getAdminDb } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { appId } = await request.json();

        if (!appId || typeof appId !== 'string') {
            return NextResponse.json(
                { error: 'Invalid or missing appId' },
                { status: 400 }
            );
        }

        const adminDb = getAdminDb();
        const appRef = adminDb.collection('apps').doc(appId);

        // Check if app exists
        const appSnap = await appRef.get();
        if (!appSnap.exists) {
            return NextResponse.json(
                { error: 'App not found' },
                { status: 404 }
            );
        }

        await appRef.update({
            downloadCount: FieldValue.increment(1),
        });

        return NextResponse.json({ success: true, message: 'Download count incremented' });
    } catch (error) {
        console.error('Error incrementing download:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
