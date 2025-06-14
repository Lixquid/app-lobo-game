import { useState } from "preact/hooks";
import { GameSettings, settingDefaults } from "../lib/state.js";

export interface ISetupCardProps {
	onStart: (settings: GameSettings) => void;
}

export function SetupPanel(props: ISetupCardProps) {
	const { onStart } = props;
	const [difficulty, setDifficulty] = useState<
		keyof typeof settingDefaults | "Custom"
	>("Easy");
	const [ranks, setRanks] = useState(10);
	const [cardsPerRank, setCardsPerRank] = useState(5);
	const [handSize, setHandSize] = useState(4);
	const [pointGoal, setPointGoal] = useState(100);

	function setFromTemplate(template: GameSettings) {
		setRanks(template.ranks);
		setCardsPerRank(template.cardsPerRank);
		setHandSize(template.handSize);
		setPointGoal(template.pointGoal);
	}

	return (
		<div class="card">
			<div class="card-header">Game Setup</div>
			<div class="card-body">
				<form>
					<div class="mb-3">
						<label for="template" class="form-label">
							Difficulty
						</label>
						<select
							class="form-select"
							id="template"
							value={difficulty}
							onChange={(e) => {
								const value = (e.target as HTMLSelectElement)
									.value as
									| keyof typeof settingDefaults
									| "Custom";
								setDifficulty(value);
								if (
									value !== "Custom" &&
									settingDefaults[value]
								) {
									setFromTemplate(settingDefaults[value]);
								}
							}}
						>
							{Object.entries(settingDefaults).map(([key]) => (
								<option key={key} value={key}>
									{key}
								</option>
							))}
							<option value="Custom">Custom</option>
						</select>
					</div>
					{difficulty === "Custom" && (
						<div class="row g-3">
							<div class="col-12 col-sm-6 col-md-4 col-lg-3">
								<label for="ranks" class="form-label">
									Ranks
								</label>
								<input
									type="number"
									class="form-control"
									id="ranks"
									min={5}
									max={50}
									step={1}
									value={ranks}
									onInput={(e) =>
										setRanks(
											Number(
												(e.target as HTMLInputElement)
													.value,
											),
										)
									}
								/>
								<div class="form-text">
									How many unique card values are in the deck.
									The higher this is, the harder the game
									becomes.
								</div>
							</div>
							<div class="col-12 col-sm-6 col-md-4 col-lg-3">
								<label for="cardsPerRank" class="form-label">
									Cards per Rank
								</label>
								<input
									type="number"
									class="form-control"
									id="cardsPerRank"
									min={2}
									max={50}
									step={1}
									value={cardsPerRank}
									onInput={(e) =>
										setCardsPerRank(
											Number(
												(e.target as HTMLInputElement)
													.value,
											),
										)
									}
								/>
								<div class="form-text">
									How many copies of each rank are in the
									deck. The higher this is, the easier the
									game becomes.
								</div>
							</div>
							<div class="col-12 col-sm-6 col-md-4 col-lg-3">
								<label for="handSize" class="form-label">
									Hand Size
								</label>
								<input
									type="number"
									class="form-control"
									id="handSize"
									min={1}
									max={10}
									step={1}
									value={handSize}
									onInput={(e) =>
										setHandSize(
											Number(
												(e.target as HTMLInputElement)
													.value,
											),
										)
									}
								/>
								<div class="form-text">
									How many cards each player starts with.
								</div>
							</div>
							<div class="col-12 col-sm-6 col-md-4 col-lg-3">
								<label for="pointGoal" class="form-label">
									Point Goal
								</label>
								<input
									type="number"
									class="form-control"
									id="pointGoal"
									min={1}
									step={1}
									value={pointGoal}
									onInput={(e) =>
										setPointGoal(
											Number(
												(e.target as HTMLInputElement)
													.value,
											),
										)
									}
								/>
								<div class="form-text">
									The number of points needed to win the game.
								</div>
							</div>
						</div>
					)}
					<div class="mt-4">
						<button
							type="button"
							class="btn btn-primary float-end"
							onClick={() => {
								const settings: GameSettings =
									difficulty !== "Custom"
										? settingDefaults[
												difficulty as keyof typeof settingDefaults
											]
										: {
												ranks,
												cardsPerRank,
												handSize,
												pointGoal,
											};
								onStart(settings);
							}}
						>
							Start Game
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
