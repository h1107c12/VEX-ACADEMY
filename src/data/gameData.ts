export type GameType = "pubg" | "valorant"

export type ProgramData = {
  eyebrow: string
  title: string
  subtitle: string
  description: string
  proTitle: string
  proDescription: string
  proDetail: string
  hobbyTitle: string
  hobbyDescription: string
  hobbyDetail: string
  points: string[]
}

export type CurriculumStep = {
  id: number
  label: string
  title: string
  description: string
}

export type CurriculumData = {
  eyebrow: string
  title: string
  description: string
  steps: CurriculumStep[]
  reasons: string[]
}

export const gameData: Record<
  GameType,
  {
    label: string
    shortLabel: string
    heroLogo: string
    applyUrl: string
    officialUrl: string
    program: ProgramData
    curriculum: CurriculumData
  }
> = {
  pubg: {
    label: "BATTLEGROUNDS",
    shortLabel: "PUBG",
    heroLogo: "/logo-hero.png",
    applyUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLSe7gOVDaTMf9X34rVrTDK4hA67DRzK93QXgUEF-Hxx2cONqsg/viewform",
    officialUrl: "https://www.vexesports.kr/",
    program: {
      eyebrow: "ACADEMY PROGRAM",
      title: "VEX E-SPORTS ACADEMY",
      subtitle: "PUBG 전문 트레이닝 커리큘럼",
      description:
        "VEX E-Sports Academy는 현역 활동을 바탕으로 한 감독진이 운영하는 실전형 교육 시스템을 기반으로, 입문자부터 프로 데뷔를 준비하는 선수까지 모두 성장할 수 있는 단계별 프로그램을 제공합니다.",
      proTitle: "프로반",
      proDescription: "배틀그라운드 프로게이머를 진심으로 지망하는 자",
      proDetail: "체계적인 코칭을 통해 프로 입단을 목표로 성장하고자 하는 인원",
      hobbyTitle: "취미반",
      hobbyDescription: "배틀그라운드를 출중한 실력으로 즐기고 더 배워보고 싶은 자",
      hobbyDetail: "기본기 향상과 꾸준한 연습에 관심 있는 일반 유저 누구나 가능",
      points: [
        "현역 선수 및 코치진 경험을 바탕으로 한 실전 중심 교육",
        "입문자부터 프로 지망생까지 단계별 맞춤 성장 구조",
        "개인 성향과 플레이 스타일을 반영한 코칭 시스템",
        "실력 향상뿐 아니라 팀 플레이 감각과 경쟁력을 함께 강화",
      ],
    },
    curriculum: {
      eyebrow: "TRAINING PROCESS",
      title: "CURRICULUM",
      description:
        "단계별 훈련 구조를 통해 기본기부터 실전 감각까지 자연스럽게 끌어올립니다.",
      steps: [
        {
          id: 1,
          label: "STEP 1",
          title: "기초 트레이닝",
          description: "에임, 무빙, 교전 기초, 파밍 동선 등 기본기를 체계적으로 정리",
        },
        {
          id: 2,
          label: "STEP 2",
          title: "심화 전략과정",
          description: "포지셔닝, 운영 판단, 상황별 의사결정, 전술 이해도 강화",
        },
        {
          id: 3,
          label: "STEP 3",
          title: "실전 스크림 & 피드백",
          description: "실전 스크림, 리플레이 분석, 맞춤 피드백을 통한 경기 감각 향상",
        },
      ],
      reasons: [
        "현역 선수 & 코치진의 경험을 기반으로 한 실전 중심 교육",
        "개인 실력과 목표에 맞춘 단계별 커리큘럼과 플레이 분석 기반 맞춤형 피드백",
        "아카데미생 전용 팀 운영과 스크림 훈련 연계를 통해 경쟁력 강화",
        "전문성 있는 피드백 기반의 실전 감각 향상과 성장 과정 시각화 지원",
        "수강생 능력치에 맞춰 실제 선수단 테스트 연계 진행",
      ],
    },
  },
  valorant: {
    label: "VALORANT",
    shortLabel: "VALORANT",
    heroLogo: "/logo-hero.png",
    applyUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLSe7gOVDaTMf9X34rVrTDK4hA67DRzK93QXgUEF-Hxx2cONqsg/viewform",
    officialUrl: "https://www.vexesports.kr/",
    program: {
      eyebrow: "ACADEMY PROGRAM",
      title: "VEX E-SPORTS ACADEMY",
      subtitle: "VALORANT 전문 트레이닝 커리큘럼",
      description:
        "발로란트의 에임, 요원 이해도, 전술 수행과 팀 커뮤니케이션을 단계적으로 훈련해 경쟁전 실력 향상부터 프로 데뷔 준비까지 연결합니다.",
      proTitle: "프로반",
      proDescription: "발로란트 프로게이머를 진심으로 지망하는 자",
      proDetail: "팀 전술과 역할 수행 능력을 강화해 프로 입단을 목표로 하는 인원",
      hobbyTitle: "성장반",
      hobbyDescription: "경쟁전 티어 상승과 체계적인 실력 향상을 원하는 자",
      hobbyDetail: "에임, 요원 활용, 맵 운영을 제대로 배우고 싶은 일반 유저 누구나 가능",
      points: [
        "에임과 피킹 습관을 분석하는 개인별 기초 교정",
        "요원 역할과 맵별 포지셔닝을 반영한 전술 교육",
        "라운드 운영과 팀 커뮤니케이션 중심의 실전 훈련",
        "리플레이 분석과 스크림 피드백을 통한 반복 개선",
      ],
    },
    curriculum: {
      eyebrow: "TRAINING PROCESS",
      title: "CURRICULUM",
      description:
        "개인 기량부터 팀 전술까지 발로란트에 필요한 역량을 단계별로 완성합니다.",
      steps: [
        {
          id: 1,
          label: "STEP 1",
          title: "에임 & 무빙 교정",
          description: "크로스헤어 위치, 피킹, 스탑핑, 반동 제어 등 교전 기본기 정리",
        },
        {
          id: 2,
          label: "STEP 2",
          title: "요원·맵 운영",
          description: "역할별 임무, 스킬 연계, 맵별 포지셔닝과 라운드 운영 강화",
        },
        {
          id: 3,
          label: "STEP 3",
          title: "팀 전술 & 스크림",
          description: "콜 체계, 세트 플레이, 리플레이 분석과 맞춤 피드백 진행",
        },
      ],
      reasons: [
        "개인 에임과 플레이 습관을 데이터와 리플레이로 분석",
        "역할과 요원 숙련도를 고려한 맞춤형 훈련 구성",
        "맵별 전술과 팀 커뮤니케이션을 실전 스크림으로 연결",
        "라운드별 의사결정 과정을 구체적으로 피드백",
        "프로 지망생의 팀 테스트와 포트폴리오 준비 지원",
      ],
    },
  },
}

export const isGameType = (value: unknown): value is GameType =>
  value === "pubg" || value === "valorant"
