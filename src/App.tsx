import Header from './components/layout/Header'
import HeroSection from './components/sections/HeroSection'
import ProgramSection from './components/sections/ProgramSection'
import CurriculumSection from './components/sections/CurriculumSection'
// import RosterSection from './components/sections/RosterSection'
import ReviewSection from "./components/sections/ReviewSection"
import AboutSection from './components/sections/AboutSection'
import CTASection from './components/sections/CTASection'
import InstructorsSection from "./components/instructors/InstructorsSection"
import AcademySection from "./components/sections/AcademySection"

function App() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ReviewSection />
        {/* <RosterSection /> */}
        <AboutSection />
        <InstructorsSection />
        <ProgramSection />
        <CurriculumSection />
        <AcademySection />
        <CTASection />
      </main>
    </>
  )
}

export default App