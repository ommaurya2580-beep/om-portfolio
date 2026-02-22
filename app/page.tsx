import Navbar from '@/components/ui/Navbar';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Internships from '@/components/sections/Internships';
import Certifications from '@/components/sections/Certifications';
import Hackathons from '@/components/sections/Hackathons';
import CodingProfiles from '@/components/sections/CodingProfiles';
import ApkDownloads from '@/components/sections/ApkDownloads';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/ui/Footer';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Internships />
      <Certifications />
      <Hackathons />
      <CodingProfiles />
      <ApkDownloads />
      <Contact />
      <Footer />
    </main>
  );
}
