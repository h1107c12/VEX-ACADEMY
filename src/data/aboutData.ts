export interface AboutFeature {
  id: number
  title: string
  description: string
  icon: string
}

export const aboutFeatures: AboutFeature[] = [
  {
    id: 1,
    title: 'Elite Training',
    description: '프로 코치들이 설계한 종합적인 트레이닝 프로그램',
    icon: '◎',
  },
  {
    id: 2,
    title: 'Competitive Path',
    description: '성과 기반 승격을 통해 메인 로스터로 올라갈 수 있는 명확한 길',
    icon: '🏆',
  },
  {
    id: 3,
    title: 'Team Culture',
    description: '강한 팀워크와 프로페셔널한 마인드 구축',
    icon: '◌',
  },
  {
    id: 4,
    title: 'Cutting-Edge',
    description: '최신 장비와 게이밍 시설 이용 가능',
    icon: '⚡',
  },
]

export const aboutStats = [
  {
    id: 1,
    value: '20+',
    label: '주당 20시간 이상 훈련',
  },
  {
    id: 2,
    value: '5+',
    label: '프로 코치 5명 이상',
  },
  {
    id: 3,
    value: '200%',
    label: '열정 200%',
  },
  {
    id: 4,
    value: '#1',
    label: '목표',
  },
]