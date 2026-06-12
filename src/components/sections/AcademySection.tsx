import { useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "../../lib/supabase";
import "../../styles/academy.css";

type TierBase =
  | "브론즈"
  | "실버"
  | "골드"
  | "플래티넘"
  | "크리스탈"
  | "다이아몬드"
  | "마스터"
  | "서바이버";

type TierRow = {
  id: number;
  name: string;
  tier_name: string;
  tier_score: number;
  created_at: string;
};

type HighlightRow = {
  id: number;
  title: string;
  video_url: string;
  player_name: string;
};

type NoticeRow = {
  id: number;
  title: string;
  content: string;
  is_pinned: boolean;
  created_at: string;
};

type ChartPoint = TierRow & {
  x: number;
  y: number;
  tierBase: TierBase;
};

const TIER_META: Record<
  TierBase,
  { score: number; short: string; className: string; range: string }
> = {
  브론즈: {
    score: 1000,
    short: "BR",
    className: "tier-bronze",
    range: "1,000점 미만 ~ 1,399점",
  },
  실버: {
    score: 1400,
    short: "SV",
    className: "tier-silver",
    range: "1,400점 ~ 1,799점",
  },
  골드: {
    score: 1800,
    short: "GD",
    className: "tier-gold",
    range: "1,800점 ~ 2,199점",
  },
  플래티넘: {
    score: 2200,
    short: "PT",
    className: "tier-platinum",
    range: "2,200점 ~ 2,599점",
  },
  크리스탈: {
    score: 2600,
    short: "CR",
    className: "tier-crystal",
    range: "2,600점 ~ 2,999점",
  },
  다이아몬드: {
    score: 3000,
    short: "DM",
    className: "tier-diamond",
    range: "3,000점 ~ 3,399점",
  },
  마스터: {
    score: 3400,
    short: "MS",
    className: "tier-master",
    range: "3,400점 이상",
  },
  서바이버: {
    score: 3700,
    short: "SVR",
    className: "tier-survivor",
    range: "실시간 3,700점 이상",
  },
};

const TIER_ORDER = Object.keys(TIER_META) as TierBase[];
const TIER_RANKS = ["4", "3", "2", "1"];
const SINGLE_STAGE_TIERS: TierBase[] = ["서바이버"];

function getTodayDateInput() {
  const now = new Date();
  const offsetDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  return offsetDate.toISOString().slice(0, 10);
}

function dateInputToKstTimestamp(dateValue: string) {
  const safeDate = dateValue || getTodayDateInput();
  return `${safeDate}T12:00:00+09:00`;
}

const DEFAULT_CHART_MAX_SCORE = 3700;
const CHART_MIN_SCORE = 1000;
const CHART_WIDTH = 1100;
const CHART_HEIGHT = 420;
const PAD_X = 70;
const PAD_TOP = 34;
const PAD_BOTTOM = 54;

function getTierBase(tierName: string): TierBase {
  const found = TIER_ORDER.find((tier) => tierName.startsWith(tier));
  return found || "브론즈";
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("ko-KR", {
    month: "2-digit",
    day: "2-digit",
  });
}

function formatFullDate(value: string) {
  return new Date(value).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

function getTierScore(tierBase: TierBase, tierRank: string, customScore?: string) {
  if (tierBase === "서바이버") {
    const parsedScore = Number(customScore);
    return Number.isFinite(parsedScore)
      ? Math.max(TIER_META[tierBase].score, Math.floor(parsedScore))
      : TIER_META[tierBase].score;
  }

  if (SINGLE_STAGE_TIERS.includes(tierBase)) return TIER_META[tierBase].score;

  // PUBG 세부 단계는 IV(4) → I(1) 순서로 올라가며,
  // 각 단계는 RP 구간 400점을 100점 단위로 나눠 대표 점수로 저장합니다.
  // 예: 골드 IV 1800, 골드 III 1900, 골드 II 2000, 골드 I 2100
  const rank = Number(tierRank);

  if (tierBase === "마스터" && rank === 1) return 3699;

  return TIER_META[tierBase].score + (4 - rank) * 100;
}

function buildPath(points: ChartPoint[]) {
  if (points.length === 0) return "";
  return points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
}

function AcademySection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [academyVisible, setAcademyVisible] = useState(false);
  const [adminMode, setAdminMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<string>("");
  const [selectedPointId, setSelectedPointId] = useState<number | null>(null);

  const [tiers, setTiers] = useState<TierRow[]>([]);
  const [highlights, setHighlights] = useState<HighlightRow[]>([]);
  const [notices, setNotices] = useState<NoticeRow[]>([]);

  const [tierForm, setTierForm] = useState<{
    name: string;
    tierBase: TierBase;
    tierRank: string;
    survivorScore: string;
    recordDate: string;
  }>({
    name: "",
    tierBase: "골드",
    tierRank: "4",
    survivorScore: "3700",
    recordDate: getTodayDateInput(),
  });
  const [highlightForm, setHighlightForm] = useState({
    title: "",
    url: "",
    player: "",
  });
  const [noticeForm, setNoticeForm] = useState({
    title: "",
    content: "",
    isPinned: false,
  });

  const fetchData = async () => {
    const [tierResult, highlightResult, noticeResult] = await Promise.all([
      supabase
        .from("student_tiers")
        .select("*")
        .order("created_at", { ascending: true })
        .order("id", { ascending: true }),
      supabase
        .from("student_highlights")
        .select("*")
        .order("id", { ascending: false }),
      supabase
        .from("academy_notices")
        .select("*")
        .order("is_pinned", { ascending: false })
        .order("created_at", { ascending: false }),
    ]);

    if (tierResult.error)
      console.error("student_tiers error:", tierResult.error.message);
    if (highlightResult.error)
      console.error("student_highlights error:", highlightResult.error.message);
    if (noticeResult.error)
      console.error("academy_notices error:", noticeResult.error.message);

    setTiers(tierResult.data || []);
    setHighlights(highlightResult.data || []);
    setNotices(noticeResult.data || []);
  };


  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAcademyVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.22, rootMargin: "0px 0px -12% 0px" }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    fetchData();
    const syncAdminMode = () =>
      setAdminMode(document.body.classList.contains("vex-admin-mode"));
    syncAdminMode();
    window.addEventListener("vex-admin-mode-change", syncAdminMode);
    return () =>
      window.removeEventListener("vex-admin-mode-change", syncAdminMode);
  }, []);

  const studentNames = useMemo(() => {
    const names = Array.from(new Set(tiers.map((tier) => tier.name)));
    return names.sort((a, b) => a.localeCompare(b, "ko"));
  }, [tiers]);

  useEffect(() => {
    if (!selectedStudent && studentNames.length > 0)
      setSelectedStudent(studentNames[0]);
    if (selectedStudent && !studentNames.includes(selectedStudent))
      setSelectedStudent(studentNames[0] || "");
  }, [studentNames, selectedStudent]);

  const selectedRecords = useMemo(() => {
    return tiers.filter((tier) => tier.name === selectedStudent);
  }, [tiers, selectedStudent]);

  const chartMaxScore = useMemo(() => {
    const maxRecordScore = selectedRecords.reduce(
      (maxScore, record) => Math.max(maxScore, record.tier_score),
      DEFAULT_CHART_MAX_SCORE
    );
    return Math.ceil(maxRecordScore / 100) * 100;
  }, [selectedRecords]);

  const chartPoints = useMemo<ChartPoint[]>(() => {
    const drawableHeight = CHART_HEIGHT - PAD_TOP - PAD_BOTTOM;
    const drawableWidth = CHART_WIDTH - PAD_X * 2;
    const gap =
      selectedRecords.length <= 1
        ? 0
        : drawableWidth / (selectedRecords.length - 1);

    return selectedRecords.map((record, index) => {
      const normalized = Math.min(
        Math.max(
          (record.tier_score - CHART_MIN_SCORE) /
            (chartMaxScore - CHART_MIN_SCORE),
          0
        ),
        1
      );
      const x = PAD_X + gap * index;
      const y = PAD_TOP + drawableHeight - normalized * drawableHeight;
      return { ...record, x, y, tierBase: getTierBase(record.tier_name) };
    });
  }, [selectedRecords, chartMaxScore]);

  const selectedPoint =
    chartPoints.find((point) => point.id === selectedPointId) || null;
  const latestPoint = chartPoints[chartPoints.length - 1];
  const firstPoint = chartPoints[0];
  const diffScore =
    latestPoint && firstPoint
      ? latestPoint.tier_score - firstPoint.tier_score
      : 0;

  const handleTierSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tierForm.name.trim()) return alert("학생 이름을 입력해줘!");

    const isSurvivor = tierForm.tierBase === "서바이버";
    const isSingleStage = SINGLE_STAGE_TIERS.includes(tierForm.tierBase);
    const finalScore = getTierScore(
      tierForm.tierBase,
      tierForm.tierRank,
      tierForm.survivorScore
    );

    if (isSurvivor && finalScore < TIER_META.서바이버.score) {
      return alert("서바이버 RP는 3700점 이상으로 입력해줘!");
    }

    const fullTierName = isSurvivor
      ? `${tierForm.tierBase} ${finalScore}점`
      : isSingleStage
        ? tierForm.tierBase
        : `${tierForm.tierBase} ${tierForm.tierRank}`;

    setLoading(true);
    const { error } = await supabase.from("student_tiers").insert([
      {
        name: tierForm.name.trim(),
        tier_name: fullTierName,
        tier_score: finalScore,
        created_at: dateInputToKstTimestamp(tierForm.recordDate),
      },
    ]);

    if (error) alert(`등록 실패: ${error.message}`);
    else {
      setSelectedStudent(tierForm.name.trim());
      setTierForm({
        name: tierForm.name,
        tierBase: "골드",
        tierRank: "4",
        survivorScore: "3700",
        recordDate: getTodayDateInput(),
      });
      await fetchData();
    }
    setLoading(false);
  };

  const handleHighlightSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !highlightForm.title.trim() ||
      !highlightForm.url.trim() ||
      !highlightForm.player.trim()
    )
      return alert("빈칸을 채워줘!");

    setLoading(true);
    const { error } = await supabase
      .from("student_highlights")
      .insert([
        {
          title: highlightForm.title.trim(),
          video_url: highlightForm.url.trim(),
          player_name: highlightForm.player.trim(),
        },
      ]);

    if (error) alert(`등록 실패: ${error.message}`);
    else {
      setHighlightForm({ title: "", url: "", player: "" });
      await fetchData();
    }
    setLoading(false);
  };

  const handleNoticeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!noticeForm.title.trim() || !noticeForm.content.trim())
      return alert("빈칸을 채워줘!");

    setLoading(true);
    const { error } = await supabase
      .from("academy_notices")
      .insert([
        {
          title: noticeForm.title.trim(),
          content: noticeForm.content.trim(),
          is_pinned: noticeForm.isPinned,
        },
      ]);

    if (error) alert(`등록 실패: ${error.message}`);
    else {
      setNoticeForm({ title: "", content: "", isPinned: false });
      await fetchData();
    }
    setLoading(false);
  };

  const handleDelete = async (table: string, id: number) => {
    if (!window.confirm("정말 삭제할 거야?")) return;

    setLoading(true);
    const { error } = await supabase.from(table).delete().eq("id", id);

    if (error) alert(`삭제 실패: ${error.message}`);
    else {
      if (table === "student_tiers") setSelectedPointId(null);
      await fetchData();
    }
    setLoading(false);
  };

// 그래프 학생 기록만 삭제
const handleDeleteStudent = async (studentName: string) => {
  if (
    !window.confirm(
      `정말 [${studentName}] 학생의 그래프 티어 기록만 삭제할 거야?\n수강생 하이라이트는 삭제되지 않아.`
    )
  )
    return;

  setLoading(true);

  const { error } = await supabase
    .from("student_tiers")
    .delete()
    .eq("name", studentName);

  if (error) {
    alert(`그래프 기록 삭제 실패: ${error.message}`);
  } else {
    alert(`[${studentName}] 학생의 그래프 기록만 삭제했어.`);
    setSelectedStudent("");
    setSelectedPointId(null);
    await fetchData();
  }

  setLoading(false);
};

  const getEmbedUrl = (url: string) => {
    try {
      const regExp =
        /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      const match = url.match(regExp);
      return match && match[2].length === 11
        ? `https://www.youtube.com/embed/${match[2]}`
        : url;
    } catch {
      return url;
    }
  };

  return (
    <section
      ref={sectionRef}
      className={`academy-section ${academyVisible ? "academy-section--visible" : ""}`}
      id="academy-hub"
    >
      <div className="academy-bg academy-bg-one" />
      <div className="academy-bg academy-bg-two" />

      <div className="academy-inner">
        <div className="section-title-box">
          <p className="section-label">ACADEMY HUB</p>
          <h2>아카데미 소식 및 정보</h2>
        </div>

        <div
          className="academy-section-nav"
          aria-label="아카데미 허브 섹션 이동"
        >
          <a
            href="#academy-tier-section"
            className="academy-nav-card academy-nav-card--tier"
          >
            <span className="academy-nav-icon">↗</span>
            <span>
              <strong>성장 리포트</strong>
              <small>수강생 티어 변화</small>
            </span>
          </a>
          <a
            href="#academy-highlight-section"
            className="academy-nav-card academy-nav-card--highlight"
          >
            <span className="academy-nav-icon">▶</span>
            <span>
              <strong>하이라이트</strong>
              <small>수강생 플레이 영상</small>
            </span>
          </a>
          <a
            href="#academy-notice-section"
            className="academy-nav-card academy-nav-card--notice"
          >
            <span className="academy-nav-icon">📣</span>
            <span>
              <strong>공지 / 대회</strong>
              <small>일정과 안내사항</small>
            </span>
          </a>
        </div>

        <section
          className="academy-block academy-block--tier"
          id="academy-tier-section"
        >
          <div className="academy-block-heading">
            <p>GROWTH REPORT</p>
            <h3>수강생 성장 리포트</h3>
          </div>
          <div className="tab-content">
            {adminMode && (
              <form
                onSubmit={handleTierSubmit}
                className="academy-admin-form tier-admin-form"
              >
                <div className="field search-field">
                  <input
                    type="text"
                    placeholder="학생 이름 검색/입력..."
                    value={tierForm.name}
                    onChange={(e) =>
                      setTierForm({ ...tierForm, name: e.target.value })
                    }
                  />
                </div>

                <label className="field date-field">
                  <span>기록 날짜</span>
                  <input
                    type="date"
                    value={tierForm.recordDate}
                    onChange={(e) =>
                      setTierForm({ ...tierForm, recordDate: e.target.value })
                    }
                  />
                </label>

                <label className="field select-field">
                  <span>티어 기준</span>
                  <select
                    value={tierForm.tierBase}
                    onChange={(e) =>
                      setTierForm({
                        ...tierForm,
                        tierBase: e.target.value as TierBase,
                      })
                    }
                  >
                    {TIER_ORDER.map((tier) => (
                      <option key={tier} value={tier}>
                        {tier}
                      </option>
                    ))}
                  </select>
                </label>

                {!SINGLE_STAGE_TIERS.includes(tierForm.tierBase) && (
                  <label className="field select-field">
                    <span>세부 단계</span>
                    <select
                      value={tierForm.tierRank}
                      onChange={(e) =>
                        setTierForm({ ...tierForm, tierRank: e.target.value })
                      }
                    >
                      {TIER_RANKS.map((rank) => (
                        <option key={rank} value={rank}>
                          {rank}단계
                        </option>
                      ))}
                    </select>
                  </label>
                )}

                {tierForm.tierBase === "서바이버" && (
                  <label className="field score-field">
                    <span>RP 점수</span>
                    <input
                      type="number"
                      min={TIER_META.서바이버.score}
                      step="1"
                      placeholder="3700점 이상"
                      value={tierForm.survivorScore}
                      onChange={(e) =>
                        setTierForm({
                          ...tierForm,
                          survivorScore: e.target.value,
                        })
                      }
                    />
                  </label>
                )}

                <button
                  type="submit"
                  className="primary-action-btn"
                  disabled={loading}
                >
                  + 티어 업데이트
                </button>
              </form>
            )}

            <div className="academy-chart-shell">
              <div className="chart-topbar">
                <div className="chart-title-row">
                  <div className="chart-icon">↗</div>
                  <div>
                    <h3>학생 PUBG 티어 변화 그래프</h3>
                    <p>
                      {adminMode
                        ? "점을 클릭하면 아래 액션바에서 삭제할 수 있습니다."
                        : "수강생의 티어 성장 흐름을 확인할 수 있습니다."}
                    </p>
                  </div>
                </div>

                <div className="student-switcher">
                  {studentNames.length === 0 ? (
                    <span className="empty-student-pill">학생 없음</span>
                  ) : (
                    studentNames.map((name) => (
                      <div
                        key={name}
                        className={`student-btn-group ${selectedStudent === name ? "active" : ""}`}
                        style={{ display: "inline-flex", alignItems: "center", marginRight: "6px" }}
                      >
                        <button
                          type="button"
                          className={selectedStudent === name ? "active" : ""}
                          onClick={() => {
                            setSelectedStudent(name);
                            setSelectedPointId(null);
                          }}
                        >
                          {name}
                        </button>
                        {adminMode && (
                          <button
                            type="button"
                            className="student-del-btn"
                            style={{
                              background: "#ef4444",
                              color: "#fff",
                              border: "none",
                              padding: "4px 8px",
                              cursor: "pointer",
                              fontSize: "11px",
                              borderRadius: "0 4px 4px 0",
                              marginLeft: "-2px"
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteStudent(name);
                            }}
                            disabled={loading}
                          >
                            X
                          </button>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="tier-legend">
                {TIER_ORDER.map((tier) => (
                  <div
                    key={tier}
                    className={`tier-legend-item ${TIER_META[tier].className}`}
                  >
                    <span className="tier-mini-emblem">
                      {TIER_META[tier].short}
                    </span>
                    <small title={TIER_META[tier].range}>{tier}</small>
                  </div>
                ))}
              </div>

              {chartPoints.length === 0 ? (
                <div className="no-data-panel">
                  등록된 티어 정보가 없습니다.
                </div>
              ) : (
                <>
                  <div className="chart-summary-row">
                    <div className="summary-card">
                      <span>현재 티어</span>
                      <strong
                        className={TIER_META[latestPoint.tierBase].className}
                      >
                        {latestPoint.tier_name}
                      </strong>
                    </div>
                    <div className="summary-card">
                      <span>기록 수</span>
                      <strong>{chartPoints.length}회</strong>
                    </div>
                    <div className="summary-card">
                      <span>성장 점수</span>
                      <strong
                        className={diffScore >= 0 ? "score-up" : "score-down"}
                      >
                        {diffScore >= 0 ? "+" : ""}
                        {diffScore}
                      </strong>
                    </div>
                  </div>

                  <div className="chart-scroll-wrap">
                    <svg
                      className="tier-chart-svg"
                      viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
                      role="img"
                      aria-label={`${selectedStudent} 학생 PUBG 티어 변화 그래프`}
                    >
                      <defs>
                        <linearGradient
                          id="tierLineGradient"
                          x1="0"
                          y1="0"
                          x2="1"
                          y2="0"
                        >
                          <stop offset="0%" stopColor="#facc15" />
                          <stop offset="35%" stopColor="#22d3ee" />
                          <stop offset="70%" stopColor="#8b5cf6" />
                          <stop offset="100%" stopColor="#fb3f7f" />
                        </linearGradient>
                        <filter
                          id="lineGlow"
                          x="-20%"
                          y="-20%"
                          width="140%"
                          height="140%"
                        >
                          <feGaussianBlur stdDeviation="4" result="blur" />
                          <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                          </feMerge>
                        </filter>
                      </defs>

                      {[
                        "서바이버",
                        "마스터",
                        "다이아몬드",
                        "크리스탈",
                        "플래티넘",
                        "골드",
                        "실버",
                        "브론즈",
                      ].map((label, index) => {
                        const y =
                          PAD_TOP +
                          (index * (CHART_HEIGHT - PAD_TOP - PAD_BOTTOM)) / 7;
                        return (
                          <g key={label}>
                            <line
                              x1={PAD_X}
                              x2={CHART_WIDTH - PAD_X}
                              y1={y}
                              y2={y}
                              className="chart-grid-line"
                            />
                            <text
                              x={16}
                              y={y + 5}
                              className={`chart-y-label ${TIER_META[getTierBase(label)].className}`}
                            >
                              {label}
                            </text>
                          </g>
                        );
                      })}

                      <path
                        key={`chart-glow-${selectedStudent}-${chartPoints.length}-${latestPoint?.id || "empty"}`}
                        d={buildPath(chartPoints)}
                        pathLength={1}
                        className="chart-line chart-line-glow chart-line-animated"
                      />
                      <path
                        key={`chart-line-${selectedStudent}-${chartPoints.length}-${latestPoint?.id || "empty"}`}
                        d={buildPath(chartPoints)}
                        pathLength={1}
                        className="chart-line chart-line-animated"
                      />

                      {chartPoints.map((point, index) => (
                        <g
                          key={point.id}
                          className="chart-point-group chart-point-animated"
                          style={{ animationDelay: `${0.75 + index * 0.08}s` }}
                          onClick={() => setSelectedPointId(point.id)}
                        >
                          <circle
                            cx={point.x}
                            cy={point.y}
                            r={selectedPointId === point.id ? 16 : 11}
                            className={`point-halo ${TIER_META[point.tierBase].className}`}
                          />
                          <circle
                            cx={point.x}
                            cy={point.y}
                            r={7}
                            className={`point-dot ${TIER_META[point.tierBase].className}`}
                          />
                          <title>{`${formatFullDate(point.created_at)} · ${point.tier_name}`}</title>
                        </g>
                      ))}

                      {chartPoints.map((point, index) => (
                        <text
                          key={`${point.id}-date`}
                          x={point.x}
                          y={CHART_HEIGHT - 14}
                          textAnchor="middle"
                          className="chart-x-label"
                        >
                          {index % 2 === 0 || chartPoints.length <= 6
                            ? formatDate(point.created_at)
                            : ""}
                        </text>
                      ))}
                    </svg>
                  </div>

                  {adminMode && (
                    <div
                      className={`point-action-bar ${selectedPoint ? "show" : ""}`}
                    >
                      {selectedPoint ? (
                        <>
                          <div>
                            <span>선택한 기록</span>
                            <strong
                              className={
                                TIER_META[selectedPoint.tierBase].className
                              }
                            >
                              {selectedPoint.tier_name}
                            </strong>
                            <small>
                              {formatFullDate(selectedPoint.created_at)}
                            </small>
                          </div>
                          <button
                            type="button"
                            className="danger-action-btn"
                            onClick={() =>
                              handleDelete("student_tiers", selectedPoint.id)
                            }
                            disabled={loading}
                          >
                            선택 기록 삭제
                          </button>
                        </>
                      ) : (
                        <p>
                          삭제하려면 그래프의 점을 클릭해줘. 호버가 아니라 클릭
                          선택이라 버튼 안 사라짐.
                        </p>
                      )}
                    </div>
                  )}

                  <div className="recent-tier-strip">
                    <h4>최근 티어 기록</h4>
                    <div className="recent-tier-list">
                      {[...chartPoints].reverse().map((point) => (
                        <button
                          key={point.id}
                          type="button"
                          className={`recent-tier-chip ${selectedPointId === point.id ? "active" : ""}`}
                          onClick={() => setSelectedPointId(point.id)}
                        >
                          <span>{formatDate(point.created_at)}</span>
                          <strong
                            className={TIER_META[point.tierBase].className}
                          >
                            {point.tier_name}
                          </strong>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        <section
          className="academy-block academy-block--highlight"
          id="academy-highlight-section"
        >
          <div className="academy-block-heading">
            <p>STUDENT HIGHLIGHT</p>
            <h3>수강생 하이라이트</h3>
          </div>
          <div className="tab-content">
            {adminMode && (
              <form
                onSubmit={handleHighlightSubmit}
                className="academy-admin-form stacked-form"
              >
                <input
                  type="text"
                  placeholder="영상 제목"
                  value={highlightForm.title}
                  onChange={(e) =>
                    setHighlightForm({
                      ...highlightForm,
                      title: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="플레이어 이름"
                  value={highlightForm.player}
                  onChange={(e) =>
                    setHighlightForm({
                      ...highlightForm,
                      player: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="유튜브 링크"
                  value={highlightForm.url}
                  onChange={(e) =>
                    setHighlightForm({ ...highlightForm, url: e.target.value })
                  }
                />
                <button
                  type="submit"
                  className="primary-action-btn"
                  disabled={loading}
                >
                  영상 추가
                </button>
              </form>
            )}

            <div className="highlight-grid">
              {highlights.length === 0 ? (
                <div className="no-data-panel">
                  등록된 하이라이트가 없습니다.
                </div>
              ) : (
                highlights.map((highlight) => (
                  <article key={highlight.id} className="video-card">
                    <div className="video-wrapper">
                      <iframe
                        src={getEmbedUrl(highlight.video_url)}
                        title={highlight.title}
                        frameBorder="0"
                        allowFullScreen
                      />
                    </div>
                    <div className="video-info">
                      <p>PLAYER · {highlight.player_name}</p>
                      <h4>{highlight.title}</h4>
                    </div>
                    {adminMode && (
                      <button
                        type="button"
                        className="floating-del-btn"
                        onClick={() =>
                          handleDelete("student_highlights", highlight.id)
                        }
                      >
                        삭제
                      </button>
                    )}
                  </article>
                ))
              )}
            </div>
          </div>
        </section>

        <section
          className="academy-block academy-block--notice"
          id="academy-notice-section"
        >
          <div className="academy-block-heading">
            <p>NOTICE & TOURNAMENT</p>
            <h3>대회 소식 및 공지</h3>
          </div>
          <div className="tab-content">
            {adminMode && (
              <form
                onSubmit={handleNoticeSubmit}
                className="academy-admin-form notice-form"
              >
                <input
                  type="text"
                  placeholder="공지 제목"
                  value={noticeForm.title}
                  onChange={(e) =>
                    setNoticeForm({ ...noticeForm, title: e.target.value })
                  }
                />
                <textarea
                  placeholder="공지 내용"
                  value={noticeForm.content}
                  onChange={(e) =>
                    setNoticeForm({ ...noticeForm, content: e.target.value })
                  }
                />
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={noticeForm.isPinned}
                    onChange={(e) =>
                      setNoticeForm({
                        ...noticeForm,
                        isPinned: e.target.checked,
                      })
                    }
                  />
                  상단 고정
                </label>
                <button
                  type="submit"
                  className="primary-action-btn"
                  disabled={loading}
                >
                  공지 등록
                </button>
              </form>
            )}

            <div className="notice-list">
              {notices.length === 0 ? (
                <div className="no-data-panel">등록된 공지가 없습니다.</div>
              ) : (
                notices.map((notice) => (
                  <article
                    key={notice.id}
                    className={`notice-item ${notice.is_pinned ? "pinned" : ""}`}
                  >
                    <div className="notice-header">
                      {notice.is_pinned && (
                        <span className="pin-badge">중요</span>
                      )}
                      <h3>{notice.title}</h3>
                      <small>{formatFullDate(notice.created_at)}</small>
                    </div>
                    <p className="notice-body">{notice.content}</p>
                    {adminMode && (
                      <button
                        type="button"
                        className="floating-del-btn"
                        onClick={() =>
                          handleDelete("academy_notices", notice.id)
                        }
                      >
                        삭제
                      </button>
                    )}
                  </article>
                ))
              )}
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}

export default AcademySection;