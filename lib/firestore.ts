import {
    collection,
    getDocs,
    query,
    orderBy,
    Timestamp,
    type DocumentData,
    type QueryDocumentSnapshot
} from 'firebase/firestore';
import { db } from './firebase';

// ------------------------------------------------------------------
// Interfaces (Strictly Typed)
// ------------------------------------------------------------------

export interface Project {
    id: string;
    title: string;
    category: string;
    description: string;
    createdAt: Timestamp;
    techStack: string[];
    githubUrl?: string;
    liveUrl?: string;
    imageUrl?: string;
    images?: string[];
    featured?: boolean;
    certificateUrl?: string;
}

/** Firestore document shape for hackathon / competition entries */
export interface HackathonItem {
    id: string;
    title: string;
    organization: string;
    type: string;          // e.g. "Hackathon", "Competition", "Coding"
    year?: string;
    icon?: string;
    color?: string;
    certificateUrl?: string;  // path e.g. "/certificates/hack4delhi.pdf" or external URL
    createdAt?: Timestamp;
}

/** Firestore document shape for certification entries */
export interface CertificationItem {
    id: string;
    title: string;
    issuer: string;
    year?: string;
    icon?: string;
    color?: string;
    certificateUrl?: string;  // path e.g. "/certificates/oracle-ai.pdf" or external URL
    createdAt?: Timestamp;
}

export interface AppItem {
    id: string;
    name: string;
    version: string;
    description: string;
    fileUrl: string;
    fileSize?: string;
    releaseDate: Timestamp;
    downloadCount: number;
    downloadUrl: string;
    screenshotUrl?: string;
}

// ------------------------------------------------------------------
// Helper Functions
// ------------------------------------------------------------------

/**
 * Fetches all hackathon entries ordered by creation date (descending).
 */
export async function getHackathons(): Promise<HackathonItem[]> {
    try {
        const q = query(collection(db, 'hackathons'), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        return snapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => {
            const data = doc.data();
            return {
                id: doc.id,
                title: data.title,
                organization: data.organization,
                type: data.type,
                year: data.year,
                icon: data.icon,
                color: data.color,
                certificateUrl: data.certificateUrl,
                createdAt: data.createdAt,
            } as HackathonItem;
        });
    } catch (error) {
        console.error('Error fetching hackathons:', error);
        return [];
    }
}

/**
 * Fetches all certification entries ordered by creation date (descending).
 */
export async function getCertifications(): Promise<CertificationItem[]> {
    try {
        const q = query(collection(db, 'certifications'), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        return snapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => {
            const data = doc.data();
            return {
                id: doc.id,
                title: data.title,
                issuer: data.issuer,
                year: data.year,
                icon: data.icon,
                color: data.color,
                certificateUrl: data.certificateUrl,
                createdAt: data.createdAt,
            } as CertificationItem;
        });
    } catch (error) {
        console.error('Error fetching certifications:', error);
        return [];
    }
}

/**
 * Fetches all projects ordered by creation date (descending).
 */
export async function getProjects(): Promise<Project[]> {
    try {
        const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        return snapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => {
            const data = doc.data();
            return {
                id: doc.id,
                title: data.title,
                category: data.category,
                description: data.description,
                createdAt: data.createdAt,
                techStack: data.techStack || [],
                githubUrl: data.githubUrl,
                liveUrl: data.liveUrl,
                imageUrl: data.imageUrl,
                images: data.images,
                featured: data.featured,
            } as Project;
        });
    } catch (error) {
        console.error("Error fetching projects:", error);
        return [];
    }
}

/**
 * Fetches all apps ordered by release date (descending).
 */
export async function getApps(): Promise<AppItem[]> {
    try {
        const q = query(collection(db, 'apps'), orderBy('releaseDate', 'desc'));
        const snapshot = await getDocs(q);
        return snapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => {
            const data = doc.data();
            return {
                id: doc.id,
                name: data.name,
                version: data.version,
                description: data.description,
                fileUrl: data.fileUrl,
                fileSize: data.fileSize,
                releaseDate: data.releaseDate,
                downloadCount: data.downloadCount ?? 0,
                downloadUrl: data.downloadUrl,
                screenshotUrl: data.screenshotUrl,
            } as AppItem;
        });
    } catch (error) {
        console.error("Error fetching apps:", error);
        return [];
    }
}

/**
 * Increments the download count for an app.
 * Uses the server-side API to bypass strict security rules.
 */
export async function incrementDownload(appId: string): Promise<void> {
    try {
        await fetch('/api/apps/download', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ appId }),
        });
    } catch (error) {
        console.error("Error incrementing download:", error);
    }
}

