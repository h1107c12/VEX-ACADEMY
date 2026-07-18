import { gameData } from "../../data/gameData"
import type { GameType } from "../../data/gameData"

type CurriculumSectionProps = {
  game: GameType
}

function CurriculumSection({ game }: CurriculumSectionProps) {
  const data = gameData[game].curriculum

  return (
    <section id="curriculum" className={`curriculum curriculum--${game} section-shell`}>
      <div className="curriculum__container">
        <div className="curriculum__heading">
          <p className="curriculum__eyebrow">{data.eyebrow}</p>
          <h2 className="curriculum__title">{data.title}</h2>
          <p className="curriculum__description">{data.description}</p>
        </div>

        <div className="curriculum__steps">
          {data.steps.map((step) => (
            <article key={step.id} className="curriculum__step">
              <span className="curriculum__step-label">{step.label}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>

        <div className="curriculum__why">
          <div className="curriculum__why-badge">WHY VEX ACADEMY?</div>
          <ul className="curriculum__why-list">
            {data.reasons.map((reason) => (
              <li key={reason}>{reason}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default CurriculumSection
