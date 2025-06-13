declare const CardGuard: unique symbol;
export type Card = number & { [CardGuard]: true };
export function card(value: number): Card {
	return value as Card;
}

/**
 * Returns the type of action the human player is attempting to take based on the selected cards.
 * @param humanHand The human player's hand of cards.
 * @param wolfHand The AI player's hand of cards.
 * @param selectedHumanCards The indices of the human's selected cards.
 * @param selectedWolfCards The indices of the wolf's selected cards.
 * @returns The type of action:
 * - `"perfect"` if there is one selected human and wolf card, and they are equal.
 * - `"sum"` if there are multiple selected human cards, one selected wolf card, and the sum of the human cards equals the wolf card.
 * - `"split"` if there is one selected human card, multiple selected wolf cards, and the human card equals the sum of the wolf cards.
 * - `"over"` if there is one selected human card, one selected wolf card, and the human card is greater than the wolf card.
 * - `undefined` in all other cases
 */
export function getActionType(
	humanHand: ReadonlyArray<Card>,
	wolfHand: ReadonlyArray<Card>,
	selectedHumanCards: ReadonlyArray<number>,
	selectedWolfCards: ReadonlyArray<number>,
): "perfect" | "sum" | "split" | "over" | undefined {
	if (
		selectedHumanCards.length === 0 ||
		selectedWolfCards.length === 0 ||
		selectedHumanCards.length > humanHand.length ||
		selectedWolfCards.length > wolfHand.length
	) {
		return undefined;
	}

	// Get selected card values
	const humanCards = selectedHumanCards.map((i) => humanHand[i] as Card);
	const wolfCards = selectedWolfCards.map((i) => wolfHand[i] as Card);

	if (humanCards.length === 1 && wolfCards.length === 1) {
		const human = humanCards[0]!;
		const wolf = wolfCards[0]!;
		if (human === wolf) {
			return "perfect";
		} else if (human > wolf) {
			return "over";
		}
	}
	if (humanCards.length > 1 && wolfCards.length === 1) {
		const sum = humanCards.reduce((a, b) => a + b, 0);
		if (sum === wolfCards[0]) {
			return "sum";
		}
	}
	if (humanCards.length === 1 && wolfCards.length > 1) {
		const sum = wolfCards.reduce((a, b) => a + b, 0);
		if (humanCards[0] === sum) {
			return "split";
		}
	}
	return undefined;
}

/**
 * Creates a shuffled deck of Card objects based on the given ranks and cards per rank.
 * @param ranks The number of ranks to include in the deck.
 * @param cardsPerRank The number of each rank to include in the deck.
 * @returns A shuffled array of Card objects.
 */
export function createDeck(ranks: number, cardsPerRank: number): Card[] {
	const deck: Card[] = [];
	for (let rank = 1; rank <= ranks; ++rank) {
		for (let count = 0; count < cardsPerRank; ++count) {
			deck.push(card(rank));
		}
	}
	// Fisher-Yates shuffle
	for (let i = deck.length - 1; i > 0; --i) {
		const j = Math.floor(Math.random() * (i + 1));
		[deck[i]!, deck[j]!] = [deck[j]!, deck[i]!];
	}
	return deck;
}
