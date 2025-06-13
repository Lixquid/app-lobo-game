import { equal } from "node:assert/strict";
import test from "node:test";
import { card, Card, getActionType } from "./types.js";

test("getActionType", async (t) => {
	const hand = (values: number[]): Card[] => values.map(card);

	await t.test(
		'returns "perfect" when one human and one wolf card are equal',
		() => {
			const humanHand = hand([3, 5, 7]);
			const wolfHand = hand([2, 5, 8]);
			equal(getActionType(humanHand, wolfHand, [1], [1]), "perfect");
		},
	);

	await t.test(
		'returns "over" when one human card is greater than one wolf card',
		() => {
			const humanHand = hand([6, 4]);
			const wolfHand = hand([2, 3]);
			equal(getActionType(humanHand, wolfHand, [0], [1]), "over");
		},
	);

	await t.test(
		'returns "sum" when sum of multiple human cards equals one wolf card',
		() => {
			const humanHand = hand([2, 3, 4]);
			const wolfHand = hand([5, 7]);
			equal(getActionType(humanHand, wolfHand, [0, 1], [0]), "sum"); // 2+3=5
		},
	);

	await t.test(
		'returns "split" when one human card equals sum of multiple wolf cards',
		() => {
			const humanHand = hand([7, 4]);
			const wolfHand = hand([3, 4, 2]);
			equal(getActionType(humanHand, wolfHand, [0], [0, 1]), "split"); // 3+4=7
		},
	);

	await t.test("returns undefined if no cards are selected", () => {
		const humanHand = hand([1, 2]);
		const wolfHand = hand([3, 4]);
		equal(getActionType(humanHand, wolfHand, [], [0]), undefined);
		equal(getActionType(humanHand, wolfHand, [0], []), undefined);
	});

	await t.test(
		"returns undefined if selected indices are out of bounds",
		() => {
			const humanHand = hand([1]);
			const wolfHand = hand([2]);
			equal(getActionType(humanHand, wolfHand, [0, 1], [0]), undefined);
			equal(getActionType(humanHand, wolfHand, [0], [0, 1]), undefined);
		},
	);

	await t.test("returns undefined for invalid combinations", () => {
		const humanHand = hand([2, 3]);
		const wolfHand = hand([4, 5]);
		// Multiple human and wolf cards
		equal(getActionType(humanHand, wolfHand, [0, 1], [0, 1]), undefined);
		// One human, one wolf, but not equal or over
		equal(getActionType(humanHand, wolfHand, [0], [1]), undefined); // 2 < 5
		// Multiple human, one wolf, but sum does not match
		equal(getActionType(humanHand, wolfHand, [0, 1], [0]), undefined); // 2+3 != 4
		// One human, multiple wolf, but sum does not match
		equal(getActionType(humanHand, wolfHand, [0], [0, 1]), undefined); // 2 != 4+5
	});
});
