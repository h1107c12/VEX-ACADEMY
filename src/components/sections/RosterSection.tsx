import rosterData from '../../data/rosterData'
import RosterCard from './RosterCard'

function RosterSection() {
  return (
    <section id="roster" className="roster-section">
      <div className="roster-section__inner">
        <div className="roster-section__header">
          <h2 className="roster-section__title">ROSTER</h2>
          <p className="roster-section__desc">
            Vex Esports의 정예 멤버들을 소개합니다
          </p>
        </div>

        <div className="roster-grid">
          {rosterData.map((player) => (
            <RosterCard
              key={player.id}
              image={player.image}
              alt={player.alt}
              name={player.name}
              realName={player.realName}
              position={player.position}
              streamLink={player.streamLink}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default RosterSection