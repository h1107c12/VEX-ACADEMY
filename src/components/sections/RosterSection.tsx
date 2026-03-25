import rosterData from '../../data/rosterData'

function RosterSection() {
  return (
    <section className="roster section" id="roster">
      <div className="container">
        <h2 className="section-title">Our Roster</h2>
        <p className="section-desc">Meet the rising stars of Vex Academy</p>

        <div className="roster__grid">
          {rosterData.map((player) => (
            <article
              className="roster__card glass-card"
              key={player.id}
              style={{ backgroundImage: `url(${player.image})` }}
            >
              <div className="roster__overlay" />

              <div className="roster__cardContent">
                <span className="roster__badge">{player.role}</span>
                <h3 className="roster__name">{player.nickname}</h3>
                <p className="roster__realName">{player.realName}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default RosterSection