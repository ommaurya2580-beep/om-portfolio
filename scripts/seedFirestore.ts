/**
 * Seed script to populate Firestore with initial project data.
 * Run with: npx ts-node --project tsconfig.json scripts/seedFirestore.ts
 * (Requires Firebase Admin SDK or run via Firebase Emulator)
 *
 * For quick seeding, you can also manually add these documents in the Firebase Console.
 */

const projects = [
    {
        title: 'Spine & Earn Money',
        category: 'App',
        description:
            'A mobile application focused on helping users earn money through structured engagement features and reward mechanisms. Designed with scalable backend logic and secure handling of user interactions.',
        techStack: ['JavaScript', 'Firebase', 'Node.js'],
        githubUrl: 'https://github.com/ommaurya2580-beep',
        liveUrl: '',
        featured: true,
        createdAt: new Date().toISOString(),
    },
    {
        title: 'Weather Web App',
        category: 'Web',
        description:
            'A real-time weather forecasting web application using external weather APIs. Allows city-based search and displays temperature, humidity, and wind data in a clean responsive UI.',
        techStack: ['HTML', 'CSS', 'JavaScript', 'Weather API'],
        githubUrl: 'https://github.com/ommaurya2580-beep',
        liveUrl: '',
        featured: true,
        createdAt: new Date().toISOString(),
    },
];

console.log('📦 Firestore Seed Data:');
console.log('Collection: projects');
console.log(JSON.stringify(projects, null, 2));
console.log('\n✅ Copy these documents to your Firestore "projects" collection via Firebase Console.');
console.log('   Or use Firebase Admin SDK to programmatically insert them.');
