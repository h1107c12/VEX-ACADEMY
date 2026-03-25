import player1 from '../assets/images/player-1.png'
import player2 from '../assets/images/player-2.png'
import player3 from '../assets/images/player-3.png'
import player4 from '../assets/images/player-4.png'

export interface RosterPlayer {
  id: number
  role: string
  nickname: string
  realName: string
  image: string
}

const rosterData: RosterPlayer[] = [
  {
    id: 1,
    role: 'IGL / Fragger',
    nickname: 'Rookie',
    realName: 'Kim Min-ho',
    image: player1,
  },
  {
    id: 2,
    role: 'Fragger',
    nickname: 'Phoenix',
    realName: 'Lee Jae-sung',
    image: player2,
  },
  {
    id: 3,
    role: 'Support',
    nickname: 'Shadow',
    realName: 'Park Seung-woo',
    image: player3,
  },
  {
    id: 4,
    role: 'Sniper',
    nickname: 'Apex',
    realName: 'Choi Dong-hyun',
    image: player4,
  },
]

export default rosterData