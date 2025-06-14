import { useState } from "preact/hooks";
import { endRound, GameState, performAction } from "../lib/state.js";
import { ControlsPanel } from "./ControlsPanel.js";
import { GameResult } from "./GameResult.js";
import { HandPanel } from "./HandPanel.js";

interface IActiveGameProps {
	gameState: GameState;
	setGameState: (state: GameState) => void;
	returnToSetup: () => void;
}

export function ActiveGame({
	gameState,
	setGameState,
	returnToSetup,
}: IActiveGameProps) {
	const [humanSelected, setHumanSelected] = useState<Set<number>>(new Set());
	const [wolfSelected, setWolfSelected] = useState<Set<number>>(new Set());

	if (
		gameState.humanScore >= gameState.settings.pointGoal ||
		gameState.wolfScore >= gameState.settings.pointGoal
	) {
		return (
			<GameResult gameState={gameState} returnToSetup={returnToSetup} />
		);
	}

	return (
		<>
			<HandPanel
				cards={gameState.wolfHand}
				name="Wolf"
				class="mb-3"
				selected={wolfSelected}
				setSelected={setWolfSelected}
			/>
			<HandPanel
				cards={gameState.humanHand}
				name="Human"
				class="mb-3"
				selected={humanSelected}
				setSelected={setHumanSelected}
			/>
			<ControlsPanel
				gameState={gameState}
				performAction={() => {
					setGameState(
						performAction(gameState, humanSelected, wolfSelected),
					);
					setHumanSelected(new Set());
					setWolfSelected(new Set());
				}}
				fold={() => setGameState(endRound(gameState))}
				returnToSetup={returnToSetup}
				humanSelected={humanSelected}
				wolfSelected={wolfSelected}
			/>
		</>
	);
}
