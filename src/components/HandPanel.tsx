import { Card } from "../lib/types.js";

export interface IHandCardProps {
	cards: Card[];
	name: string;
	class?: string;
	selected: Set<number>;
	setSelected: (
		selected: Set<number> | ((prev: Set<number>) => Set<number>),
	) => void;
}

export function HandPanel(props: IHandCardProps) {
	const { cards, name, class: className, selected, setSelected } = props;
	return (
		<div class={`card ${className}`}>
			<div class="card-header">{name}'s Hand</div>
			<div class="card-body">
				<div class="d-flex flex-wrap gap-2">
					{cards.length === 0 ? (
						<span class="text-muted">No cards</span>
					) : (
						cards.map((c, i) => (
							<button
								type="button"
								key={i}
								class={`btn fs-2${
									selected.has(i)
										? " btn-primary active"
										: " btn-secondary"
								}`}
								onClick={() =>
									setSelected((prev) => {
										const newSet = new Set(prev);
										if (newSet.has(i)) {
											newSet.delete(i);
										} else {
											newSet.add(i);
										}
										return newSet;
									})
								}
								aria-pressed={
									selected.has(i) ? "true" : "false"
								}
							>
								{c}
							</button>
						))
					)}
				</div>
			</div>
		</div>
	);
}
