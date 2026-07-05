import "./../../styles/mou.css"

import honamLogo from "../../assets/universities/honam.png"
import kukjeLogo from "../../assets/universities/Kookje.png"
import tourismLogo from "../../assets/universities/tourism.png"
import osanLogo from "../../assets/universities/osan.png"
import woosongLogo from "../../assets/universities/woosong.png"
import jeonnamScienceLogo from "../../assets/universities/jeonnam-science.png"

const universities = [
  {
    name: "호남대학교",
    logo: honamLogo,
  },
  {
    name: "국제대학교",
    logo: kukjeLogo,
  },
  {
    name: "한국관광대학교",
    logo: tourismLogo,
  },
  {
    name: "오산대학교",
    logo: osanLogo,
  },
  {
    name: "우송대학교",
    logo: woosongLogo,
  },
  {
    name: "전남과학대학교",
    logo: jeonnamScienceLogo,
  },
]

function MOUSection() {
  return (
    <section className="mou-section">
      <div className="mou-bg-glow" />

      <div className="mou-inner">
        <p className="mou-kicker">OFFICIAL PARTNERSHIP</p>

        <h2 className="mou-title">
          TOGETHER WITH <span>VEX</span>
        </h2>

        <p className="mou-desc">
          VEX Academy는 국내 여러 대학교와 MOU를 체결하여
          <br />
          e스포츠 교육 및 인재 양성을 위한 협력 체계를 구축하고 있습니다.
        </p>

        <div className="mou-label">OUR UNIVERSITY PARTNERS</div>

        <div className="mou-grid">
          {universities.map((university) => (
            <article className="mou-card" key={university.name}>
              <div className="mou-logo-box">
                <img
                  src={university.logo}
                  alt={`${university.name} 로고`}
                  className="mou-logo-img"
                />
              </div>

              <strong>{university.name}</strong>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default MOUSection