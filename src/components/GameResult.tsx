import { GameState } from "../lib/state.js";

export interface IGameResultProps {
	gameState: GameState;
	returnToSetup: () => void;
}

export function GameResult({ gameState, returnToSetup }: IGameResultProps) {
	const humanWins = gameState.humanScore > gameState.wolfScore;
	const cardClass = humanWins ? "card border-success" : "card border-danger";
	return (
		<div class={cardClass}>
			<div class="card-header d-flex justify-content-between align-items-center">
				<span>Game Result</span>
				<button
					type="button"
					class="btn btn-link link-danger p-0 m-0 align-baseline"
					onClick={returnToSetup}
				>
					Return to Setup
				</button>
			</div>
			<div class="card-body">
				<div class="mb-3">
					<span class="me-2">Human:</span>
					<span class="fw-bold">{gameState.humanScore}</span>
				</div>
				<div class="mb-3">
					<span class="me-2">Wolf:</span>
					<span class="fw-bold">{gameState.wolfScore}</span>
				</div>
				<div class="mb-3">
					<span class="me-2">Rounds:</span>
					<span class="fw-bold">{gameState.roundNumber}</span>
				</div>
				<div
					class={`alert ${humanWins ? "alert-success" : "alert-danger"}`}
				>
					{humanWins ? "You win!" : "The Wolf wins!"}
				</div>
			</div>
		</div>
	);
}
