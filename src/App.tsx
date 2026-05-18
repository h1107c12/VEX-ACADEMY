import Header from './components/layout/Header'
import HeroSection from './components/sections/HeroSection'
import ProgramSection from './components/sections/ProgramSection'
import CurriculumSection from './components/sections/CurriculumSection'
// import RosterSection from './components/sections/RosterSection'
import ReviewSection from "./components/sections/ReviewSection"
import AboutSection from './components/sections/AboutSection'
import CTASection from './components/sections/CTASection'

function App() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ReviewSection />
        {/* <RosterSection /> */}
        <AboutSection />
        <ProgramSection />
        <CurriculumSection />
        <CTASection />
      </main>
    </>
  )
}

export default App