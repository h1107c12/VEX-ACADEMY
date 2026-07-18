import { gameData } from "../../data/gameData"
import type { GameType } from "../../data/gameData"

type ProgramSectionProps = {
  game: GameType
}

function ProgramSection({ game }: ProgramSectionProps) {
  const data = gameData[game].program

  return (
    <section id="program" className={`program program--${game} section-shell`}>
      <div className="program__container">
        <div className="program__heading">
          <p className="program__eyebrow">{data.eyebrow}</p>
          <h2 className="program__title">{data.title}</h2>
          <h3 className="program__subtitle">{data.subtitle}</h3>
          <p className="program__description">{data.description}</p>
        </div>

        <div className="program__grid">
          <article className="program__card">
            <div className="program__badge">지원자격</div>
            <div className="program__target">
              <h4>{data.proTitle}</h4>
              <p>{data.proDescription}</p>
              <span>{data.proDetail}</span>
            </div>

            <div className="program__divider" />

            <div className="program__target">
              <h4>{data.hobbyTitle}</h4>
              <p>{data.hobbyDescription}</p>
              <span>{data.hobbyDetail}</span>
            </div>
          </article>

          <article className="program__card">
            <div className="program__badge">운영 방향</div>
            <ul className="program__points">
              {data.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  )
}

export default ProgramSection
