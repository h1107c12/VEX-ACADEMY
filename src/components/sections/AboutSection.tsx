import { aboutFeatures, aboutStats } from '../../data/aboutData'

function AboutSection() {
  return (
    <section className="about section" id="about">
      <div className="container">
        <h2 className="section-title">About Academy</h2>

        <p className="section-desc about__desc">
          Vex Academy는 차세대 PUBG 챔피언을 육성하는 데 전념하고 있습니다.
          우리 프로그램은 젊은 인재들에게 전문적인 훈련, 경쟁 경험, 그리고 e스포츠 산업에서 성공으로 나아갈 수 있는 명확한 경로를 제공합니다.
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