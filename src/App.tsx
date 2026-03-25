import Header from './components/layout/Header'
import HeroSection from './components/sections/HeroSection'
import ProgramSection from './components/sections/ProgramSection'
import CurriculumSection from './components/sections/CurriculumSection'
import RosterSection from './components/sections/RosterSection'
import AboutSection from './components/sections/AboutSection'
import CTASection from './components/sections/CTASection'

function App() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ProgramSection />
        <CurriculumSection />
        <RosterSection />
        <AboutSection />
        <CTASection />
      </main>
    </>
  )
}

export default App