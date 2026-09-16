import { aboutFeatures, aboutStats } from '../../data/aboutData'

function AboutSection() {
  return (
    <section className="about section" id="about">
      <div className="container">
        <h2 className="section-title">About Academy</h2>

        <p className="section-desc about__desc">
          VEX Academy는 배틀그라운드와 발로란트 교육을 통해 각자의 목표에 맞는 성장을 함께합니다.
          게임을 즐기는 순간부터 프로 선수와 대학 진학을 준비하는 과정까지, 더 넓은 가능성을 만나보세요.
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