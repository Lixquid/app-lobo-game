import { GameState } from "../lib/state.js";
import { getActionType } from "../lib/types.js";

export interface IControlsCardProps {
	gameState: GameState;
	performAction: () => void;
	fold: () => void;
	returnToSetup: () => void;
	humanSelected: Set<number>;
	wolfSelected: Set<number>;
}

//#region Perform Action Button Component
function PerformActionButton(props: {
	action: ReturnType<typeof getActionType>;
	performAction: () => void;
	gameState: GameState;
	humanSelected: Set<number>;
	wolfSelected: Set<number>;
}) {
	switch (props.action) {
		case "perfect":
			return (
				<button
					type="button"
					class="btn btn-success w-100 py-3 fs-3"
					onClick={props.performAction}
				>
					Perfect
					<br />
					<small class="fs-6">Human gets 1 card</small>
				</button>
			);
		case "sum":
			return (
				<button
					type="button"
					class="btn btn-success w-100 py-3 fs-3"
					onClick={props.performAction}
				>
					Sum
					<br />
					<small class="fs-6">Human gets 1 card</small>
				</button>
			);
		case "split":
			return (
				<button
					type="button"
					class="btn btn-success w-100 py-3 fs-3"
					onClick={props.performAction}
				>
					Split
					<br />
					<small class="fs-6">Wolf gets 1 card</small>
				</button>
			);
		case "over": {
			const cardCount =
				props.gameState.humanHand[
					props.humanSelected.values().next().value!
				]! -
				props.gameState.wolfHand[
					props.wolfSelected.values().next().value!
				]!;
			return (
				<button
					type="button"
					class="btn btn-success w-100 py-3 fs-3"
					onClick={props.performAction}
				>
					Over
					<br />
					<small class="fs-6">Wolf gets {cardCount} card(s)</small>
				</button>
			);
		}
		default:
			return (
				<button
					type="button"
					class="btn btn-success w-100 py-3 fs-5"
					disabled
				>
					Select cards to perform an action
				</button>
			);
	}
}
//#endregion

const actionNames: Record<ReturnType<typeof getActionType> & string, string> = {
	perfect: "Perfect",
	sum: "Sum",
	split: "Split",
	over: "Over",
};

export function ControlsPanel({
	gameState,
	performAction,
	fold,
	returnToSetup,
	humanSelected,
	wolfSelected,
}: IControlsCardProps) {
	const topCard = gameState.deck[0];

	const selectedAction = getActionType(
		gameState.humanHand,
		gameState.wolfHand,
		humanSelected,
		wolfSelected,
	);

	return (
		<div class="card">
			<div class="card-header d-flex justify-content-between align-items-center">
				<span>Round {gameState.roundNumber}</span>
				<button
					type="button"
					class="btn btn-link link-danger p-0 m-0 align-baseline"
					onClick={returnToSetup}
				>
					Return to Setup
				</button>
			</div>
			<div class="card-body">
				<div class="row g-3 mb-3 align-items-center">
					<div class="col-12 col-md-6">
						<div class="text-center">
							<div class="mb-2 text-muted">Next Card</div>
							{topCard !== undefined ? (
								<span class="badge bg-secondary fs-1">
									{topCard}
								</span>
							) : (
								<span class="text-muted">Deck is empty</span>
							)}
						</div>
					</div>
					<div class="col-12 col-md-6 d-flex flex-column gap-2">
						<PerformActionButton
							action={selectedAction}
							performAction={performAction}
							gameState={gameState}
							humanSelected={humanSelected}
							wolfSelected={wolfSelected}
						/>
						<button
							type="button"
							class={`btn w-100 ${gameState.wolfHand.length === 0 ? "btn-success" : "btn-warning"}`}
							onClick={fold}
						>
							{gameState.wolfHand.length === 0
								? "Next Round"
								: "Fold"}
							<br />
							<small class="d-block mt-1">
								{gameState.wolfHand.length === 0
									? `Human wins ${gameState.humanHand.reduce((a, b) => a + b, 0)} points`
									: `Wolf will get ${gameState.wolfHand.reduce((a, b) => a + b, 0)} points`}
							</small>
						</button>
					</div>
				</div>
				<hr />
				<div class="row g-3">
					<div class="col text-center">
						<strong>Human</strong>
						<br />
						<span class="fs-4">{gameState.humanScore}</span>
					</div>
					<div class="col text-center">
						<strong>Wolf</strong>
						<br />
						<span class="fs-4">{gameState.wolfScore}</span>
					</div>
				</div>
				<span class="text-center d-block mb-3">
					First to {gameState.settings.pointGoal}
				</span>
			</div>
		</div>
	);
}
