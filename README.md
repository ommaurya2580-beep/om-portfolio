# Om Maurya Portfolio

A premium, fully animated Next.js portfolio website with 3D effects, Firebase dynamic content, and a protected admin upload route.

## 🚀 Tech Stack

- **Next.js 15** (App Router, TypeScript)
- **Tailwind CSS** – Custom neon dark theme
- **Framer Motion** – Scroll & entrance animations
- **GSAP + ScrollTrigger** – Advanced scroll animations
- **React Three Fiber** – 3D hero background
- **Firebase** (Firestore + Storage) – Dynamic projects & APK downloads
- **EmailJS** – Contact form
- **Lenis** – Smooth scroll
- **next-themes** – Dark/Light toggle

## 📁 Project Structure

```
om-portfolio/
├── app/
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Main page (all sections)
│   ├── globals.css         # Neon theme CSS
│   ├── admin-upload/       # Protected admin upload page
│   └── api/admin/upload/   # Server-side key validation API
├── components/
│   ├── sections/           # All page sections
│   ├── three/              # React Three Fiber components
│   ├── ui/                 # Reusable UI components
│   └── providers/          # Context providers
├── lib/
│   ├── firebase.ts         # Firebase initialization
│   └── firestore.ts        # Firestore helper functions
└── scripts/
    └── seedFirestore.ts    # Seed data for Firestore
```

## ⚙️ Setup

### 1. Clone & Install

```bash
cd om-portfolio
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

Required variables:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase API key |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase auth domain |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase project ID |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase sender ID |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase app ID |
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | EmailJS service ID |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | EmailJS template ID |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | EmailJS public key |
| `ADMIN_SECRET_KEY` | Secret key for `/admin-upload` |

### 3. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project
3. Enable **Firestore Database** (start in test mode)
4. Enable **Storage**
5. Copy your config values to `.env.local`

#### Firestore Collections

Create these collections:
- `projects` – Portfolio projects
- `apps` – APK downloads

#### Seed Initial Data

Run the seed script to see the data format:
```bash
npx ts-node scripts/seedFirestore.ts
```
Then manually add the documents via Firebase Console, or use the admin upload page.

### 4. EmailJS Setup

1. Go to [EmailJS](https://www.emailjs.com)
2. Create a service (Gmail recommended)
3. Create a template with variables: `from_name`, `from_email`, `message`, `to_name`
4. Copy Service ID, Template ID, and Public Key to `.env.local`

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🔐 Admin Upload

Navigate to `/admin-upload` to upload APK files. You'll need the `ADMIN_SECRET_KEY` from your `.env.local`.

The admin key is validated server-side via `/api/admin/upload`.

## 🚀 Deploy to Vercel

1. Push to GitHub
2. Import to [Vercel](https://vercel.com)
3. Add all environment variables in Vercel dashboard
4. Deploy!

## 📝 Customization

- **Personal info**: Edit `components/sections/Hero.tsx`, `About.tsx`
- **Skills**: Edit `components/sections/Skills.tsx`
- **Projects**: Add to Firestore `projects` collection
- **Certifications**: Edit `components/sections/Certifications.tsx`
- **Hackathons**: Edit `components/sections/Hackathons.tsx`
- **Colors**: Edit `app/globals.css` CSS variables

---

Built with ❤️ by Om Maurya

deploy update
