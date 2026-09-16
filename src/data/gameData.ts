export type GameType = "pubg" | "valorant"

export type CurriculumStep = {
  id: number
  label: string
  title: string
  description: string
}

export type EducationCourse = {
  id: string
  title: string
  paragraphs: string[]
  tags: string[]
}

export type CurriculumData = {
  eyebrow: string
  title: string
  description: string
  courses: EducationCourse[]
  steps: CurriculumStep[]
}

export const gameData: Record<
  GameType,
  {
    label: string
    shortLabel: string
    heroLogo: string
    applyUrl: string
    officialUrl: string
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
    curriculum: {
      eyebrow: "CURRICULUM",
      title: "커리큘럼-교육과정",
      description:
        "단계별 훈련 구조를 통해 기본기부터 실전 감각까지 자연스럽게 끌어올립니다.",
      courses: [
        {
          id: "pro", title: "프로게이머 과정",
          paragraphs: [
            "PUBG 프로 선수를 목표로 하는 수강생을 위한 전문 교육과정입니다.",
            "VEX 프로팀 코치진이 직접 개인 기량 향상, 에임 및 교전 능력, 포지셔닝, 운영 능력, 팀 플레이, 스크림 및 리플레이 분석까지 프로 선수에게 필요한 전 과정을 체계적으로 교육합니다.",
            "우수 수강생에게는 각종 대회 참가 기회 및 VEX 프로팀 테스트를 제공하며, 프로 데뷔를 위한 실전 경험과 경쟁력을 갖출 수 있도록 지원합니다.",
          ],
          tags: ["프로 데뷔 준비", "실전 중심 훈련"],
        },
        {
          id: "hobby", title: "취미 · 실력향상 과정",
          paragraphs: [
            "게임을 더욱 재미있게 즐기고 실력을 향상시키고 싶은 수강생을 위한 맞춤형 교육과정입니다.",
            "티어별 수준에 맞춘 커리큘럼을 통해 에임, 포지셔닝, 교전 판단, 운영 능력, 팀워크 등 실전에서 필요한 핵심 요소를 단계적으로 교육하며, 자신의 플레이 스타일에 맞는 성장 방향을 제시합니다.",
            "처음 PUBG를 배우는 입문자부터 상위 티어를 목표로 하는 수강생까지 누구나 체계적인 코칭을 통해 실력 향상을 경험할 수 있습니다.",
          ],
          tags: ["입문부터 상위 티어까지", "개인별 맞춤 코칭"],
        },
      ],
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
    },
  },
  valorant: {
    label: "VALORANT",
    shortLabel: "VALORANT",
    heroLogo: "/logo-hero.png",
    applyUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLSe7gOVDaTMf9X34rVrTDK4hA67DRzK93QXgUEF-Hxx2cONqsg/viewform",
    officialUrl: "https://www.vexesports.kr/",
    curriculum: {
      eyebrow: "CURRICULUM",
      title: "커리큘럼-교육과정",
      description:
        "개인 기량부터 팀 전술까지 발로란트에 필요한 역량을 단계별로 완성합니다.",
      courses: [
        {
          id: "pro", title: "프로게이머 과정",
          paragraphs: [
            "발로란트 프로 선수를 목표로 하는 수강생을 위한 전문 교육과정입니다.",
            "에임과 피킹, 요원별 역할, 맵 운영, 스킬 연계와 팀 커뮤니케이션을 단계적으로 훈련합니다. 스크림과 리플레이 분석을 통해 개인 기량을 팀 경기력으로 연결합니다.",
            "목표와 플레이 스타일을 반영한 피드백으로 프로 데뷔 준비에 필요한 실전 감각과 경쟁력을 키웁니다.",
          ],
          tags: ["프로 데뷔 준비", "팀 전술 훈련"],
        },
        {
          id: "hobby", title: "취미 · 실력향상 과정",
          paragraphs: [
            "발로란트를 더욱 재미있게 즐기고 경쟁전 실력을 높이고 싶은 수강생을 위한 맞춤형 교육과정입니다.",
            "조준점 위치, 피킹과 정지 사격, 주력 요원 활용, 맵별 위치 선정과 라운드 운영을 수준에 맞춰 교육합니다.",
            "입문자부터 상위 티어를 목표로 하는 수강생까지, 리플레이 분석과 개인별 피드백으로 자신에게 맞는 성장 방향을 찾아갑니다.",
          ],
          tags: ["경쟁전 실력 향상", "개인별 맞춤 코칭"],
        },
      ],
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
    },
  },
}

export const isGameType = (value: unknown): value is GameType =>
  value === "pubg" || value === "valorant"
