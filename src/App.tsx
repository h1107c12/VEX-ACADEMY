import { useEffect, useRef, useState } from "react"
import Header from "./components/layout/Header"
import HeroSection from "./components/sections/HeroSection"
import MOUSection from "./components/sections/MOUSection"
import ProgramSection from "./components/sections/ProgramSection"
import CurriculumSection from "./components/sections/CurriculumSection"
import ReviewSection from "./components/sections/ReviewSection"
import AboutSection from "./components/sections/AboutSection"
import CTASection from "./components/sections/CTASection"
import InstructorsSection from "./components/instructors/InstructorsSection"
import AcademySection from "./components/sections/AcademySection"

export type PageSection = "academy" | "people" | "hub" | "apply" | null

type PeopleTarget = "instructors" | "reviews"

const HEADER_OFFSET = 96
const MOBILE_REVIEW_EXTRA_DOWN = 90

const waitForFrame = () => {
  return new Promise<void>((resolve) => {
    window.requestAnimationFrame(() => resolve())
  })
}

const waitForFrames = async (count: number) => {
  for (let i = 0; i < count; i += 1) {
    await waitForFrame()
  }
}

const waitForElement = async (targetId: string, maxFrame = 80) => {
  for (let i = 0; i < maxFrame; i += 1) {
    const target = document.getElementById(targetId)

    if (target) return target

    await waitForFrame()
  }

  return null
}

const waitForImages = async (selector: string, timeout = 1200) => {
  const images = Array.from(document.querySelectorAll<HTMLImageElement>(selector))

  if (images.length === 0) return

  const imagePromises = images.map((img) => {
    if (img.complete) return Promise.resolve()

    return new Promise<void>((resolve) => {
      img.addEventListener("load", () => resolve(), { once: true })
      img.addEventListener("error", () => resolve(), { once: true })
    })
  })

  await Promise.race([
    Promise.all(imagePromises),
    new Promise<void>((resolve) => {
      window.setTimeout(resolve, timeout)
    }),
  ])
}

function App() {
  const [activeSection, setActiveSection] = useState<PageSection>(null)
  const [peopleScrollNonce, setPeopleScrollNonce] = useState(0)

  const pageRef = useRef<HTMLDivElement | null>(null)
  const pendingPeopleTargetRef = useRef<PeopleTarget | null>(null)

  const getTargetTop = (targetId: string) => {
    const target = document.getElementById(targetId)

    if (!target) return null

    const isMobile = window.innerWidth <= 640
    const extraDown =
      isMobile && targetId === "reviews" ? MOBILE_REVIEW_EXTRA_DOWN : 0

    return Math.max(
      target.getBoundingClientRect().top +
        window.scrollY -
        HEADER_OFFSET +
        extraDown,
      0,
    )
  }

  const scrollToTarget = (targetId: string) => {
    const top = getTargetTop(targetId)

    if (top === null) return false

    window.scrollTo({
      top,
      behavior: "smooth",
    })

    return true
  }

  const handleNavigate = async (sectionId: PageSection) => {
    pendingPeopleTargetRef.current = null
    setActiveSection(sectionId)

    await waitForFrames(2)

    const top = pageRef.current
      ? Math.max(
          pageRef.current.getBoundingClientRect().top +
            window.scrollY -
            HEADER_OFFSET,
          0,
        )
      : 0

    window.scrollTo({
      top,
      behavior: "smooth",
    })
  }

  const openPeopleAndScrollTo = (targetId: PeopleTarget) => {
    pendingPeopleTargetRef.current = targetId
    setActiveSection("people")
    setPeopleScrollNonce((prev) => prev + 1)
  }

  useEffect(() => {
    if (activeSection !== "people") return

    const targetId = pendingPeopleTargetRef.current

    if (!targetId) return

    let cancelled = false

    const run = async () => {
      await waitForFrames(3)

      const target = await waitForElement(targetId)

      if (!target || cancelled) return

      await waitForImages("#page-content img", 1200)

      await waitForFrames(window.innerWidth <= 640 ? 8 : 10)

      if (cancelled) return

      scrollToTarget(targetId)

      pendingPeopleTargetRef.current = null
    }

    run()

    return () => {
      cancelled = true
    }
  }, [activeSection, peopleScrollNonce])

  return (
    <>
      <Header onNavigate={handleNavigate} />

      <main>
        <HeroSection
          onOpenPeople={() => openPeopleAndScrollTo("instructors")}
          onOpenReviews={() => openPeopleAndScrollTo("reviews")}
        />

        {activeSection === null && <MOUSection />}

        <div id="page-content" ref={pageRef}>
          {activeSection === "academy" && (
            <div className="academy-page">
              <AboutSection />
              <div className="academy-divider" aria-hidden="true" />
              <ProgramSection />
              <div className="academy-divider" aria-hidden="true" />
              <CurriculumSection />
            </div>
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