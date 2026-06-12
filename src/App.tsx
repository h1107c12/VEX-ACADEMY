import { useEffect, useRef, useState } from "react"
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

type PeopleTarget = "instructors" | "review-list"

const HEADER_OFFSET = 96

const waitForNextFrame = () => {
  return new Promise<void>((resolve) => {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        resolve()
      })
    })
  })
}

const waitForElement = async (targetId: string, maxFrame = 40) => {
  for (let i = 0; i < maxFrame; i += 1) {
    const target = document.getElementById(targetId)

    if (target) return target

    await new Promise<void>((resolve) => {
      window.requestAnimationFrame(() => resolve())
    })
  }

  return null
}

const waitForImages = async (selector: string, timeout = 700) => {
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
  const scrollAnimationRef = useRef<number | null>(null)
  const isAutoScrollingRef = useRef(false)

  const cancelAutoScroll = () => {
    if (scrollAnimationRef.current !== null) {
      window.cancelAnimationFrame(scrollAnimationRef.current)
      scrollAnimationRef.current = null
    }

    isAutoScrollingRef.current = false
  }

  const getTargetTop = (targetId: string) => {
    const target = document.getElementById(targetId)
    if (!target) return null

    return Math.max(
      target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET,
      0,
    )
  }

  const smoothScrollTo = (targetTop: number, duration = 820) => {
    cancelAutoScroll()

    const startTop = window.scrollY
    const distance = targetTop - startTop
    const startTime = performance.now()

    if (Math.abs(distance) < 2) return

    isAutoScrollingRef.current = true

    const easeOutCubic = (t: number) => {
      return 1 - Math.pow(1 - t, 3)
    }

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easedProgress = easeOutCubic(progress)

      window.scrollTo({
        top: Math.round(startTop + distance * easedProgress),
        behavior: "auto",
      })

      if (progress < 1) {
        scrollAnimationRef.current = window.requestAnimationFrame(animate)
      } else {
        scrollAnimationRef.current = null
        isAutoScrollingRef.current = false
      }
    }

    scrollAnimationRef.current = window.requestAnimationFrame(animate)
  }

  const scrollToTarget = (targetId: string, duration?: number) => {
    const top = getTargetTop(targetId)
    if (top === null) return false

    const isMobile = window.innerWidth <= 640
    smoothScrollTo(top, duration ?? (isMobile ? 620 : 850))

    return true
  }

  const handleNavigate = async (sectionId: PageSection) => {
    pendingPeopleTargetRef.current = null
    setActiveSection(sectionId)

    await waitForNextFrame()

    const top = pageRef.current
      ? Math.max(pageRef.current.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET, 0)
      : 0

    smoothScrollTo(top, window.innerWidth <= 640 ? 620 : 850)
  }

  const openPeopleAndScrollTo = (targetId: PeopleTarget) => {
    pendingPeopleTargetRef.current = targetId
    setActiveSection("people")
    setPeopleScrollNonce((prev) => prev + 1)
  }

  useEffect(() => {
    return () => {
      cancelAutoScroll()
    }
  }, [])

  useEffect(() => {
    if (activeSection !== "people") return

    const targetId = pendingPeopleTargetRef.current
    if (!targetId) return

    let cancelled = false

    const stopByUser = () => {
      if (!isAutoScrollingRef.current) return

      cancelled = true
      pendingPeopleTargetRef.current = null
      cancelAutoScroll()
    }

    const interactionEvents = ["wheel", "touchstart", "pointerdown", "keydown"]

    interactionEvents.forEach((eventName) => {
      window.addEventListener(eventName, stopByUser, { passive: true })
    })

    const run = async () => {
      await waitForNextFrame()

      const target = await waitForElement(targetId)
      if (!target || cancelled) return

      if (targetId === "review-list") {
        await waitForImages("#instructors img", 700)
      }

      if (cancelled) return

      scrollToTarget(targetId)
      pendingPeopleTargetRef.current = null
    }

    run()

    return () => {
      cancelled = true

      interactionEvents.forEach((eventName) => {
        window.removeEventListener(eventName, stopByUser)
      })
    }
  }, [activeSection, peopleScrollNonce])

  return (
    <>
      <Header onNavigate={handleNavigate} />

      <main>
        <HeroSection
          onOpenPeople={() => openPeopleAndScrollTo("instructors")}
          onOpenReviews={() => openPeopleAndScrollTo("review-list")}
        />

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
