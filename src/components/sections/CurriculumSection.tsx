import { Crosshair, Trophy } from "lucide-react"
import { gameData } from "../../data/gameData"
import type { GameType } from "../../data/gameData"

function CurriculumSection({ game }: { game: GameType }) {
  const data = gameData[game].curriculum
  const gameLabel = game === "pubg" ? "PUBG반" : "VALORANT반"

  return (
    <section id="curriculum" className={`curriculum curriculum--${game} section-shell`} aria-labelledby="curriculum-title">
      <div className="curriculum__container">
        <div className="curriculum__heading">
          <p className="curriculum__eyebrow">{data.eyebrow}</p>
          <h2 id="curriculum-title" className="curriculum__title">{data.title}</h2>
          <p className="curriculum__description">나의 목표에 맞는 과정으로, 다음 단계의 플레이를 준비하세요.</p>
        </div>
        <div className="curriculum__courses">
          {data.courses.map((course, index) => {
            const Icon = course.id === "pro" ? Trophy : Crosshair
            return (
              <article key={course.id} className="curriculum__course">
                <div className="curriculum__course-top">
                  <span className="curriculum__number">0{index + 1}</span>
                  <span className="curriculum__game">{gameLabel}</span>
                  <Icon className="curriculum__icon" size={26} aria-hidden="true" />
                </div>
                <h3>{course.title}</h3>
                <div className="curriculum__copy">
                  {course.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
                <ul className="curriculum__tags" aria-label="과정 특징">
                  {course.tags.map((tag) => <li key={tag}>{tag}</li>)}
                </ul>
              </article>
            )
          })}
        </div>
        <div className="curriculum__process-heading">
          <h3>단계별 교육 프로세스</h3>
          <p>기본기를 다지고, 전략을 익히고, 실전으로 연결합니다.</p>
        </div>
        <ol className="curriculum__steps">
          {data.steps.map((step) => (
            <li key={step.id} className="curriculum__step">
              <span className="curriculum__step-label">{step.label}</span>
              <h4>{step.title}</h4>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default CurriculumSection
