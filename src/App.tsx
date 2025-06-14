import { useState } from "preact/hooks";
import { ActiveGame } from "./components/ActiveGame.js";
import { SetupPanel } from "./components/SetupPanel.js";
import { createGameState, GameState } from "./lib/state.js";

/** Toggles bootstrap theme between light and dark */
function toggleDarkMode() {
	const html = document.querySelector("html");
	if (html !== null) {
		html.dataset["bsTheme"] =
			html.dataset["bsTheme"] === "dark" ? "light" : "dark";
	}
}

export function App() {
	const [gameState, setGameState] = useState<GameState | null>(null);

	return (
		<div class="container mx-auto py-5">
			<div class="d-flex justify-content-between align-items-center mb-5 flex-wrap">
				<h1>Lobo Game</h1>
				<div>
					<button
						type="button"
						class="btn btn-outline-secondary me-2"
						onClick={toggleDarkMode}
						title="Toggle dark mode"
					>
						<i class="bi bi-moon-fill" />
					</button>
					<a
						href="https://lixquid.com"
						class="btn btn-outline-primary float-end"
					>
						<i class="bi bi-box-arrow-up-right me-2" />
						lixquid.com
					</a>
				</div>
			</div>
			{gameState === null ? (
				<SetupPanel onStart={(s) => setGameState(createGameState(s))} />
			) : (
				<ActiveGame
					gameState={gameState}
					setGameState={setGameState}
					returnToSetup={() => setGameState(null)}
				/>
			)}
			<div class="mt-5 text-end">
				<a href="https://github.com/lixquid/app-app-lobo-game">
					<i class="bi bi-box-arrow-up-right me-2" />
					Source code
				</a>
			</div>
			<div class="mt-2 text-end">
				Original game by{" "}
				<a href="https://crabfragmentlabs.com/vines">
					Crab Fragment Labs
				</a>
			</div>
		</div>
	);
}
