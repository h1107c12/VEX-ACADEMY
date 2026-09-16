import { ArrowUpRight } from "lucide-react"
import { gameData } from "../../data/gameData"
import type { GameType } from "../../data/gameData"
import "../../styles/academy-actions.css"

function CTASection({ game }: { game: GameType }) {
  const data = gameData[game]
  return (
    <section id="apply" className="enrollment" aria-labelledby="enrollment-title">
      <div className="enrollment__panel">
        <div>
          <p className="enrollment__eyebrow">{data.shortLabel} · VEX ACADEMY</p>
          <h2 id="enrollment-title">당신의 다음 플레이,<br />VEX와 함께 시작하세요.</h2>
          <p className="enrollment__desc">프로게이머 과정부터 취미 · 실력향상 과정까지.<br />나의 목표에 맞는 교육을 신청하세요.</p>
        </div>
        <a className="academy-action academy-action--primary" href={data.applyUrl} target="_blank" rel="noopener noreferrer" aria-label="수강 신청하기 — 신청서 새 창">
          <span>신청하기</span><ArrowUpRight size={22} aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}

export default CTASection
