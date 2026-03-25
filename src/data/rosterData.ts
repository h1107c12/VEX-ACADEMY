import lure from '../assets/images/academy-roster/lure.png'
import nyeong from '../assets/images/academy-roster/nyeong.png'
import karwn from '../assets/images/academy-roster/karwn.png'
import roy from '../assets/images/academy-roster/roy.png'

export type RosterPlayer = {
  id: number
  image: string
  alt: string
  name: string
  realName: string
  position: string
  streamLink: string
}

const rosterData: RosterPlayer[] = [
  {
    id: 1,
    image: lure,
    alt: 'Lure academy roster poster',
    name: 'LURE',
    realName: '신경민',
    position: 'Attacker',
    streamLink: '',
  },
  {
    id: 2,
    image: nyeong,
    alt: 'Nyeong academy roster poster',
    name: 'NYEONG',
    realName: '유대녕',
    position: 'Main Order',
    streamLink: '',
  },
  {
    id: 3,
    image: karwn,
    alt: 'Karwn academy roster poster',
    name: 'KARWN',
    realName: '김도훈',
    position: 'Anchor/Backup',
    streamLink: '',
  },
  {
    id: 4,
    image: roy,
    alt: 'Roy academy roster poster',
    name: 'ROY',
    realName: '김민길',
    position: 'Leader/Sub Order',
    streamLink: '',
  },
]

export default rosterData