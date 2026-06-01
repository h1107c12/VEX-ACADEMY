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
const SCROLL_STABILIZE_TIME = 1800

function App() {
  const [activeSection, setActiveSection] = useState<PageSection>(null)
  const [peopleScrollNonce, setPeopleScrollNonce] = useState(0)

  const pageRef = useRef<HTMLDivElement | null>(null)
  const pendingPeopleTargetRef = useRef<PeopleTarget | null>(null)
  
  // 사용자가 스크롤을 조작했는지 감지하고 제어하기 위한 ref들
  const isUserInteractingRef = useRef(false)
  const cancelScrollRef = useRef<(() => void) | null>(null)

  const getTargetTop = (targetId: string) => {
    const target = document.getElementById(targetId)
    if (!target) return null

    return Math.max(
      target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET,
      0,
    )
  }

  const scrollToTarget = (targetId: string, behavior: ScrollBehavior = "smooth") => {
    // 사용자가 스크롤 중이면 강제 이동을 생략함
    if (isUserInteractingRef.current) return false

    const top = getTargetTop(targetId)
    if (top === null) return false

    window.scrollTo({
      top,
      behavior,
    })

    return true
  }

  const handleNavigate = (sectionId: PageSection) => {
    pendingPeopleTargetRef.current = null
    setActiveSection(sectionId)

    window.setTimeout(() => {
      pageRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }, 50)
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

    let rafId = 0
    let timeoutId = 0
    let observer: ResizeObserver | null = null
    let cancelled = false

    // 새로운 스크롤 작업이 시작되면 이전의 사용자 인터랙션 상태를 초기화
    isUserInteractingRef.current = false

    const runScroll = (behavior: ScrollBehavior = "auto") => {
      if (cancelled || isUserInteractingRef.current) return
      scrollToTarget(targetId, behavior)
    }

    const startStabilizedScroll = () => {
      const startedAt = performance.now()

      const tick = () => {
        runScroll("auto")

        if (performance.now() - startedAt < SCROLL_STABILIZE_TIME && !isUserInteractingRef.current) {
          rafId = window.requestAnimationFrame(tick)
        }
      }

      tick()
    }

    // 사용자가 개입했을 때 모든 자동 스크롤을 멈추는 함수
    const stopAutoScroll = () => {
      isUserInteractingRef.current = true
      cancelled = true
      window.cancelAnimationFrame(rafId)
      window.clearTimeout(timeoutId)
      observer?.disconnect()
    }
    cancelScrollRef.current = stopAutoScroll

    // 사용자의 직접적인 스크롤 조작 이벤트를 감지
    const interactionEvents = ["wheel", "touchmove", "pointerdown", "keydown"]
    interactionEvents.forEach((event) => {
      window.addEventListener(event, stopAutoScroll, { passive: true })
    })

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        runScroll("smooth")
        startStabilizedScroll()

        const pageContent = document.getElementById("page-content")
        const instructors = document.getElementById("instructors")
        const reviews = document.getElementById("reviews")

        if ("ResizeObserver" in window) {
          observer = new ResizeObserver(() => {
            runScroll("auto")
          })

          if (pageContent) observer.observe(pageContent)
          if (instructors) observer.observe(instructors)
          if (reviews) observer.observe(reviews)
        }

        const instructorImages = Array.from(
          document.querySelectorAll<HTMLImageElement>("#instructors img"),
        )

        const imageLoadPromises = instructorImages.map((img) => {
          if (img.complete) return Promise.resolve()

          return new Promise<void>((resolve) => {
            img.addEventListener("load", () => resolve(), { once: true })
            img.addEventListener("error", () => resolve(), { once: true })
          })
        })

        Promise.all(imageLoadPromises).then(() => {
          runScroll("smooth")
        })

        timeoutId = window.setTimeout(() => {
          runScroll("smooth")
          pendingPeopleTargetRef.current = null
        }, SCROLL_STABILIZE_TIME + 250)
      })
    })

    return () => {
      stopAutoScroll()
      interactionEvents.forEach((event) => {
        window.removeEventListener(event, stopAutoScroll)
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