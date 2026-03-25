function ProgramSection() {
  return (
    <section id="program" className="program section-shell">
      <div className="program__container">
        <div className="program__heading">
          <p className="program__eyebrow">ACADEMY PROGRAM</p>
          <h2 className="program__title">VEX E-SPORTS ACADEMY</h2>
          <h3 className="program__subtitle">PUBG 전문 트레이닝 커리큘럼</h3>
          <p className="program__description">
            Vex E-Sports Academy는 현역 활동을 바탕으로 한 감독진이 운영하는
            실전형 교육 시스템을 기반으로, 입문자부터 프로 데뷔를 준비하는
            선수까지 모두 성장할 수 있는 단계별 프로그램을 제공합니다.
          </p>
        </div>

        <div className="program__grid">
          <article className="program__card">
            <div className="program__badge">지원자격</div>
            <div className="program__target">
              <h4>프로반</h4>
              <p>배틀그라운드 프로게이머를 진심으로 지망하는 자</p>
              <span>체계적인 코칭을 통해 프로 입단을 목표로 성장하고자 하는 인원</span>
            </div>

            <div className="program__divider" />

            <div className="program__target">
              <h4>취미반</h4>
              <p>배틀그라운드를 출중한 실력으로 즐기고 더 배워보고 싶은 자</p>
              <span>기본기 향상과 꾸준한 연습에 관심 있는 일반 유저 누구나 가능</span>
            </div>
          </article>

          <article className="program__card">
            <div className="program__badge">운영 방향</div>
            <ul className="program__points">
              <li>현역 선수 및 코치진 경험을 바탕으로 한 실전 중심 교육</li>
              <li>입문자부터 프로 지망생까지 단계별 맞춤 성장 구조</li>
              <li>개인 성향과 플레이 스타일을 반영한 코칭 시스템</li>
              <li>실력 향상뿐 아니라 팀 플레이 감각과 경쟁력을 함께 강화</li>
            </ul>
          </article>
        </div>
      </div>
    </section>
  )
}

export default ProgramSection