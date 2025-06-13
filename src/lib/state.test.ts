import { equal } from "node:assert/strict";
import { test } from "node:test";
import {
	endRound,
	GameState,
	performAction,
	settingDefaults,
} from "./state.js";
import { card, createDeck } from "./types.js";

export const mockState: GameState = {
	settings: settingDefaults.Hard,
	deck: createDeck(10, 5),
	roundNumber: 1,
	humanHand: [card(1), card(2), card(3), card(4)],
	wolfHand: [card(1), card(2), card(3), card(4)],
	humanScore: 0,
	wolfScore: 0,
};

test("endRound", async (t) => {
	function assertDeckIsReset(state: GameState): boolean {
		return (
			state.deck.length ===
			state.settings.ranks * state.settings.cardsPerRank
		);
	}

	await t.test("Add wolf score when the wolf has cards", () => {
		const newState = endRound({
			...mockState,
			wolfHand: [card(1), card(2)],
			humanHand: [card(3), card(4)],
		});
		equal(newState.humanScore, 0);
		equal(newState.wolfScore, 3);
		equal(newState.roundNumber, 2);
		equal(newState.humanHand.length, 0);
		equal(newState.wolfHand.length, 0);
		assertDeckIsReset(newState);
	});

	await t.test("Add human score when the wolf has no cards", () => {
		const newState = endRound({
			...mockState,
			wolfHand: [],
			humanHand: [card(5), card(6)],
		});
		equal(newState.humanScore, 11);
		equal(newState.wolfScore, 0);
		equal(newState.roundNumber, 2);
		equal(newState.humanHand.length, 0);
		equal(newState.wolfHand.length, 0);
		assertDeckIsReset(newState);
	});
});

test("performAction", async (t) => {
	const baseState: GameState = {
		settings: settingDefaults.Hard,
		deck: createDeck(10, 5),
		roundNumber: 1,
		humanHand: [card(5), card(6)],
		wolfHand: [card(5), card(6)],
		humanScore: 0,
		wolfScore: 0,
	};

	await t.test("perfect", () => {
		const newState = performAction(
			{
				...mockState,
				humanHand: [card(5), card(2)],
				wolfHand: [card(4), card(5)],
			},
			[0],
			[1],
		);
		equal(newState.humanHand.length, 2); // drew a card
		equal(newState.wolfHand.length, 1);
	});

	await t.test("sum", () => {
		const newState = performAction(
			{
				...baseState,
				humanHand: [card(1), card(2), card(3)],
				wolfHand: [card(6)],
			},
			[0, 1, 2],
			[0],
		);
		equal(newState.humanHand.length, 1); // drew a card
		equal(newState.wolfHand.length, 0);
	});

	await t.test("split", () => {
		const newState = performAction(
			{
				...baseState,
				humanHand: [card(6)],
				wolfHand: [card(1), card(2), card(3)],
			},
			[0],
			[0, 1, 2],
		);
		equal(newState.humanHand.length, 0);
		equal(newState.wolfHand.length, 1); // drew a card
	});

	await t.test("over", () => {
		const newState = performAction(
			{
				...baseState,
				humanHand: [card(7)],
				wolfHand: [card(5)],
			},
			[0],
			[0],
		);
		equal(newState.humanHand.length, 0);
		equal(newState.wolfHand.length, 2); // drew 2 cards
	});
});
