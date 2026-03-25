import { aboutFeatures, aboutStats } from '../../data/aboutData'

function AboutSection() {
  return (
    <section className="about section" id="about">
      <div className="container">
        <h2 className="section-title">About Academy</h2>

        <p className="section-desc about__desc">
          Vex Academy is dedicated to nurturing the next generation of PUBG champions.
          Our program provides young talents with professional training, competitive
          experience, and a clear path to success in the esports industry.
        </p>

        <div className="about__features">
          {aboutFeatures.map((item) => (
            <article className="about__card glass-card" key={item.id}>
              <div className="about__icon">{item.icon}</div>
              <h3 className="about__cardTitle">{item.title}</h3>
              <p className="about__cardDesc">{item.description}</p>
            </article>
          ))}
        </div>

        <div className="about__stats">
          {aboutStats.map((stat) => (
            <div className="about__stat" key={stat.id}>
              <strong className="about__statValue">{stat.value}</strong>
              <span className="about__statLabel">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AboutSection