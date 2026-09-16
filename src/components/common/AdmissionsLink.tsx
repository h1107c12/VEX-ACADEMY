import { ArrowUpRight, GraduationCap } from "lucide-react"
import "../../styles/academy-actions.css"

export const UNIVERSITY_APPLY_URL = "https://open.kakao.com/o/smAEavei"

export default function AdmissionsLink() {
  return (
    <a className="academy-action academy-action--primary" href={UNIVERSITY_APPLY_URL} target="_blank" rel="noopener noreferrer" aria-label="VEX MOU 대학교 입학 신청 — 카카오톡 새 창">
      <GraduationCap size={20} aria-hidden="true" />
      <span>VEX MOU 대학교 입학 신청</span>
      <ArrowUpRight size={20} aria-hidden="true" />
    </a>
  )
}
