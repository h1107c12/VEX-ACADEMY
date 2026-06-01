import { useRef, useState } from "react"
import Header from "./components/layout/Header"
import HeroSection from "./components/sections/HeroSection"
import ProgramSection from "./components/sections/ProgramSection"
import CurriculumSection from "./components/sections/CurriculumSection"
import ReviewSection from "./components/sections/ReviewSection"
import AboutSection from "./components/sections/AboutSection"
import CTASection from "./components/sections/CTASection"
import InstructorsSection from "./components/instructors/InstructorsSection"
import AcademySection from "./components/sections/AcademySection"

export type PageSection = "academy" | "people" | "hub" | "apply" | null

function App() {
  const [activeSection, setActiveSection] = useState<PageSection>(null)
  const pageRef = useRef<HTMLDivElement | null>(null)

  const handleNavigate = (sectionId: PageSection) => {
    setActiveSection(sectionId)

    window.setTimeout(() => {
      pageRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }, 50)
  }

  return (
    <>
      <Header onNavigate={handleNavigate} />

      <main>
        <HeroSection />

        <div id="page-content" ref={pageRef}>
          {activeSection === "academy" && (
            <>
              <AboutSection />
              <ProgramSection />
              <CurriculumSection />
            </>
          )}

          {activeSection === "people" && (
            <>
              <InstructorsSection />
              <ReviewSection />
            </>
          )}

          {activeSection === "hub" && <AcademySection />}

          {activeSection === "apply" && <CTASection />}
        </div>
      </main>
    </>
  )
}

export default App