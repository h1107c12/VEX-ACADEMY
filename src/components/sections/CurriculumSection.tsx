const steps = [
  {
    id: 1,
    label: 'STEP 1',
    title: '기초 트레이닝',
    description: '에임, 무빙, 교전 기초, 파밍 동선 등 기본기를 체계적으로 정리',
  },
  {
    id: 2,
    label: 'STEP 2',
    title: '심화 전략과정',
    description: '포지셔닝, 운영 판단, 상황별 의사결정, 전술 이해도 강화',
  },
  {
    id: 3,
    label: 'STEP 3',
    title: '실전 스크림 & 피드백',
    description: '실전 스크림, 리플레이 분석, 맞춤 피드백을 통한 경기 감각 향상',
  },
]

const reasons = [
  '현역 선수 & 코치진의 경험을 기반으로 한 실전 중심 교육',
  '개인 실력과 목표에 맞춘 단계별 커리큘럼과 플레이 분석 기반 맞춤형 피드백',
  '아카데미생 전용 팀 운영과 스크림 훈련 연계를 통해 경쟁력 강화',
  '전문성 있는 피드백 기반의 실전 감각 향상과 성장 과정 시각화 지원',
  '수강생 능력치에 맞춰 실제 선수단 테스트 연계 진행',
]

function CurriculumSection() {
  return (
    <section id="curriculum" className="curriculum section-shell">
      <div className="curriculum__container">
        <div className="curriculum__heading">
          <p className="curriculum__eyebrow">TRAINING PROCESS</p>
          <h2 className="curriculum__title">CURRICULUM</h2>
          <p className="curriculum__description">
            단계별 훈련 구조를 통해 기본기부터 실전 감각까지 자연스럽게 끌어올립니다.
          </p>
        </div>

        <div className="curriculum__steps">
          {steps.map((step) => (
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
            {reasons.map((reason) => (
              <li key={reason}>{reason}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default CurriculumSection