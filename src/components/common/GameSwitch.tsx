import type { GameType } from "../../data/gameData"

type GameSwitchProps = {
  game: GameType
  onChange: (game: GameType) => void
}

function GameSwitch({ game, onChange }: GameSwitchProps) {
  return (
    <div className="game-switch-wrap" aria-label="아카데미 게임 선택">
      <div className="game-switch" role="group">
        <button
          type="button"
          className={`game-switch__button ${game === "pubg" ? "is-active" : ""}`}
          aria-pressed={game === "pubg"}
          onClick={() => onChange("pubg")}
        >
          <span className="game-switch__mark">BG</span>
          <span>BATTLEGROUNDS</span>
        </button>

        <button
          type="button"
          className={`game-switch__button ${game === "valorant" ? "is-active" : ""}`}
          aria-pressed={game === "valorant"}
          onClick={() => onChange("valorant")}
        >
          <span className="game-switch__mark">V</span>
          <span>VALORANT</span>
        </button>
      </div>
    </div>
  )
}

export default GameSwitch
