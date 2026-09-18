import Hero from '@/components/Hero'
import About from '@/components/About'
import ProjectsGrid from '@/components/ProjectsGrid'
import ExperienceTimeline from '@/components/ExperienceTimeline'
import ContactForm from '@/components/ContactForm'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { getProjects, getExperiences } from '@/sanity/client'

export default async function Home() {
  const [projects, experiences] = await Promise.all([getProjects(), getExperiences()])

  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <ProjectsGrid projects={projects} />
      <ExperienceTimeline experiences={experiences} />
      <ContactForm />
      <Footer />
    </main>
  )
}
