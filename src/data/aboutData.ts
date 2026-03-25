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
    description: 'Comprehensive training programs designed by professional coaches',
    icon: '◎',
  },
  {
    id: 2,
    title: 'Competitive Path',
    description: 'Clear pathway to the main roster through performance-based promotion',
    icon: '🏆',
  },
  {
    id: 3,
    title: 'Team Culture',
    description: 'Building strong team synergy and professional mindset',
    icon: '◌',
  },
  {
    id: 4,
    title: 'Cutting-Edge',
    description: 'Access to the latest equipment and gaming facilities',
    icon: '⚡',
  },
]

export const aboutStats = [
  {
    id: 1,
    value: '20+',
    label: 'Training Hours/Week',
  },
  {
    id: 2,
    value: '5+',
    label: 'Professional Coaches',
  },
  {
    id: 3,
    value: '100%',
    label: 'Dedication',
  },
  {
    id: 4,
    value: '#1',
    label: 'Goal',
  },
]