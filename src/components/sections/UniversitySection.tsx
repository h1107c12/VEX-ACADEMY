import { GraduationCap, MessageCircle, Crosshair, FolderOpen, Compass, Plus } from "lucide-react"
import AdmissionsLink from "../common/AdmissionsLink"
import "../../styles/university.css"

type UniversitySectionProps = {
  onViewPartners: () => void
}

const supportItems = [
  { icon: MessageCircle, title: "진학 상담", description: "희망 전공과 진로에 맞는 진학 방향 상담" },
  { icon: Crosshair, title: "실기 준비", description: "목표 대학의 실기 준비를 위한 맞춤 코칭" },
  { icon: FolderOpen, title: "포트폴리오 관리", description: "플레이 기록과 활동 이력을 체계적으로 정리" },
  { icon: Compass, title: "맞춤형 진학 컨설팅", description: "학생의 목표와 준비 상황에 맞춘 진학 계획" },
]

function UniversitySection({ onViewPartners }: UniversitySectionProps) {
  return (
    <section id="university" className="university section-shell" aria-labelledby="university-title">
      <div className="university__container">
        <p className="university__eyebrow"><GraduationCap size={20} aria-hidden="true" /> VEX MOU 대학·기관 연계</p>
        <h2 id="university-title">대학 진학 지원</h2>
        <p className="university__lead">대학 진학도 VEX Academy와 함께 준비하세요.</p>
        <div className="university__intro">
          <p>VEX Academy는 단순한 게임 교육을 넘어 e스포츠 관련 대학 및 교육기관 진학까지 함께 지원합니다.</p>
          <p>프로게이머 과정과 취미·실력향상 과정 수강생 모두 지원 가능하며, VEX와 산학협력(MOU)을 체결한 대학을 기반으로 학생의 목표에 맞는 진학 준비를 함께합니다.</p>
        </div>
        <div className="university__grid">
          {supportItems.map((item, index) => (
            <article className="university__card" key={item.title}>
              <div className="university__card-top"><item.icon size={24} aria-hidden="true" /><span aria-hidden="true">0{index + 1}</span></div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
        <div className="university__footer">
          <p>학생의 목표에 따라 <strong>프로 선수 진출과 대학 진학</strong>이라는 두 가지 진로를 모두 준비할 수 있도록 체계적인 교육 시스템을 운영합니다.</p>
        </div>
        <div className="university__actions">
          <button type="button" className="academy-action academy-action--outline" onClick={onViewPartners} aria-label="VEX MOU 대학교 로고 보기">
            <span className="university__more-label"><small>함께하는 대학교 보기</small>VIEW MORE</span><Plus size={22} aria-hidden="true" />
          </button>
          <div className="university__apply"><AdmissionsLink /><span>카카오톡으로 연결됩니다.</span></div>
        </div>
      </div>
    </section>
  )
}

export default UniversitySection
