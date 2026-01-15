import Hero from '@/components/Hero'
import About from '@/components/About'
import ProjectsGrid from '@/components/ProjectsGrid'
import ExperienceTimeline from '@/components/ExperienceTimeline'
import ContactForm from '@/components/ContactForm'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <ProjectsGrid />
      <ExperienceTimeline />
      <ContactForm />
      <Footer />
    </main>
  )
}





