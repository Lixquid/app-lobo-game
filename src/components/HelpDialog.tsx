interface IHelpDialogProps {
	close: () => void;
}

export function HelpDialog(props: IHelpDialogProps) {
	return (
		<>
			<div class="modal d-block" role="dialog">
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<h3 class="modal-title">Help</h3>
							<button
								type="button"
								class="btn-close"
								aria-label="Close"
								onClick={props.close}
							></button>
						</div>
						<div class="modal-body">
							<p>
								Lobo is a solitaire-style single player card
								game where you are battling against The Wolf.
								The goal is to make the wolf run out of cards
								before you do by matching cards from your hand
								with cards in the wolf's hand.
							</p>
							<p>
								After the game starts, you will see the wolf's
								and your hand, and the next card in the deck.
								You can select
								<span class="badge bg-secondary mx-1">
									cards
								</span>
								from either hand to create a play by clicking on
								them to toggle them. All cards selected as part
								of a play will be discarded; the type of play
								determines who gets the <em>Next Card</em>.
							</p>
							<h3>Plays</h3>
							<p>Only the following plays are allowed:</p>
							<ul>
								<li>
									<strong>Perfect</strong>: Select one card
									from your hand and one card from the wolf's
									hand that are equal.{" "}
									<span class="text-success">
										You get the next card.
									</span>
								</li>
								<li>
									<strong>Sum</strong>: Select multiple cards
									from your hand and one card from the wolf's
									hand such that the sum of the selected human
									cards equals the wolf card.{" "}
									<span class="text-success">
										You get the next card.
									</span>
								</li>
								<li>
									<strong>Split</strong>: Select one card from
									your hand and multiple cards from the wolf's
									hand such that the human card equals the sum
									of the wolf cards.{" "}
									<span class="text-warning">
										The wolf gets the next card.
									</span>
								</li>
								<li>
									<strong>Over</strong>: Select one card from
									your hand and one card from the wolf's hand
									such that the human card is greater than the
									wolf card.{" "}
									<span class="text-warning">
										The wolf gets{" "}
										<em>the difference in value</em> number
										of cards.
									</span>
								</li>
							</ul>
							<h3>Scoring</h3>
							<p>
								If the wolf runs out of cards, you score the sum
								of your hand in points.
							</p>
							<p>
								If you run out of cards (or decide you don't
								want to continue the round), you can fold, which
								scores the wolf the sum of its hand. You will
								score nothing!
							</p>
						</div>
					</div>
				</div>
			</div>
			<div class="modal-backdrop fade show"></div>
		</>
	);
}
