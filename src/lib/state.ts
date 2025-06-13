import { Card, createDeck, getActionType } from "./types.js";

//#region Settings
export interface GameSettings {
	/** How many ranks to include in the deck. */
	ranks: number;
	/** How many of each rank to include in the deck. */
	cardsPerRank: number;
	/** How many cards to deal to each player. */
	handSize: number;
	/** How many points to play to. */
	pointGoal: number;
}

export const settingDefaults = {
	Easy: {
		ranks: 8,
		cardsPerRank: 5,
		handSize: 4,
		pointGoal: 100,
	},
	Medium: {
		ranks: 9,
		cardsPerRank: 5,
		handSize: 4,
		pointGoal: 100,
	},
	Hard: {
		ranks: 10,
		cardsPerRank: 5,
		handSize: 4,
		pointGoal: 100,
	},
} satisfies Record<string, GameSettings>;
//#endregion

//#region Game State
export interface GameState {
	/** The current game settings. */
	settings: GameSettings;

	/** The remaining card stock. */
	deck: Card[];
	/** The current round number. */
	roundNumber: number;

	/** The human's hand of cards. */
	humanHand: Card[];
	/** The AI's hand of cards. */
	wolfHand: Card[];

	/** The human's score. */
	humanScore: number;
	/** The AI's score. */
	wolfScore: number;
}

/**
 * Applies the selected action to the game state, returning a new state.
 *
 * Removes the selected cards from the human and wolf's hands, then:
 * - For a "perfect" or "sum", adds a card from the deck to the human's hand.
 * - For a "split", adds a card from the deck to the wolf's hand.
 * - For an "over", adds as many cards to the wolf's hand as the human's card was larger than the wolf's card.
 *
 * @param state The current game state.
 * @param selectedHumanCards The indices of the human's selected cards.
 * @param selectedWolfCards The indices of the wolf's selected cards.
 * @returns The new game state after performing the action.
 */
export function performAction(
	state: GameState,
	selectedHumanCards: ReadonlyArray<number>,
	selectedWolfCards: ReadonlyArray<number>,
): GameState {
	const action = getActionType(
		state.humanHand,
		state.wolfHand,
		selectedHumanCards,
		selectedWolfCards,
	);
	if (!action) return state;

	// Clone state
	const newState: GameState = {
		...state,
		humanHand: [...state.humanHand],
		wolfHand: [...state.wolfHand],
		deck: [...state.deck],
	};

	// Remove selected cards (sort indices descending to avoid shifting)
	[...selectedHumanCards]
		.sort((a, b) => b - a)
		.forEach((i) => newState.humanHand.splice(i, 1));
	[...selectedWolfCards]
		.sort((a, b) => b - a)
		.forEach((i) => newState.wolfHand.splice(i, 1));

	// Draw helper
	const drawCard = () =>
		newState.deck.length > 0 ? newState.deck.shift()! : undefined;

	switch (action) {
		case "perfect":
		case "sum": {
			const c = drawCard();
			if (c !== undefined) newState.humanHand.push(c);
			break;
		}
		case "split": {
			const c = drawCard();
			if (c !== undefined) newState.wolfHand.push(c);
			break;
		}
		case "over": {
			const humanCard = state.humanHand[selectedHumanCards[0]!];
			const wolfCard = state.wolfHand[selectedWolfCards[0]!];
			if (humanCard !== undefined && wolfCard !== undefined) {
				const diff = (humanCard as number) - (wolfCard as number);
				for (let i = 0; i < diff; ++i) {
					const c = drawCard();
					if (c !== undefined) newState.wolfHand.push(c);
				}
			}
			break;
		}
	}
	return newState;
}

/**
 * Ends the current round, updating scores and resetting hands and deck.
 *
 * - If the wolf has any cards in its hand, its sum is added to its score and the human gets 0.
 * - If the wolf has 0 cards, the sum of the human's hand is added to the human's score and the wolf gets 0.
 * - Returns a new game state with cleared hands and a new shuffled deck.
 */
export function endRound(state: GameState): GameState {
	let wolfScore = state.wolfScore;
	let humanScore = state.humanScore;
	if (state.wolfHand.length > 0) {
		wolfScore += state.wolfHand.reduce((a, b) => a + b, 0);
	} else {
		humanScore += state.humanHand.reduce((a, b) => a + b, 0);
	}
	return {
		settings: state.settings,
		deck: createDeck(state.settings.ranks, state.settings.cardsPerRank),
		roundNumber: state.roundNumber + 1,
		humanHand: [],
		wolfHand: [],
		humanScore,
		wolfScore,
	};
}
//#endregion
